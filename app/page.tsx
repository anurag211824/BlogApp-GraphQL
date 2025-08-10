/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import DeleteButton from "@/components/DeleteButton";
import UpdateButton from "@/components/UpdateButton";
import { gql, GraphQLClient } from "graphql-request";
import Link from "next/link";
const gqlClient = new GraphQLClient("http://localhost:3000/api/graphql");
const GET_BLOGS = gql`
  query Blog {
    blogs {
      title
      content
      id
      imageUrl
    }
    # blog(id:"6895c02d8308de5307f9510d") {
    #   title
    #   content
    # }
  }
`;
export default async function Home() {
  const data = await gqlClient.request(GET_BLOGS);
  //console.log(data);

  return (
 <>
  <div className="min-h-screen bg-black px-4 py-10">
    <h2 className="text-2xl text-center font-bold mb-3">Your Blogs</h2>
    <div className="max-w-[1300px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.blogs.map((blog, index) => {
          return (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-lg shadow-md flex flex-col justify-between"
            > 

              <img className="mb-2 h-[250px] w-full" src={ blog.imageUrl} alt="hii" />
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
              <UpdateButton blog = {blog}/>
              <DeleteButton id = {blog.id} />
             </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  
</>

  );
}
