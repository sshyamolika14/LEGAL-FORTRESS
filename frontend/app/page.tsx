"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically forwards anyone who visits the root URL straight to your secure vault door
    router.push("/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="animate-pulse text-amber-500/50 text-xs tracking-widest font-mono">
        INITIALISING SECURE HANDSHAKE...
      </div>
    </div>
  );
}