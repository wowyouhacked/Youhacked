document.getElementById('dadosForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    
    // URL do servidor no mesmo dispositivo (localhost)
    const servidorURL = "http://localhost:3000/coletar-dados"; 

    // Enviando os dados para o servidor
    fetch(servidorURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome, email: email })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dados enviados com sucesso:', data);
    })
    .catch((error) => {
        console.error('Erro ao enviar os dados:', error);
    });
});

