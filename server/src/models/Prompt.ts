import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  prompt: { type: String, required: true },
  response: { type: String },
}, { timestamps: true });

export default mongoose.model('Prompt', promptSchema);