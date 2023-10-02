"use client";

import Link from "next/link";

const Form = (props) => {
  const { type, post, setPost, isSubmitting, handleSubmit } = props;

  return (
    <section className="flex flex-col justify-start items-start">
      <h1 className="title_header blue_gradient text-left">{type} Post</h1>

      <p className="desc text-left max-w-md">
        {type} and Share amazing prompt with the world, and let your imagination
        run wild with any AI-powered platform
      </p>

      <form
        className="my-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            className="form_textarea"
            placeholder="Write your prompt here..."
            required
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag (#product, #webdevelopment, #idea)
          </span>
          <input
            className="form_input"
            placeholder="#tag"
            required
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
          />
        </label>

        <div className="flex justify-end items-center gap-5">
          <Link
            href="/"
            className="text-gray-500 text-sm hover:text-orange-700 hover:font-semibold"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white hover:bg-orange-700"
          >
            {isSubmitting ? "Submitting" : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
