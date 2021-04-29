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
router.post('/', async (req, res) => {
	const object = req.body;
	if(!objectRef(object) || Object.keys(object).length === 0) {
		res.sendStatus(400);
		return;
	}
	let docRef;
	try {
		docRef = await db.collection('Hamsters').add(object);
		const newObj = { id: docRef.id };
		res.send(newObj);
	}
	catch(error) {
		res.status(500).send(error.message);
	}
});
router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const object = req.body;
	if(!object || !id) {
		res.sendStatus(400);
		return;
	}
	const docRef = db.collection('Hamsters').doc(id);
	let hamsterRef;
	try {
		hamsterRef = await docRef.get();
	}
	catch(error) {
		res.status(500).send(error.message);
		return;
	}
	if(!hamsterRef.exists) {
		res.status(404).send("Hamster does not exits");
		return;
	}
	try {
		await docRef.set(object, { merge: true });
		if(Object.keys(object).length === 0) {
			res.sendStatus(400);
			return;
		}
		res.sendStatus(200);
	}
	catch(error) {
		res.status(500).send(error.message);
	}
});
router.get('/random', async (req, res) => {
	let randomRef;
	try {
		randomRef = await db.collection('Hamsters').get();
	}
	catch(error) {
		res.status(500).send(error.message);
		return;
	}
	if (randomRef.empty) {
		res.send([]);
		return;
	}
	let randomHamster;
	const items = [];
	randomRef.forEach(doc => {
		const data = doc.data();
		data.id = doc.id;
		items.push(data);
	});
	res.send(randomHamster);
});
router.delete('/:id', async (req, res) =>{
	const id = req.params.id
	if(!id){
		res.sendStatus(400)
		return
	}
	let docRef;
	try {
		docRef = await db.collection('Hamsters').doc(id).get();
	}
	catch(error) {
		res.status(500).send(error.message);
		return;
	}
	if(!docRef.exists) {
		res.sendStatus(404);
		return;
	}
	try {
	await db.collection('Hamsters').doc(id).delete()
	    res.sendStatus(200)
	}
	catch(error) {
		res.status(500).send(error.message);
	}
})
module.exports = router
