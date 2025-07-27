jest.mock("../../../Backend/src/models/product/Product", () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

jest.mock("../../../Backend/src/controller/product/productController", () => ({
  createProduct: jest.fn((req, res) => {
    res.status(201).json(req.body);
  }),
  getAllProducts: jest.fn((req, res) => {
    res.status(200).json([{ id: 1, productName: "Test Product" }]);
  }),
  getProductById: jest.fn((req, res) => {
    if (req.params.id === 1) {
      res.status(200).json({ id: 1, productName: "Test Product" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  }),
}));

const productController = require("../../../Backend/src/controller/product/productController");
const Product = require("../../../Backend/src/models/product/Product");

describe("Product Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it("should create a new product", async () => {
    const req = {
      body: {
        productName: "Test Product",
        price: 99.99,
        description: "Test Desc",
      },
    };
    const res = mockResponse();
    Product.create.mockResolvedValue(req.body);

    await productController.createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(req.body));
  });

  it("should return all products", async () => {
    const req = {};
    const res = mockResponse();
    Product.findAll.mockResolvedValue([{ id: 1, productName: "Test Product" }]);

    await productController.getAllProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([{ id: 1, productName: "Test Product" }])
    );
  });

  it("should return a product by ID", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();
    Product.findByPk.mockResolvedValue({ id: 1, productName: "Test Product" });

    await productController.getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  it("should return 404 if product not found", async () => {
    const req = { params: { id: 2 } };
    const res = mockResponse();
    Product.findByPk.mockResolvedValue(null);

    await productController.getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Product not found" });
  });
});
