# Nexo

**Real social platform** — accounts, profiles, follow, search, text / photo / video posts, likes.

Pronounce: **NEK-so**

## Quick start (local — fully works)

```bash
npm install
npm run dev
```

Open http://localhost:3000

1. Create an account  
2. Edit your profile  
3. Search & follow people  
4. Share text, images, or videos  
5. Like posts · use Feed & Explore  

## Features

- Sign up / log in / log out (secure httpOnly cookies)
- Profiles (display name, bio)
- Search people
- Follow / unfollow
- Posts: text, image, video
- Home feed (people you follow)
- Explore (network)
- Likes
- Auth middleware protection

## Stack

Next.js 14 · TypeScript · Tailwind · file DB (`data/db.json`) · local uploads

## Deploy (Vercel)

1. Import https://github.com/Nimbussky/nexo-social  
2. Framework: Next.js  
3. Env: `NEXO_SECRET` = long random string  
4. Deploy  

**Note:** On Vercel the file DB and uploads are ephemeral (serverless filesystem).  
Use local for full persistence. Production upgrade path: Prisma + Neon Postgres + Vercel Blob.

## Repo

https://github.com/Nimbussky/nexo-social
