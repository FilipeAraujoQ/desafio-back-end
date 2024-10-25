const url = "http://localhost:8800/"

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options).replace(/\//g, '/'); // Formata a data como DD/MM/YYYY
};

const loadLivros = async () => {
    try {
        const response = await axios.get(url);
        const livros = response.data;
        const livrosList = document.getElementById('livrosList');

        livrosList.innerHTML = ''; // Limpa a lista antes de preencher

        livros.forEach(livro => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="py-2 px-4 border-b text-center">${livro.livro}</td>
                <td class="py-2 px-4 border-b text-center">${livro.autor}</td>
                <td class="py-2 px-4 border-b text-center">${formatDate(livro.data)}</td>
                <td class="py-2 px-4 border-b text-center">
                    <input type="checkbox" onchange="updateStatus(${livro.id}, this.checked)" ${livro.status ? 'checked' : ''}>
                </td>
                <td class="py-2 px-4 border-b text-center">
                    <button onclick="editLivro(${livro.id}, '${livro.livro}', '${livro.autor}', '${livro.data}')" class="bg-yellow-500 text-white rounded p-1">Editar</button>
                </td>
            `;
            livrosList.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
    }
};

const updateStatus = async (id, status) => {
    try {
        await axios.put(`${url}${id}`, { status });
        loadLivros();
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
    }
};

// Função para adicionar livro
document.getElementById('livroForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const livro = document.getElementById('livro').value;
    const autor = document.getElementById('autor').value;
    const data = document.getElementById('data').value;
    const status = document.getElementById('status').checked ? 1 : 0;

    try {
        await axios.post(url, { livro, autor, data, status });
        loadLivros(); // Recarrega a lista de livros
        e.target.reset(); // Limpa o formulário
    } catch (error) {
        console.error('Erro ao adicionar livro:', error);
    }
});


const editLivro = (id, livro, autor, data) => {
    const livrosList = document.getElementById('livrosList');
    const rows = livrosList.getElementsByTagName('tr');

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        if (cells[0].innerText === livro) { // Encontra a linha correspondente
            console.log('Editando livro:', livro);

            // Substituir os valores da linha por inputs
            cells[0].innerHTML = `<input type="text" value="${livro}" class="border rounded p-1">`;
            cells[1].innerHTML = `<input type="text" value="${autor}" class="border rounded p-1">`;
            cells[2].innerHTML = `<input type="date" value="${data.split('T')[0]}" class="border rounded p-1">`;
            cells[3].innerHTML = `<input type="checkbox" onchange="updateStatus(${id}, this.checked)" ${livro.status ? 'checked' : ''}>`;
            cells[4].innerHTML = `<button onclick="saveLivro(${id}, this.parentElement.parentElement)" class="bg-green-500 text-white rounded p-1">Salvar</button>`;
            break;
        }
    }
};

const saveLivro = async (id, row) => {
    const inputs = row.getElementsByTagName('input');
    const livro = inputs[0].value;
    const autor = inputs[1].value;
    const data = inputs[2].value;
    const status = inputs[3].checked ? 1 : 0;

    try {
        await axios.put(`${url}${id}`, { livro, autor, data, status });
        loadLivros(); // Recarrega a lista de livros
    } catch (error) {
        console.error('Erro ao salvar livro:', error);
    }
};



loadLivros();