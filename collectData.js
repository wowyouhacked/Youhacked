// Importa a biblioteca axios
const axios = require('axios');

// URL do pastebin
const pasteURL = 'https://pastebin.com/raw/L6LkHB3B';

// Texto a ser enviado
const message = 'Eu estive aqui';

// Função para enviar o texto
async function writeToPaste() {
  try {
    const response = await axios.post(pasteURL, message, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    console.log('Texto enviado com sucesso!', response.status);
  } catch (error) {
    console.error('Erro ao enviar o texto:', error.message);
  }
}

// Executa a função
writeToPaste();
