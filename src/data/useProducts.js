import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://ignacio-server.test/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Helper: Normalize single item
export const normalizeProduct = (item = {}) => {
  const price = Number(
    item.retailPrice ?? item.retail_price ?? item.price ?? item.sale_price ?? item.unit_price ?? 0
  );
  const image = item.imageUrl ?? item.image_url ?? item.image ?? item.thumbnail ?? item.photo ?? '';

  return {
    id: item.id ?? item.product_id ?? item.slug ?? `${item.name ?? 'product'}-${Math.random()}`,
    name: item.name ?? item.title ?? 'Unnamed Product',
    category: item.category ?? item.type ?? item.category_name ?? 'Furniture',
    material: item.material ?? item.fabric ?? item.wood ?? '',
    description: item.description ?? item.short_description ?? 'Beautiful furniture piece crafted for modern interiors.',
    retailPrice: price,
    price: price,
    stock: Number(item.stock ?? item.quantity ?? 0),
    imageUrl: image,
    image: image,
    sku: item.sku ?? item.code ?? '',
  };
};

// Helper: Unwrap various response structures
export const unwrapResponseData = (response) => {
  let payload = response?.data;
  if (payload && typeof payload === 'object' && 'data' in payload) {
    payload = payload.data;
  }
  if (payload && typeof payload === 'object' && Array.isArray(payload.products)) {
    return payload.products;
  }
  return Array.isArray(payload) ? payload : [];
};

// Custom Hook for fetching products
export const useProducts = (endpoint = '/get/products') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get(endpoint);
        
        if (!isMounted) return;

        const list = unwrapResponseData(response);
        setProducts(list.map(normalizeProduct));
      } catch (err) {
        console.error('Failed to load products:', err);
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { products, loading, error, api };
};