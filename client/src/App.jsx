import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import Register from "./pages/register";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import ProtectedRoute from "./components/Protected-Route";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorized from "./pages/UnAuthorized";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          
        </Routes>
      </main>


      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div>
            <p className="text-sm font-bold text-slate-900">
              ShopSphere
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Shop smarter. Live better.
            </p>
          </div>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} ShopSphere. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
