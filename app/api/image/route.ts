import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { image, Prompt, Keywords, NegativeKeywords, NumberImages } =
      await req.json();

    const output = await replicate.run(
      "jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
      {
        input: {
          eta: 0,
          image: image,
          scale: 9,
          prompt: Prompt,
          a_prompt: Keywords,
          n_prompt: NegativeKeywords,
          ddim_steps: 20,
          num_samples: NumberImages,
          value_threshold: 0.1,
          image_resolution: "512",
          detect_resolution: 512,
          distance_threshold: 0.1,
        },
      }
    );
    console.log(output);

    return NextResponse.json(output);
  } catch (error) {
    console.log("[IMAGE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
