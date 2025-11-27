import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Plans from './pages/Plans';
import Dashboard from './pages/Dashboard';
import AdminSubscriptions from './pages/AdminSubscriptions';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/plans" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/plans" element={<Plans />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/subscriptions"
            element={
              <ProtectedRoute adminOnly>
                <AdminSubscriptions />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/plans" replace />} />
        </Routes>

        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;