import { db } from "@/db";
import { cache } from "react";
import { Comment } from "@prisma/client";

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

export const fetchCommentsByPostId = cache((
  postId: string
): Promise<CommentWithAuthor[]> => {
  console.log("fetchCommentsByPostId");
  return db.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
});
