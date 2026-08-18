import React, { useEffect, useState } from 'react';

import Header from '../layouts/Header';
import ProductListing from './ProductListing';
import { api } from '../utils/storage';

const unwrapResponseData = (response) => {
  const payload = response?.data;

  if (payload && typeof payload === 'object' && 'data' in payload) {
    return payload.data;
  }

  return payload;
};

const normalizeProduct = (item = {}) => ({
  id: item.id ?? item.product_id ?? item.slug ?? `${item.name ?? 'product'}-${Math.random()}`,
  name: item.name ?? item.title ?? 'Unnamed Product',
  category: item.category ?? item.type ?? item.category_name ?? 'Furniture',
  material: item.material ?? item.fabric ?? item.wood ?? '',
  description:
    item.description ??
    item.short_description ??
    'Beautiful furniture piece crafted for modern interiors.',
  retailPrice: Number(item.retailPrice ?? item.price ?? item.sale_price ?? item.unit_price ?? 0),
  price: Number(item.retailPrice ?? item.price ?? item.sale_price ?? item.unit_price ?? 0),
  stock: Number(item.stock ?? item.quantity ?? 0),
  imageUrl: item.imageUrl ?? item.image ?? item.thumbnail ?? item.photo ?? '',
  image: item.imageUrl ?? item.image ?? item.thumbnail ?? item.photo ?? '',
  sku: item.sku ?? item.code ?? '',
});

export const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');

        if (!isMounted) {
          return;
        }

        const payload = unwrapResponseData(response);
        const list = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.products)
            ? payload.products
            : [];

        setProducts(list.map(normalizeProduct));
      } catch (error) {
        console.error('Failed to load guest products:', error);
        setProducts([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <div className="min-h-[300px] flex items-center justify-center bg-[#faf9f6] text-stone-600 text-sm">
          Loading products...
        </div>
      ) : (
        <ProductListing
          inventory={products}
          profile={{}}
          onProductClick={(product) => {
            console.log('Selected product:', product);
          }}
          onAddToCart={(product) => {
            console.log('Add to cart:', product);
          }}
        />
      )}
    </>
  );
};

export default Allproducts;

