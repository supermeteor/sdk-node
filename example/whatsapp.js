let secret = 'PLACE_SECRET'

let supermeteor = require('./index')(secret, {
	fromPhone: '+852 6111 1111'
})

supermeteor.sendMessage('whatsapp', '+852 6222 222', 'hello world!')
.then(rs => {
	console.log(rs.data)
})
.catch(err => {
	console.log(err.response.data)
})