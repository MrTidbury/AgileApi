'use strict'
const mysql = require('mysql')
const ErrCode = 500
const connection = mysql.createConnection({
	host: '34.248.127.76',
	user: 'fusion',
	password: 'h720DR262lr',
	database: 'mydb'
})

connection.connect()

//Get favourites from table


exports.getfavourites = function getfavourites(req,res){
  const id = req.params.id

  connection.query('SELECT * FROM favourites WHERE stud_id = "'+id+'"', function(err, rows){
    if(!err){
      res.send(rows)}
      else{
        console.log(err)
        res.status(ErrCode).json({error:err})
      }
    })
  }


exports.savefavourites = function savefavourites(req,res){
  const id = req.headers.id
  const lec_id = req.headers.lec_id
  const thing = {lec_id: lec_id, stud_id: id}
  connection.query('INSERT INTO favourites SET ?', thing,  function(err, rows){
    if(!err){
      res.send(rows)}
      else{
        console.log(err)
        res.status(ErrCode).json({error:err})
      }
    })
  }



/* Get: select x from table where student id = id on webpage
Put: insert x into table (student id and lec id) */
