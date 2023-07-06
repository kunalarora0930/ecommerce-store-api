import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inventory: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
  // Other fields...
});

const Product = mongoose.model('Product', productSchema);

export default Product;
