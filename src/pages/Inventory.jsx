import React from 'react';

import {
  useOutletContext,
} from 'react-router-dom';

import {
  exportInventoryAsCSV,
} from '../utils/storage';

import {
  InventoryManager,
} from '../components/InventoryManager';

export default function Inventory() {

  const {
    inventory,
    businessProfile,

    setEditingProduct,
    setIsProductModalOpen,

    setRestockingItem,
    setIsRestockModalOpen,

    setTagItem,
    setIsTagModalOpen,

    handleDeleteProduct,
    handleQuickStockChange,
  } = useOutletContext();
  
  
  return (
    <InventoryManager

      inventory={inventory}

      profile={businessProfile}

      onAddProduct={() => {

        setEditingProduct(null);

        setIsProductModalOpen(true);

      }}

      onEditProduct={(item) => {

        setEditingProduct(item);

        setIsProductModalOpen(true);

      }}

      onRestockProduct={(item) => {

        setRestockingItem(item);

        setIsRestockModalOpen(true);

      }}

      onPrintTag={(item) => {

        setTagItem(item);

        setIsTagModalOpen(true);

      }}

      onDeleteProduct={
        handleDeleteProduct
      }

      onQuickStockChange={
        handleQuickStockChange
      }

      onExportCSV={() => {

        exportInventoryAsCSV(
          inventory
        );

      }}

    />
  );
}