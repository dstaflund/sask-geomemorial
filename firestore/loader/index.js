// Adaptation of code found at https://medium.com/@devesu/how-to-upload-data-to-firebase-firestore-cloud-database-63543d7b34c5
const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("../keys/sask-geomemorial-357916-d770bd85c645.json");

const data = require("../docs/nts-maps.json");
const collectionKey = "nts-maps";

const data2 = require("../docs/memorials.json");
const collectionKey2 = "memorials";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sask-geomemorial-db.us-west1.firedatabase.app"
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };

firestore.settings(settings);
if (data && (typeof data === "object")) {
    Object
        .keys(data)
        .forEach(docKey => {
            firestore
                .collection(collectionKey)
                .doc(docKey)
                .set(data[docKey])
                .then((res) => {
                    console.log("Document " + docKey + " successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        });
}

if (data2 && (typeof data2 === "object")) {
    Object
        .keys(data2)
        .forEach(docKey => {
            firestore
                .collection(collectionKey2)
                .doc(docKey)
                .set(data2[docKey])
                .then((res) => { console.log("Document " + docKey + " successfully written!"); })
                .catch((error) => { console.error("Error writing document: ", error); });
        });
}