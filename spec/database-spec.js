'use strict'
const request = require('request')
const base_url = 'http://localhost:5000/database/test'
const print_url = 'http://localhost:5000/database/printdb'
const index = require('../modules/database.js')
const SuccessCode = 200
const ErrCode = 500

describe('Test Suite for DataBase', function() {
	it('Connects to DataBase', function(done) {
		request.get(base_url, function(error, response){
			expect(response.statusCode).toBe(SuccessCode)
			done()
		})
	})
	it('Returns correct Api Status', function(done) {
		request.get(base_url, function(error, response, body){
			const status = JSON.parse(body)
			expect(status.DatabaseConnectionStatus).toBe('Succsessful')
			done()
		})
	})
})
describe('Can Retrive Data from Database', function() {
	it('Connects to DataBase', function(done) {
		request.get(print_url, function(error, response){
			expect(response.statusCode).toBe(SuccessCode)
			done()
		})
	})
	it('Returns Correct Data from Database', function(done) {
		request.get(print_url, function(error, response, body){
			expect(body).toContain('Retakes')
			done()
		})
	})
})
