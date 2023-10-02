"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Form from "@/components/Form";

const CreatePrompt = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const { data: session } = useSession();
  const router = useRouter();

  const handleCreatePrompt = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const resp = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          _userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (resp.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Prompt Submit error", error.response.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        isSubmitting={isSubmitting}
        handleSubmit={handleCreatePrompt}
      />
    </div>
  );
};

export default CreatePrompt;
