let secret = 'PLACE_SECRET'

let supermeteor = require('./index')(secret)

supermeteor.sendMessage('whatsapp', '+85264869999', 'hello world!')
.then(rs => {
	console.log(rs.data)
})
.catch(err => {
	console.log(err.response.data)
})