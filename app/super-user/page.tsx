import { auth } from "@/auth";
import { UserRoles } from "@/constants/user.enums";
import { getRole } from "@/db/queries/roles.queries";
import { empty } from "@rezonmain/utils-empty";
import { nil } from "@rezonmain/utils-nil";
import { redirect } from "next/navigation";

export default async function SuperUserPage() {
  const session = await auth();
  if (nil(session)) {
    redirect("/api/auth/signin?callbackUrl=/super-user");
  }

  if (empty(session.user?.email)) {
    return <p>403</p>;
  }

  const role = await getRole(session.user.email);

  if (role?.role !== UserRoles.SUPER_USER) {
    return <p>403</p>;
  }

  return (
    <div>
      <h1>Super User Page</h1>
      <p>Hi there {JSON.stringify(session)}</p>
    </div>
  );
}
