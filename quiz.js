//Array of questions
var questions = ["What does CSS stand for?","Which attribute can set text to bold?", "Which tag is used to link an external CSS file?", "Which attribute sets the underline property?", "Which measurement is NOT relative?", "Which measurement IS relative?", "What attribute is used to move an elements content away from its border?", "Which attribute does not contribute to a block elements total width?", "What property changes positioned elements display order?", "Which value of background-repeat will cause a background to repeat vertically?"];
//Arrays of answers and which option they are
var answerA = ["Cascading CSS", "Text-decoration", "Script", "Font style", "Px", "Em", "Margin", "Width", "Width", "Repeat-x"];
var answerB = ["Cascading style sheets", "Font Style", "Link", "Text-decoration", "Cm", "Cm", "Padding", "Border", "Background", "Repeat"];
var answerC = ["Cascading seperate style", "Font weight",  "Rel", "Font weight", "%", "MM", "Border", "Background-image", "Z-index", "Repeat-y"];
var answerD = ["blank", "blank", "blank", "blank", "Em", "Inch", "Width", "Padding", "Azimuth", "No-repeat"];
//Array of the correct answers
var correctAnswers = ["b", "c", "b", "b", "b", "a", "b", "c", "c", "c"];
//Predefined array of 10 spaces in which users answers will be stored
var userAnswers = [];
userAnswers.length = 10;
//Which question is the current question
var questionCount = 1;
//The amount of correct/incorrect answers
var correct = 0;
var incorrect = 0;

//When a key is pressed
window.onkeypress = function(e){
	//if the key was the enter key
	if(e.keyCode == 13){
		//submit the answer/go to the next question
		nextQuestion();
	}
};

function startQuiz(){
	var instuctions = document.getElementById("instructions");
	var quiz = document.getElementById("container");

	instuctions.classList.remove("instuctions");
	instuctions.classList.add("hidden");
	quiz.classList.remove("hidden");
	quiz.classList.add("show");
}

function finishQuiz(){
	//Amount of unanswered questions
	var unAnswered = 0;
	//go through every answer the user has submitted
	for(var i = 0; i < userAnswers.length; i++){
		//if any questions were not answered
		if(userAnswers[i] == undefined){
			//Alert the user
			alert("Make sure you have answered all questions before finishing");
			unAnswered++;
			//set the current question to the unanswered question
			questionCount = i + 1;
			//load the unanswered question
			loadQuestion();
			break;
		}
	}
	//if they have answered all the questions
	if(unAnswered == 0){
		//show the results div
		displayResults();
	}
}

function displayResults(){
	//array of different results from checkAnswers function
	var results = new checkAnswers();
	//results from array assigned to their own variables
	var correct = results[0];
	var perc = results[1];
	var grade = results[2];
	//Relevant HTML elements for DOM
	var score = document.getElementById("score");
	var percent = document.getElementById("perc");
	var gradeP = document.getElementById("grade");
	var div = document.getElementById("resultsContainer");
	var quiz = document.getElementById("container");

	//hide the quiz div
	quiz.classList.remove("show");
	quiz.classList.add("hidden");
	//unhide the results div
	div.classList.remove("hidden");
	div.classList.add("show");
	//display results figures in their appropriate elements
	score.innerHTML = "You scored " + correct + " out of 10!";
	percent.innerHTML = "That is " + perc + "%";
	gradeP.innerHTML = "You got a " + grade;

	//display questions with correct answers and user answers
	loadResultQuestions();
}

function nextQuestion(){
	//if not on last question
	if(questionCount != 10){
		//increase question count by one
		questionCount++;
	}
	//load the new question
	loadQuestion();
}

function checkAnswers(){
	var grade;
	var correct = 0;
	var incorrect = 0;
	//for each answer
	for(var i = 0; i < userAnswers.length; i++){
		//if answer matches the correct answer array
		if(userAnswers[i] == correctAnswers[i]){
			//Score a correct answer
			correct++;
		}else {
			//Score an incorrect answer
			incorrect++;
		}
	}
	//percentage of questions correct
	var perc = (correct/(correct+incorrect))*100;
	//A B C E grading depending on percentage score
	if(perc >= 50){
		grade = "C-";
		if(perc > 60){
			grade = "C+";
			if(perc > 70){
				grade = "B";
				if(perc > 80){
					grade = "A-";
					if(perc > 90){
						grade = "A+";
					}
				}
			}
		}
	}
	else{
		grade = "E";
	}
	//return the values so they can be stored in an array in other function
	return [correct, perc, grade];
}


