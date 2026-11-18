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
import SingleProduct from './pages/Single';
// import ProductList from './pages/ProductList';

import Admin from './pages/Admin';
import Login, { isAuthenticated } from './pages/Login';
import Front from './pages/Front';
import Newarrivals from './pages/Newarrivals';
import About from './pages/About';
import Reviews from './pages/Reviews';
import DownloadMp3 from './pages/DownloadMp3';
import MusicPlayerpage from './pages/MusicPlayerpage';
import CV from './pages/Cv';
import JobListings from './components/Joblistings';
import Resume from './components/cv/Resume';



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
        <Route path="/vuejs" element={<CV />} />
          <Route element={<ProtectedRoute />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}