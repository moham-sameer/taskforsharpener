const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const db = require('./db'); // MySQL connection
const morgan = require('morgan');
const app = express();
const deleteRoute = require('./routes/products');
// Middleware
app.use(bodyParser.json());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use(express.static('public'));

// Routes
app.use('/api', productRoutes);
app.use('/api/delete',deleteRoute)
db.query('SELECT 1').then(()=>{
    console.log('DB connected')
})
app.get('/test',(req,res)=>{
    res.status(200).send("<h1>Hello World !</h1>")
})
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
