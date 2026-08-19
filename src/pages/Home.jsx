import React from 'react';

import Allproducts from '../components/Allproducts';
import BeforeAfterSection from '../components/BeforeAfter';
import ProductListing from '../components/ProductListing';
import LuxuryBanner from '../components/LuxuryBanner';
import Header from '../layouts/Header';
import DesignSpaces from '../components/DesignSpaces';

export default function Front() {
  return(
    <div>
      <Header />
      <LuxuryBanner/>
      <BeforeAfterSection />
      <DesignSpaces/>
      <ProductListing />
    </div>
  )
}