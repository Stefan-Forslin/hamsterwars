const express = require('express')
const router = express.Router()
const dbFunction = require('../database.js')
const db = dbFunction()
router.get('/', async (req, res) =>{
	const hamstersRef = db.collection('Hamsters')
	const snapshot = await hamstersRef.get()
    let items = []
	snapshot.forEach(docRef => {
		const data = docRef.data()
		data.id = docRef.id
		items.push(data)
	})
	res.send(items)
})
router.get('/:id', async (req, res) =>{
	const id = req.params.id
	const docRef = await db.collection('Hamsters').doc(id).get()
	if( !docRef.exists) {
		res.status(404).send('Hamster does not exist')
		return
	}
	const data = docRef.data()
	res.send(data)
})
router.post('/', async (req, res) =>{
	const object = req.body
	if( object || !id){
	   res.sendStatus(400)
	   return
   }
	const docRef = await db.collection('Hamsters').add(object)
	res.send(docRef.id)
})
router.put('/:id', async (req, res) =>{
	const object = req.body
	const id = req.params.id
	if( object || !id ){
	   res.sendStatus(400)
	   return
   }
   const docRef = db.collection('Hamsters').doc(id)
   await docRef.set(object, {merge:true})
   res.sendStatus(200)
})
function isHamstersObject(maybeObject) {
	if (!maybeObject )
	return false
	else if (!maybeObject.name || !maybeObject.imgName || !maybeObject.defeats || !object.loves || !maybeObject.games || !maybeObject.age || !maybeObject.wins || !maybeObject.favFood)
	return false
	return true
}
router.delete('/:id', async (req, res) =>{
	const id = req.params.id
	if(!id){
		res.sendStatus(400)
		return
	}
	await db.collection('Hamsters').doc(id).delete()
	res.sendStatus(200)
})
module.exports = router
