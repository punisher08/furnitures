import React from 'react';

import Allproducts from '../components/Allproducts';
import BeforeAfterSection from '../components/BeforeAfter';
import ProductListing from '../components/ProductListing';
import LuxuryBanner from '../components/LuxuryBanner';
import Header from '../layouts/Header';
import DesignSpaces from '../components/DesignSpaces';
import SEO from '../components/SEO';

export default function Front() {
  return(
    <div>
      <SEO
        title="Ignacio Furnitures | Custom Furniture & Solid Wood Furniture"
        description="Discover handcrafted furniture from Ignacio Furnitures. Explore solid wood tables, chairs, bedframes, TV racks, cabinets and custom furniture."
        path="/"
      />
      <Header />
      <LuxuryBanner/>
      <BeforeAfterSection />
      <DesignSpaces/>
      <ProductListing />
    </div>
  )
}