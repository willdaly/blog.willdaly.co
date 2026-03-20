import Link from "next/link";
import { getAllPostSlugs, getPostData } from "@/lib/posts";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const post = await getPostData(slug);
    return {
      title: `${post.title} — Will Daly`,
      description: post.excerpt,
    };
  } catch {
    return { title: "Post not found" };
  }
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostData(slug);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <nav className="mb-10">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          ← All posts
        </Link>
      </nav>

      <article>
        <header className="mb-10">
          <time
            dateTime={post.date}
            className="text-sm text-gray-400 block mb-3"
          >
            {formatDate(post.date)}
          </time>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
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
        </header>

        <div
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}
