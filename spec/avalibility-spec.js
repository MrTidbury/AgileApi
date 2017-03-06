'use strict'
const request = require('request')
const index = require('../modules/availability.js')
const SuccessCode = 200
const ErrCode = 500
const AuthCode = 403
const auth = 'Basic bDIzMTMwQG12cmh0LmNvbTp0ZXN0MTIzNA=='
const wrong_auth = 'Basic bDIzMTMwQs12cmh0LmNvbTp0ZXN0MTIzNA=='
const url = 'http://localhost:5000/staff/availability/1'

describe('Can Find availability', function() {
	it('returns statusCode 200', function(done) {
		request.get(url, function(error, response){
			expect(response.statusCode).toBe(SuccessCode)
			done()
		})
	})
})
