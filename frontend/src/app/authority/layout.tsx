"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthorityLayout({ children }: { children: React.ReactNode }) {
  const role = useStore(state => state.role);
  const router = useRouter();

  useEffect(() => {
    if (role !== 'EMERGENCY_AUTHORITY') {
      router.push('/login');
    }
  }, [role, router]);

  if (role !== 'EMERGENCY_AUTHORITY') return null;

  return <AppLayout role="AUTHORITY">{children}</AppLayout>;
}
