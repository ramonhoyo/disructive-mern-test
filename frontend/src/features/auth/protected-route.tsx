"use client";
import React, { useEffect } from 'react';
import { useUser } from '../users/hooks/use-user';
import { redirect } from 'next/navigation';

export default function ProtectedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, isLoading } = useUser();

  useEffect(() => {
    if (!data && !isLoading) {
      redirect('/login');
    }
  }, [data]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>
}
