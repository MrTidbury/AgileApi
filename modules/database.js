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

	connection.query('SELECT * from lecturers', function(err) {
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
