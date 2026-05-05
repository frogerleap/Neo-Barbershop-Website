import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NeoButton from '../components/ui/NeoButton';
import NeoInput from '../components/ui/NeoInput';
import { useAuthStore } from '../store/authStore';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setLoading, isLoading } = useAuthStore();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const from = (location.state as { from?: string })?.from || '/';

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.email) errs.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Format email tidak valid';
    if (!form.password) errs.password = 'Password wajib diisi';
    else if (form.password.length < 6) errs.password = 'Password minimal 6 karakter';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulate API call — replace with real API later
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Demo login: admin@neo.com → admin, barber@neo.com → barber, else → customer
    let role: 'admin' | 'barber' | 'customer' = 'customer';
    if (form.email === 'admin@neo.com') role = 'admin';
    else if (form.email === 'barber@neo.com') role = 'barber';

    login({
      id: `user-${Date.now()}`,
      name: role === 'admin' ? 'Admin Neo' : role === 'barber' ? 'Alex "The Edge"' : 'Customer Demo',
      email: form.email,
      role,
      avatar: role === 'admin' ? '🧑‍💼' : role === 'barber' ? '😎' : '👤',
    });

    // Redirect based on role
    if (role === 'admin') navigate('/admin');
    else if (role === 'barber') navigate('/barber');
    else navigate(from !== '/login' ? from : '/profile');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-block bg-neo-black text-neo-yellow font-display text-sm uppercase px-4 py-2 border-4 border-neo-black rounded-neo shadow-neo mb-4 -rotate-1">
            ✂ Welcome Back
          </div>
          <h1 className="text-5xl font-display">Login</h1>
          <p className="text-neo-black/60 font-bold mt-2">Masuk untuk melanjutkan ke Neo Barbershop</p>
        </div>

        {/* Card */}
        <div className="bg-neo-white border-4 border-neo-black rounded-neo shadow-neo-lg p-8">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <NeoInput
              id="login-email"
              label="Email"
              type="email"
              placeholder="email@kamu.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
              required
              autoComplete="email"
              leftIcon={<span>✉️</span>}
            />

            <NeoInput
              id="login-password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
              required
              autoComplete="current-password"
              leftIcon={<span>🔒</span>}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-neo-black/60 hover:text-neo-black transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              }
            />

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-black uppercase text-neo-orange hover:underline"
              >
                Lupa Password?
              </button>
            </div>

            <NeoButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              id="login-submit-btn"
            >
              {isLoading ? 'Logging in...' : 'Login →'}
            </NeoButton>
          </form>

          {/* Demo Hint */}
          <div className="mt-6 p-4 bg-neo-yellow/40 border-3 border-neo-black rounded-neo">
            <p className="text-xs font-black uppercase mb-2">🔑 Demo Accounts:</p>
            <p className="text-xs font-bold text-neo-black/70">Admin: <code className="font-mono">admin@neo.com</code></p>
            <p className="text-xs font-bold text-neo-black/70">Barber: <code className="font-mono">barber@neo.com</code></p>
            <p className="text-xs font-bold text-neo-black/70">Customer: email apapun</p>
            <p className="text-xs font-bold text-neo-black/70">Password: apapun ≥ 6 karakter</p>
          </div>

          <p className="text-center text-sm font-bold text-neo-black/60 mt-6">
            Belum punya akun?{' '}
            <Link to="/register" className="font-black text-neo-orange hover:underline">
              Register sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
