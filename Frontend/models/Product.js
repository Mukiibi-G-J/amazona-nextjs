import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
//! conditionall statement if (mongoose.models.Product is > null)IF  then create it(mongoose.model('Product', productSchema))
//* ohter wise if (mongoose.models.Product is > exist) then donot create it
const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
