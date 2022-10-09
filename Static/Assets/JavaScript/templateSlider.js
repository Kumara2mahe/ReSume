/*--- JavaScript for Template page Image Silder ---*/


// Function for switching the templates in Templates Page
const templateSwitcher = (active) => {

    let button = active.target
    button.disabled = true

    if (button.classList[1] != "disabled") {

        if (button.classList[0] == "template-next") {

            let click = ++nextButtonClick

            // previousButtonClick--

            if (click == 1) {

                // Template-1
                button.parentElement.childNodes[3].classList.remove(button.parentElement.childNodes[3].classList[1])
                button.parentElement.childNodes[3].classList.add("position-1")

                // Template-2
                button.parentElement.childNodes[5].classList.remove(button.parentElement.childNodes[5].classList[1])
                button.parentElement.childNodes[5].classList.add("position0")

                // Template-3
                button.parentElement.childNodes[7].classList.remove(button.parentElement.childNodes[7].classList[1])
                button.parentElement.childNodes[7].classList.add("position1")

                // Template-4
                button.parentElement.childNodes[9].classList.remove(button.parentElement.childNodes[9].classList[1])
                button.parentElement.childNodes[9].classList.add("position2")

                // Enabling previous button
                templatePreviousButton.classList.remove("disabled")
            }

            if (click == 2) {

                // Template-1
                button.parentElement.childNodes[3].classList.remove(button.parentElement.childNodes[3].classList[1])
                button.parentElement.childNodes[3].classList.add("position-2")

                // Template-2
                button.parentElement.childNodes[5].classList.remove(button.parentElement.childNodes[5].classList[1])
                button.parentElement.childNodes[5].classList.add("position-1")

                // Template-3
                button.parentElement.childNodes[7].classList.remove(button.parentElement.childNodes[7].classList[1])
                button.parentElement.childNodes[7].classList.add("position0")

                // Template-4
                button.parentElement.childNodes[9].classList.remove(button.parentElement.childNodes[9].classList[1])
                button.parentElement.childNodes[9].classList.add("position1")

                // Template-5
                button.parentElement.childNodes[11].classList.remove(button.parentElement.childNodes[11].classList[1])
                button.parentElement.childNodes[11].classList.add("position2")
            }

            if (click == 3) {

                // Template-1
                button.parentElement.childNodes[3].classList.remove(button.parentElement.childNodes[3].classList[1])
                button.parentElement.childNodes[3].classList.add("positionleft")

                // Template-2
                button.parentElement.childNodes[5].classList.remove(button.parentElement.childNodes[5].classList[1])
                button.parentElement.childNodes[5].classList.add("position-2")

                // Template-3
                button.parentElement.childNodes[7].classList.remove(button.parentElement.childNodes[7].classList[1])
                button.parentElement.childNodes[7].classList.add("position-1")

                // Template-4
                button.parentElement.childNodes[9].classList.remove(button.parentElement.childNodes[9].classList[1])
                button.parentElement.childNodes[9].classList.add("position0")

                // Template-5
                button.parentElement.childNodes[11].classList.remove(button.parentElement.childNodes[11].classList[1])
                button.parentElement.childNodes[11].classList.add("position1")

                // Template-6
                button.parentElement.childNodes[13].classList.remove(button.parentElement.childNodes[13].classList[1])
                button.parentElement.childNodes[13].classList.add("position2")
            }

            if (click == 4) {

                // Template-1
                button.parentElement.childNodes[3].classList.remove(button.parentElement.childNodes[3].classList[1])
                button.parentElement.childNodes[3].classList.add("positionleft")

                // Template-2
                button.parentElement.childNodes[5].classList.remove(button.parentElement.childNodes[5].classList[1])
                button.parentElement.childNodes[5].classList.add("positionleft")

                // Template-3
                button.parentElement.childNodes[7].classList.remove(button.parentElement.childNodes[7].classList[1])
                button.parentElement.childNodes[7].classList.add("position-2")

                // Template-4
                button.parentElement.childNodes[9].classList.remove(button.parentElement.childNodes[9].classList[1])
                button.parentElement.childNodes[9].classList.add("position-1")

                // Template-5
                button.parentElement.childNodes[11].classList.remove(button.parentElement.childNodes[11].classList[1])
                button.parentElement.childNodes[11].classList.add("position0")

                // Template-6
                button.parentElement.childNodes[13].classList.remove(button.parentElement.childNodes[13].classList[1])
                button.parentElement.childNodes[13].classList.add("position1")

                // Template-7
                button.parentElement.childNodes[15].classList.remove(button.parentElement.childNodes[15].classList[1])
                button.parentElement.childNodes[15].classList.add("position2")
            }

            if (click == 5) {

                // Template-1
                button.parentElement.childNodes[3].classList.remove(button.parentElement.childNodes[3].classList[1])
                button.parentElement.childNodes[3].classList.add("positionleft")

                // Template-2
                button.parentElement.childNodes[5].classList.remove(button.parentElement.childNodes[5].classList[1])
                button.parentElement.childNodes[5].classList.add("positionleft")

                // Template-3
                button.parentElement.childNodes[7].classList.remove(button.parentElement.childNodes[7].classList[1])
                button.parentElement.childNodes[7].classList.add("positionleft")

                // Template-4
                button.parentElement.childNodes[9].classList.remove(button.parentElement.childNodes[9].classList[1])
                button.parentElement.childNodes[9].classList.add("position-2")

                // Template-5
                button.parentElement.childNodes[11].classList.remove(button.parentElement.childNodes[11].classList[1])
                button.parentElement.childNodes[11].classList.add("position-1")

                // Template-6
                button.parentElement.childNodes[13].classList.remove(button.parentElement.childNodes[13].classList[1])
                button.parentElement.childNodes[13].classList.add("position0")

                // Template-7
                button.parentElement.childNodes[15].classList.remove(button.parentElement.childNodes[15].classList[1])
                button.parentElement.childNodes[15].classList.add("position1")

                // Template-8
                button.parentElement.childNodes[17].classList.remove(button.parentElement.childNodes[17].classList[1])
                button.parentElement.childNodes[17].classList.add("position2")
            }

            if (click == 6) {

                // Template-1
                button.parentElement.childNodes[3].classList.remove(button.parentElement.childNodes[3].classList[1])
                button.parentElement.childNodes[3].classList.add("positionleft")

                // Template-2
                button.parentElement.childNodes[5].classList.remove(button.parentElement.childNodes[5].classList[1])
                button.parentElement.childNodes[5].classList.add("positionleft")

                // Template-3
                button.parentElement.childNodes[7].classList.remove(button.parentElement.childNodes[7].classList[1])
                button.parentElement.childNodes[7].classList.add("positionleft")

                // Template-4
                button.parentElement.childNodes[9].classList.remove(button.parentElement.childNodes[9].classList[1])
                button.parentElement.childNodes[9].classList.add("positionleft")

                // Template-5
                button.parentElement.childNodes[11].classList.remove(button.parentElement.childNodes[11].classList[1])
                button.parentElement.childNodes[11].classList.add("position-2")

                // Template-6
                button.parentElement.childNodes[13].classList.remove(button.parentElement.childNodes[13].classList[1])
                button.parentElement.childNodes[13].classList.add("position-1")

                // Template-7
                button.parentElement.childNodes[15].classList.remove(button.parentElement.childNodes[15].classList[1])
                button.parentElement.childNodes[15].classList.add("position0")

                // Template-8
                button.parentElement.childNodes[17].classList.remove(button.parentElement.childNodes[17].classList[1])
                button.parentElement.childNodes[17].classList.add("position1")
            }

            if (click == 7) {

                // Template-1
                button.parentElement.childNodes[3].classList.remove(button.parentElement.childNodes[3].classList[1])
                button.parentElement.childNodes[3].classList.add("positionleft")

                // Template-2
                button.parentElement.childNodes[5].classList.remove(button.parentElement.childNodes[5].classList[1])
                button.parentElement.childNodes[5].classList.add("positionleft")

                // Template-3
                button.parentElement.childNodes[7].classList.remove(button.parentElement.childNodes[7].classList[1])
                button.parentElement.childNodes[7].classList.add("positionleft")

                // Template-4
                button.parentElement.childNodes[9].classList.remove(button.parentElement.childNodes[9].classList[1])
                button.parentElement.childNodes[9].classList.add("positionleft")

                // Template-5
                button.parentElement.childNodes[11].classList.remove(button.parentElement.childNodes[11].classList[1])
                button.parentElement.childNodes[11].classList.add("positionleft")

                // Template-6
                button.parentElement.childNodes[13].classList.remove(button.parentElement.childNodes[13].classList[1])
                button.parentElement.childNodes[13].classList.add("position-2")

                // Template-7
                button.parentElement.childNodes[15].classList.remove(button.parentElement.childNodes[15].classList[1])
                button.parentElement.childNodes[15].classList.add("position-1")

                // Template-8
                button.parentElement.childNodes[17].classList.remove(button.parentElement.childNodes[17].classList[1])
                button.parentElement.childNodes[17].classList.add("position0")

                // Disabling the Next button
                if (button.parentElement.childNodes[17].classList[1] == "position0") {
                    button.classList.add("disabled")
                }
            }
        }

        if (button.classList[0] == "template-previous") {


            // Reducing the next button value
            nextButtonClick--

            // Getting the template in the zeroth position
            let template = button.parentElement.querySelector(".position0")

            if (template.classList[0] == "template-2") {

                // Template-1
                template.parentElement.childNodes[3].classList.remove(template.parentElement.childNodes[3].classList[1])
                template.parentElement.childNodes[3].classList.add("position0")

                // Template-2
                template.parentElement.childNodes[5].classList.remove(template.parentElement.childNodes[5].classList[1])
                template.parentElement.childNodes[5].classList.add("position1")

                // Template-3
                template.parentElement.childNodes[7].classList.remove(template.parentElement.childNodes[7].classList[1])
                template.parentElement.childNodes[7].classList.add("position2")

                // Template-4
                template.parentElement.childNodes[9].classList.remove(template.parentElement.childNodes[9].classList[1])
                template.parentElement.childNodes[9].classList.add("positionright")

                // Disabling the Previous button
                if (button.parentElement.childNodes[3].classList[1] == "position0") {
                    button.classList.add("disabled")
                }
            }

            if (template.classList[0] == "template-3") {

                // Template-1
                template.parentElement.childNodes[3].classList.remove(template.parentElement.childNodes[3].classList[1])
                template.parentElement.childNodes[3].classList.add("position-1")

                // Template-2
                template.parentElement.childNodes[5].classList.remove(template.parentElement.childNodes[5].classList[1])
                template.parentElement.childNodes[5].classList.add("position0")

                // Template-3
                template.parentElement.childNodes[7].classList.remove(template.parentElement.childNodes[7].classList[1])
                template.parentElement.childNodes[7].classList.add("position1")

                // Template-4
                template.parentElement.childNodes[9].classList.remove(template.parentElement.childNodes[9].classList[1])
                template.parentElement.childNodes[9].classList.add("position2")

                // Template-5
                template.parentElement.childNodes[11].classList.remove(template.parentElement.childNodes[11].classList[1])
                template.parentElement.childNodes[11].classList.add("positionright")
            }

            if (template.classList[0] == "template-4") {

                // Template-1
                template.parentElement.childNodes[3].classList.remove(template.parentElement.childNodes[3].classList[1])
                template.parentElement.childNodes[3].classList.add("position-2")

                // Template-2
                template.parentElement.childNodes[5].classList.remove(template.parentElement.childNodes[5].classList[1])
                template.parentElement.childNodes[5].classList.add("position-1")

                // Template-3
                template.parentElement.childNodes[7].classList.remove(template.parentElement.childNodes[7].classList[1])
                template.parentElement.childNodes[7].classList.add("position0")

                // Template-4
                template.parentElement.childNodes[9].classList.remove(template.parentElement.childNodes[9].classList[1])
                template.parentElement.childNodes[9].classList.add("position1")

                // Template-5
                template.parentElement.childNodes[11].classList.remove(template.parentElement.childNodes[11].classList[1])
                template.parentElement.childNodes[11].classList.add("position2")

                // Template-6
                template.parentElement.childNodes[13].classList.remove(template.parentElement.childNodes[13].classList[1])
                template.parentElement.childNodes[13].classList.add("positionright")
            }

            if (template.classList[0] == "template-5") {

                // Template-2
                template.parentElement.childNodes[5].classList.remove(template.parentElement.childNodes[5].classList[1])
                template.parentElement.childNodes[5].classList.add("position-2")

                // Template-3
                template.parentElement.childNodes[7].classList.remove(template.parentElement.childNodes[7].classList[1])
                template.parentElement.childNodes[7].classList.add("position-1")

                // Template-4
                template.parentElement.childNodes[9].classList.remove(template.parentElement.childNodes[9].classList[1])
                template.parentElement.childNodes[9].classList.add("position0")

                // Template-5
                template.parentElement.childNodes[11].classList.remove(template.parentElement.childNodes[11].classList[1])
                template.parentElement.childNodes[11].classList.add("position1")

                // Template-6
                template.parentElement.childNodes[13].classList.remove(template.parentElement.childNodes[13].classList[1])
                template.parentElement.childNodes[13].classList.add("position2")

                // Template-7
                template.parentElement.childNodes[15].classList.remove(template.parentElement.childNodes[15].classList[1])
                template.parentElement.childNodes[15].classList.add("positionright")
            }

            if (template.classList[0] == "template-6") {

                // Template-3
                template.parentElement.childNodes[7].classList.remove(template.parentElement.childNodes[7].classList[1])
                template.parentElement.childNodes[7].classList.add("position-2")

                // Template-4
                template.parentElement.childNodes[9].classList.remove(template.parentElement.childNodes[9].classList[1])
                template.parentElement.childNodes[9].classList.add("position-1")

                // Template-5
                template.parentElement.childNodes[11].classList.remove(template.parentElement.childNodes[11].classList[1])
                template.parentElement.childNodes[11].classList.add("position0")

                // Template-6
                template.parentElement.childNodes[13].classList.remove(template.parentElement.childNodes[13].classList[1])
                template.parentElement.childNodes[13].classList.add("position1")

                // Template-7
                template.parentElement.childNodes[15].classList.remove(template.parentElement.childNodes[15].classList[1])
                template.parentElement.childNodes[15].classList.add("position2")

                // Template-8
                template.parentElement.childNodes[17].classList.remove(template.parentElement.childNodes[17].classList[1])
                template.parentElement.childNodes[17].classList.add("positionright")
            }

            if (template.classList[0] == "template-7") {

                // Template-4
                template.parentElement.childNodes[9].classList.remove(template.parentElement.childNodes[9].classList[1])
                template.parentElement.childNodes[9].classList.add("position-2")

                // Template-5
                template.parentElement.childNodes[11].classList.remove(template.parentElement.childNodes[11].classList[1])
                template.parentElement.childNodes[11].classList.add("position-1")

                // Template-6
                template.parentElement.childNodes[13].classList.remove(template.parentElement.childNodes[13].classList[1])
                template.parentElement.childNodes[13].classList.add("position0")

                // Template-7
                template.parentElement.childNodes[15].classList.remove(template.parentElement.childNodes[15].classList[1])
                template.parentElement.childNodes[15].classList.add("position1")

                // Template-8
                template.parentElement.childNodes[17].classList.remove(template.parentElement.childNodes[17].classList[1])
                template.parentElement.childNodes[17].classList.add("position2")
            }

            if (template.classList[0] == "template-8") {

                // Template-5
                template.parentElement.childNodes[11].classList.remove(template.parentElement.childNodes[11].classList[1])
                template.parentElement.childNodes[11].classList.add("position-2")

                // Template-6
                template.parentElement.childNodes[13].classList.remove(template.parentElement.childNodes[13].classList[1])
                template.parentElement.childNodes[13].classList.add("position-1")

                // Template-7
                template.parentElement.childNodes[15].classList.remove(template.parentElement.childNodes[15].classList[1])
                template.parentElement.childNodes[15].classList.add("position0")

                // Template-8
                template.parentElement.childNodes[17].classList.remove(template.parentElement.childNodes[17].classList[1])
                template.parentElement.childNodes[17].classList.add("position1")

                // Enabling Next button
                templateNextButton.classList.remove("disabled")
            }

        }
    }

    setTimeout(() => {
        button.disabled = false
    }, 900)
}


