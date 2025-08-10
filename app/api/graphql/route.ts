// api/graphql/route.ts
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";
import {getBlogById, getBlogs,createBlog, deleteBlog, updateBlog } from "./resolvers/blog";
import { signInUser, signUpUser } from "./resolvers/user";

const typeDefs = gql`
  type Query {
    blog(id: String): Blog
    blogs(q:String): [Blog]
  }
  type Mutation {
    createBlog(title:String!,content:String!,imageUrl:String,authorId:ID!):Blog!
    deleteBlog(id:String):Boolean!
    updateBlog(id:String!,title:String,content:String,imageUrl:String):Boolean!
    signUpUser(email:String!,name:String!,password:String!):Boolean!
    signInUser(email:String!,password:String):Boolean!
  }

  type Blog {
    id: String
    title: String
    content: String
    imageUrl: String
    authorId:ID!
  }
`;

const resolvers = {
  Query: {
    blog: getBlogById,
    blogs: getBlogs
  },
  Mutation: {
    createBlog,
    deleteBlog ,
    updateBlog,
    signUpUser,
    signInUser
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
