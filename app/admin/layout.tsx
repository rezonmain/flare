import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { nil } from "@rezonmain/utils-nil";
import { empty } from "@rezonmain/utils-empty";
import { auth } from "@/auth";
import { getRole } from "@/db/queries/roles.queries";

export const metadata: Metadata = {
  title: "Flare - admin dashboard",
  description:
    "You should probably not be here, but if you are, welcome to the admin dashboard.",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (nil(session)) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  if (empty(session.user?.email)) {
    return <p>403</p>;
  }

  const role = await getRole(session.user.email);

  if (empty(role)) {
    return <p>403</p>;
  }

  return children;
}
