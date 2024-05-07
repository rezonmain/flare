import { Suspense } from "react";
import { getDBVersion } from "@/db/queries/version.queries";

export default async function BuildInfoPage() {
  const version = await getDBVersion();

  return (
    <div>
      <p>Build info: 333</p>
      <Suspense>
        <p>DB Version: {version} </p>
      </Suspense>
    </div>
  );
}
