'use client'

import { AppwriteException } from "appwrite";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { account } from "../lib/appwrite";

export default function resetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [status, setStatus] = useState<'idle' | 'error' | 'success' | 'submitting'>('idle')
    
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');

    useEffect(() => {
        if (!userId || !secret) {
            setStatus('error');
            setMessage('Invalid or expired reset link');
            return;
        }
    }, [userId, secret])

    const handleReset = async () => {
        if (password != confirm) {
            setStatus('error');
            setMessage('Passwords do not match.');
            return;
        };

        try {
            setStatus('submitting');
            await account.updateRecovery(userId!, secret!, password);
            setStatus('success');
            setMessage('✅ Password successfully reset. Redirecting to login...');
            setTimeout(() => router.push('/auth'), 3000)
        } catch (error) {
            if (error instanceof AppwriteException) {
                setMessage(`${error.message}`);
                setStatus('error');
            }
        }
    }
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>

        {message && (
          <div className={`text-center mb-4 text-sm ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </div>
        )}

        <input
          type="password"
          placeholder="New password"
          className="w-full border border-gray-300 px-4 py-2 rounded mb-4 focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="w-full border border-gray-300 px-4 py-2 rounded mb-4 focus:ring-2 focus:ring-blue-500"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          disabled={status === 'submitting'}
          onClick={handleReset}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          {status === 'submitting' ? 'Resetting...' : 'Reset Password'}
        </button>
      </div>
    </div>
  );
}