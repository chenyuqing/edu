'use client';

import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('./page.client'), {
  loading: () => <div>Loading...</div>,
});

export default function LoginPage() {
  return <LoginForm />;
}
