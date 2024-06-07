"use client";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { login } from './auth.api';
import { updateToken } from '@/src/helpers/axios-instance';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: login
  })

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginMutation.mutate(username);
  };

  useEffect(() => {
    if (loginMutation.data) {
      updateToken(loginMutation.data.token);
      queryClient.setQueryData(['user/me'], loginMutation.data.user);
      redirect('/');
    }
  }, [loginMutation.data]);

  return (
    <main>
      <h1>Login from</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </main>
  );
}
