/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";

import gqlClient from "@/service/gql";
import { gql } from "graphql-tag";
import { useRouter } from "next/navigation";
const DeleteButton = ({ id }) => {
  const DELETE_BLOG = gql`
    mutation DeleteBlog($id: String!) {
      deleteBlog(id: $id)
    }
  `;

 const handleDelete = async ()=>{
     const blog = await gqlClient.request(DELETE_BLOG, {
     id:id
    });
    
    router.refresh()
  console.log(blog);
  
 }
  const router =useRouter()
  return <button className="bg-red-500 px-2 py-1 text-white" onClick={handleDelete}>Delete Blog</button>;
};

export default DeleteButton;
