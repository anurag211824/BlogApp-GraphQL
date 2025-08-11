/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
import { MdDelete } from "react-icons/md";
import gqlClient from "@/service/gql";
import { gql } from "graphql-tag";
import { useRouter } from "next/navigation";
const DeleteButton = ({ id, setUserBlogs, userBlogs }) => {
  const DELETE_BLOG = gql`
    mutation DeleteBlog($id: String!) {
      deleteBlog(id: $id)
    }
  `;

  const handleDelete = async () => {
   const newBlogs = userBlogs.filter((blog)=>blog.id != id)
   setUserBlogs(newBlogs)
    const blog = await gqlClient.request(DELETE_BLOG, {
      id: id,
    });
    router.refresh();
    console.log(blog);
  };
  const router = useRouter();
  return (
    <button className="text-2xl text-red-500" onClick={handleDelete}>
      <MdDelete />
    </button>
  );
};

export default DeleteButton;
