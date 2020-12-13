const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
//mongoDB connection string
const host = `localhost:27017`
const user = ``
const password = ``
// const url = `mongodb+srv://${user}:${password}@${host}?retryWrites=true`;
const url = 'mongodb://localhost/blog'
const postRoutes = require('./routes/routes');
app.use(express.urlencoded({
    extended: false
}));
app.use(cors())
app.use(express.json());
app.use('/', postRoutes);
// app.get('/', (req, res, next) => {
//     res.send('running node api');
// });
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    app.listen(3000);
    console.log('database connected!');})
  .catch(err => console.log(err));
//serving the application the port 3000
// app.listen(3000, console.log('server started on port 3000'));