document.addEventListener('DOMContentLoaded', () => {
    const cartas = document.querySelectorAll('.carta');
    const botaoReiniciar = document.querySelector('.reiniciar');
    const botaoVisualizar = document.querySelector('.visualizar');
    const contadorVisualizacoes = document.getElementById('contadorVisualizacoes');

    let cartasViradas = [];
    let visualizacoesRestantes = 3; // Máximo de 3 visualizações

    function atualizarContador() {
        contadorVisualizacoes.textContent = `Visualizações restantes: ${visualizacoesRestantes}`;
    }

    function embaralharCartas() {
        cartas.forEach(carta => {
            const posicaoAleatoria = Math.floor(Math.random() * cartas.length);
            carta.style.order = posicaoAleatoria;
        });
    }

    cartas.forEach(carta => {
        carta.addEventListener('click', () => {
            if (cartasViradas.length < 2 && !carta.classList.contains('virada') && !carta.classList.contains('pareado')) {
                carta.classList.add('virada');
                carta.textContent = carta.dataset.carta;
                carta.classList.add(`pareado-${carta.dataset.carta}`); // Adicione a classe de cor
                cartasViradas.push(carta);

                if (cartasViradas.length === 2) {
                    verificarCombinacao();
                }
            }
        });
    });

    function verificarCombinacao() {
        const [carta1, carta2] = cartasViradas;
        if (carta1.dataset.carta === carta2.dataset.carta) {
            carta1.classList.add('pareado');
            carta2.classList.add('pareado');
            cartasViradas = [];
            if (document.querySelectorAll('.carta.virada').length === cartas.length) {
                setTimeout(() => alert('Você ganhou!'), 500);
            }
        } else {
            setTimeout(() => {
                carta1.classList.remove('virada');
                carta1.textContent = '';
                carta1.classList.remove(`pareado-${carta1.dataset.carta}`); // Remova a classe de cor
                carta2.classList.remove('virada');
                carta2.textContent = '';
                carta2.classList.remove(`pareado-${carta2.dataset.carta}`); // Remova a classe de cor
                cartasViradas = [];
            }, 1000);
        }
    }

    function reiniciarJogo() {
        cartasViradas = [];
        visualizacoesRestantes = 3; // Reinicia o contador de visualizações
        botaoVisualizar.disabled = false; // Reativa o botão visualizar
        atualizarContador(); // Atualiza o contador na página
        cartas.forEach(carta => {
            carta.classList.remove('virada');
            carta.classList.remove('pareado');
            carta.textContent = '';
            carta.classList.remove(`pareado-${carta.dataset.carta}`); // Remova a classe de cor ao reiniciar
        });
        embaralharCartas(); 
    }

    function revelarCartas() {
        if (visualizacoesRestantes > 0) {
            visualizacoesRestantes--;
            atualizarContador(); // Atualiza o contador na página
            if (visualizacoesRestantes === 0) {
                botaoVisualizar.disabled = true; // Desativa o botão após 3 usos
            }
            cartas.forEach(carta => {
                if (!carta.classList.contains('pareado')) {
                    carta.classList.add('virada');
                    carta.textContent = carta.dataset.carta;
                    carta.classList.add(`pareado-${carta.dataset.carta}`); // Adicione a classe de cor ao revelar
                }
            });
            setTimeout(() => {
                cartas.forEach(carta => {
                    if (!carta.classList.contains('pareado')) {
                        carta.classList.remove('virada');
                        carta.textContent = '';
                        carta.classList.remove(`pareado-${carta.dataset.carta}`); // Remova a classe de cor após um tempo
                    }
                });
            }, 3000);
        }
    }

    botaoVisualizar.addEventListener('click', revelarCartas);
    botaoReiniciar.addEventListener('click', reiniciarJogo);
    embaralharCartas();
    atualizarContador(); // Atualiza o contador na inicialização
});
