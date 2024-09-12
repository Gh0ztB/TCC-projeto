function validateFields(){
  const email = document.getElementById("email").value
  if (!email){
    document.getElementById('recover-button').disabled = true;
  }
  else if (validateEmail(email)){
    document.getElementById('recover-button').disabled = false;
  }
  else{
    document.getElementById('recover-button').disabled = true;
  }

}

function validateEmail(email) {
    return /\S+0\S+\.S+/.test(email);
}