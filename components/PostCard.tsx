"use client";

import { useState } from "react";
import Link from "next/link";

export default function PostCard({
  post,
  initialLiked = false,
  initialLikeCount = 0,
}: {
  post: any;
  initialLiked?: boolean;
  initialLikeCount?: number;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialLikeCount);
  const [busy, setBusy] = useState(false);

  async function toggleLike() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setLiked(data.liked);
        setCount(data.count);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="rounded-2xl border border-line bg-surface p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-line text-sm font-medium">
          {post.author?.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.author.avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            (post.author?.displayName || "?").slice(0, 1).toUpperCase()
          )}
        </div>
        <div>
          <Link href={`/profile/${post.author?.username}`} className="font-medium hover:underline">
            {post.author?.displayName}
          </Link>
          <p className="text-xs text-mute">@{post.author?.username}</p>
        </div>
      </div>
      {post.body && <p className="whitespace-pre-wrap leading-relaxed">{post.body}</p>}
      {post.mediaUrl && post.type === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.mediaUrl} alt="" className="mt-3 max-h-[520px] w-full rounded-xl object-cover" />
      )}
      {post.mediaUrl && post.type === "video" && (
        <video src={post.mediaUrl} controls className="mt-3 w-full rounded-xl" />
      )}
      <div className="mt-3 flex items-center gap-4 border-t border-line pt-3">
        <button
          onClick={toggleLike}
          disabled={busy}
          className={`text-sm ${liked ? "text-accent" : "text-mute hover:text-white"}`}
        >
          {liked ? "♥" : "♡"} {count}
        </button>
      </div>
    </article>
  );
}
