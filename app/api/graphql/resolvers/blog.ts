/* eslint-disable @typescript-eslint/ban-ts-comment */
// resolvers/blog.ts

import db from "@/service/prisma";

//@ts-ignore
export async function getBlogById(x, args) {
  try {
    const id = args.id;
    const blog = await db.blog.findUnique({
      where: {
        id,
      },
    });
    return blog;
  } catch (error) {
    console.error("Error in getBlogById:", error);
    return null;
  }
}
//@ts-ignore
export async function getBlogs() {
  try {
    //const q = args.q || "";
    const blogs = await db.blog.findMany({});
    return blogs;
  } catch (error) {
    console.error("Error in getBlogs:", error);
    return [];
  }
}
//@ts-ignore
// export async function createBlog(x, args) {
//   try {
//     const { title, content, imageUrl ,author} = args;
//     const blog = await db.blog.create({
//       //@ts-ignore
//       data: { title, content, imageUrl,author },
//     });
//     return blog;
//   } catch (error) {
//     console.error("Error in createBlog:", error);
//     return null;
//   }
// }

export async function createBlog(x, args) {
  try {
    const { title, content, imageUrl, authorId } = args;
    const blog = await db.blog.create({
      data: {
        title,
        content,
        imageUrl,
        authorId
      },
    });
    return blog;
  } catch (error) {
    console.error("Error in createBlog:", error);
    return false
  }
}
//@ts-ignore
export async function deleteBlog(x, args) {
  try {
    const { id } = args;
    const blog = await db.blog.delete({
      where: { id },
    });

    if (blog) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error in deleteBlog:", error);
    return false;
  }
}

//@ts-ignore
export async function updateBlog(x, args) {
  const { id, title, content, imageUrl } = args;

  try {
    const updateBlog = await db.blog.update({
      where: {
        id,
      },
      data: {
        title: title,
        content: content,
        imageUrl: imageUrl,
      },
    });
    if (updateBlog) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
