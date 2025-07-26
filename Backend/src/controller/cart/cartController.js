import { Cart } from '../../models/index.js';

const getCart = async (req, res) => {
  try {
    console.log('User in getCart:', req.user);
    if (!req.user || !req.user.user || !req.user.user.id) {
      return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }
    const userId = req.user.user.id;

    // If admin user, return all carts
    if (userId === "admin") {
      const allCarts = await Cart.findAll();
      return res.status(200).json({ data: allCarts });
    }

    console.log('Fetching cart for userId:', userId);
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      console.log('No cart found for userId:', userId, 'Creating new cart');
      cart = await Cart.create({ userId, items: [], total: 0 });
    } else {
      // Recalculate total based on items
      const items = cart.items || [];
      const total = items.reduce((acc, curr) => {
        const price = parseFloat(curr.price) || 0;
        const quantity = parseInt(curr.quantity) || 1;
        return acc + price * quantity;
      }, 0);
      if (parseFloat(cart.total) !== total) {
        cart.total = total.toFixed(2);
        await cart.save();
      }
    }
    console.log('Cart found or created:', cart.toJSON());
    res.status(200).json({ data: cart.toJSON() });
  } catch (error) {
    console.error('Error in getCart:', error);
    console.error(error.stack);
    res.status(500).json({ error: 'Failed to fetch cart', message: error.message, stack: error.stack });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.user.user.id;
    const { items, total } = req.body;
    const [cart] = await Cart.findOrCreate({
      where: { userId },
      defaults: { items: [], total: 0 }
    });
    cart.items = items;
    cart.total = total;
    await cart.save();
    res.status(200).json({ data: cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.user.id;
    const item = req.body;
    const [cart] = await Cart.findOrCreate({
      where: { userId },
      defaults: { items: [], total: 0 }
    });
    // Add item to cart items
    const items = cart.items || [];
    items.push(item);
    // Calculate total
    const total = items.reduce((acc, curr) => {
      const price = parseFloat(curr.price) || 0;
      const quantity = parseInt(curr.quantity) || 1;
      return acc + price * quantity;
    }, 0);
    cart.items = items;
    cart.total = total.toFixed(2);
    await cart.save();
    res.status(200).json({ data: cart });
  } catch (error) {
    console.error('Error in addToCart:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

export const cartController = {
  getCart,
  updateCart,
  addToCart,

  removeFromCart: async (req, res) => {
    try {
      const userId = req.user.user.id;
      const itemId = req.params.itemId;
      const cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
      let items = cart.items || [];
      // Remove item by itemId
      items = items.filter(item => item.id !== itemId);
      // Recalculate total
      const total = items.reduce((acc, curr) => {
        const price = parseFloat(curr.price) || 0;
        const quantity = parseInt(curr.quantity) || 1;
        return acc + price * quantity;
      }, 0);
      cart.items = items;
      cart.total = total.toFixed(2);
      await cart.save();
      res.status(200).json({ data: cart });
    } catch (error) {
      console.error('Error in removeFromCart:', error);
      res.status(500).json({ error: 'Failed to remove item from cart' });
    }
  }
};
