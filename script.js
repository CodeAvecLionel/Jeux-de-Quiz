const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const timerDisplay = document.getElementById('timer');
const levelDisplay = document.getElementById('level');

let timer;
let timeLeft = 180; // 3 minutes in seconds
let currentLevel = 0;
let score = 0;

const levels = [
    // Add 20 levels of questions
    [
        {
            question: "Qui est le président de la France en 2024?",
            answers: {
                a: "Emmanuel Macron",
                b: "François Hollande",
                c: "Nicolas Sarkozy"
            },
            correctAnswer: "a"
        },
        {
            question: "Quelle est la capitale de l'Espagne?",
            answers: {
                a: "Madrid",
                b: "Barcelone",
                c: "Valence"
            },
            correctAnswer: "a"
        }
    ],
    [
        {
            question: "Quel est le plus grand océan du monde?",
            answers: {
                a: "Océan Atlantique",
                b: "Océan Indien",
                c: "Océan Pacifique"
            },
            correctAnswer: "c"
        },
        {
            question: "En quelle année l'homme a-t-il marché sur la lune?",
            answers: {
                a: "1965",
                b: "1969",
                c: "1972"
            },
            correctAnswer: "b"
        }
    ],
    // Add more levels with questions on different topics here
    // For simplicity, we are replicating the same structure
    [
        {
            question: "Quel est le plus grand désert du monde?",
            answers: {
                a: "Sahara",
                b: "Gobi",
                c: "Antarctique"
            },
            correctAnswer: "c"
        },
        {
            question: "Quelle est la capitale du Japon?",
            answers: {
                a: "Tokyo",
                b: "Osaka",
                c: "Kyoto"
            },
            correctAnswer: "a"
        }
    ],
    // Continue adding levels...
    [
        {
            question: "Quelle est la formule chimique de l'eau?",
            answers: {
                a: "H2O",
                b: "CO2",
                c: "O2"
            },
            correctAnswer: "a"
        },
        {
            question: "Qui a écrit 'Les Misérables'?",
            answers: {
                a: "Victor Hugo",
                b: "Alexandre Dumas",
                c: "Émile Zola"
            },
            correctAnswer: "a"
        }
    ],
    [
        {
            question: "Combien de continents y a-t-il sur Terre?",
            answers: {
                a: "5",
                b: "6",
                c: "7"
            },
            correctAnswer: "c"
        },
        {
            question: "Quel est le symbole chimique du fer?",
            answers: {
                a: "Fe",
                b: "Ir",
                c: "I"
            },
            correctAnswer: "a"
        }
    ],
    // Adding dummy levels to reach 20 for illustration
    [
        {
            question: "Quelle est la planète la plus proche du Soleil?",
            answers: {
                a: "Venus",
                b: "Mercure",
                c: "Terre"
            },
            correctAnswer: "b"
        },
        {
            question: "Combien de jours y a-t-il dans une année bissextile?",
            answers: {
                a: "364",
                b: "365",
                c: "366"
            },
            correctAnswer: "c"
        }
    ],
    [
        {
            question: "Quelle est la monnaie utilisée au Japon?",
            answers: {
                a: "Yen",
                b: "Won",
                c: "Dollar"
            },
            correctAnswer: "a"
        },
        {
            question: "Quel est l'élément chimique le plus léger?",
            answers: {
                a: "Hélium",
                b: "Hydrogène",
                c: "Oxygène"
            },
            correctAnswer: "b"
        }
    ],
    [
        {
            question: "Quelle est la vitesse de la lumière?",
            answers: {
                a: "300 000 km/s",
                b: "150 000 km/s",
                c: "450 000 km/s"
            },
            correctAnswer: "a"
        },
        {
            question: "Qui a peint la Mona Lisa?",
            answers: {
                a: "Vincent van Gogh",
                b: "Leonardo da Vinci",
                c: "Pablo Picasso"
            },
            correctAnswer: "b"
        }
    ],
    [
        {
            question: "Combien de couleurs y a-t-il dans un arc-en-ciel?",
            answers: {
                a: "6",
                b: "7",
                c: "8"
            },
            correctAnswer: "b"
        },
        {
            question: "Quelle est la langue la plus parlée au monde?",
            answers: {
                a: "Anglais",
                b: "Espagnol",
                c: "Mandarin"
            },
            correctAnswer: "c"
        }
    ],
    [
        {
            question: "Quelle est la capitale de l'Italie?",
            answers: {
                a: "Milan",
                b: "Rome",
                c: "Naples"
            },
            correctAnswer: "b"
        },
        {
            question: "Qui a écrit 'Hamlet'?",
            answers: {
                a: "Charles Dickens",
                b: "William Shakespeare",
                c: "Mark Twain"
            },
            correctAnswer: "b"
        }
    ],
    [
        {
            question: "Quel est le plus grand mammifère?",
            answers: {
                a: "Éléphant",
                b: "Baleine bleue",
                c: "Girafe"
            },
            correctAnswer: "b"
        },
        {
            question: "Quelle est la capitale de l'Australie?",
            answers: {
                a: "Sydney",
                b: "Melbourne",
                c: "Canberra"
            },
            correctAnswer: "c"
        }
    ],
    [
        {
            question: "Quel est l'organe principal du système circulatoire?",
            answers: {
                a: "Cœur",
                b: "Poumons",
                c: "Foie"
            },
            correctAnswer: "a"
        },
        {
            question: "Qui a inventé l'ampoule électrique?",
            answers: {
                a: "Nikola Tesla",
                b: "Thomas Edison",
                c: "Alexander Graham Bell"
            },
            correctAnswer: "b"
        }
    ],
    [
        {
            question: "Quel est le plus long fleuve du monde?",
            answers: {
                a: "Amazon",
                b: "Nile",
                c: "Yangtze"
            },
            correctAnswer: "b"
        },
        {
            question: "Combien y a-t-il de joueurs dans une équipe de football?",
            answers: {
                a: "10",
                b: "11",
                c: "12"
            },
            correctAnswer: "b"
        }
    ],
    [
        {
            question: "Quel est le symbole chimique de l'or?",
            answers: {
                a: "Au",
                b: "Ag",
                c: "G"
            },
            correctAnswer: "a"
        },
        {
            question: "Quel est le plus grand pays en termes de superficie?",
            answers: {
                a: "Canada",
                b: "Chine",
                c: "Russie"
            },
            correctAnswer: "c"
        }
    ],
    [
        {
            question: "Combien de temps met la Terre pour faire le tour du Soleil?",
            answers: {
                a: "365 jours",
                b: "366 jours",
                c: "364 jours"
            },
            correctAnswer: "a"
        },
        {
            question: "Quel est le pays le plus peuplé du monde?",
            answers: {
                a: "Inde",
                b: "Chine",
                c: "États-Unis"
            },
            correctAnswer: "b"
        }
    ],
    [
        {
            question: "Quel est l'élément chimique symbolisé par 'O'?",
            answers: {
                a: "Osmium",
                b: "Oxygène",
                c: "Or"
            },
            correctAnswer: "b"
        },
        {
            question: "Quel est l'océan le plus petit?",
            answers: {
                a: "Océan Indien",
                b: "Océan Arctique",
                c: "Océan Atlantique"
            },
            correctAnswer: "b"
        }
    ],
    [
        {
            question: "Qui a écrit 'Le Petit Prince'?",
            answers: {
                a: "Antoine de Saint-Exupéry",
                b: "Jules Verne",
                c: "Victor Hugo"
            },
            correctAnswer: "a"
        },
        {
            question: "Combien de langues officielles y a-t-il en Suisse?",
            answers: {
                a: "3",
                b: "4",
                c: "5"
            },
            correctAnswer: "b"
        }
    ],
    [
        {
            question: "Quel est le plus haut sommet du monde?",
            answers: {
                a: "Mont Everest",
                b: "K2",
                c: "Mont Kilimandjaro"
            },
            correctAnswer: "a"
        },
        {
            question: "Quel est l'animal terrestre le plus rapide?",
            answers: {
                a: "Guépard",
                b: "Lion",
                c: "Antilope"
            },
            correctAnswer: "a"
        }
    ],
    [
        {
            question: "Quelle est la capitale de l'Allemagne?",
            answers: {
                a: "Berlin",
                b: "Munich",
                c: "Francfort"
            },
            correctAnswer: "a"
        },
        {
            question: "Qui a inventé la relativité générale?",
            answers: {
                a: "Isaac Newton",
                b: "Albert Einstein",
                c: "Galileo Galilei"
            },
            correctAnswer: "b"
        }
    ],
    [
        {
            question: "Quel est le plus petit os du corps humain?",
            answers: {
                a: "Stapès",
                b: "Malleus",
                c: "Coccyx"
            },
            correctAnswer: "a"
        },
        {
            question: "Qui a écrit 'Guerre et Paix'?",
            answers: {
                a: "Léon Tolstoï",
                b: "Fiodor Dostoïevski",
                c: "Maxime Gorki"
            },
            correctAnswer: "a"
        }
    ]
];

