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
exports.search = function search(req,res){
	const tag = req.params.tag
	const term = req.query.q

	if(tag === 'skill'){
		connection.query('SELECT l.name,l.lec_id,l.title, s.skill_name FROM skills_link sl, skills s, lecturers l WHERE sl.skill_id=s.skill_id AND sl.lec_id=l.lec_id AND s.skill_name LIKE \'%'+term+'%\'', function(err, rows) {
      //name id title
  		if (!err){
  			res.json({results: rows})
  		}		else
      res.status(ErrCode).json({error: err})
			console.log(err)
  	 })
	}	else if(tag === 'language'){
		connection.query('SELECT l.name,l.lec_id,l.title, la.lang_name FROM languages_link ll, languages la, lecturers l WHERE ll.lang_id=la.lang_id AND ll.lec_id=l.lec_id AND la.lang_name LIKE \'%'+term+'%\'', function(err, rows) {
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

exports.profile = function profile(req,res){
	const id = req.params.id

	connection.query('SELECT l.lec_id, l.name, l.title, em.email, l.speaks, l.gender  FROM email em, lecturers l WHERE em.em_id=l.em_id AND l.lec_id = "'+id+'"', function(err, lec) {
		if(!err){
			connection.query('SELECT s.skill_name FROM skills_link sl, lecturers l, skills s WHERE s.skill_id=sl.skill_id AND l.lec_id = sl.lec_id AND l.lec_id = "'+id+'"', function(err,row){
				if(!err){
					const skill = []

					for (let i = 0; i < Object.keys(row).length; i++){
						skill.push(row[i].skill_name)
					}
					const lecturer = {
						lec_id: lec[0].lec_id,
						name: lec[0].name,
						title: lec[0].title,
						email: lec[0].email,
						speaks: lec[0].speaks,
						gender: lec[0].gender,
						skills: skill.join(', ')
					}

					console.log(skill)
					res.json(lecturer)
				}				else{
					console.log(err)
					res.status(ErrCode).json(err)
				}
			})

		}		else{
			console.log(err)
			res.status(ErrCode).json(err)
		}
	})
}
