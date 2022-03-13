const mongoose = require('mongoose');
const { Schema } = mongoose;

// https://mongoosejs.com/docs/guide.html#definition

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  }
}, { timestamps: true });


// https://stackoverflow.com/questions/22950282/mongoose-schema-vs-model

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
