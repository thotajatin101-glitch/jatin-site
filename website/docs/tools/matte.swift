// Better subject cutout than cutout.swift: upscale 2x, take Vision's foreground
// mask for the body, then re-matte the HAIR by colour (the night sky behind his
// head is teal/blue, hair is near-black, so "blueness" is a clean key), and
// decontaminate the edge pixels so no teal fringe survives the B&W grade.
// usage: matte <in.jpg> <out.png> [hairTop=500 hairBottom=700 hairLeft=190 hairRight=500]  (source px)
import Foundation
import Vision
import CoreImage
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let A = CommandLine.arguments
guard A.count >= 3 else { print("usage: matte in out [top bottom left right]"); exit(64) }
let S = 2                                        // upscale factor
let hTop = (A.count > 3 ? Int(A[3])! : 500) * S
let hBot = (A.count > 4 ? Int(A[4])! : 700) * S
let hLeft = (A.count > 5 ? Int(A[5])! : 190) * S
let hRight = (A.count > 6 ? Int(A[6])! : 500) * S

guard let src = CIImage(contentsOf: URL(fileURLWithPath: A[1])) else { print("cannot read"); exit(65) }
let sw = Int(src.extent.width), sh = Int(src.extent.height)
let W = sw * S, H = sh * S
let ci = CIContext()
let srgb = CGColorSpace(name: CGColorSpace.sRGB)!

// ---- Vision foreground mask (body) ----
let handler = VNImageRequestHandler(ciImage: src, options: [:])
let req = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([req])
guard let obs = req.results?.first else { print("no subject"); exit(67) }
let mbuf = try obs.generateScaledMaskForImage(forInstances: obs.allInstances, from: handler)
var maskCI = CIImage(cvPixelBuffer: mbuf)
maskCI = maskCI.transformed(by: CGAffineTransform(scaleX: CGFloat(S), y: CGFloat(S))).samplingLinear()
    .cropped(to: CGRect(x: 0, y: 0, width: W, height: H))

// ---- upscaled colour ----
let lz = CIFilter(name: "CILanczosScaleTransform")!
lz.setValue(src, forKey: kCIInputImageKey); lz.setValue(S, forKey: kCIInputScaleKey); lz.setValue(1, forKey: kCIInputAspectRatioKey)
var big = lz.outputImage!
let us = CIFilter(name: "CIUnsharpMask")!
us.setValue(big, forKey: kCIInputImageKey); us.setValue(2.0, forKey: kCIInputRadiusKey); us.setValue(0.55, forKey: kCIInputIntensityKey)
big = us.outputImage!.cropped(to: CGRect(x: 0, y: 0, width: W, height: H))

func gray(_ img: CIImage) -> [UInt8] {
    var buf = [UInt8](repeating: 0, count: W * H)
    ci.render(img, toBitmap: &buf, rowBytes: W, bounds: CGRect(x: 0, y: 0, width: W, height: H), format: .R8, colorSpace: nil)
    return buf
}
func morph(_ name: String, _ r: Double) -> [UInt8] {
    let f = CIFilter(name: name)!
    f.setValue(maskCI, forKey: kCIInputImageKey); f.setValue(r, forKey: kCIInputRadiusKey)
    return gray(f.outputImage!.cropped(to: CGRect(x: 0, y: 0, width: W, height: H)))
}
let m0 = gray(maskCI)
let mDil = morph("CIMorphologyMaximum", 26)
let mEro = morph("CIMorphologyMinimum", 26)

var rgba = [UInt8](repeating: 0, count: W * H * 4)
ci.render(big, toBitmap: &rgba, rowBytes: W * 4, bounds: CGRect(x: 0, y: 0, width: W, height: H), format: .RGBA8, colorSpace: srgb)
// CI renders bottom-up for bitmaps? render(toBitmap) writes top-down for the bounds given — verified by the debug image.

