
var time = 30;
var questionIndex = 0;
var intervalId;
var questions = [
    { q: "The sky is blue.", a: ["t", "f", "f", "f"] },
    { q: "There are 365 days in a year.", a: "t" },
    { q: "There are 42 ounces in a pound.", a: "f" },
    { q: "The Declaration of Independence was created in 1745.", a: "f" },
    { q: "Bananas are vegetables.", a: "f" }
  ];

$("#Current-time-left").text(time);

function renderQuestion() {
    
    if (questionIndex <= (questions.length -1)) {
        $("#currentQuestion").text(questions[0].q);
    }
    $("#first-answer").text(questions[0].a[0]);
    $("#second-answer").text(questions[0].a[1]);
    $("#third-answer").text(questions[0].a[2]);
    $("#fourth-answer").text(questions[0].a[3]);
    
    
  }
function start() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}
function decrement() {
    time--;
    $("#Current-time-left").text(time);
    if (time === 0) {

        stop();

      
    }}


   
    $(document).ready(function () {

        $("#answer1").on("click", function () {
            
           console.log("you clicked answer 1")
        })
        $("#answer2").on("click", function () {
          
            console.log("you clicked answer 2")
         })
         $("#answer3").on("click", function () {
           
            console.log("you clicked answer 3")
         })
         $("#answer4").on("click", function () {
            
            console.log("you clicked answer 4")
         })
    })
    start()
    renderQuestion();
