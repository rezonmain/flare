import { auth } from "@/auth";
import { UserRoles } from "@/constants/user.enums";
import { getRole, insertRole } from "@/db/queries/roles.queries";
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
      <p>Hi there {session.user.name}</p>

      <hr />
      <form action={insertRole} className="p-5 flex flex-col gap-5 items-start">
        <fieldset className="flex flex-col gap-5">
          <legend>Insert Role</legend>
          <label>
            Email:
            <input
              required
              type="email"
              name="email"
              className="border border-black"
            />
          </label>
          <label>
            Role:
            <select required name="role">
              <option value={UserRoles.DEVELOPER}>Developer</option>
              <option value={UserRoles.SUPER_USER}>Super User</option>
            </select>
          </label>
        </fieldset>
        <button className="border border-black p-2" type="submit">
          Add user
        </button>
      </form>
    </div>
  );
}
