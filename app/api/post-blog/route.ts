import { Blog } from "@/database/model/schema";
import { connectToDatabase } from "@/database/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    let payload;
    try {
        payload = await req.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON payload" },
            { status: 400 }
        );
    }

    const { title, content, postedAt, link, password } = payload || {};
    if (password !== process.env.POSTING_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!title || !content || !postedAt) {
        return NextResponse.json(
            { error: "Missing required fields: title, content, and postedAt" },
            { status: 400 }
        );
    }

    try {
        await connectToDatabase();

        const newPost = await Blog.create({
            title,
            content,
            postedAt,
            link: link || "",
        });

        return NextResponse.json(
            { message: "Blog post created successfully", post: newPost },
            { status: 201 }
        );
    } catch (err: any) {
        console.error("Error creating blog post:", err);
        return NextResponse.json(
            {
                error: "Failed to create blog post",
                details: err.message,
            },
            { status: 500 }
        );
    }
}
