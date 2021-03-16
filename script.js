const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";

/*Contador de jogadas*/
let gameState = ["", "", "", "", "", "", "", "", ""];

const mensagemVitoria = () => `O jogador ${currentPlayer} ganhou!`;
const mensagemEmpate = () => `Deu velha!`;
const vezdoJogadorAtual = () => `É a vez do ${currentPlayer}`;

statusDisplay.innerHTML = vezdoJogadorAtual();

/* condições de vitorias possiveis */
const condicoesdeVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


/* Guarda em qual celula foi jogada */
function guardaCelulaJogada(celulaClicada, indiceCelulaClicada) {
    gameState[indiceCelulaClicada] = currentPlayer;
    celulaClicada.innerHTML = currentPlayer;
}

/* Guarda qual o jogador da vez */
function guardaMudancaJogador() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = vezdoJogadorAtual();
}

function guardaValidacaoResultado() {
    let roundGanho = false;
    for ( let i = 0; i <= 7; i++) {
        const condicaodeVitoria = condicoesdeVitoria[i];
        let a = gameState[condicaodeVitoria[0]];
        let b = gameState[condicaodeVitoria[1]];
        let c = gameState[condicaodeVitoria[2]];
        if (a === '' || b === '' || c==='') {
            continue;
        }
        if (a === b && b===c) {
            roundGanho = true;
            break
        }
    }
if (roundGanho) {
    statusDisplay.innerHTML = mensagemVitoria();
    gameActive = false;
    return;
}
/* Checa se tem algum valor no gameState array que nao foi preenchido com por algum jogador */
    let roundEmpate = !gameState.includes("");
    if (roundEmpate) {
        statusDisplay.innerHTML = mensagemEmpate();
        gameActive = false;
        return;
    }
    guardaMudancaJogador();
}

/* Guarda qual celula foi clicada */
function guardaCelulaClicada(clickCelulaEvento) {
/* Salvar o elemento html clicado em uma variavel */
    const celulaClicada = clickCelulaEvento.target;

/* Pegar a 'data-cell-index' atribuida da celula clicada para identificar onde a celula esta no painel */    
    const indiceCelulaClicada = parseInt(
        celulaClicada.getAttribute('data-cell-index')
    );

/* Checa qual celula ja foi jogada ou se o jogo esta parado. */
    if (gameState[indiceCelulaClicada] !== "" || !gameActive) {
        return;
    }
    
    guardaCelulaJogada(celulaClicada, indiceCelulaClicada);
    guardaValidacaoResultado();
}

/* Reseta o jogo */
function RestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = vezdoJogadorAtual();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

/* Event listeners para as celulas do jogo, junto do botao para reiniciar */
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', guardaCelulaClicada));
document.querySelector('.game--restart').addEventListener('click', RestartGame);