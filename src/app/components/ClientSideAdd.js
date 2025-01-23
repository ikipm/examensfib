"use client";

import dynamic from 'next/dynamic';

const Add = dynamic(() => import('./Add'), {
  ssr: false, // Disable server-side rendering
});

export default function ClientSideAdd() {
  return <Add />;
}