var previousButtonClick = 0
// Getting the Template Page - Previous button
const templatePreviousButton = document.querySelector(".templates-page .template-section .template-slider .template-previous")
//
templatePreviousButton.addEventListener("click", templateSwitcher)

var nextButtonClick = 0
// Getting the Template Page - Next button
const templateNextButton = document.querySelector(".templates-page .template-section .template-slider .template-next")
//
templateNextButton.addEventListener("click", templateSwitcher)



// ------------------------------- Function for downloading the user created resume with custom templates ----------------------------------- //
const downloadResume = () => {

    downloadButton.disabled = true
    let selectedTemplate = downloadButton.parentElement.parentElement.querySelector(".position0")

    if (selectedTemplate != null && selectedTemplate.classList[0] != "") {
        let templateName = selectedTemplate.classList[0].replace("-", "_")
        downloadButton.parentElement.previousElementSibling.childNodes[3].setAttribute("value", templateName)

        $.ajax({
            type: "POST",
            url: "/resume-builder/download-template-pdf",
            data: {
                selectedtemplate: $(".selected_template").val(),
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            },

            success: function (data) {

                if (data.message[0] == "Success") {

                    setTimeout(() => {
                        // Enabling the button back
                        downloadButton.disabled = false
                    }, 3000)

                }
                else {
                    // Redirecting to Templates page
                    window.location.pathname = data.message[1]
                }
            }
        })
    }
    else {
        setTimeout(() => {
            // Enabling the button back
            downloadButton.disabled = false
        }, 3000)
    }
}

// Getting the Save & Download Button
const downloadButton = document.querySelector(".templates-page .template-section .template-toolbar .download-button")
//
downloadButton.addEventListener("click", downloadResume)