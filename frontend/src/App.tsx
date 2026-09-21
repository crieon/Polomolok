import React, { useEffect, useState } from 'react';
import { useAppStore } from './store/useAppStore';
import { authAPI } from './services/api';
import MonitoringDashboard from './components/MonitoringDashboard';

interface LoginFormData {
  username: string;
  password: string;
}

const App: React.FC = () => {
  const { login, logout, isAuthenticated } = useAppStore();
  const [loginForm, setLoginForm] = useState<LoginFormData>({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        login(response.data);
      } catch (err) {
        // Not authenticated
      }
    };

    checkAuth();
  }, [login]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authAPI.login(loginForm.username, loginForm.password);
      login(response.data);
      setLoginForm({ username: '', password: '' });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-lg shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Therapy Center</h1>
              <p className="text-gray-400">Monitoring System</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, username: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-600 text-white p-3 rounded text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 rounded font-semibold bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-700 text-center">
              <p className="text-gray-400 text-sm">Demo credentials:</p>
              <p className="text-gray-400 text-sm">Username: supervisor</p>
              <p className="text-gray-400 text-sm">Password: demo123</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <>
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded font-semibold bg-gray-700 hover:bg-gray-600 text-white transition"
        >
          Logout
        </button>
      </div>
      <MonitoringDashboard />
    </>
  );
};

export default App;
