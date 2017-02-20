'use strict'
const mysql = require('mysql')
const ErrCode = 500
const AuthErrCode = 403
const SuccsessCode = 200
const connection = mysql.createConnection({
	host: '34.248.127.76',
	user: 'fusion',
	password: 'h720DR262lr',
	database: 'mydb'
})

connection.connect({multipleStatements: true})

exports.findavailability = function findavailability(req,res){
	const id = req.params.id

	connection.query('SELECT * FROM session WHERE lec_id = "'+id+'"', function(err, rows){
		if(!err){
			res.send(rows)
		}		else{
			console.log(err)
			res.status(ErrCode).json({error: err})
		}
	})
}
