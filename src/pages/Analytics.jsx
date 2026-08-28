import React from 'react';

import {
  useOutletContext,
} from 'react-router-dom';

import {
  exportSalesAsCSV,
  exportInventoryAsCSV,
} from '../utils/storage';

import {
  AnalyticsReports,
} from '../components/AnalyticsReports';
import Footer from '../components/Footer';

export default function Analytics() {

  const {
    inventory,
    orders,
    businessProfile,
  } = useOutletContext();

  return (
    <div>
    <AnalyticsReports

      inventory={inventory}

      orders={orders}

      profile={businessProfile}

      onExportSalesCSV={() => {

        exportSalesAsCSV(
          orders
        );

      }}

      onExportInventoryCSV={() => {

        exportInventoryAsCSV(
          inventory
        );

      }}

    />
    
    </div>
  );
}