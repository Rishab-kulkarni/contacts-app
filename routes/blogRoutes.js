
const express = require('express');
const Blog = require('../models/blog');



const router = express.Router();              //  like a mini-app (for better file organization)


router.get('/', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'Contacts', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    })
});

router.post('/', (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then((result) => {
      res.redirect('/contacts');
    })
    .catch((err) => {
      console.log(err);
    })
});


router.get('/create', (req, res) => {
  res.render('create', { title: 'Create Contact' });
})


router.get('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Contact details' });
    })
    .catch((err) => {
      console.log(err);
    })
});


router.delete('/:id', (req, res) => {
  const id = req.params.id;

  /** Can't redirect from backend directly, so send json */
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/contacts' });
    })
    .catch((err) => {
      console.log(err);
    })
})


module.exports = router;
