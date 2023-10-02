"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "../../components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resp = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await resp.json();

        setPosts(data);
      } catch (error) {
        console.log(
          "Error fetching posts in profile page",
          error.response.data
        );
      }
    };

    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/edit-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this Prompt?"
    );

    if (confirmDelete) {
      try {
        await fetch(`api/prompt/${post._id}`, { method: "DELETE" });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      posts={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
