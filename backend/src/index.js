const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://RicardoPellegrini:Lopmi99!@cluster0.gtmmw.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', require('./routes/index'));

const port = process.env.PORT | 3333;


app.listen(port);