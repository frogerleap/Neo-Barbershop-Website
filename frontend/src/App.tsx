import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import CustomerLayout from './components/layout/CustomerLayout';
import AdminLayout    from './components/layout/AdminLayout';

// Auth Guard
import ProtectedRoute from './components/auth/ProtectedRoute';

// Public Pages
import LandingPage  from './pages/LandingPage';
import BookPage     from './pages/BookPage';
import LoginPage    from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Customer Dashboard
import CustomerDashboard from './features/dashboard/CustomerDashboard';

// Barber Dashboard
import BarberDashboard from './features/dashboard/BarberDashboard';

// Admin Dashboard
import AdminDashboard from './features/dashboard/AdminDashboard';

// ── 404 Page ───────────────────────────────────────────────
const NotFoundPage = () => (
  <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-6 py-20">
    <div className="text-8xl mb-6 animate-wiggle">✂️</div>
    <div className="inline-block bg-neo-pink text-neo-white font-display text-sm uppercase px-4 py-2 border-4 border-neo-black rounded-neo shadow-neo mb-6">
      404 — Page Not Found
    </div>
    <h1 className="text-6xl md:text-8xl font-display mb-4">Oops!</h1>
    <p className="text-xl font-bold text-neo-black/60 max-w-md mb-8">
      Halaman yang kamu cari tidak ada. Mungkin sudah di-trim habis sama barber kita. ✂️
    </p>
    <a
      href="/"
      className="bg-neo-black text-neo-white font-display uppercase px-8 py-4 border-4 border-neo-black rounded-neo shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all"
    >
      ← Back to Home
    </a>
  </div>
);

// ── App Router ─────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public Routes (with Navbar + Footer) ── */}
        <Route element={<CustomerLayout />}>
          <Route path="/"         element={<LandingPage />} />
          <Route path="/book"     element={<BookPage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected: Customer */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={['customer', 'admin', 'barber']}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ── Barber Dashboard (no admin sidebar, uses CustomerLayout) ── */}
        <Route element={<CustomerLayout />}>
          <Route
            path="/barber"
            element={
              <ProtectedRoute allowedRoles={['barber', 'admin']}>
                <BarberDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ── Admin Routes (with Sidebar) ── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <div className="text-center py-20">
                  <h1 className="text-4xl font-display mb-4">All Bookings</h1>
                  <p className="font-bold text-neo-black/50">Coming soon — will be powered by backend API</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/barbers"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <div className="text-center py-20">
                  <h1 className="text-4xl font-display mb-4">Manage Barbers</h1>
                  <p className="font-bold text-neo-black/50">Coming soon — will be powered by backend API</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <div className="text-center py-20">
                  <h1 className="text-4xl font-display mb-4">Manage Services</h1>
                  <p className="font-bold text-neo-black/50">Coming soon — will be powered by backend API</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <div className="text-center py-20">
                  <h1 className="text-4xl font-display mb-4">All Customers</h1>
                  <p className="font-bold text-neo-black/50">Coming soon — will be powered by backend API</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/revenue"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <div className="text-center py-20">
                  <h1 className="text-4xl font-display mb-4">Revenue Report</h1>
                  <p className="font-bold text-neo-black/50">Coming soon — will be powered by backend API</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <div className="text-center py-20">
                  <h1 className="text-4xl font-display mb-4">Settings</h1>
                  <p className="font-bold text-neo-black/50">Coming soon — will be powered by backend API</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* ── Fallback ── */}
        <Route path="/404" element={<CustomerLayout />}>
          <Route index element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
