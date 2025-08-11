/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
// @ts-nocheck
import { MdUpdate } from "react-icons/md";
import React, { useState } from 'react'
import gqlClient from "@/service/gql";
import { gql } from "graphql-tag";
import { useRouter } from "next/navigation";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const UpdateButton = ({blog}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: blog.title,
    content: blog.content,
    imageUrl: blog.imageUrl
  })

const UPDATE_BLOG = gql`
mutation UpdateBlog($id: String!, $title: String, $content: String, $imageUrl: String) {
  updateBlog(id: $id, title: $title, content: $content, imageUrl: $imageUrl)
}
`;


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = await gqlClient.request(UPDATE_BLOG,{
        id:blog.id,
        title:form.title,
        content:form.content,
        imageUrl:form.imageUrl
    })
    //@ts-ignore
    if(data?.updateBlog){
        alert("Blog Upadted")
    }
    router.refresh()
    setOpen(false)
  }

  return (
    <>
      <button
       className="text-2xl text-blue-500"
        onClick={() => setOpen(true)}
      >
      <MdUpdate />
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[800px] h-auto relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4">Update Blog</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
                required
              />
              <textarea
                name="content"
                placeholder="Content"
                value={form.content}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
                required
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default UpdateButton
