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

  connection.query('SELECT l.name FROM students s, favourites f, lecturers l WHERE s.stud_id=f.stud_id AND l.lec_id=f.lec_id AND s.stud_id = "'+id+'"', function(err, rows){
  //connection.query('SELECT l.lec_id, l.name, l.title, l.title, l.speaks FROM lecturers WHERE s.stud_id = "'+id+'"', function(err, rows){
  //connection.query('SELECT * FROM favourites WHERE stud_id = "'+id+'"', function(err, rows){
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
  const fav = {lec_id: lec_id, stud_id: id}
  connection.query('INSERT INTO favourites SET ?', fav,  function(err, rows){
    if(!err){
      res.send(rows)}
      else{
        console.log(err)
        res.status(ErrCode).json({error:err})
      }
    })
  }

exports.deletefavourites = function deletefavourites(req,res){
  const fav_id= req.headers.fav_id
  //const lec_name = req.headers.lec_name
  //const thing = {lec_id: lec_id, stud_id: id}

connection.query('DELETE FROM favourites WHERE fav_id = "'+fav_id+'"', function(err){
//connection.query('DELETE FROM favourites WHERE lec_id = 1 AND stud_id = 10', function(err){
	if(!err){
		res.json({status: 'favourite has been removed'})}
		else{
			console.log(err)}
		}
	)}


	/*connection.query('DELETE FROM favourites WHERE lec_name = "'+lec_name+'"', function(err, rows) {
    if (!err){
      res.send(rows)}
      else{
        console.log(err)
        res.status(ErrCode).json({error:err})*/
