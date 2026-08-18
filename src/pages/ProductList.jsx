import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import ProductListing from '../components/ProductListing';
import Header from '../layouts/Header';
import { loadBusinessProfile, loadInventory } from '../utils/storage';

export default function ProductList() {
  const outletContext = useOutletContext?.() ?? {};
  const inventoryFromOutlet = outletContext.inventory;
  const profileFromOutlet = outletContext.businessProfile;

  const [localInventory, setLocalInventory] = useState([]);
  const [localProfile, setLocalProfile] = useState({});

  useEffect(() => {
    if (inventoryFromOutlet && profileFromOutlet) {
      return;
    }

    let isMounted = true;

    const fetchGuestData = async () => {
      try {
        const [inventoryData, profileData] = await Promise.all([
          loadInventory(),
          loadBusinessProfile(),
        ]);

        if (!isMounted) {
          return;
        }

        setLocalInventory(Array.isArray(inventoryData) ? inventoryData : []);
        setLocalProfile(profileData || {});
      } catch (error) {
        console.error('Failed to load guest product data:', error);
      }
    };

    fetchGuestData();

    return () => {
      isMounted = false;
    };
  }, [inventoryFromOutlet, profileFromOutlet]);

  const inventory = inventoryFromOutlet ?? localInventory;
  const businessProfile = profileFromOutlet ?? localProfile;
  const isGuestMode = !inventoryFromOutlet && !profileFromOutlet;

  return (
    <>
      {isGuestMode && <Header />}
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
    </>
  );
}