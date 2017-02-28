'use strict'

const request = require('request')
const cheerio = require('cheerio')
const jsonfile = require('jsonfile')
const fs = require('fs')


exports.gettimetable = function(req, res) {

    // Initialize
	const url = req.headers.url
	const id = url.substring(50,57)

	if (fs.existsSync('./timetables/'+id+'.json')) {
		jsonfile.readFile('./timetables/'+id+'.json', function(err, obj) {
			if(!err){
				console.log('loading cached file')
				res.json({cached: obj})
			}			else{
				res.status(500).send(err)
			}
		})

	}	else{
		fetchtimetable(req,res)
	}

	function fetchtimetable(req,res){
		request(url, function(error, response, body) {
			const $ = cheerio.load(body)
			let data
			let count = 0

			$('script').each(function() {
				if (count === 4) {
					console.log('did this get called')
					const script = $(this).text()
					const regex = /\[[^\[\]]+\](?=[^\[\]]*$)/g
					const match = script.match(regex)

					if (match) {
						data = match
					}
				}
				count += 1

			})

			const lines = data[0].split('\r')

			const objects = []

			for (let i = 3; i < lines.length; i += 15) {
				const id = lines[i].split(': ')[1].replace(',', '').replace(new RegExp('\'', 'g'), '')
				const title = lines[i + 3].split(': ')[1].slice(0, 7).replace(new RegExp('\'', 'g'), '')
				const module = lines[i + 4].split(': ')[1].slice(0, -1).replace(new RegExp('\'', 'g'), '').split(', ')[0]
				const room = lines[i + 5].split(': ')[1].replace(',', '').replace(new RegExp('\'', 'g'), '')
				const lecturer = lines[i + 6].split(': ')[1].replace(',', '').replace(new RegExp('\'', 'g'), '').split('; ')[0]
				let start = lines[i + 9].split(': ')[1].replace(new RegExp('\'', 'g'), '').slice(0, -1)
				let end = lines[i + 10].split(': ')[1].replace(new RegExp('\'', 'g'), '').slice(0, -2)

				start = eval(start)
				end = eval(end)

				const building = lines[i + 11].split(': ')[1].replace(',', '').replace('&amp;', '&').replace(new RegExp('\'', 'g'), '')

				const student = url.match(/(\d+)/)[1]

				const sessions = {
					'oid': null,
					'sid': id,
					'student': student,
					'title': title,
					'module': module,
					'building': building,
					'room': room,
					'lecturer': lecturer,
					'start': start,
					'end': end
				}

				objects.push(sessions)
				console.log(objects.length)

			}
			const id = url.substring(50,57)
			const file = './timetables/'+id+'.json'

			jsonfile.writeFile(file, objects, function(err) {
	  	console.error(err)
			})
			res.send(objects)
			res.end()

		})
	}
}
