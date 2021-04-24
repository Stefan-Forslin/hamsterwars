const admin = require("firebase-admin")
const privateKey = require('./private-key-hamsters.json')
admin.initializeApp({
  credential: admin.credential.cert(privateKey)
});
function getDatabase(){
    return admin.firestore()
}
module.exports = getDatabase
