/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import gqlClient from "@/service/gql";
import { gql } from "graphql-tag";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const p = await params;
  const id = p.id;
  const GET_BLOG = gql`
    query blogById($blogId: String) {
      blog(id: $blogId) {
        title
        imageUrl
        content
        author {
          name
          email
        }
      }
    }
  `;

  const data = await gqlClient.request(GET_BLOG, {
    blogId: id,
  });

  //@ts-ignore
  console.log(data.blog);

  const { blog } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative">
        {/* Hero Image */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img 
            src={blog?.imageUrl} 
            alt={blog?.title}
            className="w-full h-full object-fill"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 ">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {blog?.title}
            </h1>
            
            {/* Author Info */}
            <div className="flex items-center space-x-4 text-white/90 ">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center font-bold text-white">
                {blog?.author.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-lg">{blog?.author.name}</p>
                <p className="text-white/70">{blog?.author.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full min-h-[30vh] mx-auto px-6 py-12 md:py-16 bg-gray-900">
        <article className="prose prose-lg md:prose-xl max-w-none">
          <div 
            className="text-white leading-relaxed space-y-6 text-center"
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.75',
            }}
          >
            {blog?.content.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index} className="mb-6 first:mt-0">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </article>

        {/* Author Card */}
        {/* <div className="mt-16 p-8 bg-gray-900 rounded-2xl shadow-lg border border-gray-900">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-xl">
              {blog.author.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                About the Author
              </h3>
              <p className="text-lg font-semibold text-white mb-1">
                {blog.author.name}
              </p>
              <p className="text-gray-300">
                {blog.author.email}
              </p>
            </div>
          </div>
        </div> */}

        {/* Navigation Link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blogs
          </Link>
        </div>
      </div>

      {/* Floating Elements for Visual Appeal */}
      <div className="fixed top-20 right-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl -z-10 animate-pulse" />
      <div className="fixed bottom-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl -z-10 animate-pulse delay-1000" />
    </div>
  );
}