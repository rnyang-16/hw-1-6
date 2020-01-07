var starButton = document.getElementById("button");
var submitButton = document.getElementById("upload_score");
var highScoreButton = document.getElementById("highscore_button");
var clearHistoryButton = document.getElementById("clear_history");

var instructionEL = document.getElementById("instruction");
var countdownEl = document.getElementById("navbarNav01");
var questionEl = document.getElementById("question");
var choicesEL = document.getElementById("choices");
var resultEL = document.getElementById("result");
var questionAreaEl = document.getElementById("questionArea");
var scoreOnscreen = document.getElementById("navbarNav02");
var initialsInputAreaEl = document.getElementById("final_score");
var initialInputEL = document.getElementById("initialInput");
var highScoreTableEl = document.getElementById("highscore_table");
var highScoreTbodyEl = document.getElementById("highscore_tbody");
var themeHerfEl = document.getElementById('theme_css')
var dropDownElements = document.getElementsByClassName('dropdown-item');

var correctAudio = document.getElementById("correct_audio");
var wrongAudio = document.getElementById("wrong_audio");

var timerInterval = null;

var score = 0;
var secondsLeft = 75;
var questionIndex = 0;
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },

  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Arrays in Javascript can be used to store ____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"

  },
  {
    title: "A very useful tool used during development and debugging for printing content to the debugger is : ",
    choices: ["Javascript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log"
  },
  {
    title: "String value must be encloseed within ____.",
    choices: ["commas", "currly brackets", "quotes", "parentheses"],
    answer: "quotes"
  },
];

// start the quiz
starButton.addEventListener("click", function(){
  instructionEL.parentNode.removeChild(instructionEL);
  questionAreaEl.style.visibility = "visible";
  
  renderQuestions(questionIndex);
  setTime();
});

  
function setTime(){
  timerInterval = setInterval(function(){
    secondsLeft--;
    countdownEl.textContent = "Time left: " + secondsLeft.toString();

    if(secondsLeft === 0){
        clearInterval(timer);
        endQuiz();
    }
  }, 1000);
}

function renderQuestions(id){
  questionEl.textContent = questions[id]["title"];

  while(choicesEL.firstChild){
    choicesEL.removeChild(choicesEL.firstChild);
  }
  for (i = 0; i < questions[id]["choices"].length; i ++){
    var choiceLi = document.createElement("li");
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("answer", questions[id]["choices"][i]);
    choiceButton.setAttribute("class","m-2 p-1");
    choiceButton.style.backgroundColor = "#cc99ff";
    choiceButton.textContent = (i+1).toString() + ". " + questions[id]["choices"][i];
    choiceLi.appendChild(choiceButton);
    choicesEL.appendChild(choiceLi);    
  };
}

// When select a choice
choicesEL.addEventListener("click", function(event){
  event.preventDefault();
  if(event.target.matches("button")){
    if(event.target.getAttribute("answer") === questions[questionIndex]["answer"]){
      resultEL.textContent = "Correct!";
      score = score + 20;
      scoreOnscreen.textContent = "Score: " + score;
      correctAudio.play();
    }
    else{
      resultEL.textContent = "Wrong";
      secondsLeft = secondsLeft - 10;
      wrongAudio.play();
    };
    questionIndex = questionIndex + 1;
    if(questionIndex < questions.length){
      renderQuestions(questionIndex);
    }
    else {
      endQuiz();
    }
  };
});

function endQuiz(){
  questionEl.parentNode.removeChild(questionEl);
  choicesEL.parentNode.removeChild(choicesEL);
  initialsInputAreaEl.style.visibility = "visible";
  resultEL.parentNode.removeChild(resultEL);
  clearInterval(timerInterval);
}
;

function loadRecordHistory() {
  var record_history = localStorage.getItem("record_history");
  if (record_history == null) {
    record_history = [];
    return record_history;
  }
  else {
    return JSON.parse(record_history);
  }
};

function addHighScore(value) {
  var scoreLine = document.createElement('tr');
  var initial = document.createElement('td');
  initial.textContent = value[0];
  var score = document.createElement('td');
  score.textContent = value[1];
  scoreLine.append(initial);
  scoreLine.append(score);
  highScoreTbodyEl.append(scoreLine);
}

//Show highscores
function showHighScores() {
  if (instructionEL.parentNode != null) {
    instructionEL.parentNode.removeChild(instructionEL);
  }
  if (initialsInputAreaEl.parentNode != null) {
    initialsInputAreaEl.parentNode.removeChild(initialsInputAreaEl);
  }
  record_history = loadRecordHistory();

  // Sort the array based on the second element
  record_history.sort(function(first, second) {
    return second[1] - first[1];
  });

  highScoreTbodyEl.innerHTML = "";
  record_history.forEach(addHighScore);
  highScoreTableEl.style.visibility = "visible";
  clearHistoryButton.style.visibility = "visible";
}

// Submit a highscore
submitButton.addEventListener("click",function(event){
  event.preventDefault();
  var record_history = loadRecordHistory();
  // put current record to record_history
  record_history.push([initialInputEL.value.trim(), score]);
  localStorage.setItem("record_history", JSON.stringify(record_history));

  // go to highscore page
  showHighScores();
});

highScoreButton.addEventListener("click",function(event){
  event.preventDefault();
  showHighScores();
})

// Clear history
if (clearHistoryButton != null) {
  clearHistoryButton.addEventListener("click", function(event) {
    var record_history = [];
    localStorage.setItem("record_history", JSON.stringify(record_history));
    showHighScores();
  });
}

function setTheme() {
  if (theme == "Light") {
    themeHerfEl.href = './css/light.css';
  } else if (theme == "Dark") {
    themeHerfEl.href = './css/dark.css';
  }
}

// For theme
if (dropDownElements != null) {
  Array.from(dropDownElements).forEach((element) => {
    element.addEventListener('click', (event) => {
      theme = event.target.innerText;
      setTheme();
    });
  });
}