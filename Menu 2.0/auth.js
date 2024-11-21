// Verifica se o usuário está logado
auth.onAuthStateChanged((user) => {
if (user) {
     // Exibe as informações do usuário
    document.getElementById('user-name').textContent = user.displayName || 'Usuário';
    document.getElementById('user-email').textContent = user.email;
} else {
    // Redireciona para a página de login se não estiver autenticado
    window.location.href = 'index.html';
}
});

    // Função de Logout
document.getElementById('logout-btn').addEventListener('click', () => {
auth.signOut().then(() => {
    window.location.href = '../Cadastro/index.html';
});
});
