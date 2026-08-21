/**
 * Extract API response data safely.
 */
const UnwrapResponseData = (response) => {
  let payload = response?.data;

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

export default UnwrapResponseData;