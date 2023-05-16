import Feed from "@/components/Feed";

const Home = () => {
  return (
    <section className="flex flex-col w-full">
      <h1 className="mt-5 font-extrabold leading-tight text-center text-4xl sm:text-5xl">
        Discover and Share
        <br />
        <span className="orange_gradient">AI-Powered Prompts</span>
      </h1>

      <p className="mt-5 text-center text-lg text-gray-600 sm:text-xl max-w-2xl m-auto">
        PUM is an open-source AI prompting tool for modern world to discover,
        create and share creative prompts
      </p>

      {/* Feed */}
      <Feed />
    </section>
  );
};

export default Home;
