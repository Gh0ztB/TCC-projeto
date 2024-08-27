
document.addEventListener('DOMContentLoaded', () => {
    const profilesContainer = document.getElementById('profiles');
    const addProfileBtn = document.getElementById('add-profile');
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('close-popup');
    const profileForm = document.getElementById('perfil-form');
    const popupTitle = document.getElementById('popup-titulo');
    const submitBtn = document.getElementById('submit-btn');
    const profileIdInput = document.getElementById('profile-id');
    const nameInput = document.getElementById('nome');
    const nicknameInput = document.getElementById('apelido');
    const ddnInput = document.getElementById('ddn');
    const passwordInput = document.getElementById('senha');
    const confirmPasswordInput = document.getElementById('confirmarsenha');


    let profiles = [];
    let editProfileIndex = -1;

    addProfileBtn.addEventListener('click', () => {
        showPopup();
    });

    closePopupBtn.addEventListener('click', () => {
        hidePopup();
    });

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('As senhas não coincidem!');
            return;
        }
        const profileData = {
            id: profileIdInput.value || Date.now().toString(),
            name: nameInput.value,
            nickname: nicknameInput.value,
            ddn: ddnInput.value,
            password: passwordInput.value,
        };
        if (editProfileIndex >= 0) {
            profiles[editProfileIndex] = profileData;
            editProfileIndex = -1;
        } else {
            profiles.push(profileData);
        }
        renderProfiles();
        hidePopup();
    });

    function showPopup(profile = null) {
        if (profile) {
            popupTitle.innerText = 'Editar Perfil';
            profileIdInput.value = profile.id;
            nameInput.value = profile.name;
            nicknameInput.value = profile.nickname;
            ddnInput.value = profile.ddn;
            passwordInput.value = profile.password;
            confirmPasswordInput.value = profile.password;
            editProfileIndex = profiles.findIndex(p => p.id === profile.id);
        } else {
            popupTitle.innerText = 'Adicionar Perfil';
            profileForm.reset();
            profileIdInput.value = '';
        }
        popup.style.display = 'flex';
    }

    function hidePopup() {
        popup.style.display = 'none';
    }

    function renderProfiles() {
        profilesContainer.innerHTML = '';
        profiles.forEach((profile, index) => {
            const profileDiv = document.createElement('div');
            profileDiv.className = 'profile';
            // Seleciona a imagem baseada no índice do perfil
            const imgSrc = images[index % images.length];
            profileDiv.innerHTML = `
                <img src="${imgSrc}" alt="${profile.name}">
                <span>${profile.nickname}</span>
                <button class="edit-btn">Editar</button>
            `;
            profileDiv.querySelector('.edit-btn').addEventListener('click', () => {
                showPopup(profile);
            });
            profilesContainer.appendChild(profileDiv);
        });
        profilesContainer.appendChild(addProfileBtn);
    }
});
