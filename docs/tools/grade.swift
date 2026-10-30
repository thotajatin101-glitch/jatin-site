// Trim a cutout to its subject and grade it to the site's B&W print look:
// desaturate, push contrast, lift the shadows so a black jacket keeps its
// folds against the accent. Writes grayscale+alpha (smaller, visually the same).
// usage: grade <in.png> <out.png> [contrast=1.3] [gamma=0.78] [margin=6]
import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let a = CommandLine.arguments
guard a.count >= 3 else { print("usage: grade in out [contrast] [gamma] [margin]"); exit(64) }
let contrast = a.count > 3 ? Double(a[3])! : 1.3
let gamma = a.count > 4 ? Double(a[4])! : 0.78
let margin = a.count > 5 ? Int(a[5])! : 6

guard let isrc = CGImageSourceCreateWithURL(URL(fileURLWithPath: a[1]) as CFURL, nil),
      let img = CGImageSourceCreateImageAtIndex(isrc, 0, nil) else { print("cannot read"); exit(65) }
let w = img.width, h = img.height
var px = [UInt8](repeating: 0, count: w * h * 4)
let rgb = CGColorSpaceCreateDeviceRGB()
let ctx = CGContext(data: &px, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4, space: rgb,
                    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
ctx.draw(img, in: CGRect(x: 0, y: 0, width: w, height: h))

var x0 = w, y0 = h, x1 = 0, y1 = 0
for y in 0..<h { for x in 0..<w where px[(y * w + x) * 4 + 3] > 8 {
    x0 = min(x0, x); x1 = max(x1, x); y0 = min(y0, y); y1 = max(y1, y) } }
x0 = max(0, x0 - margin); y0 = max(0, y0 - margin); x1 = min(w - 1, x1 + margin); y1 = min(h - 1, y1 + margin)
let cw = x1 - x0 + 1, ch = y1 - y0 + 1
var out = [UInt8](repeating: 0, count: cw * ch * 2)
for y in 0..<ch { for x in 0..<cw {
    let i = ((y + y0) * w + (x + x0)) * 4
    let al = Double(px[i + 3]) / 255
    if al <= 0 { continue }
    let r = Double(px[i]) / 255 / al, g = Double(px[i + 1]) / 255 / al, b = Double(px[i + 2]) / 255 / al
    var l = min(1, 0.299 * r + 0.587 * g + 0.114 * b)
    l = pow(l, gamma)
    l = min(1, max(0, (l - 0.5) * contrast + 0.5))
    let o = (y * cw + x) * 2
    out[o] = UInt8(l * 255); out[o + 1] = px[i + 3]
} }
let gray = CGColorSpaceCreateDeviceGray()
let octx = CGContext(data: &out, width: cw, height: ch, bitsPerComponent: 8, bytesPerRow: cw * 2, space: gray,
                     bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: a[2]) as CFURL, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, octx.makeImage()!, nil)
CGImageDestinationFinalize(dest)
print("ok \(cw)x\(ch) from \(w)x\(h)")
