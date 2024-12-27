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
    const dadosJSON = JSON.stringify(dados, null, 2);  // 'null, 2' faz o JSON ficar mais legível

    // Chamada para criar e baixar o arquivo JSON
    baixarArquivoJSON(dadosJSON);
}

// Função para baixar o arquivo JSON
function baixarArquivoJSON(dadosJSON) {
    const blob = new Blob([dadosJSON], { type: 'application/json' });  // Cria o Blob (arquivo em memória)
    const url = URL.createObjectURL(blob);  // Cria a URL temporária para o Blob

    // Cria o link de download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dados_usuario.json';  // Nome do arquivo que será gerado
    link.click();  // Aciona o download

    // Limpa a URL temporária após o download
    URL.revokeObjectURL(url);
}

// Chama a função para coletar os dados quando a página carregar
window.onload = function() {
    coletarDados();
};
