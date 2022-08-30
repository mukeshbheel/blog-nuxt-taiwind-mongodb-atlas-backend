const express = require('express');
const app = express();
const mongoose = require('mongoose')
const { mongoUri, PORT } = require('./config')
const bodyParser = require('body-parser')
const blogPostRoutes = require('./routes/api/blogPostApi')
const multer = require('multer')
const cors = require('cors')


// const storage = multer.diskStorage({
  //     destination: '/uploads',
  //     filename: function(req, file, cb){
    //         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    //     }
    // })
    
    // const upload = multer({
      //     storage: storage,
      // }).single('myImage')
      
      app.use(cors())
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
    
})

app.use(bodyParser.json())
console.log(mongoUri)

mongoose.connect(mongoUri)
.then((res)=>{
    console.log('database connected')
})
.catch((err)=>{
    console.log('could not connect to database')
    console.log('error', err)
})

app.use('/api/blogPost', blogPostRoutes)

app.get('/', (req, res)=>{
    // res.send('hello server')
    res.sendFile(__dirname+'/index.html')
})

app.listen(PORT,()=>{
    console.log(`app is running at ${PORT}`)
})



