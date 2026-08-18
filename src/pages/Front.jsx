import React from 'react';
import { useOutletContext } from 'react-router-dom';

import ProductListing from '../components/ProductListing';
import Header from '../layouts/Header';

export default function ProductList() {

  const {
    inventory,
    businessProfile,
  } = useOutletContext();
  console.log('test');
  

  return (
    <div>
    <Header />
    <ProductListing
      inventory={inventory}
      profile={businessProfile}
      onProductClick={(product) => {
        console.log('Selected product:', product);
      }}
      onAddToCart={(product) => {
        console.log('Add to cart:', product);
      }}
    />
    </div>
  );
}