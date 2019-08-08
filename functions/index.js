const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sg = require('@sendgrid/mail');
sg.setApiKey(SENDGRID_API_KEY);

exports.firestoreEmail = functions.firestore
  .document('symposium-users/{userId}')
  .onCreate(event => {
    const userId = event.params.userId;
    const db = admin.firestore();
    return db.collection('symposium-users').doc(userId).get().then(doc => {
      const user = doc.data();
      const msg = {
        "personalizations": [
          {
            "to": [
              {
                "email": "john.doe@example.com",
                "name": "John Doe"
              }
            ],
            "dynamic_template_data": {
              "verb": "",
              "adjective": "",
              "noun": "",
              "currentDayofWeek": ""
            },
            "subject": "Hello, World!"
          }
        ],
        "from": {
          "email": "noreply@johndoe.com",
          "name": "John Doe"
        },
        "reply_to": {
          "email": "noreply@johndoe.com",
          "name": "John Doe"
        },
        "template_id": "d-21f98d2715ee4ab5a84443ec166ba9ec"
      };
      return sg.send(msg);
    }).then(() => {
      console.log('Email sent!');
      return;
    }).catch((error) => {
      console.log(error);
    })
  });