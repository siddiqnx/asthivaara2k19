function onOpenHandler () {
  alert('Payments Modal is Opened');
}

function onCloseHandler () {
  alert('Payments Modal is Closed');
}

function onPaymentSuccessHandler (response) {
  alert('Payment Success');
  console.log('Payment Success Response', response);
}

function onPaymentFailureHandler (response) {
  alert('Payment Failure');
  console.log('Payment Failure Response', response);
}

Instamojo.configure({
  handlers: {
    onOpen: onOpenHandler,
    onClose: onCloseHandler,
    onSuccess: onPaymentSuccessHandler,
    onFailure: onPaymentFailureHandler
  }
});

window.paymentGatewayHandler = function() {
  Instamojo.open('https://test.instamojo.com/@siddiqnx');
}