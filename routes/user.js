// contains all the user related routes
const express= require('express')
const mysql = require('mysql')
const router = express.Router()
const bodyPaser = require('body-parser')




router.get( "/users", (req , res) => 
{
   
   const query_string = "SELECT * FROM users"
   getConnection().query(query_string, (err, rows, fields) =>{
       if(err){
           console.log("Failed to connect to the Database"+ err)
           return
       }
    res.json(rows)   
   })
  //res.end()
})


//--------------------user ID

router.get('/user/:id', ( req, res) => {

    const userId= req.params.id
    
    const StringQuery = "SELECT * FROM users WHERE id = ?"
    

    getConnection().query(StringQuery, [userId], (err, rows, fields) =>{
      
        if(err){
            console.log("Failed to load data from database. Bad Query :" + err)
            res.sendStatus(500)
            return
        }

        const users = rows.map((row) =>
        {
            return {First_name: row.firstname, Last_name: row.lastname }

        })
        res.json(users)
    })
    

})

router.post('/user_create', ( req, res ) => {

    const fname = req.body.creta_firstname_view
    const lname = req.body.create_lastname_view
    const string_query = "INSERT INTO  users (firstname, lastname) VALUES (? , ?)"
    getConnection().query(string_query, [fname, lname], (err, results, fields) => {
    if(err){
        console.log("Failed insert the new User " + err )
        res.sendStatus(500)
        return
    }

     console.log("user inserted in the database id "+ results.insertId)
     res.send(results)
     //res.end()
    })
    

})

const pool = mysql.createPool({
        connectionLimit :10,
        host:'localhost',
        user:'root',
        password:'belmo',
        database:'belmodb'
    
})
function getConnection(){
    return pool
}


module.exports = router