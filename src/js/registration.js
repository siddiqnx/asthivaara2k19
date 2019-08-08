import { METHODS } from "http";

const db = firebase.firestore();
const form = document.querySelector('#register_form');
const payButton = document.querySelector('#pay-button');
const registerButton = document.querySelector('#register-button');
const storage = firebase.storage();
const storageRef = storage.ref();
const imagesRef = storageRef.child('images');

let registrationType = form.querySelector('#registration-type');
let type;
let hasPaid = false;


window.addEventListener('DOMContentLoaded', () => {
  registerButton.setAttribute('disabled', '');
  type = registrationType.value;
  if (type == 'Workshop') {
    registerButton.innerText = "Register for Workshop";
    document.querySelector('#paidamount').value = '350.00';
  } else if (type == 'Symposium') {
    registerButton.innerText = "Register for Symposium";
    document.querySelector('#paidamount').value = '200.00';
  }
});

registrationType.addEventListener('change', (e) => {
  type = registrationType.value;
  document.getElementById('paidamount').focus();
  document.getElementById('paidamount').addEventListener('click', () => {
    document.getElementById('paidamount').focus();
  })
  if (type == 'Workshop') {
    registerButton.innerText = "Register for Workshop";
    document.querySelector('#paidamount').value = '350.00';
  } else if (type == 'Symposium') {
    registerButton.innerText = "Register for Symposium";
    document.querySelector('#paidamount').value = '200.00';
  }
})

payButton.addEventListener('click', (e) => {
  hasPaid = true;
  registerButton.removeAttribute('disabled');
});

// function generatePassword() {
//   var length = 8,
//       charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
//       retVal = "";
//   for (var i = 0, n = charset.length; i < length; ++i) {
//       retVal += charset.charAt(Math.floor(Math.random() * n));
//   }
//   return retVal;
// }

form.addEventListener('submit', (e) => {
  e.preventDefault();
  var file = form.user_screenshot.files[0];
  var screenshotRef = imagesRef.child(file.name);
  let url;
  registerButton.innerHTML = "Registering...";
  registerButton.classList.add('spinning');
  screenshotRef.put(form.user_screenshot.files[0])
    .then((snapshot) => {return snapshot.ref.getDownloadURL();})
    .then((downloadURL) => {
      url = downloadURL;
    if (registrationType.value == 'Workshop') {
      db.collection('workshop-users').add({
        prefix: form.user_prefix.value,
        name: form.user_name.value,
        organization: form.user_organization.value,
        department: form.user_department.value,
        year: form.user_year.value,
        address: form.user_address.value,
        phoneNumber: form.user_phno.value,
        email: form.user_email.value,
        food: form.user_food.value,
        accommodation: form.user_accommodation.value,
        paymentDetails: {
          accountNumber: form.user_accno.value,
          dateOfTransfer: form.user_dateoftransfer.value,
          amount: form.user_amount.value,
          referenceID: form.user_referenceid.value,
          screenshotURL: downloadURL
        },
        registrationDate: new Date(),
        hasUploadedScreenshot: (form.user_screenshot.files.length) ? true : false,
      }).then((docRef) => {
        console.log(docRef);
        form.reset();
        hasPaid = false;
        registerButton.classList.remove('spinning');
        registerButton.innerHTML = "Registration Successful!";
        alert(`Registration for Workshop Successful!`);
        registerButton.setAttribute('disabled', '');
      }).catch((error) => {
        console.log(error);
        alert("Registration has failed. Please check the details and try again");
      });
    } else if (registrationType.value == 'Symposium') {
      db.collection('symposium-users').add({
        prefix: form.user_prefix.value,
        name: form.user_name.value,
        organization: form.user_organization.value,
        department: form.user_department.value,
        year: form.user_year.value,
        address: form.user_address.value,
        phoneNumber: form.user_phno.value,
        email: form.user_email.value,
        food: form.user_food.value,
        accommodation: form.user_accommodation.value,
        paymentDetails: {
          accountNumber: form.user_accno.value,
          dateOfTransfer: form.user_dateoftransfer.value,
          amount: form.user_amount.value,
          referenceID: form.user_referenceid.value,
          screenshotURL: downloadURL
        },
        registrationDate: new Date(),
        hasUploadedScreenshot: (form.user_screenshot.files.length) ? true : false,
      }).then((docRef) => {
        form.reset();
        hasPaid = false;
        registerButton.classList.remove('spinning');
        registerButton.innerHTML = "Registration Successful!";
        alert(`Registration for Symposium Successful!`);
        registerButton.setAttribute('disabled', '');
      }).catch((error) => {
        alert("Registration has failed. Please check the details and try again");
      });
    } else {
      alert('Choose a valid Registration Type!');
    }
  })
  .catch((error) => {
    alert('File Upload Error. Please try again');
  });
});