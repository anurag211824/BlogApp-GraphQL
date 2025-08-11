/* eslint-disable @next/next/no-img-element */
"use client";
//@ts-nocheck
import { Blog } from "@/generated/prisma";
import gqlClient from "@/service/gql";
import { gql } from "graphql-tag";
import { useEffect, useState } from "react";
import Link from "next/link";
import UpdateButton from "@/components/UpdateButton";
import DeleteButton from "@/components/DeleteButton";
import AddBlogButton from "@/components/AddBlogButton";

export default function MyBlogsPage() {
  const GET_USER_BLOG = gql`
    query CurrentUserBlogs {
      currentUserBlogs {
        authorId
        content
        id
        imageUrl
        title
      }
    }
  `;

  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    const getUserBlogs = async () => {
      try {
        const data: {
          currentUserBlogs: Blog[];
        } = await gqlClient.request(GET_USER_BLOG);
        if (data.currentUserBlogs) {
          setUserBlogs(data.currentUserBlogs);
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    };
    getUserBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(userBlogs);

  return (
    <>
      <div className="min-h-screen bg-black px-4 py-10 relative">
        <div className="max-w-[1300px] mx-auto">
          <h2 className="text-2xl text-left font-bold mb-3">My Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBlogs.map((blog, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-900 p-6 rounded-lg shadow-md flex flex-col justify-between"
                >
                  <img
                    className="mb-2 h-[250px] w-full"
                    src={blog.imageUrl ?? "/default-image.png"}
                    alt="hii"
                  />
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {blog.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/blog/${blog.id}`}
                      className="text-blue-400 hover:text-blue-300 transition font-medium"
                    >
                      Read More →
                    </Link>
                    <div className="flex items-center justify-center gap-5">
                      <UpdateButton setUserBlogs={setUserBlogs} userBlogs={userBlogs} blog={blog} />
                    <DeleteButton id={blog.id} setUserBlogs={setUserBlogs} userBlogs={userBlogs} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
         <div className="fixed bottom-5 right-10">
          
          <AddBlogButton setUserBlogs={setUserBlogs} userBlogs={userBlogs} />
         </div>
      </div>
     
    </>
  );
}
