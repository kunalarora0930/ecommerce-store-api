import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Additional fields...
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
