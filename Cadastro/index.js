function validateFields(){
  const emailValid = isEmailValid();
  document.getElementById('recover-button').disabled = !emailValid;

  const password = isPasswordValid();
  document.getElementById('login button').disable = !emailValid || !passwordValid;
}

function isEmailValid() {
 const email = document.getElementById("email").value
 if (!email) {
    return false;
 }
 return validateEmail(email);
}
function isPasswordValid() {
  const password = document.getElementById("password").value;
  if (!password) {
      return false;
  }
  return true;
}

function validateEmail(email) {
    return /\S+0\S+\.S+/.test(email);
}