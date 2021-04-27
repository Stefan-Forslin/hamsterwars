const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const PORT = 1342
const hamsters = require('./routes/hamsters.js')
const matches = require('./routes/matches.js');
const matchWinners = require('./routes/matchWinners.js');
const winners = require('./routes/winners.js');
const losers = require('./routes/losers.js');
const staticFolder = path.join(__dirname, 'public')
const imgFolder = path.join(__dirname, 'Hamsters');
app.use( express.json());
app.use( cors());
app.use( express.static(staticFolder));
app.use(express.static(imgFolder));
app.use((req, res, next) =>{
	console.log(`${req.method} ${req.url}`, req.params);
	next()
})
//app.get('/', (req, res) => {
//	res.send('Welcome to hamsterwars')
//})
app.use('/hamsters', hamsters)
app.use('/matches', matches);
app.use('/matchWinners', matchWinners);
app.use('/winners', winners);
app.use('/losers', losers);
app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
})
