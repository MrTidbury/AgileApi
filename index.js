'use strict'

const express = require('express')
const app = express()
const port = 5000
const database = require('./modules/database')
const authorisation = require('./modules/authorisation')

app.set('jsonp callback', true)
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
	res.setHeader('Access-Control-Allow-Credentials', true)
	next()
})
app.get('/test', function(req,res) {
	res.json({ApiStatus: 'Online'})
})
app.get('/database/test',database.testdb)
app.get('/validate/:email',authorisation.validate)
app.put('/user', authorisation.adduser)
app.get('/auth/test', authorisation.login, authorisation.authtest)
app.delete('/user', authorisation.login, authorisation.removeuser)
app.get('/database/printdb',database.printdb)

app.listen(port)
