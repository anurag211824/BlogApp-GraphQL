import { cookies } from "next/headers";
import db from "./prisma";

export async function getUserFromCookies() {
  try {
    const cookieStore = await cookies();
    const id = cookieStore.get("token")?.value;
    if (!id) {
      return null;
    }
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);

    return null;
  }
}
