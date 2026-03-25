"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide navbar ONLY on homepage
  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}