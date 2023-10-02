import PromptCard from "./PromptCard";

const Profile = (props) => {
  const { name, desc, posts, handleEdit, hamdleDelete } = props;

  return (
    <section className="w-full">
      <h1 className="title_header text-left">
        {name} <span className="text-orange-600">Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {posts.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            hamdleDelete={() => hamdleDelete && hamdleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
