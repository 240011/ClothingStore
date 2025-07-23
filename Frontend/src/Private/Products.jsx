import React, { useState, useEffect } from "react";
import { Plus, Search, Eye, Edit, Trash2, Package, CheckCircle, AlertCircle } from "lucide-react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../Services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showViewProductModal, setShowViewProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "T-shirt",
    price: "",
    stock: "",
    description: "",
    image: null,
    size: [],
    color: [],
  });
  const [editProductData, setEditProductData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null,
    size: [],
    color: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categories = ["T-shirt", "Jeans", "Accessories", "Dresses"];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data.map(product => ({
        ...product,
        status: product.stock > 15 ? "active" : product.stock > 0 ? "low-stock" : "out-of-stock",
      })));
      setError(null);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      fetchProducts();
      setShowAddProductModal(false);
      setNewProduct({ name: "", category: "T-shirt", price: "", stock: "", description: "", image: null, size: [], color: [] });
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(editProductData.id, editProductData);
      fetchProducts();
      setShowEditProductModal(false);
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        fetchProducts();
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  const getFilteredProducts = () => {
    let filtered = products;
    if (selectedFilter !== "all") {
      filtered = filtered.filter((product) => product.category === selectedFilter);
    }
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.id.toString().includes(query)
      );
    }
    return filtered;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "low-stock": return "bg-orange-100 text-orange-800";
      case "out-of-stock": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active": return <CheckCircle className="w-4 h-4" />;
      case "low-stock": return <AlertCircle className="w-4 h-4" />;
      case "out-of-stock": return <AlertCircle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowViewProductModal(true);
  };

  const handleEditProduct = (product) => {
    setEditProductData({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      image: null,
      size: product.size || [],
      color: product.color || [],
    });
    setShowEditProductModal(true);
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="space-y-6">
      {/* Products Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-600">
            Manage your product inventory{" "}
            {filteredProducts.length !== products.length &&
              `(${filteredProducts.length} of ${products.length} products shown)`}
          </p>
        </div>
        <button
          onClick={() => setShowAddProductModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>
        {loading ? (
          <div className="p-6 text-center">Loading products...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product.image ? `http://localhost:3000/uploads/${product.image.split('/').pop()}` : "https://placehold.co/100"}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Rs. {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(product.status)}`}>
                        {getStatusIcon(product.status)}
                        <span className="capitalize">{product.status.replace("-", " ")}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleViewProduct(product)} className="text-blue-600 hover:text-blue-700 p-1">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleEditProduct(product)} className="text-green-600 hover:text-green-700 p-1">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-700 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Product</h3>
            <form onSubmit={handleAddProduct}>
              <div className="space-y-4">
                <input type="text" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                <textarea placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg"></textarea>
                <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                <input type="number" placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                <input type="text" placeholder="Sizes (comma-separated)" value={newProduct.size} onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value.split(',') })} className="w-full px-3 py-2 border rounded-lg" />
                <input type="text" placeholder="Colors (comma-separated)" value={newProduct.color} onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value.split(',') })} className="w-full px-3 py-2 border rounded-lg" />
                <input type="file" onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })} className="w-full" />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button type="button" onClick={() => setShowAddProductModal(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white">Add Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleUpdateProduct}>
              <div className="space-y-4">
                <input type="text" placeholder="Product Name" value={editProductData.name} onChange={(e) => setEditProductData({ ...editProductData, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                <textarea placeholder="Description" value={editProductData.description} onChange={(e) => setEditProductData({ ...editProductData, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg"></textarea>
                <select value={editProductData.category} onChange={(e) => setEditProductData({ ...editProductData, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input type="number" placeholder="Price" value={editProductData.price} onChange={(e) => setEditProductData({ ...editProductData, price: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                <input type="number" placeholder="Stock" value={editProductData.stock} onChange={(e) => setEditProductData({ ...editProductData, stock: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                <input type="text" placeholder="Sizes (comma-separated)" value={editProductData.size} onChange={(e) => setEditProductData({ ...editProductData, size: e.target.value.split(',') })} className="w-full px-3 py-2 border rounded-lg" />
                <input type="text" placeholder="Colors (comma-separated)" value={editProductData.color} onChange={(e) => setEditProductData({ ...editProductData, color: e.target.value.split(',') })} className="w-full px-3 py-2 border rounded-lg" />
                <input type="file" onChange={(e) => setEditProductData({ ...editProductData, image: e.target.files[0] })} className="w-full" />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button type="button" onClick={() => setShowEditProductModal(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {showViewProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">{selectedProduct.name}</h3>
            <img src={selectedProduct.image ? `http://localhost:3000/uploads/${selectedProduct.image.split('/').pop()}` : "https://placehold.co/400"} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedProduct.id}</p>
              <p><strong>Category:</strong> {selectedProduct.category}</p>
              <p><strong>Price:</strong> Rs. {selectedProduct.price}</p>
              <p><strong>Stock:</strong> {selectedProduct.stock}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={() => setShowViewProductModal(false)} className="px-4 py-2 rounded-lg border">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;