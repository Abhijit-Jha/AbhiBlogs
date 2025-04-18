'use client';

import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export type BlogPost = {
  _id: string;
  title: string;
  content: string;
  link: string;
  postedAt: string;
  __v: number;
};

export default function App() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // ✅ lowercase + correct type

  useEffect(() => {
    async function getBlogs() {
      setLoading(true);
      try {
        const data = await axios.get("/api/get-blogs");
        setBlogs(data.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    }
    getBlogs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="flex-grow mt-[80px] flex flex-col items-center w-full">
        {loading ? (
          <div className="flex justify-center items-center h-[calc(100vh-210px)] w-full">
            <DotLottieReact
              src="/loader.lottie"
              loop
              autoplay
              className="w-64 h-64"
            />
          </div>
        ) : blogs.length > 0 ? (
          blogs.map((blog: BlogPost) => (
            <BlogCard
              key={blog._id}
              title={blog.title}
              content={blog.content}
              postedAt={blog.postedAt}
              link={blog.link}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 text-xl py-10 flex items-center">
            📭 No blogs available at the moment. Please check back later!
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
