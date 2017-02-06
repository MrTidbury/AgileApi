'use strict'

const express = require('express')
const app = express()
const port = 8080

app.get('/test', function(req,res) {
	res.json({ApiStatus: 'Online'})
})

app.listen(port)
