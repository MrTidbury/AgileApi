'use strict'

const express = require('express')
const app = express()
const port = 5000
const database = require('./modules/database')

app.set('jsonp callback', true)
app.use(function(req, res, next) {

    // Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*')

    // Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
	next()
})
app.get('/test', function(req,res) {
	res.json({ApiStatus: 'Online'})
})

app.get('/database/test', function(req,res) {
	database.testdb(req,res)
})

app.get('/database/printdb', function(req,res) {
	database.printdb(req,res)
})

app.listen(port)
