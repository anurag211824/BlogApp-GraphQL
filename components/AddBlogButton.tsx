/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";

import React, { useState } from "react";
import gqlClient from "@/service/gql";
import { gql } from "graphql-tag";
import { IoIosAddCircleOutline } from "react-icons/io";

const AddBlogButton = ({ setUserBlogs, userBlogs }) => {
  const [open, setOpen] = useState(false);
  const [title, setTittle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const CREATE_BLOG = gql`
    mutation CreatBlog($title: String!, $content: String!, $imageUrl: String) {
      createBlog(title: $title, content: $content, imageUrl: $imageUrl) {
        title
        content
        imageUrl
      }
    }
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserBlogs([
      ...userBlogs,
      {
        id: Date.now(),
        title: title,
        content: content,
        imageUrl: imageUrl,
      },
    ]);
    const blog = await gqlClient.request(CREATE_BLOG, {
      title: title,
      content: content,
      imageUrl: imageUrl,
    });
    console.log(blog);

    setTittle("");
    setContent("");
    setImageUrl("");
    setOpen(false);
  };

  return (
    <div>
      {/* Button to open the form */}
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 px-4 py-2 rounded-full text-5xl"
      >
        <IoIosAddCircleOutline />
      </button>

      {/* Form Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 relative">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-white hover:text-red-500 text-lg"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-white text-center">
              Create Your Blog
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Title:
                </label>
                <input
                  name="title"
                  value={title}
                  onChange={(e) => setTittle(e.target.value)}
                  id="title"
                  type="text"
                  placeholder="Enter a title"
                  className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Content:
                </label>
                <textarea
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  id="content"
                  placeholder="Enter your content"
                  rows="4"
                  className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Image URL:
                </label>
                <input
                  name="image"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  id="image"
                  type="text"
                  placeholder="Enter an image URL"
                  className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Create Blog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBlogButton;