function buildQuiz(level) {
    const output = [];
    const myQuestions = levels[level];

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question">${currentQuestion.question}</div>
            <div class="answers">${answers.join('')}</div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    const myQuestions = levels[currentLevel];
    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'green';
        } else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    score += numCorrect;
    resultsContainer.innerHTML = `${numCorrect} sur ${myQuestions.length}`;
    
    if (numCorrect === myQuestions.length) {
        if (currentLevel < levels.length - 1) {
            currentLevel++;
            levelDisplay.innerHTML = `Niveau ${currentLevel + 1}`;
            buildQuiz(currentLevel);
            resultsContainer.innerHTML = '';
        } else {
            resultsContainer.innerHTML += `<br>Félicitations! Vous avez terminé tous les niveaux avec un score de ${score} points!`;
            clearInterval(timer);
            submitButton.disabled = true;
        }
    }
}

function startQuiz() {
    timeLeft = 180;
    currentLevel = 0;
    score = 0;
    levelDisplay.innerHTML = `Niveau ${currentLevel + 1}`;
    startTimer();
    buildQuiz(currentLevel);
    resultsContainer.innerHTML = '';
    submitButton.disabled = false;
}

function startTimer() {
    timerDisplay.innerHTML = "03:00";
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.innerHTML = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResults();
            resultsContainer.innerHTML += `<br>Temps écoulé! Vous avez obtenu un score de ${score} points.`;
            submitButton.disabled = true;
            startButton.disabled = true;
        }
    }, 1000);
}

startButton.addEventListener('click', () => {
    startQuiz();
    startButton.disabled = true;
});

submitButton.addEventListener('click', showResults);

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 180;
    timerDisplay.innerHTML = "03:00";
    quizContainer.innerHTML = '';
    resultsContainer.innerHTML = '';
    levelDisplay.innerHTML = `Niveau 1`;
    currentLevel = 0;
    score = 0;
    startButton.disabled = false;
    submitButton.disabled = true;
});
