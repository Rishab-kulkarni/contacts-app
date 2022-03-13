const express = require('express');
const morgan = require('morgan');       // npm package for logging into the console, a middleware
const mongoose = require('mongoose');

// TODO - Load environment variables from .env file for protecting sensitive data.
require('dotenv').config()

const blogRoutes = require('./routes/blogRoutes')


const app = express();

// connect to mongodb.
const dbURI = 'mongodb+srv://rishab:rishab1234@cluster0.luixr.mongodb.net/contacts-app?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

// register view engine -- looks for file with extension ejs
app.set('view engine', 'ejs');



// middleware
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));        // for accepting form data, 


app.get('/favicon.ico', (req, res) => {
  res.status(204);
  res.end();
});

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  // res.send('<p>Express from home page </p>')
  res.render('about', { title: 'About' });
});


// blog routes
app.use('/contacts', blogRoutes);


// for 404 page
// basically executes happen sequentially, (like the last else part in an if-else-if ladder)
// this part should always be present at the last, the above code executes sequentially 
app.use((req, res) => {
  res.status(400).render('404', { title: '404' });
})

