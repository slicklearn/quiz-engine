/** Object declarations */
const components = {};

/** Components */
components.learnForm = (index = 1, title = "Title", description = "Description", specials = []) => {

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
                        <label onclick="nextChallenge();" class="btn btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span>Siguiente</label>
                    </div>
                </div>
            </div>
        </div>
    `;

    return component;
}

components.questionForm = (index = 1, title = "", options = []) => {
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
                        <div id="incorrect" style="display: none;">
                            <button type="button" onclick="incorrect()" class="btn btn-danger">Oh! La respuesta es incorrecta.</button>
                        </div>

                        <div id="correct">
                            <button type="button" onclick="correct()" disabled class="btn btn-primary">Comprobar</button>
                        </div>

                        <div id="correct" style="display: none;">
                            <button type="button" onclick="correct()" class="btn btn-success">Si! La respuesta es correcta.</button>
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
                <input type="radio" name="quiz_answer" value="${options.indexOf(option)}"><i class="form-icon"></i> ${option}
            </label>
        `
    }

    return component.replace("{{buttons}}", buttons);
}