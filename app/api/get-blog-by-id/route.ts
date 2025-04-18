import { Blog } from "@/database/model/schema";
import { connectToDatabase } from "@/database/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing blog ID" }, { status: 400 });
    }

    await connectToDatabase();

    const post = await Blog.findById(id);
    if (!post) {
      return NextResponse.json(
        { message: "Please check the ID again :)" },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (err: unknown) {
    console.error("Error fetching blog post:", err);

    if (err instanceof Error) {
      return NextResponse.json(
        { error: "Failed to fetch blog post", details: err.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch blog post", details: "Unknown error occurred" },
      { status: 500 }
    );
  }

}
