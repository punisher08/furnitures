import axios from 'axios';

import { logoutUser } from '../pages/Login';
import {
  initialFurnitureCatalog,
  initialOrders,
  initialStockMovements,
  initialBusinessProfile,
} from '../data/initialData';

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  try {

    const rawSession = localStorage.getItem('furniture-dashboard-auth-session');
    const session = rawSession ? JSON.parse(rawSession) : null;
    const token = session?.token;

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,

      };
    }
  } catch (error) {
    console.warn('Unable to parse auth session for request:', error);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.log(error.response)
      // console.warn('Unauthorized API request. Session may be invalid or backend auth is not accepting the token.', error?.response?.data || error?.message);
    }

    return Promise.reject(error);
  }
);

/*
|--------------------------------------------------------------------------
| API Response Helpers
|--------------------------------------------------------------------------
*/

/**
 * PHP API returns:
 *
 * {
 *   success: true,
 *   message: "OK",
 *   data: [...]
 * }
 *
 * Axios puts that inside response.data.
 *
 * So:
 *
 * response.data.data
 *
 * becomes the actual application data.
 */
const getData = (response) => {
  const responseData = response?.data;

  if (
    responseData &&
    typeof responseData === 'object' &&
    Object.prototype.hasOwnProperty.call(responseData, 'data')
  ) {
    return responseData.data;
  }

  return responseData;
};

/**
 * Always return an array.
 *
 * Prevents errors such as:
 *
 * inventory.filter is not a function
 * inventory.map is not a function
 */
const getArrayData = (response, fallback = []) => {
  const data = getData(response);

  return Array.isArray(data) ? data : fallback;
};

/**
 * Get a useful API error message.
 */
const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    'An unexpected API error occurred.'
  );
};

/* =========================================================
 * INVENTORY
 * ========================================================= */

/**
 * GET /inventory
 */
export const loadInventory = async () => {
  try {
    const response = await api.get('/inventory');

    return getArrayData(response, initialFurnitureCatalog);
  } catch (error) {
    console.error(
      'Failed to load inventory:',
      getErrorMessage(error)
    );

    return initialFurnitureCatalog;
  }
};

/**
 * POST /inventory
 * PUT  /inventory/{id}
 */
export const saveInventory = async (item) => {
  try {
    let response;

    if (item?.id) {
      response = await api.put(
        `/inventory/${encodeURIComponent(item.id)}`,
        item
      );
    } else {
      response = await api.post('/inventory', item);
    }

    return getData(response);
  } catch (error) {
    console.error(
      'Failed to save inventory:',
      getErrorMessage(error)
    );

    throw error;
  }
};

/**
 * DELETE /inventory/{id}
 */
export const deleteInventory = async (id) => {
  try {
    const response = await api.delete(
      `/inventory/${encodeURIComponent(id)}`
    );

    return getData(response);
  } catch (error) {
    console.error(
      'Failed to delete inventory:',
      getErrorMessage(error)
    );

    throw error;
  }
};

/**
 * POST /inventory/{id}/stock
 */
export const updateInventoryStock = async (
  id,
  change,
  options = {}
) => {
  try {
    const response = await api.post(
      `/inventory/${encodeURIComponent(id)}/stock`,
      {
        change,
        type: options.type,
        reason: options.reason,
        referenceOrderNumber:
          options.referenceOrderNumber,
      }
    );

    return getData(response);
  } catch (error) {
    console.error(
      'Failed to update inventory stock:',
      getErrorMessage(error)
    );

    throw error;
  }
};

/* =========================================================
 * ORDERS
 * ========================================================= */

/**
 * GET /orders
 */
export const loadOrders = async () => {
  try {
    const response = await api.get('/orders');

    return getArrayData(response, initialOrders);
  } catch (error) {
    console.error(
      'Failed to load orders:',
      getErrorMessage(error)
    );

    return initialOrders;
  }
};

/**
 * POST /orders
 * PUT  /orders/{id}
 */
export const saveOrders = async (order) => {
  try {
    let response;

    if (order?.id) {
      response = await api.post(
        `/orders/`,
        order
      );
    } else {
      response = await api.post('/orders', order);
    }

    return getData(response);
  } catch (error) {
    console.error(
      'Failed to save order:',
      getErrorMessage(error)
    );

    throw error;
  }
};

/**
 * DELETE /orders/{id}
 */
export const deleteOrder = async (id) => {
  try {
    const response = await api.delete(
      `/orders/${encodeURIComponent(id)}`
    );

    return getData(response);
  } catch (error) {
    console.error(
      'Failed to delete order:',
      getErrorMessage(error)
    );

    throw error;
  }
};

/**
 * PUT /orders/{id}/status
 */
export const updateOrderStatus = async (
  id,
  status
) => {
  try {
    const response = await api.put(
      `/orders/${encodeURIComponent(id)}/status`,
      {
        status,
      }
    );

    return getData(response);
  } catch (error) {
    console.error(
      'Failed to update order status:',
      getErrorMessage(error)
    );

    throw error;
  }
};

/* =========================================================
 * STOCK MOVEMENTS
 * ========================================================= */

/**
 * GET /stock-movements
 */
export const loadMovements = async () => {
  try {
    const response = await api.get(
      '/stock-movements'
    );

    return getArrayData(
      response,
      initialStockMovements
    );
  } catch (error) {
    console.error(
      'Failed to load stock movements:',
      getErrorMessage(error)
    );

    return initialStockMovements;
  }
};

/**
 * GET /stock-movements/furniture/{id}
 */
export const loadFurnitureMovements = async (
  furnitureId
) => {
  try {
    const response = await api.get(
      `/stock-movements/furniture/${encodeURIComponent(
        furnitureId
      )}`
    );

    return getArrayData(response, []);
  } catch (error) {
    console.error(
      'Failed to load furniture stock movements:',
      getErrorMessage(error)
    );

    return [];
  }
};

