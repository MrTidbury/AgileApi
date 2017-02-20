'use strict'
const mysql = require('mysql')
const ErrCode = 500
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

exports.identify = function identify(req,res){
	const header=req.headers['authorization']||''
	const token=header.split(/\s+/).pop()||''
	const auth=new Buffer(token, 'base64').toString()
	const parts=auth.split(/:/)
	const email=parts[0]

	connection.query('SELECT * FROM email WHERE email = "'+email+'"', function(err, rows){
		if(!err){
			const emailidd = rows[0].em_id

			connection.query('SELECT * FROM students WHERE em_id = "'+emailidd+'"' , function(err, rows) {
				if(!err){
					if(isEmpty(rows)){
						connection.query('SELECT * FROM lecturers WHERE em_id = "'+emailidd+'"' , function(err, rows) {
							if(!err){
								const userid = rows[0].lec_id
								const type = 'lecturer'
								const user = {'user': [{lec_id: userid, type: type, name: rows[0].name}]}

								res.status(SuccsessCode).json(user)
							}							else{
								console.log(err)
								res.status(ErrCode).json({sucsess: err})
							}
						})
					}					else{
						const userid = rows[0].stud_id
						const type = 'student'
						const user = {'user': [{userid: userid, type: type, name: rows[0].name}]}

						res.status(SuccsessCode).json(user)
					}

				}		else
          console.log(err)

			})

		}		else{
			console.log(err)
			res.status(ErrCode).json({sucsess: err})
		}
	})

}
