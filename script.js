// ===================================================================================
// ÁREA DE EDIÇÃO FÁCIL: ADICIONE SUAS PERGUNTAS AQUI!
//
// Para adicionar uma nova pergunta, basta copiar o bloco entre {}, colar abaixo
// e alterar o texto da pergunta e das respostas.
//
// IMPORTANTE:
// 1. Mantenha a vírgula (,) depois de cada bloco }
// 2. Na resposta certa, coloque: correct: true
// 3. Nas respostas erradas, coloque: correct: false
// ===================================================================================
const quizData = [
    {
        question: "Qual minha cor favorita?",
        answers: [
            { text: "Verde", correct: false },
            { text: "Azul", correct: true },
            { text: "Amarelo", correct: false },
            { text: "Vermelho", correct: false }
        ]
    }, // <-- Não se esqueça da vírgula!
    {
        question: "Qual minha comida preferida? (comida mesmo de verdade)",
        answers: [
            { text: "Lasanha", correct: false },
            { text: "Feijoada", correct: false },
            { text: "Risoto", correct: false },
            { text: "Strogonoff", correct: true }
        ]
    }, // <-- Não se esqueça da vírgula!
    {
        question: "Qual o primeiro anime que eu assisti?",
        answers: [
            { text: "Naruto", correct: true },
            { text: "One piece", correct: false },
            { text: "Attack on titan", correct: false },
            { text: "Cavalheiro dos zodiacos", correct: false }
        ]
    }, // <-- Não se esqueça da vírgula!
    {
        question: "Qual minha altura?",
        answers: [
            { text: "1.83", correct: false },
            { text: "1.77", correct: false },
            { text: "1.80", correct: true },
            { text: "1.85", correct: false }
        ]
    }, // <-- Coloque a vírgula antes de adicionar
    {
        question: "Quantas namoradas eu já tive?",
        answers: [
            { text: "1", correct: false },
            { text: "3", correct: false },
            { text: "0", correct: true },
            { text: "2", correct: false }
        ]
    }, // <-- Coloque a vírgula antes de adicionar
    {
        question: "Qual o irmão do Luffy? (acredite essa pergunta é muito importante)",
        answers: [
            { text: "Ace", correct: true },
            { text: "Gol D Roger", correct: false },
            { text: "Sabo", correct: true },
            { text: "Zoro", correct: false }
        ]
    }, // <-- Coloque a vírgula antes de adicionar
    {
        question: "Eu já chorei pela morte de um barco?",
        answers: [
            { text: "Sim", correct: true },
            { text: "Não", correct: false },
        ]
    },
    {
        question: "Qual o melhor anime do mundo?",
        answers: [
            { text: "One Piece", correct: true },
            { text: "One Piece", correct: true },
            { text: "One Piece", correct: true },
            { text: "One Piece", correct: true },
            { text: "One Piece", correct: true },

        ]
    },
     {
        question: "Qual meu unico medo?",
        answers: [
            { text: "Cagar e não ter papel", correct: true },
            { text: "Morrer pobre", correct: false },
            { text: "Ir para o inferno", correct: false},
            { text: "Ter hemorroida", correct: false }
        ]
    }
    // Para adicionar uma nova pergunta, copie um bloco como o de cima
    // e cole aqui. Exemplo:
    /*
    , // <-- Coloque a vírgula antes de adicionar
    {
        question: "Qual o maior animal do mundo?",
        answers: [
            { text: "Elefante", correct: false },
            { text: "Tubarão Branco", correct: false },
            { text: "Baleia Azul", correct: true },
            { text: "Girafa", correct: false }
        ]
    }
    */
];
// ===================================================================================
// FIM DA ÁREA DE EDIÇÃO
// (Não precisa alterar nada abaixo disso)
// ===================================================================================

const quizContainer = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const answerListEl = quizContainer.querySelector('ul');
const submitButton = document.getElementById('submit');
const resultsContainer = document.getElementById('results');
const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');

let currentQuiz = 0;
let score = 0;
let answerSelected = false;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    answerSelected = false;
    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    answerListEl.innerHTML = '';

    currentQuizData.answers.forEach((answer, index) => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.id = 'answer' + index;
        input.dataset.correct = answer.correct;

        const label = document.createElement('label');
        label.htmlFor = 'answer' + index;
        label.innerText = answer.text;

        li.appendChild(input);
        li.appendChild(label);
        answerListEl.appendChild(li);

        input.addEventListener('change', () => {
            answerSelected = true;
        });
    });
}

function deselectAnswers() {
    const answerEls = document.querySelectorAll('input[name="answer"]');
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    const answerEls = document.querySelectorAll('input[name="answer"]');
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl;
        }
    });
    return answer;
}

submitButton.addEventListener('click', () => {
    const answer = getSelected();

    if (answer) {
        // Aplica animação de acerto/erro
        const labels = answerListEl.querySelectorAll('label');
        const inputs = answerListEl.querySelectorAll('input');

        inputs.forEach((input, index) => {
            const label = labels[index];
            if (input.dataset.correct === 'true') {
                label.classList.add('correct'); // Mostra a correta
            } else if (input.checked) {
                label.classList.add('incorrect'); // Mostra a errada que foi marcada
            }
            input.disabled = true; // Desabilita opções após a escolha
        });

        // Verifica se a resposta está correta e atualiza a pontuação
        if (answer.dataset.correct === 'true') {
            score++;
        }

        // Avança para a próxima pergunta ou mostra o resultado
        currentQuiz++;
        setTimeout(() => {
            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                showResults();
            }
        }, 1500); // Espera 1.5 segundos para mostrar a próxima pergunta
    } else {
        // Animação para caso nenhuma resposta seja selecionada
        quizContainer.classList.add('incorrectShake');
        setTimeout(() => {
            quizContainer.classList.remove('incorrectShake');
        }, 500);
    }
});

function showResults() {
    quizContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    scoreEl.innerText = score;
    totalEl.innerText = quizData.length;
}