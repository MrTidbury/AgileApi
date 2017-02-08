'use strict'
const request = require('request')
const base_url = 'http://localhost:5000/test'
const index = require('../index.js')
const SuccessCode = 200
const ErrCode = 500

describe('Test Suite for INDEX.JS', function() {
	it('returns statusCode 200', function(done) {
		request.get(base_url, function(error, response){
			expect(response.statusCode).toBe(SuccessCode)
			done()
		})
	})
	it('Returns correct Api Status', function(done) {
		request.get(base_url, function(error, response, body){
			const status = JSON.parse(body)
			expect(status.ApiStatus).toBe('Online')
			done()
		})
	})
})
