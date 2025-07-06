'use client';
import { ID, AppwriteException } from 'appwrite';
import { useEffect, useState } from 'react';
import { useUser } from '../lib/stores/hooks/useUser';
import { useAuthStore } from '../lib/stores/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';
import { account } from '../lib/appwrite';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [message, setMessage] = useState('');
  const [unverifiedEmail, setUnverifiedEmail] = useState('');

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: userData, isLoading, refetch } = useUser();
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else {
      clearUser();
    }
  }, [userData, setUser, clearUser]);

  const handleRegister = async () => {
  if (!email || !password) {
    setErrorMsg('Please fill in both fields.');
    return;
  }

  try {
    // Step 1: Create the account
    await account.create(ID.unique(), email, password);

    // Step 2: Immediately log the user in
    await account.createEmailPasswordSession(email, password);

    // Step 3: Send verification email (now that the user is authenticated)
    await account.createVerification(`${window.location.origin}/verify-email`);

    // Step 4: Set feedback and update states
    Cookies.set('user', 'true', { path: '/' });
    const { data: freshUser } = await refetch();
    if (freshUser) setUser(freshUser);

    setTimeout(() => {
      router.push('/verify-email');
    }, 4000);

    setUnverifiedEmail(email);
    setMessage(`Verification email sent to ${email}. Please check your inbox. You would be redirected the email verification page.`);
    setErrorMsg('');
  } catch (error) {
    if (error instanceof AppwriteException) {
      setErrorMsg(error.message);
    }
  }
};


  const handleLogin = async () => {
    try {
      await account.createEmailPasswordSession(email, password);
      Cookies.set('user', 'true', { path: '/' });
      const { data: freshUser } = await refetch();
      if (freshUser) {
        setUser(freshUser);
      }
      router.push('/dashboard');
    } catch (error) {
      if (error instanceof AppwriteException) {
        setErrorMsg(error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      clearUser();
      queryClient.removeQueries({ queryKey: ['user'] });
      queryClient.clear();
      Cookies.remove('user');
      await refetch();
    } catch (error) {
      if (error instanceof AppwriteException) {
        setErrorMsg('Logout failed.');
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      await account.createVerification(`${window.location.origin}/verify-email`);
      setMessage(`A new verification email has been sent to ${unverifiedEmail || email}`);
    } catch (error) {
      if (error instanceof AppwriteException) {
        setErrorMsg(error.message);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Welcome to Hireflow</h1>

        {errorMsg && (
          <div className="text-red-600 bg-red-100 p-2 rounded text-sm text-center">{errorMsg}</div>
        )}
        {message && (
          <div className="text-green-600 bg-green-100 p-2 rounded text-sm text-center">{message}</div>
        )}

        {!userData ? (
          <>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg('');
                }}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4">
              <button
                onClick={handleRegister}
                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              >
                Register
              </button>
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            </div>

            {unverifiedEmail && (
              <div className="pt-4 text-sm text-center text-gray-600">
                Didn’t get the email?{' '}
                <button
                  className="text-blue-600 underline hover:text-blue-800"
                  onClick={handleResendVerification}
                >
                  Resend Verification
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-green-700 font-medium">Welcome, {userData.email}</p>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        )}

        <div className="mt-6 border-t pt-4 text-center text-sm text-gray-600">
          Ready to build your professional profile?
          <Link
            href="/"
            className="block mt-2 text-blue-600 font-semibold hover:underline"
          >
            Go to Resume & Cover Letter Generator →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
