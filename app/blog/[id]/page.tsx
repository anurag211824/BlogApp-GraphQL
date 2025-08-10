/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import gqlClient from "@/service/gql";
import { gql } from "graphql-tag";
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
    query Blog($blogId: String) {
      blog(id: $blogId) {
        title
        content
      }
    }
  `;

  const data = await gqlClient.request(GET_BLOG, {
    blogId: id,
  });
  //@ts-ignore
  console.log(data.blog);

  return (
    <div>
      <p>{data.blog.content}</p>
      <p>{data.blog.title}</p>
    </div>
  );
}
