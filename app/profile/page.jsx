"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "../../components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resp = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await resp.json();

        console.log("resp", resp);
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

  const handleEdit = () => {};

  const handleDelete = async () => {};

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
