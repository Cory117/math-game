$(document).ready(function() {
  var currentQuestion;
  var timeLeft = 10;
  var interval;
  var score = 0;
  var highScore = 0;
  var numberLimit = 10;

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };

  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };

  var updateNumberLimit = function (limit) {
    numberLimit = limit;
    $('#num-lm').text(numberLimit);
  };

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        if (score > highScore) {
          highScore = score;
          $('#high-score').text(highScore);
        }
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  };

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };

  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(numberLimit);
    var num2 = randomNumberGenerator(numberLimit);
  
    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);
  
    return question;
  };

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  };

  var checkAnswer = function(userInput, answer) {
    if(userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };

  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  $('#number-limit').on('change', function () {
    limit = Number($(this).val());
    updateNumberLimit(limit);
    renderNewQuestion();
  });

  renderNewQuestion();
});