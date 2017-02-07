'use strict'

const express = require('express')
const app = express()
const port = 8080
const database = require('./modules/database')

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
