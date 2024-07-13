const express = require('express');
const bookModel = require('./src/module/Books/books.model');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.get('/livros', async (_, res) => {
    const books = await bookModel.find({});
    return res.status(200).json(books);
});

app.post('/livros', async  (req, res) => {
    if(!req.body.id){
        return res.status(400).json({ message: 'O campo de ID é obrigatório'});
      }
      if(!req.body.titulo){
          return res.status(400).json({ message: 'O campo titulo é obrigatorio'});
      }
      if(!req.body.numeroPgn){
        return res.status(400).json({ message: 'O campo numero de paginas é obrigatorio'});
      }
      if(!req.body.isbn){
        return res.status(400).json({ message: 'O campo isbn é obrigatório'});
      }
      if(!req.body.editora){
        return res.status(400).json({ message: 'O campo editora é obrigatório'});
      }

      const book = await bookModel.create({
        id: req.body.id,
        titulo: req.body.titulo,
        numeroPgn: req.body.numeroPgn,
        isbn: req.body.isbn,
        editora: req.body.editora,
      });
    return res.status(201).json(book);
});



app.delete('/livros/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const book = await bookModel.findByIdAndDelete(id);
      if (!book) {
          return res.status(404).json({ message: 'Livro não encontrado' });
      }
      return res.status(200).json({ message: 'Livro deletado com sucesso' });
  } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar livro', error });
  }
});

app.put('/livros/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, numeroPgn, isbn, editora } = req.body;

  if (!titulo && !numeroPgn && !isbn && !editora) {
      return res.status(400).json({ message: 'Pelo menos um campo é obrigatório para atualização' });
  }

  try {
      const book = await bookModel.findByIdAndUpdate(
          id,
          { titulo, numeroPgn, isbn, editora },
          { new: true }
      );
      if (!book) {
          return res.status(404).json({ message: 'Livro não encontrado' });
      }
      return res.status(200).json(book);
  } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar livro', error });
  }
});

app.listen(port = 7000, () => {
    console.log(`Servidor funcionando na porta ${port} `)
});