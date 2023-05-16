// Variables
///////////////////////////////////////////////////////////
let countSpan = document.querySelector(".count span");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let bullets = document.querySelector(".bullets");
let bulletSpans = document.querySelector(".bullets .spans");
let countDown = document.querySelector(".bullets .countdown");
let results = document.querySelector(".results");
/////////////////////////////////////////////////////////////
// Dynamic
let chosen = 0;
// Rigth Anwsers
let goodAnswer = 0;
////////////////////////////////////////////////////////////
// Procss
getRequest("questions.json");

///////////////////////////////////////////////////////////
// Functions
function getRequest(jsonFile) {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let response = this.responseText;
      let resData = JSON.parse(response);
      let dataLength = resData.length; // Num Questions
      let dataChosen = resData[chosen]; // obj
      let answerLength = Object.keys(dataChosen).length - 2; // answers

      // Number of Questions
      countSpan.textContent = dataLength;
      // Fun => add dynamic Q & A
      createDynamicQA(dataChosen.title, dataChosen, answerLength);
      // fun => Create bullets
      createBullets(dataLength);
      // Click Event
      submitButton.addEventListener("click", (e) => {
        let rightAnswer = dataChosen.right_answer;
        check(rightAnswer);

        removeData();
        chosen++;

        if (chosen < dataLength) {
          dataChosen = resData[chosen];
          answerLength = Object.keys(dataChosen).length - 2;

          createDynamicQA(dataChosen.title, dataChosen, answerLength);
          createBullets(dataLength);
        }

        if (chosen === dataLength) {
          // Remove & showResult
          showResult(goodAnswer, dataLength);
        }
      });
    }
  };

  request.open("GET", jsonFile);
  request.send();
}
function createDynamicQA(title, obj, numAnswers) {
  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode(title);
  h2.appendChild(h2Text);
  quizArea.appendChild(h2);

  for (let i = 1; i <= numAnswers; i++) {
    let div = document.createElement("div");
    div.className = "answer";

    let input = document.createElement("input");
    input.name = "question";
    input.type = "radio";
    input.id = `answer_${i}`;
    input.dataset.answer = obj[`answer_${i}`];

    let label = document.createElement("label");
    label.htmlFor = `answer_${i}`;
    let labelText = document.createTextNode(obj[`answer_${i}`]);
    label.appendChild(labelText);

    div.appendChild(input);
    div.appendChild(label);

    answersArea.appendChild(div);
  }
}
function createBullets(numQuestions) {
  for (let i = 0; i < numQuestions; i++) {
    let span = document.createElement("span");
    if (i === chosen) {
      span.className = "on";
    }
    bulletSpans.appendChild(span);
  }
}
function check(rightAnsw) {
  let answers = document.getElementsByName("question");

  answers.forEach((ele) => {
    if (ele.checked) {
      if (ele.dataset.answer === rightAnsw) {
        goodAnswer++;
      }
    }
  });
}
function removeData() {
  quizArea.innerHTML = "";
  answersArea.innerHTML = "";
  bulletSpans.innerHTML = "";
}
function showResult(rightAnswer, numQues) {
  quizArea.remove();
  answersArea.remove();
  bullets.remove();
  submitButton.remove();

  results.classList.add("active-result");
  results.innerHTML = `Right Answer is <span>${rightAnswer}</span> OF ${numQues}`;
}

let x = `______________________¶¶¶
___________________¶¶¶¶¶
__________________¶¶¶¶¶¶
________________¶¶¶¶¶¶¶
_______________¶¶¶¶¶¶¶¶
_______________¶¶¶¶¶¶¶¶
______________¶¶¶¶¶¶¶¶¶¶
______________¶¶¶¶¶¶¶¶¶¶
______________¶¶¶¶¶¶¶¶¶¶¶______________¶¶¶
______________¶¶¶¶¶¶¶¶¶¶¶¶___________¶¶¶¶
_______¶______¶¶¶¶¶¶¶¶¶¶¶¶¶________¶¶¶¶¶¶
_______¶¶¶¶____¶¶¶¶¶¶¶¶¶¶¶¶¶______¶¶¶¶¶¶¶
_______¶¶¶¶¶___¶¶¶¶¶¶¶¶¶¶¶¶¶¶____¶¶¶¶¶¶¶¶
_______¶¶¶¶¶¶___¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶__¶¶¶¶¶¶¶¶
_______¶¶¶¶¶¶¶__¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
_______¶¶¶¶¶¶¶__¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
______¶¶¶¶¶¶¶¶__¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
_____¶¶¶¶¶¶¶¶¶_¶¶¶¶¶¶¶¶¶¶__¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
___¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶___¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
__¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶___¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
__¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶____¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
_¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶_¶¶¶¶¶¶____¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
_¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶__¶¶¶______¶¶¶_¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
_¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶___¶________¶¶__¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
_¶¶¶¶¶¶¶¶¶¶¶¶¶¶_____________¶¶__¶¶¶¶¶¶¶¶¶¶¶¶¶¶
_¶¶¶¶¶¶¶¶¶¶¶¶¶¶______________¶____¶¶¶¶¶¶¶¶¶¶¶
__¶¶¶¶¶¶¶¶¶¶¶¶     Ahmed Samy     ¶¶¶¶¶¶¶¶¶
____¶¶¶¶¶¶¶¶¶¶       op       ¶¶¶¶¶¶¶¶
______¶¶¶¶¶¶¶¶_____________________¶¶¶¶¶¶
_________¶¶¶¶¶¶___________________¶¶¶¶
_____________¶¶¶¶¶______________¶`;
console.log(x);
