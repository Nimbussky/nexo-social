import fs from "fs";
import path from "path";
import { DB } from "./types";

const file = path.join(process.cwd(), "data", "db.json");

const empty: DB = { users: [], follows: [], posts: [], likes: [] };

export function readDB(): DB {
  try {
    if (!fs.existsSync(file)) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, JSON.stringify(empty, null, 2));
      return { users: [], follows: [], posts: [], likes: [] };
    }
    const data = JSON.parse(fs.readFileSync(file, "utf8")) as Partial<DB>;
    return {
      users: data.users || [],
      follows: data.follows || [],
      posts: data.posts || [],
      likes: data.likes || [],
    };
  } catch {
    return { users: [], follows: [], posts: [], likes: [] };
  }
}

export function writeDB(db: DB) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(db, null, 2));
}
