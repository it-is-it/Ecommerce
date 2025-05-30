import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOption";

export async function currentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}
