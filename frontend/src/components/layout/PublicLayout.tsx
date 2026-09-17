import React from 'react';
import Link from 'next/link';
import { GlobalHeader } from './GlobalHeader';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <GlobalHeader />
      <main className="flex-1 flex flex-col w-full max-w-none mx-auto p-4 sm:p-6 lg:p-8 xl:px-12">
        {children}
      </main>
    </div>
  );
}
