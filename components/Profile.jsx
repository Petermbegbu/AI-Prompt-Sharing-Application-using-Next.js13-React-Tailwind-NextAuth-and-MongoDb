"use client";

import PromptCard from "./PromptCard";

const Profile = (props) => {
  const { name, desc, posts, handleEdit, handleDelete } = props;

  return (
    <section className="w-full">
      <h1 className="title_header blue_gradient text-left">
        {name} <span>Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {posts.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
