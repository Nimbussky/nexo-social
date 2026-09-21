import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { readDB, writeDB } from "@/lib/db";

export async function POST(req: Request) {
  const me = getCurrentUser();
  if (!me) return NextResponse.json({ error: "Login required." }, { status: 401 });
  const { postId } = await req.json();
  if (!postId) return NextResponse.json({ error: "Missing postId" }, { status: 400 });

  const db = readDB();
  const post = db.posts.find((p) => p.id === postId);
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  const existing = db.likes.find((l) => l.postId === postId && l.userId === me.id);
  if (existing) {
    db.likes = db.likes.filter((l) => !(l.postId === postId && l.userId === me.id));
  } else {
    db.likes.push({ postId, userId: me.id });
  }
  writeDB(db);
  const count = db.likes.filter((l) => l.postId === postId).length;
  return NextResponse.json({ liked: !existing, count });
}
