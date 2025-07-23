import { Cart } from '../../models/index.js';
const getCart = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }
    const userId = req.user.id;
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(200).json({ data: { items: [] } });
    }
    res.status(200).json({ data: cart.toJSON() });
  } catch (error) {
    console.error('Error in getCart:', error);
    console.error(error.stack);
    res.status(500).json({ error: 'Failed to fetch cart', message: error.message, stack: error.stack });
  }
};
const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
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
export const cartController = {
  getCart,
  updateCart
};