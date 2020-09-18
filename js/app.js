var ui_wrapper = null;
var currentQuestion = null;
var currentChallengeIndex = -1;

/** Behaviour */
window.addEventListener("load", () => {
    ui_wrapper = document.getElementById("wrapper");
    start();
})

function start () {
    nextChallenge();
}

function nextChallenge () {
    currentChallengeIndex++;

    let challenge = challenges[currentChallengeIndex];

    if (challenge != null) {
        if (challenge.type == "learning")
            setLearn(challenge);
        else if (challenge.type == "quiz")
            setQuiz(challenge);
    }
}

function setLearn (object) {
    ui_wrapper.innerHTML = components.learnForm(object.index, object.title, object.description, object.specials);
}

function setQuiz (object) {
    currentQuestion = object;
    ui_wrapper.innerHTML = components.questionForm(object.index, object.title, object.options);
}