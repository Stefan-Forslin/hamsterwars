const admin = require("firebase-admin")
let privateKey
if( process.env.PRIVATE_KEY ) {
	 privateKey = JSON.parse(process.env.PRIVATE_KEY)
}//serviceAccount
 else {
	  privateKey = require('./private-key-hamsters.json')
 }
};admin.initializeApp({
  credential: admin.credential.cert(privateKey)
});
function getDatabase(){
    return admin.firestore()
}
module.exports = getDatabase
