import React, { useState, useEffect } from 'react';

// Utility function to calculate cart total
const calculateTotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

const Cart = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onUpdateCart, // Add this prop for updating cart from fetched data
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/cart');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch cart: ${response.statusText}`);
        }
        
        const data = await response.json();
        if (data.data && data.data.items) {
          onUpdateCart(data.data.items);
        }
      } catch (err) {
        console.error('Cart fetch error:', err);
        setError('Unable to load your cart. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, [onUpdateCart]);
  const handleUpdateQuantity = async (index, newQuantity) => {
    try {
      setIsLoading(true);
      const updatedItems = cartItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      );
      await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: updatedItems,
          total: calculateTotal(updatedItems),
        }),
      });
      onUpdateQuantity(index, newQuantity);
    } catch (err) {
      console.error(err);
      setError('Failed to update quantity');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = async (index) => {
    try {
      setIsLoading(true);
      const updatedItems = cartItems.filter((_, i) => i !== index);
      await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: updatedItems,
          total: calculateTotal(updatedItems),
        }),
      });
      onRemoveItem(index);
    } catch (err) {
      console.error(err);
      setError('Failed to remove item');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          </div>
          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading && <p className="text-center py-4">Loading...</p>}
            {error && <p className="text-center py-4 text-red-500">{error}</p>}
            
            {!isLoading && !error && cartItems.length === 0 && (
              <p className="text-center py-4 text-gray-500">Your cart is empty</p>
            )}
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 py-4 border-b border-gray-200">
                <img
                  src={item.product.image || item.product.image_url}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">
                    Size: {item.selectedSize}, Color: {item.selectedColor}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    Rs. {item.product.price * item.quantity}
                  </p>
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between mb-4">
              <span className="font-medium text-gray-900">Total</span>
              <span className="font-bold text-gray-900">
                Rs. {cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => onCheckout(cartItems, cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0))}
              disabled={cartItems.length === 0}
              className="w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 disabled:bg-gray-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
