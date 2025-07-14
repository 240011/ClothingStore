import { Cart } from '../../models/index.js';
const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user is authenticated
    const cart = await Cart.findOne({ where: { userId } });
    res.status(200).json({ data: cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
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