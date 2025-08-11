/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
import { createContext, useEffect, useState } from "react";
import gqlClient from "@/service/gql";
import { gql } from "graphql-tag";
import { User } from "@/generated/prisma";

type AppContextType = {
  user: User | null;
  setUser: ((x: User | null ) => void )| null
};

export const AppContext = createContext<AppContextType>({
    user:null,
    setUser:null
});
const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      email
      id
      name
    }
  }
`;
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    email: "",
    id: "",
    name: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await gqlClient.request(CURRENT_USER);
        if (data.currentUser) {
          setUser(data.currentUser);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