@inline(__always) func clamp(_ v: Double, _ a: Double = 0, _ b: Double = 1) -> Double { min(b, max(a, v)) }
func smooth(_ e0: Double, _ e1: Double, _ x: Double) -> Double { let t = clamp((x - e0) / (e1 - e0)); return t * t * (3 - 2 * t) }

// ---- alpha ----
var alpha = [Double](repeating: 0, count: W * H)
let feather = 36.0
for y in 0..<H { for x in 0..<W {
    let i = y * W + x
    var a = Double(m0[i]) / 255
    // hair window weight (ramps to 0 at the box edges so the two mattes blend)
    let wx = min(Double(x - hLeft), Double(hRight - x)), wy = min(Double(y - hTop), Double(hBot - y))
    let wgt = clamp(min(wx, wy) / feather)
    let lens = x >= 255 * S && x <= 345 * S && y >= 655 * S      // sky seen THROUGH the lens is real, keep it
    if wgt > 0 && !lens {
        let p = i * 4
        let r = Double(rgba[p]), b = Double(rgba[p + 2])
        let sky = smooth(22, 62, (b - r))                 // teal/blue sky vs brown-black hair
        let keyA = 1 - sky
        let inner = Double(mEro[i]) / 255, outer = Double(mDil[i]) / 255
        let hairA = max(inner, min(keyA, outer))
        a = a * (1 - wgt) + hairA * wgt
    }
    alpha[i] = a
} }
// 1-2-1 smooth, then a gentle contrast so edges stay crisp but never stair-step
var sm = alpha
for y in 1..<(H - 1) { for x in 1..<(W - 1) {
    let i = y * W + x
    let h = alpha[i - 1] + 2 * alpha[i] + alpha[i + 1]
    sm[i] = h / 4
} }
var sm2 = sm
for y in 1..<(H - 1) { for x in 1..<(W - 1) {
    let i = y * W + x
    sm2[i] = (sm[i - W] + 2 * sm[i] + sm[i + W]) / 4
} }
for i in 0..<(W * H) { alpha[i] = smooth(0.06, 0.94, sm2[i]) }

// ---- decontaminate: partial pixels take the colour of nearby solid pixels ----
let R = 7
var out = [UInt8](repeating: 0, count: W * H * 4)
for y in 0..<H { for x in 0..<W {
    let i = y * W + x, a = alpha[i]
    if a <= 0.004 { continue }
    var r = Double(rgba[i * 4]), g = Double(rgba[i * 4 + 1]), b = Double(rgba[i * 4 + 2])
    if a < 0.97 && y > hTop - 40 && y < hBot + 40 {
        var sr = 0.0, sg = 0.0, sb = 0.0, n = 0.0
        for dy in stride(from: -R, through: R, by: 2) { for dx in stride(from: -R, through: R, by: 2) {
            let yy = y + dy, xx = x + dx
            if yy < 0 || yy >= H || xx < 0 || xx >= W { continue }
            let j = yy * W + xx
            if alpha[j] > 0.97 { sr += Double(rgba[j * 4]); sg += Double(rgba[j * 4 + 1]); sb += Double(rgba[j * 4 + 2]); n += 1 }
        } }
        if n > 0 { let k = 0.85; r = r * (1 - k) + sr / n * k; g = g * (1 - k) + sg / n * k; b = b * (1 - k) + sb / n * k }
    }
    out[i * 4] = UInt8(clamp(r, 0, 255) * a)
    out[i * 4 + 1] = UInt8(clamp(g, 0, 255) * a)
    out[i * 4 + 2] = UInt8(clamp(b, 0, 255) * a)
    out[i * 4 + 3] = UInt8(a * 255)
} }

let octx = CGContext(data: &out, width: W, height: H, bitsPerComponent: 8, bytesPerRow: W * 4, space: srgb,
                     bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: A[2]) as CFURL, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, octx.makeImage()!, nil)
CGImageDestinationFinalize(dest)
print("ok \(W)x\(H)")
