---
title: "Hello, World!"
date: "2026-03-20"
excerpt: "Welcome to my engineering blog. In this first post I'll walk through how this site is built and what I plan to write about."
---

# Hello, World!

Welcome to my engineering blog! I'm Will, and this is where I'll be writing about software engineering, system design, and the things I'm learning along the way.

## What this blog is built with

This site is a static blog powered by:

- **[Next.js](https://nextjs.org/)** (Pages Router) – handles routing and static-site generation
- **[Tailwind CSS](https://tailwindcss.com/)** – utility-first CSS for fast, responsive styling
- **Markdown** – posts are plain `.md` files that live next to the source code
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** – parses YAML front matter from Markdown files
- **[remark](https://github.com/remarkjs/remark)** – converts Markdown to HTML

At build time, `getStaticProps` and `getStaticPaths` pull every `.md` file from the `posts/` directory, parse the front matter and body, and generate a static page for each one. No database, no CMS—just files.

## What I'll write about

Expect posts covering:

- Distributed systems and backend architecture
- Developer tooling and productivity
- Open-source projects I'm working on
- Lessons learned shipping features to production

## Writing a new post

Drop a new `.md` file in the `posts/` directory with a front matter block at the top:

```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"
excerpt: "A short summary shown on the homepage."
---

Your content here…
```

That's all it takes. Run `npm run dev` and the post will appear on the homepage automatically.

---

Thanks for stopping by—more posts coming soon!
