// api/graphql/route.ts
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";
import {
  getBlogById,
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  currentUserBlogs,
  getBlogUser,
} from "./resolvers/blog";
import { getUserBlogs, signInUser, signUpUser } from "./resolvers/user";
import { getUserFromCookies } from "@/service/session";

const typeDefs = gql`
  type Query {
    blog(id: String): Blog
    blogs(q: String): [Blog]
    currentUser: User
    currentUserBlogs: [Blog]
  }
  type Mutation {
    createBlog(title: String!, content: String!, imageUrl: String): Blog!
    deleteBlog(id: String): Boolean!
    updateBlog(
      id: String!
      title: String
      content: String
      imageUrl: String
    ): Boolean!
    signUpUser(email: String!, name: String!, password: String!): Boolean!
    signInUser(email: String!, password: String): Boolean!
  }

  type User {
    id: String
    email: String
    name: String
    blogs: [Blog]
  }

  type Blog {
    id: String
    title: String
    content: String
    imageUrl: String
    authorId: ID!
    author: User
  }
`;

const resolvers = {
  Query: {
    blog: getBlogById,
    blogs: getBlogs,
    currentUser: getUserFromCookies,
    currentUserBlogs,
  },
  Mutation: {
    createBlog,
    deleteBlog,
    updateBlog,
    signUpUser,
    signInUser,
  },
  Blog: {
    author: getBlogUser,
  },
  User: {
    blogs: getUserBlogs,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
