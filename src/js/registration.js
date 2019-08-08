import { METHODS } from "http";

const db = firebase.firestore();
const form = document.querySelector('#register_form');
const payButton = document.querySelector('#pay-button');
const registerButton = document.querySelector('#register-button');
const storage = firebase.storage();
const storageRef = storage.ref();
const imagesRef = storageRef.child('images');
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay');

let registrationType = form.querySelector('#registration-type');
let type;
let hasPaid = false;


window.addEventListener('DOMContentLoaded', () => {
  registerButton.setAttribute('disabled', '');
});

function hideFormElement(el) {
  el.style.display = 'none';
  el.firstElementChild.removeAttribute('required');
}

function showFormElement(el) {
  el.style.display = '';
  el.firstElementChild.setAttribute('required', 'true');
}

registrationType.addEventListener('change', (e) => {
  type = registrationType.value;
  // if(type == 'Asthivaara Junior') {
  //   hideFormElement(form.querySelector('label[for="dept"]'));
  //   hideFormElement(form.querySelector('label[for="year"]'));
  //   showFormElement(form.querySelector('label[for="grade"]'));
  //   showFormElement(form.querySelector('label[for="payment-netbanking"]'));
  //   showFormElement(form.querySelector('label[for="payment-gpay"]'));
  //   document.querySelector('#paidamount').value = '';
  // } else 
  if (type == 'Workshop') {
    registerButton.innerText = "Register for Workshop";
    showFormElement(form.querySelector('label[for="country"]'));
    showFormElement(form.querySelector('label[for="referenceid"]'));
    document.querySelector('#paidamount').value = '350.00';
  } else if (type == 'Symposium') {
    registerButton.innerText = "Register for Symposium";
    hideFormElement(form.querySelector('label[for="country"]'));
    hideFormElement(form.querySelector('label[for="referenceid"]'));
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
        country: form.user_country.value,
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
        alert(`Registration for Workshop Successful!`);
        form.reset();
        hasPaid = false;
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
          screenshotURL: downloadURL
        },
        registrationDate: new Date(),
        hasUploadedScreenshot: (form.user_screenshot.files.length) ? true : false,
      }).then((docRef) => {
        alert(`Registration for Symposium Successful!`);
        form.reset();
        hasPaid = false;
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

// Modal Logic

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}