import { Blog } from "@/database/model/schema";
import { connectToDatabase } from "@/database/utils/connectToDB";
import { IBlog } from "@/types/BlogTypes";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

interface RawBlog {
  _id: Types.ObjectId;
  title: string;
  content: string;
  link: string;
  postedAt: Date;
  __v: number;
}

export async function GET() {
  try {
    await connectToDatabase();

    const posts = await Blog.find({})
      .sort({ postedAt: -1 })
      .lean<RawBlog[]>();

    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      hour12: true,
    });

    const serialized: IBlog[] = posts.map((p) => ({
      _id: p._id.toString(),
      title: p.title,
      content: p.content,
      link: p.link,
      postedAt: formatter.format(new Date(p.postedAt)),
      __v: p.__v,
    }));

    return NextResponse.json(serialized, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching blog posts:", err);
    return NextResponse.json(
      { error: "Failed to fetch blog posts", details: err.message },
      { status: 500 }
    );
  }
}
