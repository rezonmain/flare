"use client";
import { Toaster } from "@/components/ui/sonner";
import { TheSheet } from "@/components/the-sheet/the-sheet";
import { TheDrawer } from "@/components/the-drawer/the-drawer";

function Globals() {
  return (
    <>
      <Toaster position="top-center" />
      <TheSheet />
      <TheDrawer />
    </>
  );
}

export { Globals };
