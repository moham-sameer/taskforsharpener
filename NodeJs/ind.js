const express = require('express');
const app = express();

app.use((req, res, next) => {
      console.log("In The Middleware.")
      next();
})
app.use((req, res, next) => {
      console.log("In Another Middleware.")
       res.send("<h1>Hello from express</h1>")
})

app.listen(3000,console.log("server is listening on port 3000... "))