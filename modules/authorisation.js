'use strict'
const mysql = require('mysql')
const passwordHash = require('password-hash')
const uuidV4 = require('uuid')
//const mailer = require('nodemailer')
const ErrCode = 500
const AuthErrCode = 403
const SuccsessCode = 200
const connection = mysql.createConnection({
	host: '34.248.127.76',
	user: 'fusion',
	password: 'h720DR262lr',
	database: 'mydb'
})
const isEmpty = function(obj) {
	return Object.keys(obj).length === 0
}

connection.connect()
exports.adduser = function adduser(req, res){
	const header=req.headers['authorization']||''
	const token=header.split(/\s+/).pop()||''
	const auth=new Buffer(token, 'base64').toString()
	const parts=auth.split(/:/)
	const email=parts[0]
	const password=parts[1]
	const hashedPassword = passwordHash.generate(password)
	const course = req.headers.course
	const name = req.headers.name
	const valcode = uuidV4()

	console.log(email)
  	connection.query('SELECT * FROM users WHERE email = "'+email+'"' , function(err, rows) {
		if (!err) {
			if(!isEmpty(rows)){
				res.status(AuthErrCode).json({error: 'User with email '+email+' already exists'})
			}			else {

				const student = {name: name, email: email, course: course}

				connection.query('INSERT INTO students SET ?', student, function(err, rows) {
					if (!err) {
						const user = {email: email, passwordhash: hashedPassword,user_id: rows.insertId, staff: '0', validationcode: valcode, validated: '0'}

						connection.query('INSERT INTO users SET ?', user, function(err, rows) {
							if (!err){
								res.status(SuccsessCode).json({status: 'sucsess', studentid: rows.insertId})
							}							else {
		      			res.status(ErrCode).json({error: err})
							}
						})
					}					else{
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
