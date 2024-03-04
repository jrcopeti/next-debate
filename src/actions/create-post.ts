"use server";

import { auth } from "@/auth";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(3, { message: "Must contain at least 3 characters" }),
  content: z
    .string()
    .min(10, { message: "Must contain at least 10 characters" }),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be logged in to create a post"],
      },
    };
  }
  return {
    errors: {},
  };
}
