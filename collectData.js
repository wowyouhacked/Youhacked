fetch('https://api.github.com/repos/wowyouhacked/Youhacked/contents/dados-usuarios.json', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer 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'
  }
})
.then(response => response.json())
.then(data => {
  const fileContent = atob(data.content); // Decodificando conteúdo base64
  const jsonContent = JSON.parse(fileContent);

  // Adicionando a mensagem ao arquivo JSON
  jsonContent.mensagem = 'oi eu estive aqui';

  // Atualizando o arquivo no GitHub
  fetch('https://api.github.com/repos/wowyouhacked/Youhacked/contents/dados-usuarios.json', {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Atualizando arquivo dados-usuarios.json',
      content: btoa(JSON.stringify(jsonContent)), // Codificando em base64
      sha: data.sha
    })
  })
  .then(response => response.json())
  .then(updatedData => console.log('Arquivo atualizado:', updatedData))
  .catch(error => console.error('Erro ao atualizar arquivo:', error));
})
.catch(error => console.error('Erro ao acessar o arquivo:', error));

