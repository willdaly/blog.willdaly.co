---
title: "Building a Static Blog with Next.js and Tailwind CSS"
date: "2026-03-15"
excerpt: "A deep-dive into how I use getStaticProps and getStaticPaths to turn plain Markdown files into a fast, static website."
---

# Building a Static Blog with Next.js and Tailwind CSS

Static-site generation (SSG) is a great fit for a personal blog: content doesn't change between requests, so we can pre-render every page at build time and serve it as plain HTML. Next.js makes this straightforward with `getStaticProps` and `getStaticPaths`.

## Project structure

```
.
├── pages/
│   ├── index.js          # Homepage – lists all posts
│   └── posts/
│       └── [slug].js     # Dynamic route – renders a single post
├── posts/                # Markdown source files
│   └── hello-world.md
├── lib/
│   └── posts.js          # Utility functions to read Markdown
└── components/
    └── Layout.js         # Shared header / footer wrapper
```

## Reading Markdown files

`lib/posts.js` exports two helpers:

- `getSortedPostsData()` – reads all `.md` files, parses front matter, and returns them sorted by date. Used by the homepage.
- `getPostData(slug)` – reads a single `.md` file, converts the body to HTML with remark, and returns everything needed to render the post page.

```js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return { slug, ...data };
  });
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
```

## Static generation

On the homepage, `getStaticProps` calls `getSortedPostsData()` and passes the result as props:

```js
export async function getStaticProps() {
  const posts = getSortedPostsData();
  return { props: { posts } };
}
```

For the post page, `getStaticPaths` generates a path for every `.md` file so Next.js knows which pages to pre-render:

```js
export async function getStaticPaths() {
  const paths = getSortedPostsData().map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}
```

## Rendering Markdown as HTML

`remark` converts the Markdown body to an HTML string, which we then render with `dangerouslySetInnerHTML`:

```js
const processedContent = await remark().use(html).process(content);
const contentHtml = processedContent.toString();
```

The `prose` utility class from `@tailwindcss/typography` (or hand-rolled styles) ensures the rendered HTML looks good without any extra effort.

---

That's the whole pipeline. Simple, fast, and easy to maintain.
