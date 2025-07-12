import cloudinary from "@/lib/cloudinary";
import { CloudinaryResponse } from "@/lib/cloudinaryResponse";
import { NextRequest, NextResponse } from "next/server";
import * as streamifier from "streamifier";
import sharp from "sharp";

export async function POST(nextRequest: NextRequest) {
  try {
    const body = await nextRequest.formData();
    const file = body.get("file");

    if (!file || !(file instanceof Blob)) {
      return new Response("No file provided", { status: 400 });
    }

    const buffer_any = Buffer.from(await file.arrayBuffer());

    const buffer = await sharp(buffer_any).webp().toBuffer();



    const res = await new Promise<CloudinaryResponse>((res, rec) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error || !result) {
            return rec(error);
          }

          res(result);
        }
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    return NextResponse.json(res);
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json("Failed to upload image", { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      max_results: 1000,
    });

    return NextResponse.json(result.resources);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json("Failed to fetch images", { status: 500 });
  }
}
