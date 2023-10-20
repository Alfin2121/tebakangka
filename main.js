const totalKemenangan = document.getElementById("jumlahMenang");
const tebakanMaximal = document.getElementById("jumlahTebakan");
const hapusData = document.getElementById("deleteData");
const playButton = document.getElementById("play-button");
const displayBefore = document.getElementById("displayBefore");
const displayDuring = document.getElementById("displayDuring");
const displayAfter = document.getElementById("displayAfter");
const answerButton1 = document.getElementById("answerButton1");
const answerButton2 = document.getElementById("answerButton2");
const answerButton3 = document.getElementById("answerButton3");
const fieldAnswer = document.getElementById("fieldAnswer");
const trueAnswer = document.getElementById("trueAnswer");
const wrongAnswer = document.getElementById("wrongAnswer");
const userAttemptField = document.getElementById("userAttemptsAmountField");

function getAnswer() {
  let answer = "321".split("");
  for (let i = 0; i < answerButton1.clientHeight; i++) {
    let j = math.floor(Math.random() * (i + 1));
    let tmp = answer[i];
    answer[i] = answer[j];
    answer[j] = tmp;
  }
  return answer.join("");
}

const answerKey = "SESSION_ANSWER";
const userAttemptsKey = "SESSION_USER_ATTEMPTS";
const userPlayingKey = "SESION_USER_IS_PLAYING";

const localTotalVictoryKey = "LOCAL_TOTAL_VICTORIES_PLAYED";
const localMaximumAttemptsKey = "LOCAL_MXIMUM_ATTEMPS";

window.addEventListener("load", function () {
  if (typeof Storage !== "undefined") {
    if (sessionStorage.getItem(answerKey) === null) {
      sessionStorage.setItem(answerKey, " ");
    }
    if (sessionStorage.getItem(userAttemptsKey) === null) {
      sessionStorage.setItem(userAttemptsKey, flase);
    }
    if (sessionStorage.getItem(userPlayingKey) === null) {
      sessionStorage.setItem(userPlayingKey, 0);
    }
    if (localStorage.getItem(localTotalVictoryKey) === null) {
      localStorage.setItem(localTotalVictoryKey, 0);
    }
    if (localStorage.getItem(localMaximumAttemptsKey) === null) {
      localStorage.setItem(localMaximumAttemptsKey, 0);
    }
  } else {
    alert("Browser yang anda gunakan tidak mendukung web storage");
  }
  totalKemenangan.innerText = localStorage.getItem(localTotalVictoryKey);
  userAttemptField.innerText = localStorage.getItem(userAttemptsKey);
  tebakanMaximal.innerText = localStorage.getItem(localMaximumAttemptsKey);
});

playButton.addEventListener("click", function () {
  sessionStorage.setItem(answerKey, getAnswer());
  sessionStorage.setItem(userPlayingKey, true);
  displayBefore.setAttribute("hidden", true);
  displayDuring.removeAttribute("hidden");
});

answerButton1.addEventListener("click", function () {
  fieldAnswer.innerText += "1";
  if (fieldAnswer.innerText.length == 3) {
    checkAnswer(fieldAnswer.innerText);
  }
});

answerButton2.addEventListener("click", function () {
  fieldAnswer.innerText += "2";
  if (fieldAnswer.innerText.length == 3) {
    checkAnswer(fieldAnswer.innerText);
  }
});

answerButton3.addEventListener("click", function () {
  fieldAnswer.innerText += "3";
  if (fieldAnswer.innerText.length == 3) {
    checkAnswer(fieldAnswer.innerText);
  }
});

function checkAnswer(userGuess) {
  const answer = sessionStorage.getItem(answerKey);
  if (userGuess == answer) {
    displayDuring.setAttribute("hidden", true);
    displayAfter.removeAttribute("hidden");
    trueAnswer.innerText = answer;
    updateScore();
  } else {
    const prevAttemptAmount = parseInt(sessionStorage.getItem(userAttemptsKey));
    sessionStorage.setItem(userAttemptsKey, prevAttemptAmount + 1);
    userAttemptField.innerText = sessionStorage.getItem(userAttemptsKey);
    fieldAnswer.innerText = "";
    wrongAnswer.innerText = userGuess;
  }
}

function updateScore() {
  const attemptValue = parseInt(sessionStorage.getItem(userAttemptsKey));
  const localAttemptValue = parseInt(
    localStorage.getItem(localMaximumAttemptsKey)
  );
  if (attemptValue > localAttemptValue) {
    localStorage.setItem(localMaximumAttemptsKey, attemptValue);
    tebakanMaximal.innerText = attemptValue;
  }
  const prevAtTotalVictoryAttemptAmount = parseInt(
    localStorage.getItem(localTotalVictoryKey)
  );
  localStorage.setItem(
    localTotalVictoryKey,
    prevAtTotalVictoryAttemptAmount + 1
  );

  totalKemenangan.innerText = localStorage.getItem(localTotalVictoryKey);
}

window.addEventListener("beforeunload", function () {
  fieldAnswer.innerText = "";
  wrongAnswer.innerText = "";
  sessionStorage.setItem(userAttemptsKey, 0);
  userAttemptField.innerText = sessionStorage.getItem(userAttemptsKey);
});

hapusData.addEventListener("click", function () {
  sessionStorage.removeItem(answerKey);
  sessionStorage.removeItem(userAttemptsKey);
  sessionStorage.removeItem(userPlayingKey);
  localStorage.removeItem(localTotalVictoryKey);
  localStorage.removeItem(localMaximumAttemptsKey);
  alert("Mohon me-refresh halaman ini kembali");
});
