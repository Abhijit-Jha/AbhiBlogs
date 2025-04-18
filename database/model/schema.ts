import mongoose, { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10000,
  },
  link: {
    type: String,
    default: '',
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Blog = models.Blog || model('Blog', BlogSchema);
