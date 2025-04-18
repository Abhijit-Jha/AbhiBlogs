'use client';

import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

export type BlogPost = {
  _id: string;
  title: string;
  content: string;
  link: string;
  postedAt: string; // e.g., "April 17, 2025 at 9 PM"
  __v: number;
};

export default function App() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function getBlogs() {
      const data = await axios.get("/api/get-blogs");
      setBlogs(data.data);
    }
    getBlogs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="flex-grow mt-[80px] flex flex-col items-center">
        {blogs.length > 0 ? blogs.map((blog: BlogPost) => (
          <BlogCard
            key={blog._id}
            title={blog.title}
            content={blog.content}
            postedAt={blog.postedAt}
            link={blog.link}
          />
        )) : (
          <div className="text-center text-gray-500 text-xl py-10 flex items-center">
            📭 No blogs available at the moment. Please check back later!
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
