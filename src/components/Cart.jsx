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
        const response = await fetch('/api/cart');
        const data = await response.json();
        if (data.data && data.data.items) {
          onUpdateCart(data.data.items);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load cart');
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
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Render cart content here */}
    </div>
  );
};

export default Cart;
