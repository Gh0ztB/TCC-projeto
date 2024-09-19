function validateFields(){
    toggleButtonsDisable();
    toggleEmailErrors();
}

function isEmailValid() {
    const email = document.getElementById("email").value
    if (!email) {
        return false;
    }
    return validateEmail(email);
}
function toggleEmailErrors(){
    const email = document.getElementById('email').value;
    if (!email){
        document.getElementById('email-required-error').style.display = block;
    }
}
function toggleButtonsDisable(){
    const emailValid = isEmailValid();
    document.getElementById('recover-button').disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById('login-button').disabled = !passwordValid || !emailValid;

}
function isPasswordValid() {
    const password = document.getElementById('password').value;
    if (!password) {
        return false;
    }
     return true;

}

function validateEmail(email) {
    return /\S+0\S+\.\S+/.test(email);
}