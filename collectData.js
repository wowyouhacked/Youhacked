const fetch = require('node-fetch'); // Biblioteca para requisições HTTP

// Substitua por sua API Key do Pastebin
const API_KEY = "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";

// Dados do novo paste
const postData = {
  api_dev_key: API_KEY,
  api_option: "paste",
  api_paste_code: "Eu estive aqui",
  api_paste_name: "Mensagem",
  api_paste_private: 0, // Público
  api_paste_expire_date: "N", // Sem expiração
  api_paste_format: "text"
};

// Função para criar o paste
async function createPaste() {
  try {
    const response = await fetch("https://pastebin.com/api/api_post.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(postData)
    });

    const result = await response.text();

    if (response.ok) {
      console.log("Paste criado com sucesso: ", result);
    } else {
      console.error("Erro ao criar paste: ", result);
    }
  } catch (error) {
    console.error("Erro na requisição: ", error);
  }
}

// Execute o script
createPaste();
