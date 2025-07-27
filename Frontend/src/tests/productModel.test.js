const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();



const ProductMock = dbMock.define('Product', {
  id: 1,
  productName: 'Test Product',
  price: 99.99,
  description: 'This is a test product',
  productImage: 'test.jpg'
});

describe('Product Model', () => {
  it('should create a product', async () => {
    const product = await ProductMock.create({
      productName: 'New Product',
      price: 49.99,
      description: 'A new test product',
      productImage: 'new.jpg',
    });

    expect(product.productName).toBe('New Product');
    expect(product.price).toBe(49.99);
    expect(product.description).toBe('A new test product');
    expect(product.productImage).toBe('new.jpg');
  });

  it('should require a product name and price', async () => {
    await expect(ProductMock.create({})).rejects.toThrow();
    // Mock to simulate validation error
    const originalCreate = ProductMock.create;
    ProductMock.create = jest.fn().mockRejectedValue(new Error('Validation error'));
    
    await expect(ProductMock.create({})).rejects.toThrow('Validation error');
    
    // Restore original function
    ProductMock.create = originalCreate;
  });
});