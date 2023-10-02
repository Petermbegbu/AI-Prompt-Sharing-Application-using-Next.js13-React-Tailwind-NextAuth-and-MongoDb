"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/components/Form";

const EditPrompt = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const router = useRouter();

  useEffect(() => {
    const getPrompt = async () => {
      const resp = await fetch(`/api/prompt/${promptId}`);

      const data = await resp.json();

      setPost({ prompt: data.prompt, tag: data.tag });
    };

    if (promptId) getPrompt();
  }, [promptId]);

  const handleEditPrompt = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (!promptId) return alert("Prompt Id not found!!");

    try {
      const resp = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (resp.ok) {
        router.push("/profile");
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
        type="Edit"
        post={post}
        setPost={setPost}
        isSubmitting={isSubmitting}
        handleSubmit={handleEditPrompt}
      />
    </div>
  );
};

export default EditPrompt;
