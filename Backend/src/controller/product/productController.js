import { Product } from '../../models/index.js';
import multer from 'multer';
import path from 'path';

// Setup multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

export const upload = multer({ storage });

/**
 * Fetch all products, optionally filtered by category
 */
const getAll = async (req, res) => {
  try {
    const { category } = req.query;
    const where = {};
    if (category) {
      where.category = category;
    }
    const products = await Product.findAll({ where });
    res.status(200).send({ data: products, message: 'Successfully fetched products' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

/**
 * Create new product with image upload
 */
const create = async (req, res) => {
  try {
    const { name, description, price, stock, category, size, color } = req.body;

    if (!name || price == null) {
      return res.status(400).send({ message: 'Name and price are required' });
    }

    // Store only the filename
    const image = req.file ? req.file.filename : null;

    const product = await Product.create({
      name,
      description,
      price,
      stock: stock ?? 0,
      category,
      image,
      size: size ? JSON.parse(size) : [],
      color: color ? JSON.parse(color) : [],
    });

    res.status(201).send({ data: product, message: 'Product created successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

/**
 * Update existing product
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, size, color } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;
    product.category = category ?? product.category;
    if (image !== undefined) product.image = image;
    if (size) product.size = JSON.parse(size);
    if (color) product.color = JSON.parse(color);

    await product.save();

    res.status(200).send({ data: product, message: 'Product updated successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

/**
 * Delete product by ID
 */
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    await product.destroy();

    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

/**
 * Get product by ID
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).send({ data: product, message: 'Product fetched successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const productController = {
  getAll,
  create,
  update,
  deleteById,
  getById,
};