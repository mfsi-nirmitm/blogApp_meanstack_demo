const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const Post = require('./models/post');

const app = express();

const config = {
  dbName:'test',
  autoIndex: false,
  useNewUrlParser: true,
  useCreateIndex: true
};
// mongoose.connect("mongodb+srv://nirmit:YPpc8DryZOwLwxKw@cluster0-hanrm.mongodb.net/",config)
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });

mongoose.Promise = global.Promise;

async function run() {
  await mongoose.connect("mongodb+srv://nirmit:YPpc8DryZOwLwxKw@cluster0-hanrm.mongodb.net/",config);
}

run().then(() => {
        console.log("Connected to database!");
     })
     .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/posts',(req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts',(req, res, next) => {
  const posts = [
    {
      id: 'fadf12421l',
      title: 'First server-side post',
      content: 'This is coming from the server'
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming form the server!"
    }
  ];
  return res.status(200).json({
    message: 'Posts fetched succesfully!',
    posts: posts
  });
});

module.exports = app;
