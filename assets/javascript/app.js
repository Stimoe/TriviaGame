
var time = 20;
var questionIndex = 0;
var intervalId;
var wins = 0;
var losses = 0;
var incorrectImage= [{image: "https://i.imgur.com/uY85nEZ.jpg"}]


var questions = [
    { q: "How many pounds of coffee (green beans) can be harvested from one tree in one year?", a: ["1lb", "5lb", "10lb", "20lb"], cr: "1lb", image: 'https://i.imgur.com/AuOdNyy.jpg' },
    { q: "If Brazil produces the most coffee in one year, which country produces the second most?", a: ["Vietnam", "Columbia", "Papau New Guinea", "India"], cr: "Vietnam", image: 'https://i.imgur.com/Hgq0ZER.jpg' },
    { q: " How much does the average person in Seattle spend on coffee every month?", a: ["20$", "44$", "25$", "36$"], cr: "36$", image: 'https://i.imgur.com/MNCTNEm.jpgorange.jpg' },
    { q: "Which one of the following facts about coffee and wine is not true?", a: ["People in France drink more coffee than wine", "Wine has more flavor compounds than coffee", "Coffee has more antioxidants than wine", "Both might help prevent the onset of Alzheimer’s disease"], cr: "Wine has more flavor compounds than coffee", image: 'https://i.imgur.com/yhcl0yI.jpg' },
    { q: "Before coffee caught on in the US in the 1700’s, this drink was the breakfast drink of choice.", a: ["Water", "Milk", "Beer", "Tea"], cr: "Beer", image: 'https://i.imgur.com/weXHaMK.jpg' },
];
function renderQuestion() {
    if (questionIndex === questions.length) {
        $(".container").hide();
        $("#wins-at-end").text("Total wins = " + wins);
        $("#losses-at-end").text("Total losses = " + losses);
        $("#wins-at-end").show()
        $("#losses-at-end").show()
        $("#reset-button").show();
    
        
    }
    time = 20;
    $("#Current-time-left").text("  " + time);
    start()
    if (questionIndex <= (questions.length - 1)) {
        $("#correct-image").hide();
        $('#coffee').hide()
        incorrectImage= $("#incorrect-image")
        $("#incorrect-image").hide();
        $("#reset-button").hide();
        $("#time-out").hide();
        $("#currentQuestion").text(questions[questionIndex].q);
        $("#first-answer").text(questions[questionIndex].a[0]);
        $("#second-answer").text(questions[questionIndex].a[1]);
        $("#third-answer").text(questions[questionIndex].a[2]);
        $("#fourth-answer").text(questions[questionIndex].a[3]);
       
    }
}
function start() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}
function decrement() {
    time--;
    $("#Current-time-left").text("  " + time);
    if (time === 0) {
        $(".container").hide();
        $("#time-out").show();
        $('#coffee').show()
        $('#coffee').append("<img src="+ questions[questionIndex].image +">")
        $("#correct-answer").append("You ran out of time, the correct answer was " + questions[questionIndex].cr)
        setTimeout(function () {
            $('#coffee').empty();
            $("#correct-answer").empty();
            $("#time-out").hide();
            $(".container").show();
            questionIndex++;
            renderQuestion();
        }, 3000)  
        losses++  
    }
    }

function answerCorrect() {
    $(".container").hide();
    $('#coffee').show()
    $('#coffee').append("<img src="+ questions[questionIndex].image +">")
    $("#correct-image").show();
    setTimeout(function () {
        $('#coffee').empty()
        $("#correct-image").hide();
        $(".container").show();
        renderQuestion();
    }, 3000);
    wins++
}
function wrongAnswer() {
    $(".container").hide();
    $("#coffee").show()
    $('#coffee').append("<img src="+ questions[questionIndex].image +">")
    $("#incorrect-image").show();
    $("#correct-answer").append("The correct answer was " + questions[questionIndex].cr)
    setTimeout(function () {
        $("#correct-answer").empty();
        $('#coffee').empty();
        $("#incorrect-image").hide();
        $(".container").show();

        renderQuestion();
    }, 3000);
    losses++
}

$(document).ready(function () {
    $("#answer1").on("click", function () {
        if (questions[questionIndex].a[0] === questions[questionIndex].cr) {
            answerCorrect()
            questionIndex++;
        }
        else {
            wrongAnswer()
            questionIndex++;
        }
    })
    $("#answer2").on("click", function () {
        if (questions[questionIndex].a[1] === questions[questionIndex].cr) {
            answerCorrect()
            questionIndex++;
        }
        else {
            console.log("incorrect")
            wrongAnswer()
            questionIndex++;
        }
    })
    $("#answer3").on("click", function () {
        if (questions[questionIndex].a[2] === questions[questionIndex].cr) {
            answerCorrect()
            questionIndex++;
        }
        else {
            wrongAnswer()
            questionIndex++;
        }
    })
    $("#answer4").on("click", function () {
        if (questions[questionIndex].a[3] === questions[questionIndex].cr) {
            answerCorrect()
            questionIndex++;
        }
        else {
            wrongAnswer()
            questionIndex++;
        }
    })
    $("#reset-button").on("click", function () {
        location.reload(true)
    })
})
start()
renderQuestion()


    //.attr to change image source