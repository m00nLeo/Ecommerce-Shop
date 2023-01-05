import { Router } from "express";
import Product from "../model/product";

const router = Router();

//////////////////////////////////////////////////////// PRODUCTS //////////////////////////////////////////////////////////////

// Get all products
router.get("/", async (request, response) => {
  // Get a product list to database
  // const productSample = await Product.find({}); // find all documents
  const productSample = await Product.find(request.query); // find all documents

  response.json({
    products: productSample,
    total: 100,
    skip: 0,
    limit: 30,
  });
});

// Get all products Categories
router.get("/categories", async (req, res) => {
  const categories = await Product.distinct("category");
  res.json(categories);
});

// Search product by Admin
router.get("/search", async (req, res) => {
  const products = await Product.find({
    title: { $regex: req.query.q || "", $options: "i" }, // filter with regax is to find the keyword, options:"i" to set its case-insensetive (khong quan trong viet hoa hay thuong)
  });

  res.json({ products: products, limit: 10, skip: 0 });
});

// READ (Get) a product by Id
router.get("/:productId", async (req, res) => {
  // Mongo get, find Id in database
  const product = await Product.findById(req.params.productId);

  // No Mongo -> find in server
  // const product = products.find(
  //   (item) => item.id === parseInt(req.params.productId)
  //   // (item) => item.id === Number(req.params.productId)
  // );

  if (!product)
    return res.json({
      message: `Not Found Product with Id: '${req.params.productId}'`,
    });

  res.json(product);
});

// Get product of category
router.get("/category/:category", async (req, res) => {
  const category = await Product.find({ category: req.params.category });
  res.json({ products: category, total: 5, skip: 0 });
});

// CREATE (Post) / add a new product
router.post("/add", async (req, res) => {
  // Mongo Method 1 to save to database
  // const newProduct = new Product(req.body)
  // await newProduct.save()

  // Mongo Method 2 (recommended)
  const newProduct = await Product.create(req.body);

  // No Mongo --> save to server
  // const newProduct = { id: products.length + 1, ...req.body };
  // products.push(newProduct);

  res.json(newProduct);
});

// UPDATE (Put) a product by Id
router.put("/:productId", async (req, res) => {
  // Mongo
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { new: true }
  ); // A.findByIdAndUpdate(id, update, option{})

  // // Get product Id no Mongo
  // const productId = parseInt(req.params.productId);
  // //
  // const updateProduct = { id: productId, ...req.body };
  // //
  // const idx = products.findIndex((item) => item.id === productId);
  // //
  // products[idx] = updateProduct;

  res.json(updateProduct);
});

// DELETE (Delete a product)
router.delete("/:productId", async (req, res) => {
  // Mongo
  const deletedProduct = await Product.findByIdAndDelete(req.params.productId); //A.findOneAndDelete(conditions)

  // // Get product Id
  // const productId = parseInt(req.params.productId);

  // // Get deleted product by id
  // const deletedProduct = products.filter((item) => item.id === productId);

  // // Remove product by id
  // products = products.filter((item) => item.id !== productId);

  res.json(deletedProduct);
});

export default router;
