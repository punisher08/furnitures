import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

import AppLayout from './pages/AppLayout';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Analytics from './pages/Analytics';
import StockMovements from './pages/StockMovements';
import SingleProduct from './pages/SingleProduct';
import ProductList from './pages/ProductList';
import Login, { isAuthenticated } from './pages/Login';

function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/stock-movements" element={<StockMovements />} />
            <Route path="/product/:id" element={<SingleProduct />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={<Navigate to={isAuthenticated() ? '/' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}