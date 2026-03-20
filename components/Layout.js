import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children, title }) {
  const pageTitle = title ? `${title} | Will Daly` : 'Will Daly';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white text-gray-900">
        <header className="border-b border-gray-100">
          <div className="mx-auto max-w-2xl px-4 py-5 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold tracking-tight hover:text-indigo-600 transition-colors">
              Will Daly
            </Link>
            <nav className="flex gap-5 text-sm text-gray-600">
              <a
                href="https://github.com/willdaly"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-4 py-12">{children}</main>

        <footer className="border-t border-gray-100 mt-16">
          <div className="mx-auto max-w-2xl px-4 py-6 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Will Daly
          </div>
        </footer>
      </div>
    </>
  );
}
