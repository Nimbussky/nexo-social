# Nexo QA Report — Multi-Agent Final Pass

**Date:** 2026-09-21  
**Agents:** Manager · QA · Fixer · Technical Engineer

## Critical bugs found & fixed
1. **Signup / Posts crash** — `randomUUID()` used without import → fixed to `uuid()`
2. **DB schema drift** — `likes` missing from empty DB → added to types + db + readDB migration
3. **Session cookies** — no maxAge / production secure flag → hardened on login + signup
4. **Auth routes unprotected at edge** — added `middleware.ts` for /feed /explore /search /profile

## Features completed (final V1+)
- Auth (signup, login, logout, session cookie)
- Profiles + edit bio/name
- Search users
- Follow / unfollow
- Text / image / video posts
- Feed (following) + Explore
- **Likes** (toggle + count)
- Route protection middleware
- Dark premium UI

## Known deploy limits
- JSON file store + local uploads are ephemeral on Vercel serverless
- For real multi-user production: swap to Postgres (Neon) + Vercel Blob
- Local `npm run dev` is the fully working mode today
