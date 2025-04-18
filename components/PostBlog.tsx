'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import dotenv from "dotenv"
dotenv.config()
export default function PostBlog() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        if (description.length < 20 || description.length > 1000) {
            toast('Description must be between 20 to 1000 characters');
            return;
        }

        if (!password) {
            toast('Bhai Ye page pe kya kar rha hai?? Admin hai tu??');
            return;
        }

        try {
            const response = await axios.post("/api/post-blog", {
                title,
                content : description,
                link,
                postedAt: new Date(),
                password
            });

            toast('Blog Posted!');
            console.log(response.data);

        } catch (error: any) {
            if (error.response?.status === 401) {
                toast('Bhai Ye page pe kya kar rha hai?? Admin hai tu??');
            } else if (error.response?.status === 400) {
                toast(error.response.data?.error || "Bad Request");
            } else {
                toast('Something went wrong posting the blog.');
            }
            console.error("Post error:", error);
        }
    };


    return (
        <main className="min-h-screen bg-[#0f0f0f] px-4 py-10 flex justify-center items-start">
            <ToastContainer />
            <div className="w-full max-w-3xl bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 text-white">
                <h1 className="text-3xl font-bold text-glow">📝 Post a New Blog</h1>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter a catchy title..."
                        className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write your blog content (100–1000 characters)..."
                        rows={10}
                        className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    />
                    <p className="text-xs text-zinc-400">{description.length}/1000 characters</p>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Link (Optional)</label>
                    <input
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="e.g., https://github.com/yourproject"
                        className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter posting password"
                        className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                >
                    🚀 Post Blog
                </motion.button>
            </div>
        </main>
    );
}
