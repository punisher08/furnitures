import React from 'react';
import Header from '../layouts/Header';
import NewArrivals from '../components/NewArrivals';
import CommunitySection from '../components/Community';
import ProductGallery from '../components/ProductGallery';

export default function Front() {
  return(
    <div>
        <Header />
        <NewArrivals />
        <CommunitySection />
        <ProductGallery/>
    </div>
  )
}