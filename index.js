'use strict'

const express = require('express')
const app = express()
const port = 5000
const database = require('./modules/database')
const availability = require('./modules/availability')
const authorisation = require('./modules/authorisation')
const staff = require('./modules/staff')
const user = require('./modules/user')

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
app.get('/staff/availability/:id', availability.findavailability)
app.delete('/user', authorisation.login, authorisation.removeuser)
app.get('/staff/directory',database.printdb)
app.get('/user/login',authorisation.login, user.identify)
app.get('/staff/search/:tag', authorisation.login, staff.search)
app.get('/staff/directory2',database.printdb2)
app.listen(port)
