
// Utilizar funcionalidades del Ecmascript 6
'use strict'
// Cargamos el módulo de mongoose para poder conectarnos a MongoDB
var mongoose = require('mongoose');
const app =require('./app');


const config =require('./config');
console.log("is DB",config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
   
  })
  .then((db) => console.log(`DB is connected`))
  .catch((err) => console.log(err));

app.listen(3000,'0.0.0.0',()=>{
    console.log("server running")
})

