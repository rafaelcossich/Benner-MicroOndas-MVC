var totalSeconds; // Variável global para manter o tempo total em segundos
var cronometroInterval; // Intervalo do cronômetro
var isPaused = false; // Indica se o cronômetro está pausado
var isStopped = true; // Indica se o cronômetro está parado
var isFinished = false; // Indica se o cronômetro foi finalizado
var potencia; // Variável global para armazenar a potência
var segundosDecorridos = 0; // Contador de segundos decorrido

// Validação do campo de tempo
document.getElementById('inputTempo').addEventListener('input', function () {
    var time = this.value.split(':');
    var minutes = parseInt(time[0], 10);
    var seconds = parseInt(time[1], 10);
    if (minutes > 2 || (minutes === 2 && seconds > 0)) {
        this.value = '02:00';
        document.getElementById('msg').innerText = 'O tempo máximo permitido é 02:00.';
    } else {
        document.getElementById('msg').innerText = '';
    }
});

// Validação do campo de potência
document.getElementById('inputPotencia').addEventListener('input', function () {
    var potenciaValue = this.value;
    if (potenciaValue > 10) {
        this.value = '10';
        document.getElementById('msg').innerText = 'Potência máxima permitida é 10.';
    } else if (potenciaValue < 1) {
        this.value = '1';
        document.getElementById('msg').innerText = 'Potência mínima permitida é 1.';
    } else {
        document.getElementById('msg').innerText = '';
    }
    potencia = parseInt(this.value, 10);
});

// Função para iniciar ou continuar o cronômetro
function iniciarCronometro() {
    if (isStopped || isFinished) {
        // Só inicia o cronômetro se não estiver parado ou finalizado
        var tempo = document.getElementById("inputTempo").value || "00:30";
        var potenciaInput = document.getElementById("inputPotencia").value || "10";

        document.getElementById("inputTempo").value = tempo;
        document.getElementById("inputPotencia").value = potenciaInput;

        var mensagem = "Potência: " + potenciaInput + "<br>Tempo: " + tempo;
        document.getElementById("resultado").innerHTML = mensagem;

        var timeParts = tempo.split(':');
        var minutes = parseInt(timeParts[0], 10);
        var seconds = parseInt(timeParts[1], 10);
        totalSeconds = (minutes * 60) + seconds;

        segundosDecorridos = 0;
        isStopped = false;
        isFinished = false; // Resetar estado de finalização
    }

    if (isPaused || !cronometroInterval) {
        cronometroInterval = setInterval(function () {
            if (totalSeconds <= 0) {
                clearInterval(cronometroInterval);
                document.getElementById("cronometro").innerHTML = "Aquecimento Finalizado!";
                document.getElementById("visualizacaoTempo").innerHTML = gerarVisualizacaoTempo();
                isFinished = true; // Marcar como finalizado
                return;
            }

            totalSeconds--;
            segundosDecorridos++;

            var displayMinutes = Math.floor(totalSeconds / 60);
            var displaySeconds = totalSeconds % 60;

            if (displaySeconds < 10) {
                displaySeconds = '0' + displaySeconds;
            }

            document.getElementById("cronometro").innerHTML = "Tempo restante: " + displayMinutes + ":" + displaySeconds;
            document.getElementById("visualizacaoTempo").innerHTML = gerarVisualizacaoTempo();
        }, 1000);

        isPaused = false;
    }
}

// Função para pausar ou parar o cronômetro
function pausarOuPararCronometro() {
    if (isPaused) {
        // Se já estiver pausado, parar o cronômetro
        clearInterval(cronometroInterval);
        isStopped = true;
        isFinished = true; // Marcar como finalizado
        document.getElementById("btnPausarParar").innerText = "Parado";
    } else {
        // Pausar o cronômetro
        clearInterval(cronometroInterval);
        isPaused = true;
        document.getElementById("btnPausarParar").innerText = "Parar";
    }
}

// Função para reiniciar o cronômetro
function reiniciarCronometro() {
    clearInterval(cronometroInterval);
    isPaused = false;
    isStopped = true;
    isFinished = false; // Resetar estado de finalização
    document.getElementById("cronometro").innerHTML = "Tempo restante: 00:00";
    document.getElementById("visualizacaoTempo").innerHTML = "";
    document.getElementById("btnPausarParar").innerText = "Pausar";
    segundosDecorridos = 0;
}

// Função para gerar a visualização do tempo decorrido
function gerarVisualizacaoTempo() {
    if (isStopped || isFinished) return "";

    var pontosPorSegundo = potencia || 1; // Número de pontos por segundo
    var espacosEntreGrupos = potencia || 1; // Número de espaços entre grupos de pontos
    var gruposDePontos = Math.floor(segundosDecorridos / 1); // Cada segundo gera um grupo de pontos

    var pontos = '.'.repeat(pontosPorSegundo); // Gera um grupo de pontos
    var visualizacao = pontos.repeat(gruposDePontos); // Gera a visualização com todos os grupos

    // Adiciona o número de espaços entre os grupos de pontos
    var espacos = ' '.repeat(espacosEntreGrupos);
    return visualizacao.split(pontos).join(pontos + espacos).trim(); // Adiciona espaçamento entre os grupos
}