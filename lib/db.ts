import fs from "fs";
import path from "path";
import { DB, User } from "./types";

const file = path.join(process.cwd(), "data", "db.json");

const empty: DB = { users: [], follows: [], posts: [], likes: [] };

const DEMO_USER: User = {
  id: "demo-user-001",
  email: "demo@nexo.app",
  username: "demouser",
  displayName: "Demo User",
  bio: "Official demo account for Nexo",
  avatarUrl: "",
  // password: password123
  passwordHash: "$2b$10$pfkvjMDKURWBBcnVHRcjI.SbDa/xhQNap38uD12Xa.OBcwp3vsYRa",
  createdAt: "2026-09-21T00:00:00.000Z",
};

function ensureSeed(db: DB): DB {
  if (db.users.length === 0) {
    db.users.push(DEMO_USER);
  }
  return db;
}

export function readDB(): DB {
  try {
    if (!fs.existsSync(file)) {
      try {
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, JSON.stringify(empty, null, 2));
      } catch {
        // read-only FS (Vercel) — fall through to in-memory seed
      }
      return ensureSeed({ users: [], follows: [], posts: [], likes: [] });
    }
    const data = JSON.parse(fs.readFileSync(file, "utf8")) as Partial<DB>;
    return ensureSeed({
      users: data.users || [],
      follows: data.follows || [],
      posts: data.posts || [],
      likes: data.likes || [],
    });
  } catch {
    return ensureSeed({ users: [], follows: [], posts: [], likes: [] });
  }
}

export function writeDB(db: DB) {
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(db, null, 2));
  } catch (err) {
    // Vercel / serverless: filesystem is read-only. Silently ignore so auth still works for the current instance.
    console.warn("[nexo] writeDB skipped (read-only FS)", (err as Error).message);
  }
}
