import { useState } from "react";
import { registerUser } from "../services/auth-services";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      setLoading(true);
      const data = await registerUser(formData);
      setSuccess(data.message || "Registration successful");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      
    } catch (error) {
       console.error("Registration Error:", error);
       error.response?.data?.message ||
          "Something went wrong during registration"
    }finally {
      setLoading(false);
    }
    
  }
  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[650px] w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl md:grid-cols-2">
        {/* Left side */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-700 px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/5" />

          <div className="relative z-10 flex h-full flex-col justify-center">
            <span className="w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-violet-100">
              SHOPSPHERE
            </span>

            <h1 className="mt-7 max-w-lg text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Shop smarter.
              <span className="block text-violet-300">
                Live better.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/75 sm:text-base">
              Create your ShopSphere account and enjoy a simple,
              secure and seamless shopping experience.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-violet-200">
                  ✓
                </span>

                <p className="text-sm text-white/85">
                  Easy and secure shopping
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-violet-200">
                  ✓
                </span>

                <p className="text-sm text-white/85">
                  Track your orders easily
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-violet-200">
                  ✓
                </span>

                <p className="text-sm text-white/85">
                  Discover products you love
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-xs font-extrabold tracking-[0.15em] text-violet-600">
                WELCOME TO SHOPSPHERE
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Join ShopSphere and start your shopping journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-violet-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-violet-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
              </div>

              {/* Password */}
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
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-violet-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Use at least 6 characters.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                >
                  {success}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>

              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-violet-600 hover:text-violet-700"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
