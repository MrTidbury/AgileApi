'use strict'
const request = require('request')
const index = require('../modules/user.js')
const SuccessCode = 200
const ErrCode = 500
const AuthCode = 403
const auth = 'Basic bDIzMTMwQG12cmh0LmNvbTp0ZXN0MTIzNA=='
const wrong_auth = 'Basic bDIzMTMwQs12cmh0LmNvbTp0ZXN0MTIzNA=='


describe('Can identify User', function() {
	it('Responds With 200 Code', function(done) {
    const options = {
    url: 'http://localhost:5000/user/login',
    headers: {
      'Authorization': auth
    }
  }
		request.get(options, function(error, response){
			expect(response.statusCode).toBe(SuccessCode)
			done()
		})
	})
	it('Returns correct Api Status', function(done) {
    const options = {
    url: 'http://localhost:5000/user/login',
    headers: {
      'Authorization': auth
    }
  }
		request.get(options, function(error, response, body){
			const status = JSON.parse(body)
      const user = status.user[0]
      expect(user.userid).toBe(123456)
			done()
		})
	})
})
describe('Can Fetch User Profile', function() {
	it('Responds With 200 Code', function(done) {
    const options = {
    url: 'http://localhost:5000/user',
    headers: {
      'Authorization': auth
    }
  }
		request.get(options, function(error, response){
			expect(response.statusCode).toBe(SuccessCode)
			done()
		})
	})
	it('Returns correct Api Status', function(done) {
    const options = {
    url: 'http://localhost:5000/user',
    headers: {
      'Authorization': auth
    }
  }
		request.get(options, function(error, response, body){
			const status = JSON.parse(body)
      const user = status[0]
      expect(user.stud_id).toBe(123456)
			done()
		})
	})
})
describe('Can Fetch User Profile for a inccorect user', function() {
	it('Will Not Pass Incorrect Auth', function(done) {
    const options = {
    url: 'http://localhost:5000/user',
    headers: {
      'Authorization': wrong_auth
    }
  }
		request.get(options, function(error, response){
			expect(response.statusCode).toBe(AuthCode)
			done()
		})
	})
})
