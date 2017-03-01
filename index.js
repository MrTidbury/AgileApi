'use strict'

const express = require('express')
const app = express()
const port = 5000
const database = require('./modules/database')
const availability = require('./modules/availability')
const authorisation = require('./modules/authorisation')
const favourites = require('./modules/favourites')

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
app.get('/favourites/:id', favourites.getfavourites)
app.post('/favourites', favourites.savefavourites)
app.delete('/favourites', favourites.deletefavourites)
app.listen(port)
