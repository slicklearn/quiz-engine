/* Object */
const challenge = {};

// Default values
challenge.components = {};

// Finish the game
challenge.finish = function () {
    alert("Game finished!");
}

// Display a specify challenge
challenge.play = function (object) {
    if (object == null) return challenge.finish();

    if (object.type == "learning") {
        challenge.ui_wrapper.innerHTML = challenge.components.learnForm(object.index, object.title, object.description, object.specials);
    } else {
        challenge.current_question = object;
        challenge.ui_wrapper.innerHTML = challenge.components.questionForm(object.index, object.title, object.options);
    }
}

// Start the challenge
challenge.start = function () {
    challenge.current_challenge_index = 0;
    challenge.current_fails = 0;

    let firstChallenge = challenge.challenge_list[0];
    challenge.play(firstChallenge);
}

// Render in to a div
challenge.renderIn = function (id) {
    challenge.ui_wrapper = document.getElementById(id);
    challenge.start();
}

// Assign challenge list
challenge.setChallenges = function (list) {
    challenge.challenge_list = list;
}

// Play next challenge
challenge.next = function () {
    if (challenge.current_fails >= 3) {
        alert("Failed");
        return window.location.reload();
    }

    challenge.current_challenge_index++;
    let nextChallenge = challenge.challenge_list[challenge.current_challenge_index];
    challenge.play(nextChallenge);
}

// Select an answer
challenge.selectAnswer = function (option) {
    challenge.current_answer = option + 1;
    document.getElementById("submit-quiz-btn").removeAttribute("disabled");
}

// Check if the selected answer is correct
challenge.checkAnswer = function () {
    let correctAns = document.getElementById("ans-" + (challenge.current_question.correct - 1));
    document.getElementById("submit-quiz-btn").setAttribute("disabled", "true");
    
    correctAns.style.color = "green";

    if (challenge.current_answer != challenge.current_question.correct) {
        challenge.current_fails++;

        let clickedAns = document.getElementById("ans-" + (challenge.current_answer - 1));
        clickedAns.style.color = "red";

        document.getElementById("fails-count").innerHTML = challenge.current_fails;
        
        challenge.challenge_list.push(challenge.challenge_list[challenge.current_challenge_index - 1]);
        challenge.challenge_list.push(challenge.challenge_list[challenge.current_challenge_index]);
    }

    setTimeout(() => {
        challenge.next();
    }, 2000);
}

/* Add components */
challenge.components.learnForm = (index = 1, title = "Title", description = "Description", specials = []) => {

    for (let special of specials) {
        let reg = new RegExp(special, "gi");
        description = description.replace(reg, `<a class="text-primary">${special}</a>`).replace("\n", "<br/>");
    }

    let component = `
        <div class="container-fluid" id="learn-form" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><span class="label label-primary" id="qid">#${index}</span> ${title}</h3>
                    </div>

                    <div class="modal-body">
                        <div class="text-body">${description}</div>
                    </div>

                    <div class="quiz" data-toggle="buttons">
                        <label onclick="challenge.next()" class="btn btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span>Siguiente</label>
                    </div>
                </div>
            </div>
        </div>
    `;

    return component;
}

challenge.components.questionForm = (index = 1, title = "", options = []) => {
    let component = `
        <div class="container-fluid" id="question-form">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><span class="label label-primary" id="qid">#${index}</span> ${title}</h3>
                    </div>

                    <div class="modal-body">
                        <div class="form-group">
                            {{buttons}}
                        </div>
                    </div>

                    <div class="modal-footer text-muted">

                        <b>Intentos fallidos: <span id="fails-count">${challenge.current_fails}</span>/3</b>

                        <div id="correct">
                            <button id="submit-quiz-btn" type="button" onclick="challenge.checkAnswer()" disabled class="btn btn-primary">Comprobar</button>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    `

    let buttons = "";

    for (let option of options) {
        buttons = buttons + `
            <label class="form-radio">
                <input type="radio" name="quiz_answer" onclick="challenge.selectAnswer(${options.indexOf(option)})" value="${options.indexOf(option)}"><i class="form-icon"></i> 
                <span id="ans-${options.indexOf(option)}">${option}</span>
            </label>
        `
    }

    return component.replace("{{buttons}}", buttons);
}