import { auth } from "@/auth";
import { getRole } from "@/db/queries/roles.queries";
import { empty } from "@rezonmain/utils-empty";
import { nil } from "@rezonmain/utils-nil";
import { redirect } from "next/navigation";

export default async function AdminPage() {
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

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Hi there {session.user.name}</p>
      <p>Your current role is: {role?.role}</p>
    </div>
  );
}
