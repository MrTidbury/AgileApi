'use strict'
const mysql = require('mysql')
const connection = mysql.createConnection({
	host: '91.238.160.3',
	user: 'voidreal_apitest',
	password: 'apitest1234',
	database: 'voidreal_rankme'
})

exports.testdb = function testdb(req, res){
	connection.connect()
	connection.query('SELECT * from servers', function(err, rows) {
		if (!err)
			res.send(rows)
		else
    console.log(err)
	})

	connection.end()
}
