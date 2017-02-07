'use strict'
const mysql = require('mysql')
const ErrCode = 500
const connection = mysql.createConnection({
	host: '91.238.160.3',
	user: 'voidreal_apitest',
	password: 'apitest1234',
	database: 'voidreal_rankme'
})

connection.connect()
exports.testdb = function testdb(req, res){

	connection.query('SELECT * from servers', function(err) {
		if (!err)
		 res.json({DatabaseConnectionStatus: 'Succsessful'})
		else
    res.status(ErrCode).json({DatabaseConnectionStatus: err})
	})

}
exports.printdb = function printdb(req, res){
	connection.query('SELECT * from servers', function(err, rows) {
		if (!err)
			res.send(rows)
		else
    console.log(err)
	 })

}
