import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      setLoading(true);

      await login(formData);

      const destination = location.state?.from?.pathname || '/';
      navigate(destination, {replace:true})
    } catch (error) {
      console.error("Login Error:", error);

      setError(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    }finally {
      setLoading(false);
    }
    
  }
  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-155 w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl md:grid-cols-2">
        {/* Branding */}
        <div className="relative overflow-hidden bg-linear-to-br from-slate-950 via-indigo-950 to-violet-700 px-6 py-10 text-white sm:px-10 lg:px-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/5" />

          <div className="relative z-10 flex h-full flex-col justify-center">
            <span className="w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-violet-100">
              SHOPSPHERE
            </span>

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Welcome
              <span className="block text-violet-300">
                back.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/75 sm:text-base">
              Sign in to continue shopping, manage your cart,
              and track your orders.
            </p>
          </div>
        </div>

        {/* Login form */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-xs font-extrabold tracking-[0.15em] text-violet-600">
                WELCOME BACK
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Sign in to ShopSphere
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your details to access your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <p className="text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-bold text-violet-600 hover:text-violet-700"
                >
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;