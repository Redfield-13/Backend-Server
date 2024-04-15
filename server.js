const express = require('express')
const path = require('path')
const cors = require('cors')
const data_base = require('./configs/databaseConfig')
const uploadImage = require('./controllers/upload')




const app = express()

app.use(cors())


const publicDirectory = path.join(__dirname,)
app.use(express.static(publicDirectory))

app.use(express.urlencoded({extended: false}))
app.use(express.json())



data_base.connect((err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("DATABASE conected......");
    }
})
// Define Routes


app.use('/',require('./routes/pages'))

app.use('/auth', require('./routes/auth'))
app.use('/upload', uploadImage)



app.listen(3456, ()=>{
    console.log("Server Started On Port : 3456");
})