const mongoose = require('../../config/mongo');
const { Schema } = mongoose;

const bookSchema = new Schema({
  id: String,
  titulo: String,
  numeroPng: String,
  isbn: String,
  editora: String,
},
{
    timestamps: true,
});

const BookModel = mongoose.model('livros', bookSchema);

module.exports = BookModel;