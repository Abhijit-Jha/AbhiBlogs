import { Blog } from "@/database/model/schema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "Missing blog ID" }, { status: 400 });
        }

        const payload = await req.json();
        console.log(payload.password, process.env.UPDATE_PASSWORD)
        if (payload.password !== process.env.UPDATE_PASSWORD || !payload.password) {
            return NextResponse.json({
                message: "Please Verify the password to update the blog"
            }, { status: 400 })
        }
        
        const result = await Blog.updateOne({ _id: id }, { $set: payload });

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "No blog updated" }, { status: 404 });
        }

        return NextResponse.json({ message: "Blog updated successfully" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Server error", error: err }, { status: 500 });
    }
}
