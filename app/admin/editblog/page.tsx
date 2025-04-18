'use client';

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
interface BlogDataInterface{
    title? : string,
    content? : string,
    link?: string,
    password? : string
}
export default function BlogUpdater() {
    const [blogId, setBlogId] = useState("");
    const [blogData, setBlogData] = useState<BlogDataInterface|null>(null);
    const [loading, setLoading] = useState(false);

    const getBlogDetails = async () => {
        if (!blogId.trim()) {
            toast.error("❌ Please enter a blog ID first!");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.get(`/api/get-blog-by-id?id=${blogId}`);
            if (res.status === 200) {
                // Initialize with blog data and add password field
                setBlogData({ ...res.data, password: "" });
                toast.success("✅ Blog fetched successfully!");
            } else {
                toast.error("⚠️ Blog not found!");
            }
        } catch (err:any) {
            toast.error(`❌ ${err.response?.data?.message || "Something went wrong"}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setBlogData(null);
    }, [blogId]);

    const updateBlog = async () => {
        if (!blogData?.password?.trim()) {
            toast.error("⚠️ Please enter the update password!");
            return;
        }

        try {
            console.log(blogData)
            const res = await axios.patch(`/api/update-blog?id=${blogId}`, blogData);
            if(!res){
                toast.error("Something went Wrong");
            }

            toast.success("Blog Updated Successfully");
        } catch (err: any) {
            toast.error(`❌ ${err.response?.data?.message || "Something went wrong"}`);
        }
    };

    return (
        <main className="min-h-screen bg-[#0f0f0f] px-4 py-10 flex justify-center items-start">
            <ToastContainer />
            <div className="w-full max-w-3xl bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 text-white">
                <h1 className="text-3xl font-bold text-glow">🔄 Update Blog Details</h1>

                <div className="flex items-center gap-3">
                    <Button onClick={getBlogDetails} disabled={loading} className="shrink-0">
                        {loading ? "Loading..." : "🔍 Get Blog Details"}
                    </Button>
                    <Input
                        placeholder="Enter Blog ID"
                        value={blogId}
                        onChange={(e) => setBlogId(e.target.value)}
                        className="bg-zinc-900 border-zinc-700 text-white"
                    />
                </div>

                <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Blog Title</label>
                        <Input
                            placeholder="Blog Title"
                            value={blogData?.title || ""}
                            disabled={!blogData}
                            onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                            className="bg-zinc-900 border-zinc-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Blog Content</label>
                        <Textarea
                            placeholder="Blog Content"
                            value={blogData?.content || ""}
                            disabled={!blogData}
                            onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
                            rows={8}
                            className="bg-zinc-900 border-zinc-700 text-white resize-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Link</label>
                        <Input
                            placeholder="Blog Link"
                            value={blogData?.link || ""}
                            disabled={!blogData}
                            onChange={(e) => setBlogData({ ...blogData, link: e.target.value })}
                            className="bg-zinc-900 border-zinc-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Update Password</label>
                        <Input
                            type="password"
                            placeholder="Enter Password"
                            value={blogData?.password || ""}
                            disabled={!blogData}
                            onChange={(e) => setBlogData({ ...blogData, password: e.target.value })}
                            className="bg-zinc-900 border-zinc-700 text-white"
                        />
                    </div>

                    {blogData && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={updateBlog}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                        >
                            💾 Update Blog
                        </motion.button>
                    )}
                </div>
            </div>
        </main>
    );
}
