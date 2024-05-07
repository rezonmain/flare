"use client";
import { useCallback, useMemo } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const useQS = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const update = useCallback(
    (q: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [name, value] of Object.entries(q)) {
        if (value === undefined || value === null) {
          params.delete(name);
          continue;
        }
        params.set(name, value);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  const queryParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );
  return [queryParams, update] as const;
};

export { useQS };
