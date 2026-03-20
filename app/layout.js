import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Will Daly — Engineering Blog",
  description:
    "Thoughts on software engineering, distributed systems, and building products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        <header className="border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight hover:text-blue-600 transition-colors"
            >
              Will Daly
            </Link>
            <nav className="flex gap-6 text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Blog
              </Link>
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

        <main className="flex-1">{children}</main>

        <footer className="border-t border-gray-200 mt-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} Will Daly. Built with Next.js &amp;
            Tailwind CSS.
          </div>
        </footer>
      </body>
    </html>
  );
}
