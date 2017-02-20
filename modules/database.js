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
exports.testdb = function testdb(req, res){

	connection.query('SELECT l.lec_id, l.name, em.email, l.title, l.gender, l.speaks FROM email em, lecturers l WHERE em.em_id=l.em_id', function(err) {
		if (!err)
		 res.jsonp({DatabaseConnectionStatus: 'Succsessful'})
		else
    res.status(ErrCode).json({DatabaseConnectionStatus: err})
	})

}
exports.printdb = function printdb(req, res){
	connection.query('SELECT * from lecturers', function(err, rows) {
		if (!err){
			res.json(rows)
		}		else
    console.log(err)
	 })

}

exports.printdb2 = function printdb2(req, res){
	connection.query('SELECT * from lecturers', function(err, rows) {
		if (!err){
			res.json({directory: rows})
		}		else
    console.log(err)
	 })

}
