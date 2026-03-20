import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export const metadata = {
  title: "Will Daly — Engineering Blog",
  description:
    "Thoughts on software engineering, distributed systems, and building products.",
};

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
          Engineering Blog
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Thoughts on software engineering, distributed systems, and building
          things that work.
        </p>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
          Latest Posts
        </h2>

        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Check back soon!</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {posts.map((post) => (
              <li key={post.slug} className="py-6 group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <time
                    dateTime={post.date}
                    className="text-sm text-gray-400 mb-1 block"
                  >
                    {formatDate(post.date)}
                  </time>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-gray-500 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
