// Função de login de um usuário ja registrado no firebase
document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
  alert('Por favor, preencha todos os campos.');
  return;
}
//redirecionamento sucesso ou erro
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        window.location.href = '../Menu 2.0/principal.html'; 
      })
        .catch((error) => alert('Erro: ' + error.message));
  });
// Recuperação email
  document.getElementById('forgot-password-link').addEventListener('click', (e) => {
    e.preventDefault();
    const email = prompt('Digite seu e-mail para recuperar a senha:');
    if (email) {
      auth.sendPasswordResetEmail(email)
        .then(() => alert('E-mail de recuperação enviado!'))
        .catch((error) => alert('Erro: ' + error.message));
    }
  });

  // Função para criar um novo usuário no Firebase
document.getElementById('register-btn').addEventListener('click', () => {
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

if (email === '' || password === '') {
  alert('Por favor, preencha todos os campos.');
  return;
}

// Mensagem de falha ou sucesso registro
auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    alert('Usuário registrado com sucesso!');
  })
  .catch((error) => {
    alert('Erro ao registrar: ' + error.message);
  });
});