function loadQuestion(){
	//highlight previous question if answered
	questionBarAnswered();
	//highlight current question
	questionBarCurrent();

	//load questions and their answers into the divs
	var question = document.getElementById("question");
	var a = document.getElementById("ansA");
	var b = document.getElementById("ansB");
	var c = document.getElementById("ansC");
	var d = document.getElementById("ansD");
	var dBlock = document.getElementById("D"); //4th answer div
	var cBlock = document.getElementById("C"); //3rd answer div
	question.innerHTML = questions[questionCount - 1];
	a.innerHTML = answerA[questionCount - 1];
	b.innerHTML = answerB[questionCount - 1];
	c.innerHTML = answerC[questionCount - 1];
	d.innerHTML = answerD[questionCount - 1];

	//make 4th answer div visible
	dBlock.classList.remove("hidden");
	cBlock.classList.remove("centerAnswer");
	//make the 4th answer div have its original "answer class"
	if(d.classList.contains("answer") == false){
		dBlock.classList.add("answer");
	}

	//if there is no potential answer to put in 'D'
	if(answerD[questionCount - 1] == "blank"){
		//remove answer class (error if I dont since I put answers into any element with 'answer' class)
		dBlock.classList.remove("answer");
		//hide the 4th answer div
		dBlock.classList.add("hidden");
		//center the 3rd answer div
		cBlock.classList.add("centerAnswer");
	}


	//remove answer button highlights and radio checks
	var radio = document.getElementsByName("answer");
	var button = document.getElementsByClassName("answer");
	for(var i = 0; i < button.length; i++){
		radio[i].checked = false;
		button[i].classList.remove("selectedAnswer");
	}

	//if there is an answer for current question, then check and highlight it
	if(userAnswers[questionCount - 1] != undefined){
		checkBox(userAnswers[questionCount - 1]);
	}


	//hide or show next button
	var button = document.getElementById("nextButton");
	button.classList.remove("hidden");
	button.classList.remove("showButton");
	//if on question ten
	if(questionCount == 10){
		//hide the next button
		button.classList.add("hidden");
	}else {
		//otherwise show the next button
		button.classList.add("showButton");
	}
}


function questionBarAnswered(){
	//set all question circles to plain white unanswered circles
	for(var i = 1; i <= questions.length; i++){
		var qDiv = document.getElementById(i);
		qDiv.classList.remove("current");
		qDiv.classList.remove("empty");
	}
	//Get question circle to highlight
	var bar = document.getElementsByClassName("Q");
	//for each question circle
	for(var i = 0; i < userAnswers.length; i++){
		//if question is unanswered
		if(userAnswers[i] == undefined){
			bar[i].classList.remove("current"); //remove current highlight
			bar[i].classList.add("empty"); //no highlight
		}
		//if question is answered
		else {
			bar[i].classList.remove("current"); //remove current highlight
			bar[i].classList.add("answered"); //highlight
		}
	}
}

function questionBarCurrent(){
	//get the current questions question circle
	var qDiv = document.getElementById(questionCount);
	//remove all styling
	qDiv.classList.remove("empty");
	qDiv.classList.remove("answered");
	//add the current question styling
	qDiv.classList.add("current");
}

/* Called from html, set and load whichever question was selected from the question bar */
function questionBar(q){
	questionCount = q;
	loadQuestion();
}

/*Called from html, instantly save an answer (a,b,c,d) when it is clicked*/
function saveAnswer(answer) {
	userAnswers[questionCount - 1] = answer;
	checkBox(answer);
}

function checkBox(option){
	//Array of all answer buttons
	var answers = document.getElementsByClassName("answer");

	//for each answer button
	for(var i = 0; i < answers.length; i++){
		answers[i].classList.remove("selectedAnswer"); //remove selected answer class
		// if(answers[i] !== answers[option]){
		// 	answers[i].classList.add("A", "B", "C", "D");
		// }
	}

	//add selected answer class to the button selected
	answers[letterToIndex(option)].classList.add("selectedAnswer"); 
}

/*Lets me refer to the answer buttons in an array when getting elemtents by classnames*/
function letterToIndex(letter){
	if(letter == 'a'){
		return 0;
	}else if(letter == 'b'){
		return 1;
	}else if(letter == 'c'){
		return 2;
	}else if(letter == 'd'){
		return 3;
	}
}

