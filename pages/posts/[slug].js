import Link from 'next/link';
import Layout from '@/components/Layout';
import { getAllPostSlugs, getPostData } from '@/lib/posts';

export default function Post({ postData }) {
  const { title, date, contentHtml } = postData;

  return (
    <Layout title={title}>
      <article>
        <header className="mb-8">
          <Link
            href="/"
            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
          >
            &larr; All posts
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
          <time className="mt-2 block text-sm text-gray-400">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC',
            })}
          </time>
        </header>

        <div
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug);
  return { props: { postData } };
}
