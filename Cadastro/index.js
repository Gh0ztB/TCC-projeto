function login(){
    firebase.auth().signInWithEmailAndPassword(
        form.email().value,form.passwor().value
    ).then(response => {
        window.location.href = "Menu/cuidador.html"
      }).catch(error => {
        console.log('error', error)
      });
}