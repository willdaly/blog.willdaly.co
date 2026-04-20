# blog.willdaly.co

Source code and content for [blog.willdaly.co](https://blog.willdaly.co).

Built with [Astro](https://astro.build) and deployed to GitHub Pages via
GitHub Actions on every push to `main`.

## Writing a new post

1. Create a new Markdown (or MDX) file in `src/content/blog/`, e.g.
   `src/content/blog/my-post.md`.
2. Add frontmatter:

   ```md
   ---
   title: 'My post title'
   description: 'A short description for SEO and RSS.'
   pubDate: 'Apr 20 2026'
   # heroImage: '../../assets/my-image.jpg'  # optional
   ---

   Your Markdown content here.
   ```

3. Commit and push to `main`. The GitHub Actions workflow builds and deploys
   the site automatically.

The post's URL slug is derived from the filename
(`my-post.md` → `/blog/my-post/`).

## Local development

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to ./dist
npm run preview   # serves ./dist locally
```

Requires Node.js `>=22.12.0`.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site
and publishes it to GitHub Pages. The custom domain is configured via
`public/CNAME` (copied to the root of the published site) and a DNS record on
the registrar pointing `blog.willdaly.co` at GitHub Pages.
