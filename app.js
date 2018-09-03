// load the server using express
const express= require("express")
const app = express()
// automatic server restart after changes ( node monster deamon)
const morgan = require("morgan")
const mysql = require('mysql')
const bodyPaser = require('body-parser')

app.use(bodyPaser.urlencoded({extended: false}))
app.use(express.static('./public'))
// user/id route



app.use(morgan('short'))
// specify the route
app.get( "/", (req , res) => 
{
console.log( "Hello From Root" )
res.send("Hello World, Res from Root")

})
// users route
// Create a Router
const router = require('./routes/user.js')
app.use(router)


// Start a local server instance on port 3000
app.listen(3000,  () =>{
    console.log("Server up and running on Port : 3000......")
})