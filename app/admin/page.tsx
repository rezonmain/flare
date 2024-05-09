import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { nil } from "@rezonmain/utils-nil";
import { InfoIcon } from "lucide-react";
import Link from "next/link";

export default async function AdminPage() {
  const session = await auth();
  if (nil(session)) {
    return <p>403</p>;
  }
  return (
    <>
      <nav className="w-full bg-pink-500 p-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Admin dashboard
        </h1>
        <div className="flex items-center justify-between">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Hi there <strong>{session.user?.name}</strong>
          </p>
          <Link href="/api/auth/signout">
            <Button variant="link">Logout?</Button>
          </Link>
        </div>
      </nav>
      <main className="p-3 max-w-screen-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Demo mode</CardTitle>
            <CardDescription>
              Enter the demo mode map to place flares wherever you need
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-row gap-4">
              <InfoIcon size={32} />
              <p>
                The flares you place will be visible to all users, you will also
                be able to delete them, be careful deleting users flares
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Link href="/admin/demo-map">Enter demo mode</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
