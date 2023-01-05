import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  price: Number,
  category: String,
});

// Conver "_id" to "id"
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

// productSchema.index({ "$**": "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;
