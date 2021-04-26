const express = require('express')
const router = express.Router()
const dbFunction = require('../database.js')
const db = dbFunction()
router.get('/', async (req, res) =>{
	//res.send('GET /hamsters/')
	const hamstersRef = db.collection('Hamsters')
	const snapshot = await hamstersRef.get()
    let items = []
	snapshot.forEach(docRef => {
		const data = docRef.data()
		items.push(data)
	})
	res.send(items)
})
module.exports = router
