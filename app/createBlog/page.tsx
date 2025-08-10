/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
import React, { useState } from "react";
import gqlClient from "@/service/gql";
import { gql } from "graphql-tag";
const CreateBlogpage = () => {
  const CREATE_BLOG = gql`
  mutation CreatBlog($title: String!, $content: String!, $authorId: ID!, $imageUrl: String) {
  createBlog(title: $title, content: $content, authorId: $authorId, imageUrl: $imageUrl) {
    title
    content
    authorId
    imageUrl
  }
}
  `;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = await gqlClient.request(CREATE_BLOG, {
      title: title,
      content: content,
      imageUrl:imageUrl,
      authorId:authorId
    });
    console.log(blog);
    
    setTittle("")
    setContent("")
    alert("Blog Created");
  };
  const [title, setTittle] = useState("");
  const [content, setContent] = useState("");
   const [authorId, setAuthorId] = useState("");
   const [imageUrl,setImageUrl] =  useState("")
  return (
 <div className="min-h-screen flex items-center justify-center bg-black px-4">
  <form
    onSubmit={handleSubmit}
    className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
  >
    <h2 className="text-2xl font-bold text-white text-center">
      Create Your Blog
    </h2>

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
        Image-Url:
      </label>
      <input
        name="image"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        id="image"
        type="text"
        placeholder="Enter a imageUrl"
        className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div>
      <label
        htmlFor="authorid"
        className="block text-sm font-medium text-gray-300 mb-1"
      >
        Author-Id:
      </label>
      <input
        name="authorid"
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
        id="authorid"
        type="text"
        placeholder="Enter a authorId"
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


  );
};

export default CreateBlogpage;
