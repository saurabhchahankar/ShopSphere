

import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-xl sm:px-10">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-red-50 text-2xl font-bold text-red-500">
          !
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.15em] text-violet-600">
          Access denied
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          You don't have permission
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500">
          Your account doesn't have the required permission to view
          this page.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Go to Home
          </Link>

          <Link
            to="/products"
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Browse Products
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Unauthorized;