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
const smtpTransport = mailer.createTransport({
	host: 'mail.tidbury.tech',
	port: 25,
	secure: false, // use SSL
	tls: {
		rejectUnauthorized: false
	},
	auth: {
		user: 'api@tidbury.tech',
		pass: 'apiemail1234'
	}})
const isEmpty = function(obj) {
	return Object.keys(obj).length === 0
}
const sendmail = function(email,valcode){
	const validationUrl = '/validate/'+email+'?q='+valcode
	const mail = {
					 from: 'Coventry University Theta  <api@tidbury.tech>',
					 to: email,
					 subject: 'Please Validate your account',
					 text: 'Please Click here to validate you account',
					 html: '<a href="'+validationUrl+'">Please Click Here to validate your account</a>'
			 }

			 smtpTransport.sendMail(mail, function(error){
				if(error){
					console.log(error)
				}
				smtpTransport.close()
			})
}


connection.connect({multipleStatements: true})
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
								sendmail(email,valcode)
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

exports.validate = function validate(req, res){
	const validationCode = req.query.q
	const email = req.params.email

	connection.query('SELECT * FROM users WHERE email = "'+email+'"' , function(err, rows) {
		if(!err){
			if (validationCode === rows[0].validationcode){
				connection.query('UPDATE users SET validated = ? WHERE email = ?', [1, email], function(err){
					if(!err){
						res.send({validated: true})
					}					else{
						res.status(ErrCode).json({error: err})
					}
				})

			}
		}		else
			console.log(err)

	})
}

exports.login = function login(req, res, next){
	const header=req.headers['authorization']||''
	const token=header.split(/\s+/).pop()||''
	const auth=new Buffer(token, 'base64').toString()
	const parts=auth.split(/:/)
	const email=parts[0]
	const password=parts[1]

	connection.query('SELECT * FROM users WHERE email = "'+email+'"' , function(err, rows) {
		if(!err){
			if(isEmpty(rows)){
				res.status(AuthErrCode).json({error: 'No user exists with the email '+email+' please try again'})
			}			else {
				if (passwordHash.verify(password, rows[0].passwordhash) && rows[0].validated === 1){
					next()
				}				else{
					res.status(AuthErrCode).json({status: 'Unauthorized'})
				}
			}

		}		else{
			res.status(ErrCode).json({error: err})
		}
	})
}

exports.authtest = function authtest(req,res){
	res.send('This is a protected enpoint, meaning that you are logged in and validted')
}

exports.removeuser = function removeuser(req,res){
	const header=req.headers['authorization']||''
	const token=header.split(/\s+/).pop()||''
	const auth=new Buffer(token, 'base64').toString()
	const parts=auth.split(/:/)
	const email=parts[0]

	connection.query('DELETE * FROM students WHERE stud_id = 1' , function(err, rows, field) {
		if(!err){
			console.log(rows, field)
			res.send('sucsess')
		}		else{
			res.send(err)
		}
	})

}
