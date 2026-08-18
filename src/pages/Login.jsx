import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://ignacio-server.test/api';
const AUTH_SESSION_KEY = 'furniture-dashboard-auth-session';
const LEGACY_KEYS = [
  'furniture-dashboard-auth',
  'furniture-dashboard-token',
  'furniture-dashboard-token-type',
  'furniture-dashboard-expires-at',
  'furniture-dashboard-user',
];

function readAuthSession() {
  try {
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw);
  } catch (error) {
    console.warn('Failed to parse stored auth session:', error);
    return null;
  }
}

function writeAuthSession(session) {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export function getAuthToken() {
  const session = readAuthSession();
  return session?.token || null;
}

export function isAuthenticated() {
  const session = readAuthSession();

  if (!session?.token) {
    return false;
  }

  if (session.expiresAt) {
    const expiresAt = new Date(session.expiresAt).getTime();

    if (expiresAt <= Date.now()) {
      logoutUser();
      return false;
    }
  }

  return true;
}

export async function loginUser(email, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });

    const payload = response?.data;
    const token = payload?.data?.token;

    if (!payload?.success || !token) {
      return false;
    }

    const session = {
      token,
      tokenType: payload?.data?.tokenType || 'Bearer',
      expiresAt: payload?.data?.expiresAt || null,
      user: payload?.data?.user || null,
      authenticated: true,
    };

    writeAuthSession(session);
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
}

export function logoutUser() {
  localStorage.removeItem(AUTH_SESSION_KEY);
  LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('admin@ignacio.test');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const isValidLogin = await loginUser(email, password);

    if (isValidLogin) {
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo, { replace: true });
      return;
    }

    setError('Invalid email or password. Please check the account details and try again.');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f3ee] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[28px] border border-[#e6e0d7] bg-white p-8 shadow-[0_20px_60px_rgba(52,74,34,0.12)]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#344a22] text-xl font-bold text-white">
            I
          </div>
          <h1 className="text-2xl font-semibold text-[#1e1e1e]">IGNACIO Furnitures</h1>
          <p className="mt-2 text-sm text-stone-500">Sign in to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-stone-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-[#344a22] focus:bg-white"
              placeholder="admin@ignacio.test"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-stone-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-[#344a22] focus:bg-white"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#344a22] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2a371b] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
