import React from 'react';
import {
  useNavigate,
  useOutletContext,
} from 'react-router-dom';

import { DashboardOverview } from '../components/DashboardOverview';
import Footer from '../components/Footer';


export default function Home() {

  const navigate = useNavigate();

  const {
    inventory,
    orders,
    businessProfile,

    setRestockingItem,
    setIsRestockModalOpen,

    setInvoiceOrder,
    setIsInvoiceModalOpen,
  } = useOutletContext();

  return (
    <div>
    <DashboardOverview
      inventory={inventory}
      orders={orders}
      profile={businessProfile}

      onNavigateToInventory={() => {
        navigate('/inventory');
      }}

      onNavigateToSales={() => {
        navigate('/sales');
      }}

      onNavigateToPOS={() => {
        navigate('/sales');
      }}

      onOpenRestockModal={(item) => {
        setRestockingItem(item);
        setIsRestockModalOpen(true);
      }}

      onViewOrderInvoice={(order) => {
        setInvoiceOrder(order);
        setIsInvoiceModalOpen(true);
      }}
    />
    
    </div>
  );
}