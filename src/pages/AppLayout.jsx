import React, { useEffect, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  api,
  loadInventory,
  saveInventory,
  loadOrders,
  saveOrders,
  loadMovements,
  loadBusinessProfile,
  saveBusinessProfile,
  deleteInventory,
  updateInventoryStock,
  updateOrderStatus,
  resetToSampleData,
  exportDataAsJSON,
} from '../utils/storage';
import { Navnew } from '../components/Navnew';

import { ProductModal } from '../components/ProductModal';
import { RestockModal } from '../components/RestockModal';
import { ProductTagModal } from '../components/ProductTagModal';
import { InvoiceModal } from '../components/InvoiceModal';
import { BusinessSettingsModal } from '../components/BusinessSettingsModal';

import {
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

import { logoutUser } from './Login';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://ignacio-server.test/api';

export default function AppLayout() {

  const navigate = useNavigate();
  const location = useLocation();

  /*
  |--------------------------------------------------------------------------
  | DATA STATE
  |--------------------------------------------------------------------------
  */

  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [movements, setMovements] = useState([]);
  const [businessProfile, setBusinessProfile] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | SALES STATE
  |--------------------------------------------------------------------------
  */

  const [salesSubTab, setSalesSubTab] = useState('pos');

  /*
  |--------------------------------------------------------------------------
  | MODAL STATE
  |--------------------------------------------------------------------------
  */

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [restockingItem, setRestockingItem] = useState(null);

  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [tagItem, setTagItem] = useState(null);

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | TOAST
  |--------------------------------------------------------------------------
  */

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (text, type = 'success') => {
    setToastMessage({
      text,
      type,
    });

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login', { replace: true });
  };

  /*
  |--------------------------------------------------------------------------
  | LOAD APPLICATION DATA
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    let mounted = true;

    const loadAppData = async () => {

      try {

        const [
          inventoryData,
          ordersData,
          movementsData,
          profileData,
        ] = await Promise.all([
          loadInventory(),
          loadOrders(),
          loadMovements(),
          loadBusinessProfile(),
        ]);

        if (!mounted) {
          return;
        }

        setInventory(
          Array.isArray(inventoryData)
            ? inventoryData
            : []
        );

        setOrders(
          Array.isArray(ordersData)
            ? ordersData
            : []
        );

        setMovements(
          Array.isArray(movementsData)
            ? movementsData
            : []
        );

        setBusinessProfile(
          profileData || {}
        );

      } catch (error) {

        console.error(
          'Failed to load application data:',
          error
        );

        if (mounted) {

          setInventory([]);
          setOrders([]);
          setMovements([]);
          setBusinessProfile({});

        }

      } finally {

        if (mounted) {
          setIsLoading(false);
        }

      }

    };

    loadAppData();

    return () => {
      mounted = false;
    };

  }, []);

  /*
  |--------------------------------------------------------------------------
  | PRODUCT HANDLERS
  |--------------------------------------------------------------------------
  */

const handleSaveProduct = async (item) => {
  console.log('Saving product:', item);
  console.log('Editing product:', editingProduct);

  try {
    let savedItem;

    /*
    |--------------------------------------------------------------------------
    | Prepare FormData
    |--------------------------------------------------------------------------
    */

    // const formData = new FormData();
    const formData = new FormData()

  

    if (item.imageFile instanceof File) {
      formData.append('image', item.imageFile)
    }

    Object.entries(item).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'imageFile' && value instanceof File) {
          formData.append('image', value); // also: was 'imageUrl' — should be 'image' to match PHP's $_FILES['image']
        } else if (key === 'imageFile') {
          // not a real File (e.g. {}), skip it — nothing useful to send
          return;
        } else if (typeof value === 'object') {
          // dimensions, or any other nested object
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    });
    // console.log(formData.imageFile);
    // return;
    

    /*
    |--------------------------------------------------------------------------
    | NEW PRODUCT
    |--------------------------------------------------------------------------
    */

    if (!editingProduct) {
      const response = await api.post(
        '/inventory',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      savedItem = response?.data?.data ?? response?.data;

      console.log('Created product:', savedItem);

      navigate('/inventory');
    }

    /*
    |--------------------------------------------------------------------------
    | EXISTING PRODUCT
    |--------------------------------------------------------------------------
    */

    else {
      const response = await api.put(
        `/inventory/${encodeURIComponent(editingProduct.id)}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      savedItem = response?.data?.data ?? response?.data;

      console.log('Updated product:', savedItem);
    }

    /*
    |--------------------------------------------------------------------------
    | Validate API response
    |--------------------------------------------------------------------------
    */

    if (!savedItem) {
      throw new Error(
        'API did not return the saved inventory item.'
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Update AppLayout inventory state
    |--------------------------------------------------------------------------
    */

    setInventory(prev => {
      const exists = prev.some(
        product => product.id === savedItem.id
      );

      if (exists) {
        return prev.map(product =>
          product.id === savedItem.id
            ? savedItem
            : product
        );
      }

      return [
        savedItem,
        ...prev,
      ];
    });

    /*
    |--------------------------------------------------------------------------
    | Success message
    |--------------------------------------------------------------------------
    */

    showToast(
      editingProduct
        ? `Updated "${savedItem.name}" specifications.`
        : `Added "${savedItem.name}" to inventory.`,
      'success'
    );

    /*
    |--------------------------------------------------------------------------
    | Close modal
    |--------------------------------------------------------------------------
    */

    setEditingProduct(null);
    setIsProductModalOpen(false);

  } catch (error) {

    console.error(
      'Failed to save product:',
      error
    );

    const apiMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Unknown error';

    console.error(
      'API error:',
      apiMessage
    );

    showToast(
      `Failed to save product: ${apiMessage}`,
      'warning'
    );
  }
};

  const handleDeleteProduct = async (itemId) => {

    const item = inventory.find(
      i => i.id === itemId
    );

    try {

      await deleteInventory(itemId);

      setInventory(prev =>
        prev.filter(i => i.id !== itemId)
      );

      showToast(
        `Removed "${item?.name || 'Item'}" from catalog.`,
        'info'
      );

    } catch (error) {

      console.error(
        'Failed to delete product:',
        error
      );

      showToast(
        'Failed to delete product. Please try again.',
        'warning'
      );

    }

  };

  /*
  |--------------------------------------------------------------------------
  | QUICK STOCK
  |--------------------------------------------------------------------------
  */

  const handleQuickStockChange = async (
    itemId,
    delta
  ) => {

    const item = inventory.find(
      i => i.id === itemId
    );

    if (!item || delta === 0) {
      return;
    }

    const newStock = Math.max(
      0,
      Number(item.stock) + delta
    );

    if (newStock === Number(item.stock)) {
      return;
    }

    try {

      const result =
        await updateInventoryStock(
          itemId,
          delta,
          {
            type: 'adjustment',

            reason:
              delta > 0
                ? 'Quick stock count increment'
                : 'Showroom floor adjustment / damaged unit deduction',
          }
        );

      const updatedItem =
        result?.item || {
          ...item,

          stock: newStock,

          status:
            newStock === 0
              ? 'out_of_stock'
              : newStock <= item.minStockAlert
                ? 'low_stock'
                : 'in_stock',
        };

      setInventory(prev =>
        prev.map(i =>
          i.id === itemId
            ? updatedItem
            : i
        )
      );

      if (result?.movement) {

        setMovements(prev => [
          result.movement,
          ...prev,
        ]);

      }

      showToast(
        `Adjusted ${item.name} stock to ${updatedItem.stock} units.`,
        delta > 0
          ? 'success'
          : 'info'
      );

    } catch (error) {

      console.error(
        'Failed to adjust stock:',
        error
      );

      showToast(
        'Failed to update stock. Please try again.',
        'warning'
      );

    }

  };

  /*
  |--------------------------------------------------------------------------
  | RESTOCK
  |--------------------------------------------------------------------------
  */

  const handleConfirmRestock = async (
    item,
    addedUnits,
    supplierNote,
    newCostPrice
  ) => {

    if (!item || addedUnits <= 0) {
      return;
    }

    try {

      const result =
        await updateInventoryStock(
          item.id,
          addedUnits,
          {
            type: 'restock',

            reason:
              supplierNote ||
              `Incoming restock from ${item.supplier}`,
          }
        );

      let updatedItem =
        result?.item || {
          ...item,
          stock:
            Number(item.stock) +
            Number(addedUnits),
        };

      if (
        newCostPrice !== undefined &&
        newCostPrice !== item.costPrice
      ) {

        updatedItem =
          await saveInventory({
            ...updatedItem,
            costPrice: newCostPrice,
          });

      }

      setInventory(prev =>
        prev.map(i =>
          i.id === item.id
            ? updatedItem
            : i
        )
      );

      if (result?.movement) {

        setMovements(prev => [
          result.movement,
          ...prev,
        ]);

      }

      showToast(
        `Restocked ${addedUnits} units of ${item.name}. (New stock: ${updatedItem.stock} units)`,
        'success'
      );

      setIsRestockModalOpen(false);
      setRestockingItem(null);

    } catch (error) {

      console.error(
        'Failed to restock product:',
        error
      );

      showToast(
        'Failed to restock product. Please try again.',
        'warning'
      );

    }

  };

  /*
  |--------------------------------------------------------------------------
  | SALES
  |--------------------------------------------------------------------------
  */

  const handleCompleteSale = async (newOrder) => {

    try {

      const savedOrder =
        await saveOrders(newOrder);

      if (!savedOrder) {

        throw new Error(
          'API did not return the created order.'
        );

      }

      const stockResults = [];

      for (
        const orderItem
        of savedOrder.items ||
        newOrder.items ||
        []
      ) {

        const result =
          await updateInventoryStock(
            orderItem.furnitureId,
            -orderItem.quantity,
            {
              type: 'sale',

              reason:
                `Customer Sale #${savedOrder.orderNumber} (${savedOrder.customer?.name || ''})`,

              referenceOrderNumber:
                savedOrder.orderNumber,
            }
          );

        stockResults.push(result);

      }

      const updatedItems =
        stockResults
          .filter(result => result?.item)
          .map(result => result.item);

      const newMovements =
        stockResults
          .filter(result => result?.movement)
          .map(result => result.movement);

      if (updatedItems.length) {

        setInventory(prev =>
          prev.map(item => {

            const updated =
              updatedItems.find(
                i => i.id === item.id
              );

            return updated || item;

          })
        );

      }

      if (newMovements.length) {

        setMovements(prev => [
          ...newMovements.reverse(),
          ...prev,
        ]);

      }

      setOrders(prev => [
        savedOrder,
        ...prev.filter(
          o => o.id !== savedOrder.id
        ),
      ]);

      setInvoiceOrder(savedOrder);
      setIsInvoiceModalOpen(true);

      showToast(
        `Sale confirmed! Order #${savedOrder.orderNumber} recorded and inventory deducted.`,
        'success'
      );

    } catch (error) {

      console.error(
        'Failed to complete sale:',
        error
      );

      showToast(
        'Failed to complete sale. Please check the API and try again.',
        'warning'
      );

    }

  };

  /*
  |--------------------------------------------------------------------------
  | ORDER STATUS
  |--------------------------------------------------------------------------
  */

  const handleUpdateOrderStatus = async (
    orderId,
    newStatus
  ) => {

    try {

      const updatedOrder =
        await updateOrderStatus(
          orderId,
          newStatus
        );

      setOrders(prev =>
        prev.map(o =>
          o.id === orderId
            ? updatedOrder ||
              {
                ...o,
                orderStatus: newStatus,
              }
            : o
        )
      );

      showToast(
        `Order status updated to "${newStatus.replace('_', ' ')}".`,
        'info'
      );

    } catch (error) {

      console.error(
        'Failed to update order status:',
        error
      );

      showToast(
        'Failed to update order status. Please try again.',
        'warning'
      );

    }

  };

  /*
  |--------------------------------------------------------------------------
  | CANCEL ORDER
  |--------------------------------------------------------------------------
  */

  const handleCancelOrder = async (
    orderId
  ) => {

    const order =
      orders.find(
        o => o.id === orderId
      );

    if (
      !order ||
      order.orderStatus === 'cancelled'
    ) {
      return;
    }

    if (
      !confirm(
        `Are you sure you want to cancel Order #${order.orderNumber}? This will restore the items back to inventory.`
      )
    ) {
      return;
    }

    try {

      const returnResults = [];

      for (
        const orderItem
        of order.items || []
      ) {

        const result =
          await updateInventoryStock(
            orderItem.furnitureId,
            orderItem.quantity,
            {
              type: 'return',

              reason:
                `Order Cancelled / Returned #${order.orderNumber}`,

              referenceOrderNumber:
                order.orderNumber,
            }
          );

        returnResults.push(result);

      }

      const updatedOrder =
        await updateOrderStatus(
          orderId,
          'cancelled'
        );

      const updatedItems =
        returnResults
          .filter(result => result?.item)
          .map(result => result.item);

      const returnMovements =
        returnResults
          .filter(result => result?.movement)
          .map(result => result.movement);

      if (updatedItems.length) {

        setInventory(prev =>
          prev.map(item => {

            const updated =
              updatedItems.find(
                i => i.id === item.id
              );

            return updated || item;

          })
        );

      }

      if (returnMovements.length) {

        setMovements(prev => [
          ...returnMovements.reverse(),
          ...prev,
        ]);

      }

      setOrders(prev =>
        prev.map(o =>
          o.id === orderId
            ? updatedOrder ||
              {
                ...o,
                orderStatus: 'cancelled',
              }
            : o
        )
      );

      showToast(
        `Order #${order.orderNumber} cancelled and ${order.items?.length || 0} item(s) returned to stock.`,
        'warning'
      );

    } catch (error) {

      console.error(
        'Failed to cancel order:',
        error
      );

      showToast(
        'Failed to cancel order. Please check the API.',
        'warning'
      );

    }

  };

  /*
  |--------------------------------------------------------------------------
  | RESET DATABASE
  |--------------------------------------------------------------------------
  */

  const handleResetData = async () => {

    try {

      await resetToSampleData();

      const [
        inventoryData,
        ordersData,
        movementsData,
        profileData,
      ] = await Promise.all([
        loadInventory(),
        loadOrders(),
        loadMovements(),
        loadBusinessProfile(),
      ]);

      setInventory(
        Array.isArray(inventoryData)
          ? inventoryData
          : []
      );

      setOrders(
        Array.isArray(ordersData)
          ? ordersData
          : []
      );

      setMovements(
        Array.isArray(movementsData)
          ? movementsData
          : []
      );

      setBusinessProfile(
        profileData || {}
      );

      showToast(
        'Database reset to authentic showroom catalog & order history.',
        'info'
      );

    } catch (error) {

      console.error(
        'Failed to reset data:',
        error
      );

      showToast(
        'Failed to reset database. Please try again.',
        'warning'
      );

    }

  };

  /*
  |--------------------------------------------------------------------------
  | ACTIVE NAVIGATION
  |--------------------------------------------------------------------------
  */

  const getActiveTab = () => {

    const path = location.pathname;

    if (path === '/') {
      return 'overview';
    }

    if (path.startsWith('/inventory')) {
      return 'inventory';
    }

    if (path.startsWith('/sales')) {
      return 'sales';
    }

    if (path.startsWith('/analytics')) {
      return 'analytics';
    }

    if (
      path.startsWith('/stock-movements')
    ) {
      return 'movements';
    }

    return 'overview';

  };

  const activeTab = getActiveTab();

  /*
  |--------------------------------------------------------------------------
  | LOW STOCK
  |--------------------------------------------------------------------------
  */

  const lowStockCount =
    Array.isArray(inventory)
      ? inventory.filter(
          i =>
            Number(i.stock) <=
            Number(i.minStockAlert)
        ).length
      : 0;

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (isLoading) {

    return (
      <div className="min-h-screen bg-stone-100/90 text-stone-900 flex items-center justify-center">

        <div className="rounded-2xl bg-white px-6 py-5 shadow-lg border border-stone-200">

          <div className="text-sm font-semibold">
            Loading furniture management system...
          </div>

        </div>

      </div>
    );

  }

  /*
  |--------------------------------------------------------------------------
  | APP LAYOUT
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-stone-100/90 text-stone-900 flex flex-col font-sans selection:bg-amber-200">

      {/* Navigation */}
        
      <Navnew
        activeTab={activeTab}

        setActiveTab={(tab) => {

          if (tab === 'overview') {
            navigate('/');
          }

          else if (tab === 'inventory') {
            navigate('/inventory');
          }

          else if (tab === 'sales') {
            setSalesSubTab('orders');
            navigate('/sales');
          }

          else if (tab === 'analytics') {
            navigate('/analytics');
          }

          else if (tab === 'movements') {
            navigate('/stock-movements');
          }

        }}

        lowStockCount={lowStockCount}

        onNewSaleClick={() => {
          setSalesSubTab('pos');
          navigate('/sales');
        }}

        onAddProductClick={() => {
          setEditingProduct(null);
          setIsProductModalOpen(true);
        }}

        onSettingsClick={() => {
          setIsSettingsModalOpen(true);
        }}

        onLogoutClick={handleLogout}

        onExportClick={() => {
          exportDataAsJSON(
            inventory,
            orders,
            movements,
            businessProfile
          );
        }}

        businessProfile={businessProfile}
        inventory={inventory}
      />

      {/* Routed page */}

      <main className="flex-1 container w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        <Outlet
          context={{
            inventory,
            setInventory,

            orders,
            setOrders,

            movements,
            setMovements,

            businessProfile,
            setBusinessProfile,

            salesSubTab,
            setSalesSubTab,

            showToast,

            handleSaveProduct,
            handleDeleteProduct,
            handleQuickStockChange,
            handleConfirmRestock,

            handleCompleteSale,
            handleUpdateOrderStatus,
            handleCancelOrder,

            setRestockingItem,
            setIsRestockModalOpen,

            setInvoiceOrder,
            setIsInvoiceModalOpen,

            setEditingProduct,
            setIsProductModalOpen,

            setTagItem,
            setIsTagModalOpen,
          }}
        />

      </main>

      {/* Toast */}

      {toastMessage && (

        <div className="fixed bottom-6 right-6 z-50 animate-bounce">

          <div
            className={`
              px-4 py-3
              rounded-2xl
              shadow-xl
              border
              flex
              items-center
              space-x-2.5
              text-xs
              font-semibold

              ${
                toastMessage.type === 'success'
                  ? 'bg-stone-900 text-emerald-300 border-emerald-500/40'
                  : toastMessage.type === 'warning'
                    ? 'bg-stone-900 text-amber-300 border-amber-500/40'
                    : 'bg-stone-900 text-stone-100 border-stone-700'
              }
            `}
          >

            {toastMessage.type === 'success'
              ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )
              : (
                <AlertCircle className="w-4 h-4 text-amber-400" />
              )
            }

            <span>
              {toastMessage.text}
            </span>

          </div>

        </div>

      )}

      {/* Product Modal */}

      <ProductModal
        isOpen={isProductModalOpen}

        onClose={() => {
          setIsProductModalOpen(false);
          setEditingProduct(null);
        }}

        onSave={handleSaveProduct}

        editingItem={editingProduct}

        profile={businessProfile}
      />

      {/* Restock Modal */}

      <RestockModal
        isOpen={isRestockModalOpen}

        onClose={() => {
          setIsRestockModalOpen(false);
          setRestockingItem(null);
        }}

        item={restockingItem}

        profile={businessProfile}

        onConfirmRestock={
          handleConfirmRestock
        }
      />

      {/* Product Tag Modal */}

      <ProductTagModal
        isOpen={isTagModalOpen}

        onClose={() => {
          setIsTagModalOpen(false);
          setTagItem(null);
        }}

        item={tagItem}

        profile={businessProfile}
      />

      {/* Invoice Modal */}

      <InvoiceModal
        isOpen={isInvoiceModalOpen}

        onClose={() => {
          setIsInvoiceModalOpen(false);
          setInvoiceOrder(null);
        }}

        order={invoiceOrder}

        profile={businessProfile}
      />

      {/* Settings Modal */}

      <BusinessSettingsModal
        isOpen={isSettingsModalOpen}

        onClose={() => {
          setIsSettingsModalOpen(false);
        }}

        profile={businessProfile}

        onSaveProfile={async (prof) => {

          try {

            const savedProfile =
              await saveBusinessProfile(prof);

            setBusinessProfile(
              savedProfile || prof
            );

            showToast(
              'Updated store settings and tax profile.'
            );

          } catch (error) {

            console.error(
              'Failed to save business profile:',
              error
            );

            showToast(
              'Failed to save store settings. Please try again.',
              'warning'
            );

          }

        }}

        onResetData={
          handleResetData
        }
      />

    </div>
  );
}