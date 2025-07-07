'use client'
import { useState } from "react";
import { account } from "../lib/appwrite";
import { AppwriteException } from "appwrite";

export default function ForgotPassword() {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'sent'>('idle');
    const [email, setEmail] = useState('')
    
    const handleSubmit = async () => {
        if (!email) {
            setMessage('Email is required');
            setStatus('error')
            return;
        }
        try {
            setStatus('loading');
            await account.createRecovery(email, `${window.location.origin}/reset-password`);
            setStatus('sent');
            setMessage(`✅ A password reset link has been sent to ${email}`);
        } catch (error) {
            if (error instanceof AppwriteException) {
                setMessage(`❌ ${error.message}`);
                setStatus('error')
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>

            {message && (
            <div className={`text-center mb-4 text-sm ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                {message}
            </div>
            )}

            <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <button
            disabled={status === 'loading'}
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
            {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
            </button>
        </div>
        </div>
    );
}