/**
 * POST /stock-movements
 */
export const saveMovements = async (movement) => {
  try {
    const response = await api.post(
      '/stock-movements',
      movement
    );

    return getData(response);
  } catch (error) {
    console.error(
      'Failed to save stock movement:',
      getErrorMessage(error)
    );

    throw error;
  }
};

/* =========================================================
 * BUSINESS PROFILE
 * ========================================================= */

/**
 * GET /business-profile
 */
export const loadBusinessProfile = async () => {
  try {
    const response = await api.get(
      '/business-profile'
    );

    return getData(response) || initialBusinessProfile;
  } catch (error) {
    console.error(
      'Failed to load business profile:',
      getErrorMessage(error)
    );

    return initialBusinessProfile;
  }
};

/**
 * PUT /business-profile
 */
export const saveBusinessProfile = async (
  profile
) => {
  try {
    const response = await api.put(
      '/business-profile',
      profile
    );

    return getData(response);
  } catch (error) {
    console.error(
      'Failed to save business profile:',
      getErrorMessage(error)
    );

    throw error;
  }
};

/* =========================================================
 * RESET SAMPLE DATA
 * ========================================================= */

/**
 * POST /reset-sample-data
 */
export const resetToSampleData = async () => {
  try {
    const response = await api.post(
      '/reset-sample-data'
    );

    return getData(response);
  } catch (error) {
    console.error(
      'Failed to reset sample data:',
      getErrorMessage(error)
    );

    throw error;
  }
};

/* =========================================================
 * EXPORT JSON
 * ========================================================= */

export const exportDataAsJSON = (
  inventory,
  orders,
  movements,
  profile
) => {
  const data = {
    exportedAt: new Date().toISOString(),
    profile,
    inventory,
    orders,
    movements,
  };

  const jsonString =
    `data:application/json;charset=utf-8,` +
    encodeURIComponent(
      JSON.stringify(data, null, 2)
    );

  const downloadAnchor =
    document.createElement('a');

  downloadAnchor.setAttribute(
    'href',
    jsonString
  );

  downloadAnchor.setAttribute(
    'download',
    `furniture_business_backup_${new Date()
      .toISOString()
      .slice(0, 10)}.json`
  );

  document.body.appendChild(
    downloadAnchor
  );

  downloadAnchor.click();

  downloadAnchor.remove();
};

/* =========================================================
 * EXPORT INVENTORY CSV
 * ========================================================= */

export const exportInventoryAsCSV = (
  inventory
) => {
  const headers = [
    'SKU',
    'Name',
    'Category',
    'Material',
    'Stock',
    'MinAlert',
    'CostPrice',
    'RetailPrice',
    'MarginPct',
    'Status',
    'Supplier',
  ];

  const rows = inventory.map((item) => {
    const margin =
      item.retailPrice > 0
        ? (
            ((item.retailPrice -
              item.costPrice) /
              item.retailPrice) *
            100
          ).toFixed(1)
        : '0';

    return [
      `"${item.sku ?? ''}"`,
      `"${(item.name ?? '').replace(
        /"/g,
        '""'
      )}"`,
      `"${item.category ?? ''}"`,
      `"${(item.material ?? '').replace(
        /"/g,
        '""'
      )}"`,
      item.stock ?? 0,
      item.minStockAlert ?? 0,
      item.costPrice ?? 0,
      item.retailPrice ?? 0,
      `${margin}%`,
      `"${item.status ?? ''}"`,
      `"${(item.supplier ?? '').replace(
        /"/g,
        '""'
      )}"`,
    ].join(',');
  });

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [
      headers.join(','),
      ...rows,
    ].join('\n');

  const encodedUri =
    encodeURI(csvContent);

  const link =
    document.createElement('a');

  link.setAttribute(
    'href',
    encodedUri
  );

  link.setAttribute(
    'download',
    `furniture_inventory_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`
  );

  document.body.appendChild(link);

  link.click();

  link.remove();
};

/* =========================================================
 * EXPORT SALES CSV
 * ========================================================= */

export const exportSalesAsCSV = (
  orders
) => {
  const headers = [
    'OrderNumber',
    'Date',
    'Customer',
    'Phone',
    'ItemsCount',
    'Subtotal',
    'Discount',
    'Tax',
    'DeliveryFee',
    'Total',
    'Profit',
    'PaymentMethod',
    'OrderStatus',
  ];

  const rows = orders.map((o) => {
    return [
      `"${o.orderNumber ?? ''}"`,
      `"${o.createdAt
        ? o.createdAt.slice(0, 10)
        : ''}"`,
      `"${(
        o.customer?.name ?? ''
      ).replace(/"/g, '""')}"`,
      `"${o.customer?.phone ?? ''}"`,
      (o.items ?? []).reduce(
        (sum, item) =>
          sum + (item.quantity ?? 0),
        0
      ),
      o.subtotal ?? 0,
      o.discount ?? 0,
      o.taxAmount ?? 0,
      o.deliveryFee ?? 0,
      o.total ?? 0,
      o.profit ?? 0,
      `"${o.paymentMethod ?? ''}"`,
      `"${o.orderStatus ?? ''}"`,
    ].join(',');
  });

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [
      headers.join(','),
      ...rows,
    ].join('\n');

  const encodedUri =
    encodeURI(csvContent);

  const link =
    document.createElement('a');

  link.setAttribute(
    'href',
    encodedUri
  );

  link.setAttribute(
    'download',
    `furniture_sales_orders_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`
  );

  document.body.appendChild(link);

  link.click();

  link.remove();
};

/* =========================================================
 * EXPORT API INSTANCE
 * ========================================================= */

export default api;