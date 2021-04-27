const express = require('express');
const router = express.Router();
const db = require('../database.js')();
let items = [];
router.get('/', async (req, res) => {
	let snapshot;
	try {
		snapshot = await db.collection('matches').get();
	}
	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
	if (snapshot.empty) {
		res.send([]);
		return;
	}
	snapshot.forEach(doc => {
		const data = doc.data();
		data.id = doc.id;
		items.push(data);
	});
	res.send(items);
});
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	let docRef;
	try {
		docRef = await db.collection('matches').doc(id).get();
	}
	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
		return;
	}
	if (!docRef.exists) {
		res.status(404).send("Couldn't find match .");
		return;
	};
	try {
		const data = docRef.data();
		res.send(data);
	}
	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
		return;
	}
});
router.post('/', async (req, res) => {
	const object = req.body;
	if(!objectEvaluator(object) || Object.keys(object).length === 0) {
		res.sendStatus(400);
		return;
	}
	let docRef;
	try {
		docRef = await db.collection('matches').add(object);
		const newObj = { id: docRef.id };
		res.send(newObj);
	}
	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
});
function objectEvaluator(testItem) {
	if( !testItem )
		return false;
	else if( !testItem.winnerId || !testItem.loserId )
		return false
	return true
};
router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	if(!id) {
		res.sendStatus(400);
		return;
	}
	let docRef;
	try {
		docRef = await db.collection('matches').doc(id).get();
	}
	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
		return;
	}
	if(!docRef.exists) {
		res.sendStatus(404);
		return;
	}
	try {
		await db.collection('matches').doc(id).delete()
		res.sendStatus(200);
	}
	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
});
module.exports = router;
