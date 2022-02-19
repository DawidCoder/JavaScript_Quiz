let questions = [
    {
       id: 1,
       question: "Which country hosts the most branch campuses of U.S. higher education institutions?",
       a: "Qatar",
       b: "United Kingdom",
       c: "China",
       d: "United Arab Emirates",
       answer: "a",
    },
    {
        id: 2,
        question: "Which of the following countries does NOT grant birthright citizenship?",
        a: "Jamaica",
        b: "United States",
        c: "France",
        d: "Brazil",
        answer: "c",
    },
    {
        id: 3,
        question: "Which country has the most nuclear reactors for the purpose of generating electricity?",
        a: "Japan",
        b: "United States",
        c: "France",
        d: "Russia",
        answer: "b",
    },
    {
        id: 4,
        question: "What percentage of the world's population has access to Primary Education? Secondary? Higher Education?",
        a: "60 / 40 / 15",
        b: "70 / 25 / 5",
        c: "80 / 15 / 5",
        d: "90 / 10 / 1",
        answer: "d",
    },
    {
        id: 5,
        question: "Which country has the most earthquakes per year?",
        a: "Indonesia",
        b: "Iran",
        c: "Japan",
        d: "China",
        answer: "a",
    },
    {
        id: 6,
        question: "What is the most widely spoken language in the world?",
        a: "Spanish",
        b: "Mandarin Chinese",
        c: "English",
        d: "Hindi",
        answer: "b",
    },
    {
        id: 7,
        question: "Approximately how many years does it take for a plastic water bottle to decompose?",
        a: "60",
        b: "350",
        c: "600",
        d: "200",
        answer: "c",
    },
    {
        id: 8,
        question: "What's the capital of Jamaica?",
        a: "Montevideo",
        b: "Kingston",
        c: "Cape Town",
        d: "Jakarta",
        answer: "b",
    },
    {
        id: 9,
        question: "Which country has three capital cities?",
        a: "South Africa",
        b: "Canada",
        c: "India",
        d: "China",
        answer: "a",
    },
    {
        id: 10,
        question: "Port Louis is the capital of ___",
        a: "Cambodia",
        b: "Poland",
        c: "Romania",
        d: "Mauritius",
        answer: "d",
    },
];

const question = document.querySelector("#question");
const answers = Array.from(document.getElementsByClassName("answer-text"));
const questionCounterText = document.querySelector("#counter");
const scoreText = document.querySelector("#score");
const finalScore = document.querySelector("#finalScore");

let questionCounter;
let score;

const MAX_QUESTIONS = 10;

let accpetingAnswers;

startGame = () => {
  questionCounter = 0;
  score = 0;
  accpetingAnswers = true;
  scoreText.innerText = score;
  availableQuestions = getRandomQuestions(questions, MAX_QUESTIONS);
  getNewQuestion();
};

const getRandomQuestions = (Array, n) => {
  let len = Array.length;
  if (n> len){
    throw new RangeError(
      "getRandomQuestions: more elements taken then avaible"
    );
  }
  const shuffled = [...Array].sort(() => 0.5 - Math.random());
  return (selected = shuffled.slice(0, n));
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0){
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign('/end.html');
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  currentQuestion = availableQuestions[0];
  question.innerText = currentQuestion.question;
  answers.forEach((answer) => {
    answer.innerText = currentQuestion[answer.dataset["answer"]];
  });

  answers.forEach((answer)=> {
    answer.addEventListener("click", e => {
      if (!accpetingAnswers) {
        return;
      }
      accpetingAnswers = false;
      const clickedAnswer = e.target;
      const answeredLetter = clickedAnswer.dataset["answer"];
      let classToApply = "incorrect";

      if (answeredLetter === currentQuestion.answer) {
        score++;
        scoreText.innerText = score;
        classToApply = "correct";
      }

      clickedAnswer.parentElement.classList.add(classToApply);

      setTimeout(()=> {
        clickedAnswer.parentElement.classList.remove(classToApply);
        getNewQuestion();
        accpetingAnswers = true;
      }, 1000);
    });
  });

  availableQuestions.shift();
};

startGame();
