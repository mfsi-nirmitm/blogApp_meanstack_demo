const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

const config = {
  dbName:'blogApp',
//  autoIndex: false,
//  useCreateIndex: true,
  useNewUrlParser: true
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
  await mongoose.connect("mongodb+srv://nirmit:" + process.env.MONGO_ATLAS_PW + "@cluster0-hanrm.mongodb.net/",config);
}

run().then(() => {
        console.log("Connected to database!");
     })
     .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use("/api/posts",postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
