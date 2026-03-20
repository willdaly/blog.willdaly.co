import Link from 'next/link';
import Layout from '@/components/Layout';
import { getSortedPostsData } from '@/lib/posts';

export default function Home({ posts }) {
  return (
    <Layout>
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Engineering Blog
        </h1>
        <p className="mt-3 text-gray-500">
          Writing about software, systems, and the things I&apos;m learning.
        </p>
      </header>

      <ul className="divide-y divide-gray-100">
        {posts.map(({ slug, title, date, excerpt }) => (
          <li key={slug} className="py-8 group">
            <article>
              <time className="text-sm text-gray-400">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'UTC',
                })}
              </time>
              <h2 className="mt-1 text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                <Link href={`/posts/${slug}`}>{title}</Link>
              </h2>
              {excerpt && (
                <p className="mt-2 text-gray-500 leading-relaxed line-clamp-2">{excerpt}</p>
              )}
              <Link
                href={`/posts/${slug}`}
                className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Read more &rarr;
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getSortedPostsData();
  return { props: { posts } };
}
