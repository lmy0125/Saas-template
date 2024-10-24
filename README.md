# Saas web template for you to get started on your new project

## Tech Stack
- [Next.js](https://nextjs.org)
- [Auth.js(Next-Auth)](https://authjs.dev/getting-started)
- [Tailwind](https://tailwindcss.com/docs)
- [Shadcn](https://ui.shadcn.com/docs)
- [Supabase](https://supabase.io/docs)
- [Prisma](https://www.prisma.io/docs)
- [Stripe](https://stripe.com/docs)
## Getting Started

1. Rename the `.env.example` to `.env` and add you own keys from supabase and stripe.

2. Set up local supabase dev env by following this [tutorial](https://supabase.com/docs/guides/local-development/cli/getting-started).

    - Or change `DATABASE_URL` and `DIRECT_URL` in `.env` to your supabase project and access the remote database directly.

3. Run app:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`.
