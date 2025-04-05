document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:2309/api/plans'; // Atualize para sua API
    const plansModal = document.getElementById('plansModal');
    const plansForm = document.getElementById('plansForm');
    const addPlansBtn = document.getElementById('addPlansBtn');
    const modalTitle = document.getElementById('modalTitle');
    let editPlansId = null;

    // Função para carregar usuários
    const loadPlans = async () => {
        const response = await fetch(`${apiUrl}`);
        const plans = await response.json();
        const tableBody = document.querySelector('#plansTable tbody');
        tableBody.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados
    
        plans.forEach(plans => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${plans.name}</td>
                <td>${plans.action}</td>
                <td>${plans.price}</td>
                <td>
                    <button class="editplansBtn" data-id="${plans._id}">Editar</button>
                    <button class="deleteplansBtn" data-id="${plans._id}">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    
        // Adicionar eventos de edição e deleção novamente após carregar os dados
        document.querySelectorAll('.editplansBtn').forEach(button => {
            button.addEventListener('click', (e) => openEditPlansModal(e.target.dataset.id));
        });
    
        document.querySelectorAll('.deleteplansBtn').forEach(button => {
            button.addEventListener('click', (e) => deletePlans(e.target.dataset.id));
        });
    };
    
    // Função para adicionar usuário
    const addPlans = async (plans) => {
        try {
            const response = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(plans) // Envio dos dados
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao adicionar plano: ${response.statusText}`);
            }
    
            loadPlans(); // Recarregar os planos após a inserção
        } catch (error) {
            console.error('Erro ao adicionar plano:', error);
        }
    };

    // Função para atualizar usuário
    const updatePlans = async (id, plans) => {
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plans)
        });
        loadPlans();
    };

    // Função para deletar usuário
    const deletePlans = async (id) => {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        loadPlans();
    };


    // Abrir modal para editar usuário
    const openEditPlansModal = async (id) => {
        editPlansId = id;
        modalTitle.innerText = 'Editar Usuário';

        // Buscar os dados do usuário para preencher o modal
        const response = await fetch(`${apiUrl}/${id}`);
        const plans = await response.json();

        document.getElementById('name').value = plans.name;
        document.getElementById('action').value = plans.action;
        document.getElementById('price').value = plans.price; // Não exibir senha

        plansModal.style.display = 'block';
    };

    // Abrir modal para adicionar novo usuário
    const openAddPlansModal = () => {
        editPlansId = null;
        modalTitle.innerText = 'Adicionar Usuário';
        plansForm.reset();
        plansModal.style.display = 'block';
    };

    // Fechar modal ao clicar no "x"
    document.querySelector('.close').addEventListener('click', () => {
        plansModal.style.display = 'none';
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === plansModal) {
            plansModal.style.display = 'none';
        }
    });

    // Submissão do formulário
    plansForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const plansData = {
            name: document.getElementById('name').value,
            action: document.getElementById('action').value,
            price: document.getElementById('price').value
        };

        if (editPlansId) {
            await updatePlans(editPlansId, plansData);
        } else {
            await addPlans(plansData);
        }

        plansModal.style.display = 'none';
        loadPlans();
    });

    // Inicializando o carregamento de usuários e eventos
    addPlansBtn.addEventListener('click', openAddPlansModal);
    loadPlans();
});
