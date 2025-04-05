document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:2309/api/turism'; // Atualize para sua API
    const turismModal = document.getElementById('turismModal');
    const turismForm = document.getElementById('turismForm');
    const addTurismBtn = document.getElementById('addTurismBtn');
    const modalTitleTurism = document.getElementById('modalTitleTurism');
    let editTurismId = null;

    // Função para carregar usuários
    const loadTurism = async () => {
        const response = await fetch(`${apiUrl}`);
        const turism = await response.json();
        const tableBody = document.querySelector('#turismTable tbody');
        tableBody.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados
    
        turism.forEach(turism => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${turism.name}</td>
                <td>${turism.country}</td>
                <td>${turism.city}</td>
                <td>${turism.price}</td>
                <td>
                    <button class="editturismBtn" data-id="${turism._id}">Editar</button>
                    <button class="deleteturismBtn" data-id="${turism._id}">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    
        // Adicionar eventos de edição e deleção novamente após carregar os dados
        document.querySelectorAll('.editturismBtn').forEach(button => {
            button.addEventListener('click', (e) => openEditTurismModal(e.target.dataset.id));
        });
    
        document.querySelectorAll('.deleteturismBtn').forEach(button => {
            button.addEventListener('click', (e) => deleteTurism(e.target.dataset.id));
        });
    };
    
    // Função para adicionar usuário
    const addTurism = async (turism) => {
        try {
            const response = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(turism) // Envio dos dados
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao adicionar plano: ${response.statusText}`);
            }
    
            loadTurism(); // Recarregar os planos após a inserção
        } catch (error) {
            console.error('Erro ao adicionar plano:', error);
        }
    };

    // Função para atualizar usuário
    const updateTurism = async (id, turism) => {
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(turism)
        });
        loadTurism();
    };

    // Função para deletar usuário
    const deleteTurism = async (id) => {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        loadTurism();
    };


    // Abrir modal para editar usuário
    const openEditTurismModal = async (id) => {
        editTurismId = id;
        modalTitleTurism.innerText = 'Editar Turismo';

        // Buscar os dados do usuário para preencher o modal
        const response = await fetch(`${apiUrl}/${id}`);
        const turism = await response.json();

        document.getElementById('name').value = turism.name;
        document.getElementById('country').value = turism.country;
        document.getElementById('city').value = turism.city;
        document.getElementById('price').value = turism.price; // Não exibir senha

        turismModal.style.display = 'block';
    };

    // Abrir modal para adicionar novo usuário
    const openAddTurismModal = () => {
        editTurismId = null;
        modalTitleTurism.innerText = 'Adicionar Usuário';
        turismForm.reset();
        turismModal.style.display = 'block';
    };

    // Fechar modal ao clicar no "x"
    document.querySelector('.close').addEventListener('click', () => {
        turismModal.style.display = 'none';
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === turismModal) {
            turismModal.style.display = 'none';
        }
    });

    // Submissão do formulário
    turismForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const turismData = {
            name: document.getElementById('name').value,
            country: document.getElementById('country').value,
            city: document.getElementById('city').value,
            price: document.getElementById('price').value
        };

        if (editTurismId) {
            await updateTurism(editTurismId, turismData);
        } else {
            await addTurism(turismData);
        }

        turismModal.style.display = 'none';
        loadTurism();
    });

    // Inicializando o carregamento de usuários e eventos
    addTurismBtn.addEventListener('click', openAddTurismModal);
    loadTurism();
});
