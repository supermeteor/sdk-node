let secret = 'PLACE_SECRET'

let supermeteor = require('../src/index')(secret)

supermeteor.sendMessage('sms', '+85264869999', 'hello world!')
.then(rs => {
	console.log(rs.data)
})
.catch(err => {
	console.log(err.response.data)
})