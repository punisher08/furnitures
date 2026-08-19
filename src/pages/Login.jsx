import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
          <div class="flex items-center gap-3 justify-center"><div class="relative flex h-[58px] w-[42px] items-end justify-center"><svg viewBox="0 0 50 70" fill="none" class="h-[58px] w-[42px]"><path d="M13 63V28C13 17 19 8 28 8C37 8 43 16 43 27V63" stroke="#344a22" stroke-width="1.5"></path><path d="M13 43H40C43 43 45 45 45 48V63H8V48C8 45 10 43 13 43Z" stroke="#344a22" stroke-width="1.5"></path><path d="M26 43C25 32 26 23 30 16" stroke="#344a22" stroke-width="1.3"></path><path d="M27 29C21 27 19 23 20 19C25 20 28 23 27 29Z" stroke="#344a22" stroke-width="1.2"></path><path d="M28 24C32 22 34 18 33 14C29 15 27 19 28 24Z" stroke="#344a22" stroke-width="1.2"></path><path d="M27 35C22 34 19 31 19 27C24 28 27 30 27 35Z" stroke="#344a22" stroke-width="1.2"></path></svg></div><div class="leading-none"><span class="block font-serif text-[28px] lg:text-[38px] font-semibold tracking-tight text-[#344a22]">IGNACIO</span><span class="mt-1 block text-[8px] font-medium uppercase tracking-[0.45em] text-[#789052]">Natural Living</span></div></div>
          <p className="mt-2 text-sm text-stone-500">Sign in to access the dashboard or <br/><span onClick={()=>{navigate('/')}} class="text-blue-900 animate-pulse text-md cursor-pointer">continue as guest</span>  </p>
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
              placeholder="email"
              required
            />
          </div>

       <div>
  <label htmlFor="password" className="mb-2 block text-sm font-medium text-stone-700">
    Password
  </label>
  <div className="relative">
    <input
      id="password"
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      className="w-full rounded-xl border border-stone-300 bg-stone-50 py-3 pl-4 pr-11 text-sm text-stone-800 outline-none transition focus:border-[#344a22] focus:bg-white"
      placeholder="••••••••"
      required
    />
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none"
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? (
        <EyeOff className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </button>
  </div>
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
