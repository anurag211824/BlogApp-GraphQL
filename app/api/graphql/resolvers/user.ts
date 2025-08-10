/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import db from "@/service/prisma";
import { cookies } from "next/headers";

export async function signUpUser(x, args) {
  const { email, password, name } = args;
  const cookieStore = await cookies()
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return false;
    }
    await db.user.create({
      data: {
        email,
        password,
        name,
      },
    });
    cookieStore.set("token",user.id)
    return true;
  } catch (error) {
    console.error("Error in signup:", error);
    return false;
  }
}

export async function signInUser(x, args) {
  const { email, password } = args;
  const cookieStore = await cookies()
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.password !== password) {
      return false;
    }
    cookieStore.set("token",user.id)
    return true;
  } catch (error) {
    console.error("Error in signin:", error);
    return null;
  }
}
