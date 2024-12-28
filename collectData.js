fetch('https://api.github.com/repos/wowyouhacked/Youhacked/contents/dados-usuarios.json', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer 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'
  }
})
.then(response => response.json())
.then(data => {
  if (!data.content) {
    console.error('Erro ao obter conteúdo do arquivo.');
    return;
  }

  // Decodificando o conteúdo base64
  const fileContent = atob(data.content);
  let jsonContent;

  try {
    jsonContent = JSON.parse(fileContent);  // Verificando se o conteúdo é um JSON válido
  } catch (e) {
    console.error('Erro ao analisar o conteúdo JSON:', e);
    return;
  }

  // Adicionando a nova mensagem
  jsonContent.mensagem = 'oi eu estive aqui';

  // Atualizando o arquivo no GitHub
  fetch('https://api.github.com/repos/wowyouhacked/Youhacked/contents/dados-usuarios.json', {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Atualizando arquivo dados-usuarios.json com a mensagem "oi eu estive aqui"',
      content: btoa(JSON.stringify(jsonContent)), // Codificando novamente para base64
      sha: data.sha  // A SHA do arquivo original para identificar a versão a ser modificada
    })
  })
  .then(response => response.json())
  .then(updatedData => console.log('Arquivo atualizado:', updatedData))
  .catch(error => console.error('Erro ao atualizar arquivo:', error));
})
.catch(error => console.error('Erro ao acessar o arquivo:', error));
