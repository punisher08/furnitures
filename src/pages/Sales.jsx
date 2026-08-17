import React from 'react';

import {
  useOutletContext,
} from 'react-router-dom';

import {
  exportSalesAsCSV,
} from '../utils/storage';

import {
  SalesManager,
} from '../components/SalesManager';

export default function Sales() {

  const {
    inventory,
    orders,
    businessProfile,

    salesSubTab,
    setSalesSubTab,

    handleCompleteSale,
    handleUpdateOrderStatus,
    handleCancelOrder,

    setInvoiceOrder,
    setIsInvoiceModalOpen,
  } = useOutletContext();

  return (
    <SalesManager

      inventory={inventory}

      orders={orders}

      profile={businessProfile}

      activeSubTab={salesSubTab}

      setActiveSubTab={
        setSalesSubTab
      }

      onCompleteSale={
        handleCompleteSale
      }

      onUpdateOrderStatus={
        handleUpdateOrderStatus
      }

      onCancelOrder={
        handleCancelOrder
      }

      onViewInvoice={(order) => {

        setInvoiceOrder(order);

        setIsInvoiceModalOpen(true);

      }}

      onExportOrdersCSV={() => {

        exportSalesAsCSV(
          orders
        );

      }}

    />
  );
}