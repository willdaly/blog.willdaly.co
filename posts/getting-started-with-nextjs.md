---
title: "Getting Started with Next.js App Router"
date: "2024-02-08"
excerpt: "A practical walkthrough of the Next.js App Router — layouts, server components, and file-based routing."
tags: ["nextjs", "react", "web"]
---

# Getting Started with Next.js App Router

The Next.js App Router — introduced in Next.js 13 and refined since — is a new paradigm built on top of React Server Components. If you're coming from the Pages Router, the mental model takes a little getting used to. Let's break it down.

## File-based routing, revisited

In the App Router, routes live inside the `app/` directory. Every folder maps to a URL segment, and a `page.js` file inside that folder makes it a publicly accessible route.

```
app/
  page.js           →  /
  blog/
    page.js         →  /blog
    [slug]/
      page.js       →  /blog/:slug
```

Dynamic segments use square brackets, just like the Pages Router.

## Server Components by default

Every component inside `app/` is a **React Server Component** by default. This means:

- Zero JavaScript is shipped to the client unless you opt in
- You can `await` data fetching directly in the component body
- No `useEffect` needed for initial data loads

```jsx
// This runs entirely on the server
export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);
  return <article dangerouslySetInnerHTML={{ __html: post.contentHtml }} />;
}
```

## Layouts

The `layout.js` file wraps its segment and all children. This is perfect for persistent UI like headers and footers:

```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

Layouts are also server components by default and can fetch data.

## Static generation

For a blog, you'll want `generateStaticParams` to pre-render every post at build time:

```jsx
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

This turns each post into a static HTML file — fast, cheap, and CDN-friendly.

## Wrapping up

The App Router is a significant step forward. Server Components dramatically reduce client-side JavaScript, and co-locating layouts with routes makes the project structure easier to reason about.

Give it a try — the migration from the Pages Router is straightforward for most projects.
