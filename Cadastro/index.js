// Função de login de um usuário ja registrado no firebase
document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
  alert('Por favor, preencha todos os campos.');
  return;
}

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        window.location.href = '../Menu 2.0/principal.html'; 
      })
        .catch((error) => alert('Erro: ' + error.message));
  });

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

auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    alert('Usuário registrado com sucesso!');
    window.location.href = 'profile.html'; // Redireciona para a página de perfil após o registro.
  })
  .catch((error) => {
    alert('Erro ao registrar: ' + error.message);
  });
});
