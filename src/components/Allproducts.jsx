import React, { useEffect, useState } from 'react';

import Header from '../layouts/Header';
import ProductListing from './ProductListing';
import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'http://ignacio-server.test/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Extract API response data safely.
 */
const unwrapResponseData = (response) => {
  let payload = response?.data;

  console.log('RAW API RESPONSE:', payload);

  // { success: true, data: [...] }
  if (
    payload &&
    typeof payload === 'object' &&
    'data' in payload
  ) {
    payload = payload.data;
  }

  // { products: [...] }
  if (
    payload &&
    typeof payload === 'object' &&
    Array.isArray(payload.products)
  ) {
    return payload.products;
  }

  // [...]
  if (Array.isArray(payload)) {
    return payload;
  }

  return [];
};

/**
 * Normalize product from API.
 */
const normalizeProduct = (item = {}) => {
  const price = Number(
    item.retailPrice ??
    item.retail_price ??
    item.price ??
    item.sale_price ??
    item.unit_price ??
    0
  );

  const image =
    item.imageUrl ??
    item.image_url ??
    item.image ??
    item.thumbnail ??
    item.photo ??
    '';

  return {
    id:
      item.id ??
      item.product_id ??
      item.slug ??
      `${item.name ?? 'product'}-${Math.random()}`,

    name:
      item.name ??
      item.title ??
      'Unnamed Product',

    category:
      item.category ??
      item.type ??
      item.category_name ??
      'Furniture',

    material:
      item.material ??
      item.fabric ??
      item.wood ??
      '',

    description:
      item.description ??
      item.short_description ??
      'Beautiful furniture piece crafted for modern interiors.',

    retailPrice: price,

    price: price,

    stock: Number(
      item.stock ??
      item.quantity ??
      0
    ),

    imageUrl: image,

    image: image,

    sku:
      item.sku ??
      item.code ??
      '',
  };
};

export const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await api.get('/products');

        console.log(
          'Products API response:',
          response
        );

        if (!isMounted) {
          return;
        }

        const list =
          unwrapResponseData(response);

        console.log(
          'Products extracted:',
          list
        );

        const normalizedProducts =
          list.map(normalizeProduct);

        console.log(
          'Products normalized:',
          normalizedProducts
        );
        // console.log(normalizedProducts);
        
        setProducts(normalizedProducts);

      } catch (error) {
        console.error(
          'Failed to load guest products:',
          error
        );

        if (isMounted) {
          setProducts([]);
        }

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
        <div className="flex min-h-[300px] items-center justify-center bg-[#faf9f6] text-sm text-stone-600">
          Loading products...
        </div>
      ) : (
        <ProductListing
          inventory={products}
          onProductClick={(product) => {
            console.log(
              'Selected product:',
              product
            );
          }}

          onAddToCart={(product) => {
            console.log(
              'Add to cart:',
              product
            );
          }}
        />
      )}
    </>
  );
};

export default Allproducts;