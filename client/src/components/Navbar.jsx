import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-violet-100 text-violet-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-black text-white shadow-md shadow-violet-500/20">
            S
          </div>

          <div>
            <p className="text-base font-extrabold tracking-tight text-slate-900">
              ShopSphere
            </p>

            <p className="hidden text-[10px] font-medium tracking-wide text-slate-400 sm:block">
              SHOP SMARTER
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            className={getNavLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={getNavLinkClass}
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={getNavLinkClass}
          >
            Cart
          </NavLink>

          <NavLink
            to="/orders"
            className={getNavLinkClass}
          >
            Orders
          </NavLink>
        </nav>

        {/* Desktop auth actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Register
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          <span className="text-xl leading-none">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={getNavLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              onClick={closeMenu}
              className={getNavLinkClass}
            >
              Products
            </NavLink>

            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={getNavLinkClass}
            >
              Cart
            </NavLink>

            <NavLink
              to="/orders"
              onClick={closeMenu}
              className={getNavLinkClass}
            >
              Orders
            </NavLink>

            <div className="my-2 border-t border-slate-100" />

            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="rounded-lg bg-linear-to-r from-violet-600 to-indigo-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
            >
              Register
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;