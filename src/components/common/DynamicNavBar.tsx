'use client';

import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function DynamicNavBar({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="flex space-x-8 items-center">
      <MoveLeft size={30} width={30} className="cursor-pointer" onClick={() => router.back()} />
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
}

export default DynamicNavBar;
