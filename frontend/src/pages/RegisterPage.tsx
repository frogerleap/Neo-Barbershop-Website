import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NeoButton from '../components/ui/NeoButton';
import NeoInput from '../components/ui/NeoInput';
import { useAuthStore } from '../store/authStore';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, setLoading, isLoading } = useAuthStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Nama wajib diisi';
    else if (form.name.trim().length < 3) errs.name = 'Nama minimal 3 karakter';

    if (!form.email) errs.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Format email tidak valid';

    if (!form.phone) errs.phone = 'Nomor HP wajib diisi';
    else if (!/^(\+62|08)\d{8,11}$/.test(form.phone.replace(/\s/g, '')))
      errs.phone = 'Nomor HP tidak valid (format: 08xx atau +62xx)';

    if (!form.password) errs.password = 'Password wajib diisi';
    else if (form.password.length < 8) errs.password = 'Password minimal 8 karakter';
    else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(form.password))
      errs.password = 'Password harus mengandung huruf besar dan angka';

    if (!form.confirmPassword) errs.confirmPassword = 'Konfirmasi password wajib diisi';
    else if (form.confirmPassword !== form.password) errs.confirmPassword = 'Password tidak cocok';

    if (!agreed) errs.agreed = 'Kamu harus menyetujui syarat & ketentuan';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error on change
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API — replace with real registration later
    await new Promise((r) => setTimeout(r, 1500));

    login({
      id: `user-${Date.now()}`,
      name: form.name.trim(),
      email: form.email,
      phone: form.phone,
      role: 'customer',
      avatar: '👤',
    });

    navigate('/profile');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-block bg-neo-pink text-neo-white font-display text-sm uppercase px-4 py-2 border-4 border-neo-black rounded-neo shadow-neo mb-4 rotate-1">
            ✂ Join the Crew
          </div>
          <h1 className="text-5xl font-display">Register</h1>
          <p className="text-neo-black/60 font-bold mt-2">Buat akun dan mulai booking sekarang</p>
        </div>

        {/* Card */}
        <div className="bg-neo-white border-4 border-neo-black rounded-neo shadow-neo-lg p-8">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Name */}
            <NeoInput
              id="register-name"
              label="Nama Lengkap"
              type="text"
              placeholder="Nama kamu"
              value={form.name}
              onChange={handleChange('name')}
              error={errors.name}
              required
              autoComplete="name"
              leftIcon={<span>👤</span>}
            />

            {/* Email */}
            <NeoInput
              id="register-email"
              label="Email"
              type="email"
              placeholder="email@kamu.com"
              value={form.email}
              onChange={handleChange('email')}
              error={errors.email}
              required
              autoComplete="email"
              leftIcon={<span>✉️</span>}
            />

            {/* Phone */}
            <NeoInput
              id="register-phone"
              label="Nomor HP"
              type="tel"
              placeholder="+62 857-9868-3721"
              value={form.phone}
              onChange={handleChange('phone')}
              error={errors.phone}
              required
              autoComplete="tel"
              leftIcon={<span>📱</span>}
            />

            {/* Password */}
            <NeoInput
              id="register-password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 karakter, huruf besar & angka"
              value={form.password}
              onChange={handleChange('password')}
              error={errors.password}
              required
              autoComplete="new-password"
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

            {/* Confirm Password */}
            <NeoInput
              id="register-confirm-password"
              label="Konfirmasi Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Ulangi password"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={errors.confirmPassword}
              required
              autoComplete="new-password"
              leftIcon={<span>🔑</span>}
            />

            {/* Terms & Conditions */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  onClick={() => {
                    setAgreed(!agreed);
                    if (errors.agreed) setErrors((p) => ({ ...p, agreed: '' }));
                  }}
                  className={[
                    'mt-0.5 w-6 h-6 border-4 border-neo-black rounded-neo flex-shrink-0 flex items-center justify-center transition-all duration-150 cursor-pointer',
                    agreed ? 'bg-neo-green shadow-neo-xs' : 'bg-white group-hover:bg-neo-yellow',
                  ].join(' ')}
                >
                  {agreed && <span className="text-xs font-black">✓</span>}
                </div>
                <span className="text-sm font-bold text-neo-black/70 leading-tight">
                  Saya menyetujui{' '}
                  <button type="button" className="font-black text-neo-orange hover:underline">
                    Syarat & Ketentuan
                  </button>{' '}
                  dan{' '}
                  <button type="button" className="font-black text-neo-orange hover:underline">
                    Kebijakan Privasi
                  </button>
                </span>
              </label>
              {errors.agreed && (
                <p className="text-neo-pink text-sm font-bold mt-1 flex items-center gap-1">
                  <span>✕</span> {errors.agreed}
                </p>
              )}
            </div>

            <NeoButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              id="register-submit-btn"
            >
              {isLoading ? 'Creating Account...' : 'Create Account →'}
            </NeoButton>
          </form>

          <p className="text-center text-sm font-bold text-neo-black/60 mt-6">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-black text-neo-orange hover:underline">
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
