'use strict'
const request = require('request')
const index = require('../modules/authorisation.js')
const SuccessCode = 200
const ErrCode = 500
const AuthCode = 403
const auth = 'Basic bDIzMTMwQG12cmh0LmNvbTp0ZXN0MTIzNA=='
const wrong_auth = 'Basic bDIzMTMwQs12cmh0LmNvbTp0ZXN0MTIzNA=='


describe('Can Authorise User', function() {
	it('Logs in with correct auth', function(done) {
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
  it('Logs in with correct auth', function(done) {
    const options = {
    url: 'http://localhost:5000/user/login',
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
