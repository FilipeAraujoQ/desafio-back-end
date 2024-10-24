const url = "http://localhost:8800/"; // Apontando para a rota correta

function getLivro() {
  axios.get(url)
    .then(response => {
      const data = response.data
      renderResults.textContent = JSON.stringify(data)
    })
    .catch(error => console.log(error));
}

getLivro();
