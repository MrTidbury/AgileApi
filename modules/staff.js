'use strict'

const mysql = require('mysql')
const ErrCode = 500
const connection = mysql.createConnection({
	host: '34.248.127.76',
	user: 'fusion',
	password: 'h720DR262lr',
	database: 'mydb'
})

exports.search = function search(req,res){
	const tag = req.params.tag
	const term = req.query.q

	if(tag === 'skill'){
		connection.query('SELECT l.name,l.lec_id,l.title, s.skill_name FROM skill_link sl, skills s, lecturers l WHERE sl.skill_id=s.skill_id AND sl.lec_id=l.lec_id AND s.skill_name LIKE \'%'+term+'%\'', function(err, rows) {
      //name id title
  		if (!err){
  			res.json({results: rows})
  		}		else
      res.status(ErrCode).json({error: err})
			console.log(err)
  	 })
	}	else if(tag === 'language'){
		connection.query('SELECT l.name,l.lec_id,l.title, s.lang_name FROM languages_link, languages s, lecturers l WHERE sl.lang_id=s.lang_id AND sl.lec_id=l.lec_id AND s.lang_name LIKE \'%'+term+'%\'', function(err, rows) {
			if(!err){
				res.json({results: rows})
			}			else{
				res.status(ErrCode).json({error: err})
  			console.log(err)
			}
		})
	}	else if(tag === 'name'){
		connection.query('SELECT name, title, lec_id FROM lecturers WHERE name LIKE \'%'+term+'%\'', function(err, rows){
			if(!err){
				res.json({results: rows})
			}			else{
				res.status(ErrCode).json({error: err})
  			console.log(err)
			}
		})
	}	else if(tag === 'speaks'){
		connection.query('SELECT name, title, lec_id FROM lecturers WHERE speaks LIKE \'%'+term+'%\'', function(err, rows){
			if(!err){
				res.json({resutls: rows})
			}			else{
				res.status(ErrCode).json({error: err})
				console.log(err)
			}
		})
	}	else{
		res.status(ErrCode).json({err: 'Search is only avalible availible for the following features, name,skill,id,language,speaks'})
	}

}
connection.connect()
