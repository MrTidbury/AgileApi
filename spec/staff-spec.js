'use strict'
const request = require('request')
const index = require('../modules/staff.js')
const SuccessCode = 200
const ErrCode = 500
const AuthCode = 403
const auth = 'Basic bDIzMTMwQG12cmh0LmNvbTp0ZXN0MTIzNA=='
const wrong_auth = 'Basic bDIzMTMwQs12cmh0LmNvbTp0ZXN0MTIzNA=='


describe('Can Search The Staff Directory', function() {
  it('Search via name', function(done) {
    const options = {
    url: 'http://localhost:5000/staff/search/name?q=norma',
    headers: {
      'Authorization': auth
    }
  }
		request.get(options, function(error, response, body){
			const status = JSON.parse(body)
      const user = status.results[0]
      expect(user.lec_id).toBe(1)
			done()
		})
	})
	it('Search via Language', function(done) {
    const options = {
    url: 'http://localhost:5000/staff/search/language?q=python',
    headers: {
      'Authorization': auth
    }
  }
		request.get(options, function(error, response, body){
			const status = JSON.parse(body)
      const user = status.results[0]
      expect(user.lec_id).toBe(84)
			done()
		})
	})
  it('Search via skill', function(done) {
    const options = {
    url: 'http://localhost:5000/staff/search/skill?q=dmt',
    headers: {
      'Authorization': auth
    }
  }
    request.get(options, function(error, response, body){
      const status = JSON.parse(body)
      const user = status.results[0]
      expect(user.lec_id).toBe(106)
      done()
    })
  })
  it('Search via speaks', function(done) {
    const options = {
    url: 'http://localhost:5000/staff/search/speaks?q=english',
    headers: {
      'Authorization': auth
    }
  }
    request.get(options, function(error, response, body){
      const status = JSON.parse(body)
      const user = status.results[0]
      expect(user.lec_id).toBe(74)
      done()
    })
  })
})
describe('Can Fetch a staff Profile', function() {
  const options = {
  url: 'http://localhost:5000/staff/profile/1',
  headers: {
    'Authorization': auth
  }
}
	it('returns statusCode 200', function(done) {
		request.get(options, function(error, response){
			expect(response.statusCode).toBe(SuccessCode)
			done()
		})
	})
	it('Returns correct Api Status', function(done) {
		request.get(options, function(error, response, body){
      const status = JSON.parse(body)
      expect(status.email).toBe('ttorres0@wsj.com')
			done()
		})
	})
})
