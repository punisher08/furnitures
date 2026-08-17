import React from 'react';

import {
  useOutletContext,
} from 'react-router-dom';

import {
  StockMovementsView,
} from '../components/StockMovementsView';

export default function StockMovements() {

  const {
    movements,
    businessProfile,
  } = useOutletContext();

  return (
    <StockMovementsView

      movements={movements}

      profile={businessProfile}

    />
  );
}