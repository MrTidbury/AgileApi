'use strict'
const mysql = require('mysql')
const passwordHash = require('password-hash')
const uuidV4 = require('uuid')
const mailer = require('nodemailer')
const ErrCode = 500
const AuthErrCode = 403
const SuccsessCode = 200
const connection = mysql.createConnection({
	host: '34.248.127.76',
	user: 'fusion',
	password: 'h720DR262lr',
	database: 'mydb'
})

connection.connect()
exports.adduser = function adduser(req, res){
	const header=req.headers['authorization']||''
	const token=header.split(/\s+/).pop()||''
	const auth=new Buffer(token, 'base64').toString()
	const parts=auth.split(/:/)
	const email=parts[0]
	const password=parts[1]

	if (password){
    	const hashedPassword = passwordHash.generate(password)
	}

	const course = req.headers.course
	const name = req.headers.name
	const position = req.headers.position

  	connection.query('SELECT * FROM users WHERE `Email` = '+email , function(err, rows) {
		if (!err) {
			if(rows){
				res.status(AuthErrCode).json({error: 'User with email'+email+'already exists'})
			}			else {
				connection.query('//INSERT USER INTO User DATABASE' , function(err, rows) {
					if (!err) {
            //also insert the rest of the data into student/lecturers database
            // send validation email.
					}					else{
						console.log (err)
      			res.status(ErrCode).json({error: err})
					}
				})
			}
		}		else{
			console.log (err)
			res.status(ErrCode).json({error: err})
		}
  	})
}
