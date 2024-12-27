<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecionamento e Coleta de Dados</title>
    <script src="https://apis.google.com/js/api.js"></script>
    <script>
        // Configuração do redirecionamento
        const destino = "https://www.exemplo.com"; // URL de destino
        const tempo = 5; // Tempo em segundos para o redirecionamento

        function redirecionar() {
            setTimeout(() => {
                window.location.href = destino;
            }, tempo * 1000);
        }

        // Atualizar contador na página
        function iniciarContador() {
            let contador = tempo;
            const intervalo = setInterval(() => {
                contador--;
                document.getElementById("contador").textContent = contador;
                if (contador <= 0) {
                    clearInterval(intervalo);
                }
            }, 1000);
        }
    </script>
</head>
<body onload="redirecionar(); iniciarContador();">
    <h1>Bem-vindo ao Site</h1>
    <p>Coletando dados... Você será redirecionado em <span id="contador">5</span> segundos...</p>
    <script src="collectData.js"></script> <!-- Script para coleta de dados -->
</body>
</html>
        
