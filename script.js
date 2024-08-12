const openModal = () => document.getElementById('modal').classList.add('active');

const closeModal = () => {
    document.getElementById('modal').classList.remove('active');
    clearFields();
};

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_project')) ?? [];
const setLocalStorage = (dbProject) => localStorage.setItem("db_project", JSON.stringify(dbProject));

const deleteProject = (index) => {
    const dbProject = readProject();
    dbProject.splice(index, 1);
    setLocalStorage(dbProject);
    updateTable();
};

const updateProject = (index, project) => {
    const dbProject = readProject();
    dbProject[index] = project;
    setLocalStorage(dbProject);
    updateTable();
};

const readProject = () => getLocalStorage();

const createProject = (project) => {
    const dbProject = getLocalStorage();
    dbProject.push(project);
    setLocalStorage(dbProject);
    updateTable();
};

const isValidFields = () =>{
    return document.getElementById('form').reportValidity();
}

const createRow = (project, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${project.responsavel}</td>
        <td>
            <select name="situacao" id="situacao-${index}">
                <option value="Prioridade" ${project.situacao === "Prioridade" ? "selected" : ""}>Prioridade</option>
                <option value="Crítico" ${project.situacao === "Crítico" ? "selected" : ""}>Crítico</option>
                <option value="Exemplo" ${project.situacao === "Exemplo" ? "selected" : ""}>Exemplo</option>
                <option value="Exemplo2" ${project.situacao === "Exemplo2" ? "selected" : ""}>Exemplo 2</option>
            </select>
        </td>
        <td>
            <select name="estado" id="estado-${index}">
                <option value="Pausado" ${project.estado === "Pausado" ? "selected" : ""}>Pausado</option>
                <option value="Concluido" ${project.estado === "Concluido" ? "selected" : ""}>Concluido</option>
                <option value="Andamento" ${project.estado === "Andamento" ? "selected" : ""}>Andamento</option>
                <option value="Aguardando" ${project.estado === "Aguardando" ? "selected" : ""}>Aguardando</option>
            </select>
        </td>
        <td>${project.observacao}</td>
        <td>
            <button class="button green" onclick="editProject(${index})">Editar</button>
            <button class="button red" onclick="deleteProject(${index})">Excluir</button>
        </td>
    `;
    document.querySelector('#tbProject>tbody').appendChild(newRow);
};

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
    document.querySelector(".modal-header>h2").textContent = "Novo Projeto";
    document.getElementById('salvar').dataset.index = 'new';
};

const saveProject = () => {
    if(isValidFields()){
        const project = {
            responsavel: document.getElementById('responsavel').value,
            situacao: document.getElementById('situacao').value,
            estado: document.getElementById('estado').value,
            observacao: document.getElementById('observacao').value
        };
    
    
    const index = document.getElementById('responsavel').dataset.index;

    if (index === 'new') {
        createProject(project);
        
    } else {
        updateProject(index, project);
    }

    updateTable();
    closeModal();
}
};

const fillFields = (project) => {
    document.getElementById('responsavel').value = project.responsavel;
    document.getElementById('situacao').value = project.situacao;
    document.getElementById('estado').value = project.estado;
    document.getElementById('observacao').value = project.observacao;
    document.getElementById('salvar').dataset.index = project.index;
};

const editProject = (index) => {
    const project = readProject()[index];
    project.index = index;
    fillFields(project);
    document.querySelector(".modal-header>h2").textContent = `Editando ${project.responsavel}`;
    openModal();
};

const clearTable = () => {
    const rows = document.querySelectorAll('#tbProject>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
};

const updateTable = () => {
    const dbProject = readProject();
    clearTable();
    dbProject.forEach(createRow);
};

updateTable();

document.getElementById('newProjeto').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('salvar').addEventListener('click', saveProject);

document.getElementById('fechar').addEventListener('click', closeModal);
