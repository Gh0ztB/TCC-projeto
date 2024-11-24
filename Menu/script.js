document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos HTML
    const addProfileBtn = document.getElementById('add-profile');
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('close-popup');
    const profileList = document.querySelector('.profile-list');
    const condicoesCronicasSelect = document.getElementById('condicoes-cronicas');
    const condicoesCronicasOpcoes = document.getElementById('condicoes-cronicas-opcoes');
    const condicoesCronicasTipoSelect = document.getElementById('condicoes-cronicas-tipo');
    const outrasCondicoesDiv = document.getElementById('outras-condicoes');
    const alergiaSelect = document.getElementById('alergia');
    const alergiaOpcoesDiv = document.getElementById('alergia-opcoes');
    const tipoAlergiaSelect = document.getElementById('tipo-alergia');
    const alergiaAlimentosDiv = document.getElementById('alergia-alimentos');
    const tipoAlergiaAlimentosSelect = document.getElementById('tipo-alergia-alimentos');
    const outraAlergiaDiv = document.getElementById('outra-alergia');
    const alergiaMedicamentoDiv = document.getElementById('alergia-medicamento');
    const tipoAlergiaMedicamentoSelect = document.getElementById('tipo-alergia-medicamento');
    const outraAlergiaMedicamentoDiv = document.getElementById('outra-alergia-medicamento');
    const alergiaSubstanciasDiv = document.getElementById('alergia-substancias');
    const tipoAlergiaSubstanciasSelect = document.getElementById('tipo-alergia-substancias');
    const outraAlergiaSubstanciasDiv = document.getElementById('outra-alergia-substancias');

    // Carregar perfis do localStorage
    let profiles = JSON.parse(localStorage.getItem('profiles')) || [];

    // Atualiza a lista de perfis ao carregar
    updateProfileList();

    // Mostrar/ocultar popup para adicionar perfil
    addProfileBtn.addEventListener('click', function() {
        popup.style.display = 'flex';
        document.getElementById('perfil-form').reset(); // Reseta o formulário
        document.getElementById('profile-id').value = ''; // Limpa o ID do perfil
        condicoesCronicasOpcoes.style.display = 'none';
        alergiaOpcoesDiv.style.display = 'none';
    });

    closePopupBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Mostrar/ocultar opções de condições crônicas
    condicoesCronicasSelect.addEventListener('change', function() {
        condicoesCronicasOpcoes.style.display = this.value === 'sim' ? 'block' : 'none';
    });

    // Mostrar/ocultar o campo de texto para "outras"
    condicoesCronicasTipoSelect.addEventListener('change', function() {
        outrasCondicoesDiv.style.display = this.value === 'outras' ? 'block' : 'none';
    });

    // Mostrar/ocultar opções de alergia
    alergiaSelect.addEventListener('change', function() {
        alergiaOpcoesDiv.style.display = this.value === 'sim' ? 'block' : 'none';
    });

    // Mostrar/ocultar tipo de alergia
    tipoAlergiaSelect.addEventListener('change', function() {
        alergiaAlimentosDiv.style.display = this.value === 'alimento' ? 'block' : 'none';
        alergiaMedicamentoDiv.style.display = this.value === 'medicamento' ? 'block' : 'none';
        alergiaSubstanciasDiv.style.display = this.value === 'substancias' ? 'block' : 'none';
    });

    // Mostrar/ocultar campo para especificar outro alimento
    tipoAlergiaAlimentosSelect.addEventListener('change', function() {
        outraAlergiaDiv.style.display = this.value === 'outro' ? 'block' : 'none';
    });

    // Mostrar/ocultar campo para especificar outro medicamento
    tipoAlergiaMedicamentoSelect.addEventListener('change', function() {
        outraAlergiaMedicamentoDiv.style.display = this.value === 'outro' ? 'block' : 'none';
    });

    // Mostrar/ocultar campo para especificar outra substância
    tipoAlergiaSubstanciasSelect.addEventListener('change', function() {
        outraAlergiaSubstanciasDiv.style.display = this.value === 'outro' ? 'block' : 'none';
    });

    // Função para adicionar ou editar perfil
    document.getElementById('perfil-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const quarto = document.getElementById('quarto').value;
        const foto = document.getElementById('foto').files[0];
        const peso = document.getElementById('peso').value;
        const altura = document.getElementById('altura').value;
        const ddn = document.getElementById('ddn').value;
        const condicoesCronicas = document.getElementById('condicoes-cronicas').value;
        const condicoesCronicasTipo = document.getElementById('condicoes-cronicas-tipo').value;
        const outras = document.getElementById('outras').value;
        const alergia = document.getElementById('alergia').value;
        const tipoAlergia = document.getElementById('tipo-alergia').value;
        const tipoAlergiaAlimentos = document.getElementById('tipo-alergia-alimentos').value;
        const outraAlergiaInput = document.getElementById('outra-alergia-input').value;
        const tipoAlergiaMedicamento = document.getElementById('tipo-alergia-medicamento').value;
        const outraAlergiaMedicamentoInput = document.getElementById('outra-alergia-medicamento-input').value;
        const tipoAlergiaSubstancias = document.getElementById('tipo-alergia-substancias').value;
        const outraAlergiaSubstanciasInput = document.getElementById('outra-alergia-substancias-input').value;

        const fotoUrl = foto ? URL.createObjectURL(foto) : '';

        let condicoesCronicasDetalhes = condicoesCronicas === 'sim' ? 
            (condicoesCronicasTipo === 'outras' ? `Outras: ${outras}` : condicoesCronicasTipo) : '';
        
        let alergiaDetalhes = '';
        if (alergia === 'sim') {
            if (tipoAlergia === 'alimento') {
                alergiaDetalhes = tipoAlergiaAlimentos === 'outro' ? `Outro: ${outraAlergiaInput}` : tipoAlergiaAlimentos;
            } else if (tipoAlergia === 'medicamento') {
                alergiaDetalhes = tipoAlergiaMedicamento === 'outro' ? `Outro: ${outraAlergiaMedicamentoInput}` : tipoAlergiaMedicamento;
            } else if (tipoAlergia === 'substancias') {
                alergiaDetalhes = tipoAlergiaSubstancias === 'outro' ? `Outro: ${outraAlergiaSubstanciasInput}` : tipoAlergiaSubstancias;
            } else {
                alergiaDetalhes = tipoAlergia;
            }
        }

        const profileId = document.getElementById('profile-id').value;

        // Verifica se está editando ou adicionando um novo perfil
        if (profileId) {
            const profileIndex = profiles.findIndex(profile => profile.id === profileId);
            profiles[profileIndex] = { 
                id: profileId, 
                nome, 
                quarto, 
                fotoUrl, 
                peso,
                altura,
                ddn, 
                condicoesCronicas: condicoesCronicasDetalhes,
                alergia: alergiaDetalhes
            };
        } else {
            profiles.push({
                id: Date.now().toString(),
                nome,
                quarto,
                fotoUrl,
                peso,
                altura,
                ddn,
                condicoesCronicas: condicoesCronicasDetalhes,
                alergia: alergiaDetalhes
            });
        }

        // Salvar perfis no localStorage
        localStorage.setItem('profiles', JSON.stringify(profiles));

        updateProfileList(); // Atualiza a lista de perfis
        popup.style.display = 'none'; // Fecha o popup
    });

    function updateProfileList() {
        profileList.innerHTML = profiles.map(profile => `
            <div class="profile-item">
                <img src="${profile.fotoUrl}" alt="Foto de ${profile.nome}" width="100">
                <p><strong>Nome:</strong> ${profile.nome}</p>
                <p><strong>Quarto:</strong> ${profile.quarto}</p>
                <button onclick="editProfile('${profile.id}')">Editar</button>
                <button onclick="enterProfile('${profile.id}')">Entrar</button>
                <button onclick="deleteProfile('${profile.id}')">Excluir</button> <!-- Botão de excluir -->
            </div>
        `).join('');
    }

    // Função para excluir perfil
    window.deleteProfile = function(profileId) {
        profiles = profiles.filter(profile => profile.id !== profileId); // Remove o perfil do array
        localStorage.setItem('profiles', JSON.stringify(profiles)); // Atualiza o localStorage
        updateProfileList(); // Atualiza a lista de perfis
    };

    // Função para editar perfil
    window.editProfile = function(profileId) {
        const profile = profiles.find(profile => profile.id === profileId);
        if (profile) {
            document.getElementById('nome').value = profile.nome;
            document.getElementById('quarto').value = profile.quarto;
            document.getElementById('ddn').value = profile.ddn;
            document.getElementById('peso').value = profile.peso;
            document.getElementById('altura').value = profile.altura;
            document.getElementById('condicoes-cronicas').value = profile.condicoesCronicas ? 'sim' : 'nao';
            document.getElementById('alergia').value = profile.alergia ? 'sim' : 'nao';
            document.getElementById('profile-id').value = profile.id;

            // Ajustar visibilidade das opções
            condicoesCronicasOpcoes.style.display = profile.condicoesCronicas ? 'block' : 'none';
            alergiaOpcoesDiv.style.display = profile.alergia ? 'block' : 'none';
            if (profile.condicoesCronicas) {
                document.getElementById('condicoes-cronicas-tipo').value = profile.condicoesCronicas.includes('Outras') ? 'outras' : profile.condicoesCronicas;
            }
            if (profile.alergia) {
                // Verifica o tipo de alergia
                if (profile.alergia.includes('Outro')) {
                    document.getElementById('tipo-alergia').value = 'alimento'; // Altera conforme o que for mais apropriado
                } else {
                    document.getElementById('tipo-alergia').value = profile.alergia;
                }
            }

            popup.style.display = 'flex';
        }
    };

    // Função para entrar no perfil detalhado
    window.enterProfile = function(profileId) {
        const profile = profiles.find(profile => profile.id === profileId);
        if (profile) {
            localStorage.setItem('profileData', JSON.stringify(profile));
            window.location.href = 'PerfilDetalhado.html'; // Redireciona para a página do perfil
        }
    };
});