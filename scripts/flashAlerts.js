var AlertBox = function(id, option) {
this.show = function(msg) {
if (msg === ''  || typeof msg === 'undefined' || msg === null) {
  throw '"msg parameter is empty"';
}
else {
  let alertArea = document.querySelector(id);
  var alertBox = document.createElement('DIV');
  var alertContent = document.createElement('DIV');
  var alertClose = document.createElement('A');
  var alertClass = this;
  alertContent.classList.add('alert-content');
  alertContent.innerHTML = msg;
  alertClose.classList.add('alert-close');
  alertClose.setAttribute('href', '#');
  alertBox.classList.add('alert-box');
  alertBox.appendChild(alertContent);
  if (!option.hideCloseButton || typeof option.hideCloseButton === 'undefined') {
    alertBox.appendChild(alertClose);
  }
  alertArea.appendChild(alertBox);
  alertClose.addEventListener('click', function(event) {
    event.preventDefault();
    alertClass.hide(alertBox);
  });
  if (!option.persistent) {
    var alertTimeout = setTimeout(function() {
      alertClass.hide(alertBox);
      clearTimeout(alertTimeout);
    }, option.closeTime);
  }
}
};
this.hide = function(alertBox) {
alertBox.classList.add('hide');
var disperseTimeout = setTimeout(function() {
  (alertBox.parentNode).removeChild(alertBox);
  clearTimeout(disperseTimeout);
}, 500);
};
};
var alertboxNonPersistent = new AlertBox('#alert-area', {
closeTime: 55000,
persistent: false,
hideCloseButton: false
});