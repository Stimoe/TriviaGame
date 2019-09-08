
var time = 20;
var questionIndex = 0;
var intervalId;
var wins = 0;
var losses = 0;


//This is my array of objects that i can call in a certain order.
var questions = [
    { q: "How many pounds of coffee (green beans) can be harvested from one tree in one year?", a: ["1lb", "5lb", "10lb", "20lb"], cr: "1lb", image: 'https://i.imgur.com/lpbD2R0.jpg' },
    { q: "If Brazil produces the most coffee in one year, which country produces the second most?", a: ["Vietnam", "Colombia", "Papua New Guinea", "India"], cr: "Vietnam", image: 'https://i.imgur.com/Hgq0ZER.jpg' },
    { q: " How much does the average person in Seattle spend on coffee every month?", a: ["$20", "$25", "$36", "$44"], cr: "$36", image: 'https://i.imgur.com/MNCTNEm.jpgorange.jpg' },
    { q: "Which one of the following facts about coffee and wine is not true?", a: ["People in France drink more coffee than wine", "Wine has more flavor compounds than coffee", "Coffee has more antioxidants than wine", "Both might help prevent the onset of Alzheimer’s disease"], cr: "Wine has more flavor compounds than coffee", image: 'https://i.imgur.com/yhcl0yI.jpg' },
    { q: "Before coffee caught on in the US in the 1700s, this drink was the breakfast drink of choice.", a: ["Water", "Milk", "Beer", "Tea"], cr: "Beer", image: 'https://i.imgur.com/weXHaMK.jpg' },
    { q: "The name cappuccino comes from", a: ["The drink’s resemblance to the brown cowls worn by Capuchin monks", "The similarity in color to the fur of Capuchin monkeys", "The Italian puccino, meaning 'light brown one'", "The size of the cup in which it’s commonly served"], cr: "The drink’s resemblance to the brown cowls worn by Capuchin monks", image: "https://i.imgur.com/1WKzSKa.jpg" },
    { q: "Coffee was the first food to be:", a: ["Shipped from Europe to the New World", "Freeze dried", "Used in Aztec religious ceremonies", "Roasted and ground for drinking"], cr: "Freeze dried", image: "https://i.imgur.com/VPnCBg8.jpg" },
    { q: "Kopi Luwak, the world’s most expensive coffee (up to $600 per pound), is:", a: ["Processed during a full moon", "Brewed only with solid gold pots", "Made from coffee beans eaten and then excreted by a Sumatran wild cat", "Grown at a higher altitude than any other bean"], cr: "Made from coffee beans eaten and then excreted by a Sumatran wild cat", image: "https://i.imgur.com/FhyHfPb.jpg" },
    { q: "Most coffees are a blend of:", a: ["Light and dark roasts", "Caffeine and essential oils", "Arabica and robusta beans", "African and South American beans"], cr: "Arabica and robusta beans", image: "https://i.imgur.com/AmS7Xm2.jpg" },
    { q: "Arabica varieties such as Java and Mocha are named after:", a: ["The plantations where they’re grown", "The coffee grower who developed that variety", "Their predominant flavorings", "Their ports of origin"], cr: "Their ports of origin", image: "https://i.imgur.com/XyRciHM.jpg" }
];

//first i check if the user has answered all of the questions in the array.  If so it moves to hide everything else and show the score.
function renderQuestion() {
    if (questionIndex === questions.length) {
        $(".container").hide();
        $("#score").show();
        $("#reset-button").show();
        $("#images").hide();
        $("#wins-at-end").text("Total wins = " + wins);
        $("#losses-at-end").text("Total losses = " + losses);
        // $("#reset-button").show();    
    }
    //if the user has not finished answering the questions, i set the timer, and roll through the object of questions and answers.
    time = 20;
    $("#Current-time-left").text("  " + time);
    start()
    if (questionIndex <= (questions.length - 1)) {
        $("#correct-image").hide();
        $('#coffee').hide()
        $("#incorrect-image").hide();
        $("#reset-button").hide();
        $("#time-out").hide();
        $("#currentQuestion").text(questions[questionIndex].q);
        $("#button1").text(questions[questionIndex].a[0]);
        $("#button2").text(questions[questionIndex].a[1]);
        $("#button3").text(questions[questionIndex].a[2]);
        $("#button4").text(questions[questionIndex].a[3]);
    }
}
//once a question is chosen i start the timer.
function start() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}
function decrement() {
    time--;
    $("#Current-time-left").text("  " + time);
    //here I check if the timer has reached 0, if show i hide the container, show them a couple images, the correct answer and move on.
    if (time === 0) {
        $(".container").hide();
        $("#time-out").show();
        $('#coffee').show()
        $('#coffee').append("<img src=" + questions[questionIndex].image + ">")
        $("#correct-answer").text("You ran out of time, the correct answer was " + questions[questionIndex].cr + " ");
        // $("#time-out").append("You ran out of time, the correct answer was " + questions[questionIndex].cr)
        //this is a timed event for showing them certain results about the last question then showing and hiding different divs.
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
//this is for when the user chooses the button that correlates with the correct answer.
function answerCorrect() {
    $(".container").hide();
    $('#coffee').show()
    $('#coffee').append("<img src=" + questions[questionIndex].image + ">")
    $("#correct-image").show();
    setTimeout(function () {
        $('#coffee').empty()
        $("#correct-image").hide();
        $(".container").show();
        renderQuestion();
    }, 3000);
    wins++
}
//this is for when the user chooses the button that correlates with a incorrect answer.
function wrongAnswer() {
    $(".container").hide();
    $("#coffee").show()
    $('#coffee').append("<img src=" + questions[questionIndex].image + ">")
    $("#correct-answer").text("Incorrect, the correct answer was " + questions[questionIndex].cr + "");
    $("#incorrect-image").show();
    // $("#correct-answer").append("You ran out of time, the correct answer was " + questions[questionIndex].cr);
    setTimeout(function () {
        $("#correct-answer").empty();
        $('#coffee').empty();
        $("#incorrect-image").hide();
        $(".container").show();

        renderQuestion();
    }, 3000);
    losses++
}
//this checks if the button that they choose is correct or not, and calls the correlating function.
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
    //this sets up the reset button at the end.
    $("#reset-button").on("click", function () {
        location.reload(true)
    })
})
start()
renderQuestion()


