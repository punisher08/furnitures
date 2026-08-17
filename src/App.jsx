import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import AppLayout from './pages/AppLayout';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Analytics from './pages/Analytics';
import StockMovements from './pages/StockMovements';
import SingleProduct from './pages/SingleProduct';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AppLayout />}>

          {/* Dashboard */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Inventory */}
          <Route
            path="/inventory"
            element={<Inventory />}
          />

          {/* Sales / POS */}
          <Route
            path="/sales"
            element={<Sales />}
          />

          {/* Analytics */}
          <Route
            path="/analytics"
            element={<Analytics />}
          />

          {/* Stock Logs */}
          <Route
            path="/stock-movements"
            element={<StockMovements />}
          />

          {/* Single Product */}
          <Route
            path="/product/:id"
            element={<SingleProduct />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}