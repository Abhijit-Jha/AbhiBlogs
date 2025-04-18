'use client';

type BlogCardProps = {
  title: string;
  content: string;
  postedAt: string;
  link?: string;
};

export default function BlogCard({ title, content, postedAt, link }: BlogCardProps) {
  return (
    <div className="text-white rounded-xl p-6 w-full max-w-3xl overflow-hidden">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-orange-400 mb-4">{title}</h2>

      {/* Content */}
      <div
        className="whitespace-pre-wrap text-zinc-100 text-base leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: content }} // Render HTML content safely
      />

      {/* postedAt + Optional Link */}
      <div className="flex justify-between items-center text-sm text-zinc-500">
        <span>{postedAt}</span>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline hover:text-blue-300 transition"
          >
            Preview here
          </a>
        )}
      </div>

      {/* Bottom Separator */}
      <div className="mt-6 h-px bg-zinc-700 w-full" />
    </div>
  );
}
