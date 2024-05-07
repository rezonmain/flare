import { getDBVersion } from "@/db/queries";
import { Suspense } from "react";

export default async function BuildInfoPage() {
  const [version] = await getDBVersion();

  return (
    <div>
      <p>Build info: 333</p>
      <Suspense>
        <p>DB Version: {version.info}</p>
      </Suspense>
    </div>
  );
}
