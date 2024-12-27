// Defina suas credenciais de API Key e Client ID
const API_KEY = 'AIzaSyCTi0wnPEQyYEVevATTgzP9EFcy6VttX88';
const CLIENT_ID = '819636896801-lhecrnpmgem4940dsmrnp8g5dvcgh2rb.apps.googleusercontent.com';
const SCOPE = 'https://www.googleapis.com/auth/drive.file'; // Permissão para acessar arquivos do Google Drive

// Função para inicializar o cliente da API Google
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPE,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
    }).then(function() {
        // Verificar se o usuário está autenticado
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
            coletarDados();
        } else {
            gapi.auth2.getAuthInstance().signIn().then(coletarDados);
        }
    });
}

// Carregar a biblioteca da API Google
function loadAPI() {
    gapi.load('client:auth2', initClient);
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
        sessionStorage: sessionStorage.length
    };

    // Converter os dados para JSON
    const dadosJSON = JSON.stringify(dados);

    // Chamada para fazer o upload dos dados para o Google Drive
    uploadParaDrive(dadosJSON);
}

// Função para fazer o upload para o Google Drive
function uploadParaDrive(dadosJSON) {
    const fileMetadata = {
        'name': 'dados.json', // Nome do arquivo no Google Drive
        'mimeType': 'application/json'
    };

    const media = {
        mimeType: 'application/json',
        body: dadosJSON // Corpo do arquivo JSON
    };

    // Criar o arquivo no Google Drive
    const request = gapi.client.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    });

    request.execute(function(file) {
        if (file.id) {
            console.log('Arquivo enviado com sucesso! ID: ' + file.id);
        } else {
            console.log('Erro ao enviar o arquivo: ', file);
        }
    });
}

// Iniciar o processo de autenticação e upload quando o script for executado
loadAPI();
