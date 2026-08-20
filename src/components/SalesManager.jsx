import React, { useState } from 'react';
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  FileText,
  Package,
  AlertCircle,
  Download,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  MapPin,
  User,
} from 'lucide-react';

export const SalesManager = ({
  inventory,
  orders,
  profile,
  activeSubTab,
  setActiveSubTab,
  onCompleteSale,
  onUpdateOrderStatus,
  onViewInvoice,
  onExportOrdersCSV,
}) => {
  /*
  |--------------------------------------------------------------------------
  | POS STATE
  |--------------------------------------------------------------------------
  */

  const [catalogSearch, setCatalogSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);

  /*
  |--------------------------------------------------------------------------
  | CHECKOUT STEP
  |--------------------------------------------------------------------------
  */

  const [checkoutStep, setCheckoutStep] = useState(1);

  /*
  |--------------------------------------------------------------------------
  | CUSTOMER / ORDER DETAILS
  |--------------------------------------------------------------------------
  */

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city] = useState('Portland');
  const [postalCode] = useState('97201');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const [deliveryType, setDeliveryType] = useState('white_glove');

  const [deliveryDate, setDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().slice(0, 10);
  });

  /*
  |--------------------------------------------------------------------------
  | BILLING DETAILS
  |--------------------------------------------------------------------------
  */

  const [billingSameAsDelivery, setBillingSameAsDelivery] = useState(true);

  const [billingName, setBillingName] = useState('');
  const [billingPhone, setBillingPhone] = useState('');
  const [billingEmail, setBillingEmail] = useState('');

  const [billingAddress, setBillingAddress] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');

  /*
  |--------------------------------------------------------------------------
  | PAYMENT
  |--------------------------------------------------------------------------
  */

  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [discountAmount, setDiscountAmount] = useState(0);

  const [posError, setPosError] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | ORDERS LIST STATE
  |--------------------------------------------------------------------------
  */

  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  /*
  |--------------------------------------------------------------------------
  | CATEGORIES
  |--------------------------------------------------------------------------
  */

 const categories = [
  'All',
  'Living Room',
  'Dining Room',
  'Bedroom',
  'Home Office',
  'Kitchen',
  'Bathroom',
  'Storage',
  'Outdoor',
  'Doors',
  'Lighting & Accents',
  'Custom Furniture',
];

  /*
  |--------------------------------------------------------------------------
  | FILTER CATALOG
  |--------------------------------------------------------------------------
  */

  const filteredCatalog = inventory.filter(item => {
    const name = String(item.name || '').toLowerCase();
    const sku = String(item.sku || '').toLowerCase();
    const material = String(item.material || '').toLowerCase();

    const search = catalogSearch.toLowerCase();

    const matchesSearch =
      name.includes(search) ||
      sku.includes(search) ||
      material.includes(search);

    const matchesCat =
      selectedCategory === 'All' ||
      item.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  /*
  |--------------------------------------------------------------------------
  | CART OPERATIONS
  |--------------------------------------------------------------------------
  */

  const addToCart = item => {
    setPosError(null);

    if (Number(item.stock) <= 0) {
      setPosError(
        `${item.name} is currently out of stock.`
      );

      return;
    }

    setCart(prev => {
      const existing = prev.find(
        i => i.furnitureId === item.id
      );

      if (existing) {
        if (
          Number(existing.quantity) >=
          Number(item.stock)
        ) {
          setPosError(
            `Cannot add more: only ${item.stock} unit(s) available in inventory.`
          );

          return prev;
        }

        return prev.map(i =>
          i.furnitureId === item.id
            ? {
                ...i,
                quantity: i.quantity + 1,
                total:
                  (i.quantity + 1) *
                  Number(i.unitPrice),
              }
            : i
        );
      }

      const newItem = {
        furnitureId: item.id,
        sku: item.sku,
        name: item.name,
        material: item.material,
        quantity: 1,
        unitPrice: Number(item.retailPrice || 0),
        costPrice: Number(item.costPrice || 0),
        total: Number(item.retailPrice || 0),
        imageUrl: item.imageUrl,
      };

      return [...prev, newItem];
    });
  };

  const updateCartQuantity = (
    furnitureId,
    newQty
  ) => {
    setPosError(null);

    const item = inventory.find(
      i => i.id === furnitureId
    );

    if (!item) {
      return;
    }

    if (newQty <= 0) {
      removeFromCart(furnitureId);
      return;
    }

    if (newQty > Number(item.stock)) {
      setPosError(
        `Maximum available stock for ${item.name} is ${item.stock}.`
      );

      return;
    }

    setCart(prev =>
      prev.map(i =>
        i.furnitureId === furnitureId
          ? {
              ...i,
              quantity: newQty,
              total:
                newQty *
                Number(i.unitPrice),
            }
          : i
      )
    );
  };

  const removeFromCart = furnitureId => {
    setCart(prev =>
      prev.filter(
        i => i.furnitureId !== furnitureId
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountAmount(0);
    setPosError(null);
    setCheckoutStep(1);
  };

  /*
  |--------------------------------------------------------------------------
  | PRICING
  |--------------------------------------------------------------------------
  */

  const cartSubtotal = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.total || 0),
    0
  );

  const cartCostTotal = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.costPrice || 0) *
        Number(item.quantity || 0),
    0
  );

  const standardShippingFee = Number(
    profile?.standardShippingFee || 0
  );

  const whiteGloveFee = Number(
    profile?.whiteGloveFee || 0
  );

  const taxRate = Number(
    profile?.taxRate || 0
  );

  const currency = profile?.currency || '₱';

  const deliveryFee =
    deliveryType === 'pickup'
      ? 0
      : deliveryType === 'white_glove'
        ? whiteGloveFee
        : standardShippingFee;

  const safeDiscount = Math.min(
    Math.max(
      Number(discountAmount || 0),
      0
    ),
    cartSubtotal
  );

  const taxableAmount = Math.max(
    0,
    cartSubtotal - safeDiscount
  );

  const taxAmount = Number(
    (
      taxableAmount *
      taxRate
    ).toFixed(2)
  );

  const cartTotal = Number(
    (
      taxableAmount +
      taxAmount +
      deliveryFee
    ).toFixed(2)
  );

  const orderProfit = Number(
    (
      cartTotal -
      cartCostTotal -
      taxAmount
    ).toFixed(2)
  );

  /*
  |--------------------------------------------------------------------------
  | COPY DELIVERY INFO TO BILLING
  |--------------------------------------------------------------------------
  */

  const handleBillingSameAsDelivery = checked => {
    setBillingSameAsDelivery(checked);

    if (checked) {
      setBillingName(customerName);
      setBillingPhone(customerPhone);
      setBillingEmail(customerEmail);
      setBillingAddress(deliveryAddress);
      setBillingCity(city);
      setBillingPostalCode(postalCode);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | STEP 1 VALIDATION
  |--------------------------------------------------------------------------
  */

  const handleContinueToBilling = () => {
    setPosError(null);

    if (cart.length === 0) {
      setPosError(
        'Please add at least one furniture item to the sale.'
      );

      return;
    }

    if (!customerName.trim()) {
      setPosError(
        'Please provide the customer name.'
      );

      return;
    }

    if (!customerPhone.trim()) {
      setPosError(
        'Please provide the customer phone number.'
      );

      return;
    }

    /*
    |----------------------------------------------------------------------
    | Verify stock
    |----------------------------------------------------------------------
    */

    for (const cartItem of cart) {
      const stockItem = inventory.find(
        i => i.id === cartItem.furnitureId
      );

      if (
        !stockItem ||
        Number(stockItem.stock) <
          Number(cartItem.quantity)
      ) {
        setPosError(
          `Stock error: ${cartItem.name} does not have sufficient units in stock.`
        );

        return;
      }
    }

    /*
    |----------------------------------------------------------------------
    | Populate billing from delivery
    |----------------------------------------------------------------------
    */

    if (billingSameAsDelivery) {
      setBillingName(customerName);
      setBillingPhone(customerPhone);
      setBillingEmail(customerEmail);
      setBillingAddress(deliveryAddress);
      setBillingCity(city);
      setBillingPostalCode(postalCode);
    }

    setCheckoutStep(2);
  };

  /*
  |--------------------------------------------------------------------------
  | STEP 2 VALIDATION
  |--------------------------------------------------------------------------
  */

  const validateBilling = () => {
    if (!billingName.trim()) {
      setPosError(
        'Please provide the billing name.'
      );

      return false;
    }

    if (!billingPhone.trim()) {
      setPosError(
        'Please provide the billing phone number.'
      );

      return false;
    }

    if (!billingEmail.trim()) {
      setPosError(
        'Please provide the billing email address.'
      );

      return false;
    }

    if (!billingAddress.trim()) {
      setPosError(
        'Please provide the billing address.'
      );

      return false;
    }

    if (!billingCity.trim()) {
      setPosError(
        'Please provide the billing city.'
      );

      return false;
    }

    if (!billingPostalCode.trim()) {
      setPosError(
        'Please provide the billing postal code.'
      );

      return false;
    }

    return true;
  };

  /*
  |--------------------------------------------------------------------------
  | PROCESS SALE
  |--------------------------------------------------------------------------
  */

  const handleProcessSale = e => {
    e.preventDefault();

    setPosError(null);

    if (!validateBilling()) {
      return;
    }

    /*
    |----------------------------------------------------------------------
    | Verify stock one final time
    |----------------------------------------------------------------------
    */

    for (const cartItem of cart) {
      const stockItem = inventory.find(
        i => i.id === cartItem.furnitureId
      );

      if (
        !stockItem ||
        Number(stockItem.stock) <
          Number(cartItem.quantity)
      ) {
        setPosError(
          `Stock error: ${cartItem.name} does not have sufficient units in stock.`
        );

        setCheckoutStep(1);

        return;
      }
    }

    /*
    |----------------------------------------------------------------------
    | Generate order number
    |----------------------------------------------------------------------
    */

    const orderNum =
      `NORD-2026-${Math.floor(
        1050 +
        orders.length +
        Math.random() * 100
      )}`;

    /*
    |----------------------------------------------------------------------
    | New Order
    |----------------------------------------------------------------------
    */

    const newOrder = {
      id: `ord-${Date.now()}`,

      orderNumber: orderNum,

      /*
      |----------------------------------------------------------------------
      | Customer / Delivery Information
      |----------------------------------------------------------------------
      */

      customer: {
        name: customerName,
        phone: customerPhone,
        email:
          customerEmail ||
          `${customerName
            .toLowerCase()
            .replace(/\s+/g, '.')}@example.com`,

        deliveryAddress:
          deliveryAddress ||
          'Showroom Self-Pickup',

        city: city || 'Portland',

        postalCode:
          postalCode || '97201',

        deliveryNotes:
          deliveryNotes,
      },

      /*
      |----------------------------------------------------------------------
      | Billing Information
      |----------------------------------------------------------------------
      */

      billing: {
        name: billingName,
        phone: billingPhone,

        email:
          billingEmail ||
          customerEmail ||
          `${customerName
            .toLowerCase()
            .replace(/\s+/g, '.')}@example.com`,

        address: billingAddress,
        city: billingCity,
        postalCode: billingPostalCode,

        sameAsDelivery:
          billingSameAsDelivery,
      },

      /*
      |----------------------------------------------------------------------
      | Order Items
      |----------------------------------------------------------------------
      */

      items: [...cart],

      /*
      |----------------------------------------------------------------------
      | Pricing
      |----------------------------------------------------------------------
      */

      subtotal: cartSubtotal,

      discount: safeDiscount,

      taxRate: taxRate,

      taxAmount: taxAmount,

      deliveryType: deliveryType,

      deliveryFee: deliveryFee,

      total: cartTotal,

      costTotal: cartCostTotal,

      profit: orderProfit,

      /*
      |----------------------------------------------------------------------
      | Payment
      |----------------------------------------------------------------------
      */

      paymentMethod: paymentMethod,

      paymentStatus: 'paid',

      /*
      |----------------------------------------------------------------------
      | Fulfillment
      |----------------------------------------------------------------------
      */

      orderStatus:
        deliveryType === 'pickup'
          ? 'processing'
          : 'scheduled',

      deliveryDate: deliveryDate,

      notes: deliveryNotes,

      createdAt:
        new Date().toISOString(),
    };

    /*
    |----------------------------------------------------------------------
    | Send order to AppLayout
    |----------------------------------------------------------------------
    */

    onCompleteSale(newOrder);

    /*
    |----------------------------------------------------------------------
    | Reset Form
    |----------------------------------------------------------------------
    */

    clearCart();

    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');

    setDeliveryAddress('');
    setDeliveryNotes('');

    setBillingName('');
    setBillingPhone('');
    setBillingEmail('');
    setBillingAddress('');
    setBillingCity('');
    setBillingPostalCode('');

    setBillingSameAsDelivery(true);

    setPosError(null);
    setCheckoutStep(1);
  };

  /*
  |--------------------------------------------------------------------------
  | ORDER HISTORY FILTER
  |--------------------------------------------------------------------------
  */

  const filteredOrders = orders.filter(ord => {
    const orderNumber =
      String(
        ord.orderNumber || ''
      ).toLowerCase();

    const customerName =
      String(
        ord.customer?.name || ''
      ).toLowerCase();

    const customerPhone =
      String(
        ord.customer?.phone || ''
      );

    const search =
      orderSearch.toLowerCase();

    const matchesSearch =
      orderNumber.includes(search) ||
      customerName.includes(search) ||
      customerPhone.includes(orderSearch);

    const matchesStatus =
      orderStatusFilter === 'All' ||
      ord.orderStatus ===
        orderStatusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );
  });

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="space-y-6 pb-12">

      {/* ================================================================ */}
      {/* HEADER */}
      {/* ================================================================ */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-4">

        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">
            {activeSubTab === 'pos'
              ? 'Point of Sale (POS) Terminal'
              : 'Sales & Orders Fulfillment'}
          </h1>

          <p className="text-xs text-stone-500 mt-0.5">
            {activeSubTab === 'pos'
              ? 'Process custom showroom orders with real-time stock deduction'
              : `Tracking ${orders.length} total customer orders and deliveries`}
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-stone-100 p-1 rounded-xl border border-stone-200 self-start sm:self-auto">

          <button
            onClick={() => {
              setActiveSubTab('pos');
              setCheckoutStep(1);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeSubTab === 'pos'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>New Sale (POS)</span>
          </button>

          <button
            onClick={() =>
              setActiveSubTab('orders')
            }
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeSubTab === 'orders'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>
              Order History ({orders.length})
            </span>
          </button>

        </div>
      </div>

      {/* ================================================================ */}
      {/* POS */}
      {/* ================================================================ */}

      {activeSubTab === 'pos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ============================================================ */}
          {/* PRODUCT CATALOG */}
          {/* ============================================================ */}

          <div className="lg:col-span-7 space-y-4">

            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-3">

              <div className="relative">

                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

                <input
                  type="text"
                  value={catalogSearch}
                  onChange={e =>
                    setCatalogSearch(
                      e.target.value
                    )
                  }
                  placeholder="Quick scan / search furniture catalog by name or SKU..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

              </div>

              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">

                {categories.map(cat => (

                  <button
                    key={cat}
                    onClick={() =>
                      setSelectedCategory(cat)
                    }
                    className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-stone-900 text-stone-100 font-semibold'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                    }`}
                  >
                    {cat}
                  </button>

                ))}

              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[600px] overflow-y-auto pr-1">

              {filteredCatalog.map(item => {

                const inCart =
                  cart.find(
                    c =>
                      c.furnitureId ===
                      item.id
                  );

                const isOutOfStock =
                  Number(item.stock) <= 0;

                return (
                  <div
                    key={item.id}
                    onClick={() =>
                      !isOutOfStock &&
                      addToCart(item)
                    }
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isOutOfStock
                        ? 'opacity-50 bg-stone-100 border-stone-200 cursor-not-allowed'
                        : inCart
                          ? 'bg-amber-50/50 border-amber-400 ring-1 ring-amber-400/40'
                          : 'bg-white border-stone-200 hover:border-amber-400 hover:shadow-sm'
                    }`}
                  >

                    <div className="flex items-center space-x-3 min-w-0">

                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover border border-stone-200 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="min-w-0">

                        <div className="flex items-center space-x-1.5">

                          <span className="text-[10px] font-mono text-stone-400">
                            {item.sku}
                          </span>

                          <span
                            className={`text-[10px] font-bold px-1.5 rounded ${
                              Number(item.stock) <=
                              Number(item.minStockAlert)
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-emerald-50 text-emerald-800'
                            }`}
                          >
                            {item.stock} in stock
                          </span>

                        </div>

                        <h4 className="text-xs font-bold text-stone-900 truncate mt-0.5">
                          {item.name}
                        </h4>

                        <p className="text-[11px] text-stone-500 truncate">
                          {item.material}
                        </p>

                        <div className="text-xs font-bold text-amber-900 mt-1">
                          {currency}
                          {Number(
                            item.retailPrice || 0
                          ).toLocaleString()}
                        </div>

                      </div>

                    </div>

                    <button
                      type="button"
                      disabled={isOutOfStock}
                      className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                        isOutOfStock
                          ? 'bg-stone-200 text-stone-400'
                          : inCart
                            ? 'bg-amber-600 text-white'
                            : 'bg-stone-100 hover:bg-amber-600 hover:text-white text-stone-700'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                  </div>
                );
              })}

            </div>

          </div>

          {/* ============================================================ */}
          {/* CHECKOUT */}
          {/* ============================================================ */}

          <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col">

            {/* ========================================================== */}
            {/* CHECKOUT HEADER */}
            {/* ========================================================== */}

            <div className="pb-4 border-b border-stone-200">

              <div className="flex items-center justify-between">

                <div className="flex items-center space-x-2">

                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4" />
                  </div>

                  <h3 className="font-serif font-bold text-stone-900 text-base">
                    Current Sale Order
                  </h3>

                </div>

                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear Cart
                  </button>
                )}

              </div>

              {/* ======================================================== */}
              {/* STEP INDICATOR */}
              {/* ======================================================== */}

              <div className="flex items-center mt-4">

                <div
                  className={`flex items-center gap-1.5 text-[11px] font-semibold ${
                    checkoutStep === 1
                      ? 'text-amber-700'
                      : 'text-emerald-700'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      checkoutStep === 1
                        ? 'bg-amber-600 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {checkoutStep === 1 ? (
                      '1'
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                  </span>

                  <span>
                    Order Details
                  </span>
                </div>

                <div className="flex-1 h-px bg-stone-200 mx-3" />

                <div
                  className={`flex items-center gap-1.5 text-[11px] font-semibold ${
                    checkoutStep === 2
                      ? 'text-amber-700'
                      : 'text-stone-400'
                  }`}
                >

                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      checkoutStep === 2
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-200 text-stone-500'
                    }`}
                  >
                    2
                  </span>

                  <span>
                    Billing & Payment
                  </span>

                </div>

              </div>

            </div>

            {/* ========================================================== */}
            {/* ERROR */}
            {/* ========================================================== */}

            {posError && (

              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start space-x-2">

                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />

                <span>
                  {posError}
                </span>

              </div>

            )}

            {/* ========================================================== */}
            {/* CART */}
            {/* ========================================================== */}

            {cart.length === 0 ? (

              <div className="py-10 text-center text-stone-400">

                <ShoppingCart className="w-10 h-10 mx-auto text-stone-300 mb-2" />

                <p className="text-xs font-medium">
                  Cart is empty
                </p>

                <p className="text-[11px] text-stone-400 mt-0.5">
                  Click any furniture item on the left to add to order
                </p>

              </div>

            ) : (

              <div className="space-y-3 max-h-56 overflow-y-auto pr-1 my-4 divide-y divide-stone-100">

                {cart.map(item => (

                  <div
                    key={item.furnitureId}
                    className="pt-2.5 flex items-center justify-between gap-3"
                  >

                    <div className="min-w-0">

                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {item.name}
                      </h4>

                      <div className="text-[11px] text-stone-500">
                        {currency}
                        {Number(
                          item.unitPrice
                        ).toLocaleString()}
                        {' '}each
                      </div>

                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">

                      <div className="flex items-center space-x-1 bg-stone-100 rounded-lg p-0.5 border border-stone-200">

                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.furnitureId,
                              item.quantity - 1
                            )
                          }
                          className="p-1 hover:bg-stone-200 rounded text-stone-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="w-5 text-center font-bold text-xs">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.furnitureId,
                              item.quantity + 1
                            )
                          }
                          className="p-1 hover:bg-stone-200 rounded text-stone-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>

                      </div>

                      <span className="text-xs font-bold text-stone-900 w-16 text-right font-mono">
                        {currency}
                        {Number(
                          item.total
                        ).toLocaleString()}
                      </span>

                      <button
                        onClick={() =>
                          removeFromCart(
                            item.furnitureId
                          )
                        }
                        className="p-1 text-stone-400 hover:text-red-600 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

            {/* ========================================================== */}
            {/* STEP 1 */}
            {/* ========================================================== */}

            {checkoutStep === 1 &&
              cart.length > 0 && (

                <form
                  id="pos-order-form"
                  onSubmit={e => {
                    e.preventDefault();
                    handleContinueToBilling();
                  }}
                  className="space-y-3 pt-3 border-t border-stone-200"
                >

                  <div className="flex items-center gap-2 mb-2">

                    <User className="w-4 h-4 text-amber-700" />

                    <h4 className="text-sm font-semibold text-stone-900">
                      Customer Information
                    </h4>

                  </div>

                  <div className="grid grid-cols-2 gap-2">

                    <div>

                      <label className="block text-[10px] font-semibold text-stone-600 uppercase">
                        Customer Name *
                      </label>

                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={e =>
                          setCustomerName(
                            e.target.value
                          )
                        }
                        placeholder="e.g. Clara Montgomery"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />

                    </div>

                    <div>

                      <label className="block text-[10px] font-semibold text-stone-600 uppercase">
                        Phone Number *
                      </label>

                      <input
                        type="text"
                        required
                        value={customerPhone}
                        onChange={e =>
                          setCustomerPhone(
                            e.target.value
                          )
                        }
                        placeholder="(503) 555-0199"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />

                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-2">

                    <div>

                      <label className="block text-[10px] font-semibold text-stone-600 uppercase">
                        Email Address
                      </label>

                      <input
                        type="email"
                        value={customerEmail}
                        onChange={e =>
                          setCustomerEmail(
                            e.target.value
                          )
                        }
                        placeholder="clara@example.com"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />

                    </div>

                    <div>

                      <label className="block text-[10px] font-semibold text-stone-600 uppercase">
                        Delivery Date
                      </label>

                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={e =>
                          setDeliveryDate(
                            e.target.value
                          )
                        }
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />

                    </div>

                  </div>

                  <div>

                    <label className="block text-[10px] font-semibold text-stone-600 uppercase">
                      Delivery Address
                    </label>

                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={e =>
                        setDeliveryAddress(
                          e.target.value
                        )
                      }
                      placeholder="Street address (or leave empty for showroom pickup)"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />

                  </div>

                  <div>

                    <label className="block text-[10px] font-semibold text-stone-600 uppercase mb-1">
                      Fulfillment Service
                    </label>

                    <div className="grid grid-cols-3 gap-1.5 text-[11px]">

                      <button
                        type="button"
                        onClick={() =>
                          setDeliveryType(
                            'pickup'
                          )
                        }
                        className={`p-1.5 rounded-lg border text-center transition-colors ${
                          deliveryType ===
                          'pickup'
                            ? 'bg-amber-600 text-white border-amber-600 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        Store Pickup (Free)
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeliveryType(
                            'standard'
                          )
                        }
                        className={`p-1.5 rounded-lg border text-center transition-colors ${
                          deliveryType ===
                          'standard'
                            ? 'bg-amber-600 text-white border-amber-600 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        Curbside (+{currency}
                        {standardShippingFee})
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeliveryType(
                            'white_glove'
                          )
                        }
                        className={`p-1.5 rounded-lg border text-center transition-colors ${
                          deliveryType ===
                          'white_glove'
                            ? 'bg-amber-600 text-white border-amber-600 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        White Glove (+{currency}
                        {whiteGloveFee})
                      </button>

                    </div>

                  </div>

                  <div>

                    <label className="block text-[10px] font-semibold text-stone-600 uppercase">
                      Delivery Notes
                    </label>

                    <textarea
                      rows="2"
                      value={deliveryNotes}
                      onChange={e =>
                        setDeliveryNotes(
                          e.target.value
                        )
                      }
                      placeholder="Special delivery instructions..."
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />

                  </div>

                </form>
              )}

            {/* ========================================================== */}
            {/* STEP 2 */}
            {/* ========================================================== */}

            {checkoutStep === 2 &&
              cart.length > 0 && (

                <form
                  id="pos-billing-form"
                  onSubmit={
                    handleProcessSale
                  }
                  className="space-y-3 pt-3 border-t border-stone-200"
                >

                  <div className="flex items-center gap-2 mb-2">

                    <CreditCard className="w-4 h-4 text-amber-700" />

                    <h4 className="text-sm font-semibold text-stone-900">
                      Billing & Payment
                    </h4>

                  </div>

                  {/* Same as delivery */}

                  <label className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg border border-stone-200 cursor-pointer">

                    <input
                      type="checkbox"
                      checked={
                        billingSameAsDelivery
                      }
                      onChange={e =>
                        handleBillingSameAsDelivery(
                          e.target.checked
                        )
                      }
                      className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                    />

                    <span className="text-xs font-medium text-stone-700">
                      Billing information is the same as delivery information
                    </span>

                  </label>

                  {!billingSameAsDelivery && (

                    <div className="space-y-3">

                      <div className="grid grid-cols-2 gap-2">

                        <div>

                          <label className="block text-[10px] font-semibold text-stone-600 uppercase">
                            Billing Name *
                          </label>

                          <input
                            type="text"
                            value={billingName}
                            onChange={e =>
                              setBillingName(
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />

                        </div>

                        <div>

                          <label className="block text-[10px] font-semibold text-stone-600 uppercase">
                            Billing Phone *
                          </label>

                          <input
                            type="text"
                            value={billingPhone}
                            onChange={e =>
                              setBillingPhone(
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />

                        </div>

                      </div>

                      <div>

                        <label className="block text-[10px] font-semibold text-stone-600 uppercase">
                          Billing Email *
                        </label>

                        <input
                          type="email"
                          value={billingEmail}
                          onChange={e =>
                            setBillingEmail(
                              e.target.value
                            )
                          }
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />

                      </div>

                      <div>

                        <label className="block text-[10px] font-semibold text-stone-600 uppercase">
                          Billing Address *
                        </label>

                        <input
                          type="text"
                          value={billingAddress}
                          onChange={e =>
                            setBillingAddress(
                              e.target.value
                            )
                          }
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />

                      </div>

                      <div className="grid grid-cols-2 gap-2">

                        <div>

                          <label className="block text-[10px] font-semibold text-stone-600 uppercase">
                            City *
                          </label>

                          <input
                            type="text"
                            value={billingCity}
                            onChange={e =>
                              setBillingCity(
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />

                        </div>

                        <div>

                          <label className="block text-[10px] font-semibold text-stone-600 uppercase">
                            Postal Code *
                          </label>

                          <input
                            type="text"
                            value={billingPostalCode}
                            onChange={e =>
                              setBillingPostalCode(
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />

                        </div>

                      </div>

                    </div>

                  )}

                  {/* Payment */}

                  <div>

                    <label className="block text-[10px] font-semibold text-stone-600 uppercase">
                      Payment Method
                    </label>

                    <select
                      value={paymentMethod}
                      onChange={e =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                    >

                      <option value="credit_card">
                        Credit Card (POS)
                      </option>

                      <option value="bank_transfer">
                        Wire / Bank Transfer
                      </option>

                      <option value="cash">
                        Cash Showroom
                      </option>

                      <option value="financing">
                        12-Mo 0% Financing
                      </option>

                    </select>

                  </div>

                  {/* Discount */}

                  <div>

                    <label className="block text-[10px] font-semibold text-stone-600 uppercase">
                      Store Discount ({currency})
                    </label>

                    <input
                      type="number"
                      min="0"
                      max={cartSubtotal}
                      value={discountAmount}
                      onChange={e =>
                        setDiscountAmount(
                          Number(
                            e.target.value
                          ) || 0
                        )
                      }
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 font-mono"
                    />

                  </div>

                </form>
              )}

            {/* ========================================================== */}
            {/* SUMMARY */}
            {/* ========================================================== */}

            {cart.length > 0 && (

              <div className="mt-4 pt-3 border-t border-stone-200 space-y-2">

                <div className="space-y-1 text-xs text-stone-600">

                  <div className="flex justify-between">
                    <span>
                      Subtotal:
                    </span>

                    <span>
                      {currency}
                      {cartSubtotal.toFixed(2)}
                    </span>
                  </div>

                  {safeDiscount > 0 && (

                    <div className="flex justify-between text-emerald-700">

                      <span>
                        Discount:
                      </span>

                      <span>
                        -{currency}
                        {safeDiscount.toFixed(2)}
                      </span>

                    </div>

                  )}

                  <div className="flex justify-between">

                    <span>
                      Delivery (
                      {deliveryType.replace(
                        '_',
                        ' '
                      )}
                      ):
                    </span>

                    <span>
                      {currency}
                      {deliveryFee.toFixed(2)}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span>
                      Est. Tax (
                      {(taxRate * 100).toFixed(
                        1
                      )}
                      %):
                    </span>

                    <span>
                      {currency}
                      {taxAmount.toFixed(2)}
                    </span>

                  </div>

                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-stone-100">

                    <span>
                      Grand Total:
                    </span>

                    <span className="text-amber-900 font-serif text-lg">
                      {currency}
                      {cartTotal.toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                        }
                      )}
                    </span>

                  </div>

                </div>

                {/* ====================================================== */}
                {/* STEP BUTTONS */}
                {/* ====================================================== */}

                {checkoutStep === 1 ? (

                  <button
                    type="submit"
                    form="pos-order-form"
                    className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
                  >

                    <span>
                      Continue to Billing
                    </span>

                    <ArrowRight className="w-4 h-4" />

                  </button>

                ) : (

                  <div className="grid grid-cols-2 gap-2">

                    <button
                      type="button"
                      onClick={() => {
                        setPosError(null);
                        setCheckoutStep(1);
                      }}
                      className="py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all"
                    >

                      <ArrowLeft className="w-4 h-4" />

                      <span>
                        Back
                      </span>

                    </button>

                    <button
                      type="submit"
                      form="pos-billing-form"
                      className="py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
                    >

                      <CheckCircle2 className="w-4 h-4" />

                      <span>
                        Complete Sale
                      </span>

                    </button>

                  </div>

                )}

              </div>
            )}

          </div>

        </div>
      )}

      {/* ================================================================ */}
      {/* ORDER HISTORY */}
      {/* ================================================================ */}

      {activeSubTab === 'orders' && (

        <div className="space-y-4">

          {/* Filters & Export */}

          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">

            <div className="relative flex-1">

              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

              <input
                type="text"
                value={orderSearch}
                onChange={e =>
                  setOrderSearch(
                    e.target.value
                  )
                }
                placeholder="Search orders by customer name, order number, or phone..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

            </div>

            <div className="flex items-center space-x-2">

              <select
                value={orderStatusFilter}
                onChange={e =>
                  setOrderStatusFilter(
                    e.target.value
                  )
                }
                className="px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 font-medium text-stone-700"
              >

                <option value="All">
                  All Order Statuses
                </option>

                <option value="processing">
                  Processing
                </option>

                <option value="scheduled">
                  Delivery Scheduled
                </option>

                <option value="in_transit">
                  In Transit
                </option>

                <option value="delivered">
                  Delivered & Assembled
                </option>

                <option value="cancelled">
                  Cancelled / Refunded
                </option>

              </select>

              <button
                onClick={onExportOrdersCSV}
                className="px-3.5 py-2 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl flex items-center space-x-1.5 transition-colors"
              >

                <Download className="w-3.5 h-3.5" />

                <span className="hidden sm:inline">
                  Export CSV
                </span>

              </button>

            </div>

          </div>

          {/* Orders Cards Grid */}

          <div className="space-y-3">

            {filteredOrders.length === 0 ? (

              <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">

                <FileText className="w-12 h-12 text-stone-300 mx-auto mb-3" />

                <h3 className="text-sm font-semibold text-stone-800">
                  No orders found
                </h3>

                <p className="text-xs text-stone-500 mt-1">
                  Try changing your search or create a new sale.
                </p>

              </div>

            ) : (

              filteredOrders.map(order => (

                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:border-amber-300 transition-all space-y-4"
                >

                  {/* Order Header */}

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-stone-100">

                    <div className="flex items-center space-x-3">

                      <div className="p-2 bg-stone-100 rounded-xl text-stone-700">

                        <Package className="w-5 h-5" />

                      </div>

                      <div>

                        <div className="flex items-center space-x-2">

                          <span className="font-mono font-bold text-sm text-stone-900">
                            {order.orderNumber}
                          </span>

                          <span className="text-xs text-stone-400">
                            •{' '}
                            {new Date(
                              order.createdAt
                            ).toLocaleDateString(
                              undefined,
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )}
                          </span>

                        </div>

                        <p className="text-xs text-stone-600 font-medium">

                          Customer:{' '}

                          <strong className="text-stone-900">
                            {order.customer.name}
                          </strong>

                          {' '}({order.customer.phone})

                        </p>

                      </div>

                    </div>

                    <div className="flex items-center space-x-2.5">

                      <select
                        value={
                          order.orderStatus
                        }
                        onChange={e =>
                          onUpdateOrderStatus(
                            order.id,
                            e.target.value
                          )
                        }
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${
                          order.orderStatus ===
                          'delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : order.orderStatus ===
                              'in_transit'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : order.orderStatus ===
                                'scheduled'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : order.orderStatus ===
                                  'cancelled'
                                  ? 'bg-red-50 text-red-800 border-red-300'
                                  : 'bg-stone-50 text-stone-800 border-stone-300'
                        }`}
                      >

                        <option value="processing">
                          Processing
                        </option>

                        <option value="scheduled">
                          Delivery Scheduled
                        </option>

                        <option value="in_transit">
                          In Transit
                        </option>

                        <option value="delivered">
                          Delivered & Assembled
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>

                      </select>

                      <button
                        onClick={() =>
                          onViewInvoice(order)
                        }
                        className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-medium rounded-lg flex items-center space-x-1 shadow-xs"
                      >

                        <FileText className="w-3.5 h-3.5 text-amber-400" />

                        <span>
                          Receipt / Invoice
                        </span>

                      </button>

                    </div>

                  </div>

                  {/* Order Items Snapshot */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

                    {order.items.map(
                      (item, idx) => (

                        <div
                          key={idx}
                          className="flex items-center space-x-3 p-2 rounded-xl bg-stone-50 border border-stone-100"
                        >

                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover border border-stone-200 flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />

                          <div className="min-w-0">

                            <h5 className="text-xs font-bold text-stone-900 truncate">
                              {item.name}
                            </h5>

                            <p className="text-[11px] text-stone-500">

                              Qty: {item.quantity} ×{' '}

                              {currency}
                              {item.unitPrice} ={' '}

                              <span className="font-semibold text-stone-800">

                                {currency}
                                {item.total}

                              </span>

                            </p>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                  {/* Order Footer summary */}

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 text-xs text-stone-500 gap-2">

                    <div className="flex flex-wrap items-center gap-3">

                      <span>
                        Delivery:{' '}
                        <strong className="text-stone-800 capitalize">
                          {order.deliveryType.replace(
                            '_',
                            ' '
                          )}
                        </strong>
                      </span>

                      <span>
                        Target Date:{' '}
                        <strong className="text-stone-800">
                          {order.deliveryDate}
                        </strong>
                      </span>

                      <span>
                        Payment:{' '}
                        <strong className="text-stone-800 capitalize">
                          {order.paymentMethod.replace(
                            '_',
                            ' '
                          )}
                        </strong>
                      </span>

                      {order.customer.deliveryAddress && (

                        <span className="truncate max-w-xs text-stone-600">
                          Address:{' '}
                          {order.customer.deliveryAddress}
                        </span>

                      )}

                    </div>

                    <div className="flex items-center space-x-3">

                      <span className="text-stone-400">

                        Net Profit:{' '}

                        <strong className="text-emerald-700">
                          +
                          {currency}
                          {Number(
                            order.profit || 0
                          ).toFixed(2)}
                        </strong>

                      </span>

                      <span className="text-sm font-serif font-bold text-stone-900">

                        Total:{' '}

                        {currency}
                        {Number(
                          order.total || 0
                        ).toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                          }
                        )}

                      </span>

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>
      )}

    </div>
  );
};