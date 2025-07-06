'use client'

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AppwriteException } from 'appwrite';
import { account } from '../lib/appwrite';
import { useUser } from '../lib/stores/hooks/useUser';

const VerifyEmailContent = () => {
    const { data: userData } = useUser();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
      if (userData?.emailVerification) {
        router.push('/dashboard')
      }
    }, [router, userData]);

    useEffect(() => {
        const secret = searchParams.get('secret');
        const userId = searchParams.get('userId');

        if (!userId || !secret) {
        setStatus('error');
        setMessage("Invalid or missing verification link. Please check your mail. You can't perform any actions without verifying your email.");
        return;
        };

        const verifyEmail = async () => {
            try {
                await account.updateVerification(userId, secret);
                setStatus('success');
                setMessage('✅ Email verified successfully! You would be redirected to log in.');

                setTimeout(() => {
                    router.push('/')
                }, 3000)
            } catch (error) {
                if (error instanceof AppwriteException) {
                    setStatus('error');
                    setMessage(`❌ ${error.message}`);
                }
            }
        };
        verifyEmail();
    }, [searchParams, router])
    
    return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className={status === 'success' ? 'text-green-600' : 'text-red-600'}>
          {message || 'Verifying...'}
        </p>
        {status === 'success' && <p className="mt-2 text-sm text-gray-600">Redirecting you in a moment...</p>}
      </div>
    </div>
  );
}
export default function VerifyEmail() {
  return (
    <Suspense fallback={<div className="min-h-screen flex justify-center items-center">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}