// Subject cutout via Vision's foreground-instance mask.
// usage: cutout <in.jpg> <out.png>
import Foundation
import Vision
import CoreImage

let args = CommandLine.arguments
guard args.count >= 3 else { FileHandle.standardError.write("usage: cutout in out\n".data(using: .utf8)!); exit(64) }

let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])

guard let src = CIImage(contentsOf: inURL) else {
    FileHandle.standardError.write("cannot read input\n".data(using: .utf8)!); exit(65)
}

let handler = VNImageRequestHandler(ciImage: src, options: [:])
let req = VNGenerateForegroundInstanceMaskRequest()

do {
    try handler.perform([req])
} catch {
    FileHandle.standardError.write("vision failed: \(error)\n".data(using: .utf8)!); exit(66)
}

guard let obs = req.results?.first else {
    FileHandle.standardError.write("no foreground instance found\n".data(using: .utf8)!); exit(67)
}

do {
    let buf = try obs.generateScaledMaskForImage(forInstances: obs.allInstances, from: handler)
    let mask = CIImage(cvPixelBuffer: buf)

    guard let blend = CIFilter(name: "CIBlendWithMask") else { exit(68) }
    blend.setValue(src, forKey: kCIInputImageKey)
    blend.setValue(CIImage(color: .clear).cropped(to: src.extent), forKey: kCIInputBackgroundImageKey)
    blend.setValue(mask, forKey: kCIInputMaskImageKey)

    guard let out = blend.outputImage else { exit(69) }
    let ctx = CIContext()
    guard let png = ctx.pngRepresentation(of: out,
                                          format: .RGBA8,
                                          colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!) else { exit(70) }
    try png.write(to: outURL)
    print("ok \(Int(src.extent.width))x\(Int(src.extent.height)) instances=\(obs.allInstances.count)")
} catch {
    FileHandle.standardError.write("mask failed: \(error)\n".data(using: .utf8)!); exit(71)
}