/* This whole function creates a big DOM that displays each question with the
	users answer and the correct answer of each of those questions
*/
function loadResultQuestions(){

	//for each question in the quiz
	for(var i = 0; i < questions.length; i++){
		//the outer container that will hold the questions and correct answers
		var container = document.getElementById("questionResults")

		//the div that will hold a singal question and its correct answers
		var outerDiv = document.createElement("div");
		outerDiv.classList.add("questionResultsDetails")

		//the question itself (text)
		var questionH3 = document.createElement("h2");
		questionH3.classList.add("resultQuestion");
		questionH3.innerHTML = questions[i];

		//create the four answers divs
		var answer1 = document.createElement("span");
		answer1.classList.add("resultAnswer");
		var answer2 = document.createElement("span");
		answer2.classList.add("resultAnswer");
		var answer3 = document.createElement("span");
		answer3.classList.add("resultAnswer");
		var answer4 = document.createElement("span");
		answer4.classList.add("resultAnswer");

		//set the correct answer of the question to the orange styling
		if(correctAnswers[i] == 'a'){
			answer1.classList.add("resultAnswerOrange");
			answer1.innerHTML = '<img src="correct.png" title="correct tick" alt="correct tick" class="tick">';
		}else if(correctAnswers[i] == 'b'){
			answer2.classList.add("resultAnswerOrange");
			answer2.innerHTML = '<img src="correct.png" title="correct tick" alt="correct tick" class="tick">';
		}else if(correctAnswers[i] == 'c'){
			answer3.classList.add("resultAnswerOrange");
			answer3.innerHTML = '<img src="correct.png" title="correct tick" alt="correct tick" class="tick">';
		}else if(correctAnswers[i] == 'd'){
			answer4.classList.add("resultAnswerOrange");
			answer4.innerHTML = '<img src="correct.png" title="correct tick" alt="correct tick" class="tick">';
		}

		//if the user guessed the correct answer then change from the orange styling
		//to the green styling
		if(userAnswers[i] == 'a' && userAnswers[i] == correctAnswers[i]){
			answer1.classList.add("resultAnswerCorrect");
		}else if(userAnswers[i] == 'b' && userAnswers[i] == correctAnswers[i]){
			answer2.classList.add("resultAnswerCorrect");
		}else if(userAnswers[i] == 'c' && userAnswers[i] == correctAnswers[i]){
			answer3.classList.add("resultAnswerCorrect");
		}else if(userAnswers[i] == 'd' && userAnswers[i] == correctAnswers[i]){
			answer4.classList.add("resultAnswerCorrect");
		}

		//if they answered incorrect then show there answer in the red styling
		if(userAnswers[i] == 'a' && userAnswers[i] != correctAnswers[i]){
			answer1.innerHTML = '<img src="incorrect.png" title="incorrect cross" alt="incorrect cross" class="tick">';
			answer1.classList.add("resultAnswerIncorrect");
		}else if(userAnswers[i] == 'b' && userAnswers[i] != correctAnswers[i]){
			answer2.innerHTML = '<img src="incorrect.png" title="incorrect cross" alt="incorrect cross" class="tick">';
			answer2.classList.add("resultAnswerIncorrect");
		}else if(userAnswers[i] == 'c' && userAnswers[i] != correctAnswers[i]){
			answer3.innerHTML = '<img src="incorrect.png" title="incorrect cross" alt="incorrect cross" class="tick">';
			answer3.classList.add("resultAnswerIncorrect");
		}else if(userAnswers[i] == 'd' && userAnswers[i] != correctAnswers[i]){
			answer4.innerHTML = '<img src="incorrect.png" title="incorrect cross" alt="incorrect cross" class="tick">';
			answer4.classList.add("resultAnswerIncorrect");
		}

		//put the potential answers of the question into their divs
		answer1.innerHTML += answerA[i];
		answer2.innerHTML += answerB[i];
		answer3.innerHTML += answerC[i];
		//if the answer is blank add nothing to the div, if its not blank
		//add the question to the div
		if(answerD[i] != "blank"){
			answer4.innerHTML += answerD[i];
		}else {
			answer4.innerHTML += "";
		}

		//append all inner elements into the single question div
		outerDiv.appendChild(questionH3);
		outerDiv.appendChild(answer1);
		outerDiv.appendChild(answer2);
		outerDiv.appendChild(answer3);
		outerDiv.appendChild(answer4);

		//append the question div into the container div that will hold all the questions
		container.appendChild(outerDiv);
	}
}

