const url = "http://localhost:8800/"

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options).replace(/\//g, '/'); // Formata a data como DD/MM/YYYY
};

// Função para carregar livros
const loadLivros = async () => {
    try {
        const response = await axios.get(url);
        const livros = response.data;
        const livrosList = document.getElementById('livrosList');

        livrosList.innerHTML = ''; // Limpa a lista antes de preencher

        livros.forEach(livro => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="py-2 px-4 border-b">${livro.livro}</td>
                <td class="py-2 px-4 border-b">${livro.autor}</td>
                <td class="py-2 px-4 border-b">${formatDate(livro.data)}</td> <!-- Formatação da data -->
                <td class="py-2 px-4 border-b">
                    <input type="checkbox" onchange="updateStatus(${livro.id}, this.checked)" ${livro.status ? 'checked' : ''}>
                </td>
                <td class="py-2 px-4 border-b">
                    <button onclick="editLivro(${livro.id})" class="bg-yellow-500 text-white rounded p-1">Editar</button>
                </td>
            `;
            livrosList.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
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

// Função para editar livro
const editLivro = async (id) => {
    const livro = prompt('Nome do Livro:');
    const autor = prompt('Autor:');
    const data = prompt('Data de Lançamento:');
    const status = confirm('Livro lido?');

    try {
        await axios.put(`${url}/${id}`, { livro, autor, data, status });
        loadLivros(); // Recarrega a lista de livros
    } catch (error) {
        console.error('Erro ao editar livro:', error);
    }
};

// Carrega os livros ao iniciar
loadLivros();
