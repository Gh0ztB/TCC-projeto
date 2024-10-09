function validateFields(){
    toggleButtonsDisable();
}
function login() {
    window.location.href = "../Menu 2.0/principal.html";
}
function register() {
    window.location.href = "/pages/register.html";
}

function toggleButtonsDisable(){
    const emailValid = isEmailValid();
    form.recoverbutton().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginbutton().disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
        return true;
}

function isPasswordValid() {
    const password = form.password().value;
    if (!password) {
        return false;
    }
        return true;

}
 
const form ={
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    loginbutton: () => document.getElementById('login-button'),
    recoverbutton: () => document.getElementById('recover-button')
}