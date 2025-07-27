import React, { useState, useEffect } from 'react';
import { getCart, updateCart, removeFromCart } from '../Services/cartService';
import { useNavigate } from 'react-router-dom';

// Utility function to calculate cart total
const calculateTotal = (items) =>
  items.reduce((total, item) => total + item.product.price * item.quantity, 0);

const Cart = ({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onUpdateCart,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    try {
      const total = calculateTotal(cartItems);
      alert(`Checkout initiated for ${cartItems.length} items. Total: Rs. ${total.toFixed(2)}`);

      await updateCart(cartItems, total);
      localStorage.setItem('cartAfterCheckout', JSON.stringify(cartItems));

      onClose(); // Close the cart
      navigate('/');
    } catch (error) {
      console.error('Checkout failed:', error);
      setError('Checkout failed. Please try again.');
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      if (isOpen) {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('Please login to view your cart.');
          setIsLoading(false);
          return;
        }
        try {
          setIsLoading(true);
          setError(null);
          const response = await getCart();
          if (response.data && response.data.items) {
            onUpdateCart(response.data.items);
          }
        } catch (err) {
          console.error('Cart fetch error:', err);
          if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            setError('Please login to view your cart.');
          } else {
            setError('');
          }
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchCartData();
  }, [isOpen, onUpdateCart]);

  const handleUpdateQuantity = async (index, newQuantity) => {
    if (newQuantity <= 0) return;
    try {
      const updatedItems = cartItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      );
      const total = calculateTotal(updatedItems);
      await updateCart(updatedItems, total);
      onUpdateQuantity(index, newQuantity);
    } catch (err) {
      console.error(err);
      setError('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (itemId, index) => {
    try {
      await removeFromCart(itemId);
      onRemoveItem(index);
    } catch (err) {
      console.error(err);
      setError('Failed to remove item');
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
              <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700">
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
              <div key={item.id || index} className="flex items-center gap-4 py-4 border-b border-gray-200">
                <img
                  src={
                    item.product.image
                      ? `http://localhost:3000/uploads/${item.product.image.split('/').pop()}`
                      : 'https://placehold.co/100'
                  }
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">
                    Size: {item.selectedSize || 'N/A'}, Color: {item.selectedColor || 'N/A'}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => handleRemoveItem(item.id, index)}
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
                Rs. {calculateTotal(cartItems)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
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
