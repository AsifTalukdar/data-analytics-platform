'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Data Analytics Platform</h1>
        <p className="text-gray-500 mb-8">Sign in to upload and analyze your data</p>

        <button
          onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000' })}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 shadow-sm transition mb-4"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <p className="text-xs text-gray-400 mt-6">
          Your data is private and secure 🔒
        </p>
      </div>
    </main>
  );
}