"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const role = useStore(state => state.role);
  const router = useRouter();

  useEffect(() => {
    if (role !== 'ADMIN') {
      router.push('/login');
    }
  }, [role, router]);

  if (role !== 'ADMIN') return null;

  return <AppLayout role="ADMIN">{children}</AppLayout>;
}
