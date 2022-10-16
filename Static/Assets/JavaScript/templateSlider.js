/*--- JavaScript for Template page Image Silder ---*/


// Function for switching the templates in Templates Page
const templateSwitcher = (active) => {

    let button = active.target
    button.disabled = true

    if (button.classList[1] != "disabled") {

        if (button.classList[1] == "next") {

            let click = ++nextButtonClick

            if (click == 1) {

                // Template-1
                button.parentElement.children[1].classList.remove(button.parentElement.children[1].classList[1])
                button.parentElement.children[1].classList.add("position-1")

                // Template-2
                button.parentElement.children[2].classList.remove(button.parentElement.children[2].classList[1])
                button.parentElement.children[2].classList.add("position0")

                // Template-3
                button.parentElement.children[3].classList.remove(button.parentElement.children[3].classList[1])
                button.parentElement.children[3].classList.add("position1")

                // Template-4
                button.parentElement.children[4].classList.remove(button.parentElement.children[4].classList[1])
                button.parentElement.children[4].classList.add("position2")

                // Enabling previous button
                templatePreviousButton.classList.remove("disabled")
            }

            if (click == 2) {

                // Template-1
                button.parentElement.children[1].classList.remove(button.parentElement.children[1].classList[1])
                button.parentElement.children[1].classList.add("position-2")

                // Template-2
                button.parentElement.children[2].classList.remove(button.parentElement.children[2].classList[1])
                button.parentElement.children[2].classList.add("position-1")

                // Template-3
                button.parentElement.children[3].classList.remove(button.parentElement.children[3].classList[1])
                button.parentElement.children[3].classList.add("position0")

                // Template-4
                button.parentElement.children[4].classList.remove(button.parentElement.children[4].classList[1])
                button.parentElement.children[4].classList.add("position1")

                // Template-5
                button.parentElement.children[5].classList.remove(button.parentElement.children[5].classList[1])
                button.parentElement.children[5].classList.add("position2")
            }

            if (click == 3) {

                // Template-1
                button.parentElement.children[1].classList.remove(button.parentElement.children[1].classList[1])
                button.parentElement.children[1].classList.add("positionleft")

                // Template-2
                button.parentElement.children[2].classList.remove(button.parentElement.children[2].classList[1])
                button.parentElement.children[2].classList.add("position-2")

                // Template-3
                button.parentElement.children[3].classList.remove(button.parentElement.children[3].classList[1])
                button.parentElement.children[3].classList.add("position-1")

                // Template-4
                button.parentElement.children[4].classList.remove(button.parentElement.children[4].classList[1])
                button.parentElement.children[4].classList.add("position0")

                // Template-5
                button.parentElement.children[5].classList.remove(button.parentElement.children[5].classList[1])
                button.parentElement.children[5].classList.add("position1")

                // Template-6
                button.parentElement.children[6].classList.remove(button.parentElement.children[6].classList[1])
                button.parentElement.children[6].classList.add("position2")
            }

            if (click == 4) {

                // Template-1
                button.parentElement.children[1].classList.remove(button.parentElement.children[1].classList[1])
                button.parentElement.children[1].classList.add("positionleft")

                // Template-2
                button.parentElement.children[2].classList.remove(button.parentElement.children[2].classList[1])
                button.parentElement.children[2].classList.add("positionleft")

                // Template-3
                button.parentElement.children[3].classList.remove(button.parentElement.children[3].classList[1])
                button.parentElement.children[3].classList.add("position-2")

                // Template-4
                button.parentElement.children[4].classList.remove(button.parentElement.children[4].classList[1])
                button.parentElement.children[4].classList.add("position-1")

                // Template-5
                button.parentElement.children[5].classList.remove(button.parentElement.children[5].classList[1])
                button.parentElement.children[5].classList.add("position0")

                // Template-6
                button.parentElement.children[6].classList.remove(button.parentElement.children[6].classList[1])
                button.parentElement.children[6].classList.add("position1")

                // Template-7
                button.parentElement.children[7].classList.remove(button.parentElement.children[7].classList[1])
                button.parentElement.children[7].classList.add("position2")
            }

            if (click == 5) {

                // Template-1
                button.parentElement.children[1].classList.remove(button.parentElement.children[1].classList[1])
                button.parentElement.children[1].classList.add("positionleft")

                // Template-2
                button.parentElement.children[2].classList.remove(button.parentElement.children[2].classList[1])
                button.parentElement.children[2].classList.add("positionleft")

                // Template-3
                button.parentElement.children[3].classList.remove(button.parentElement.children[3].classList[1])
                button.parentElement.children[3].classList.add("positionleft")

                // Template-4
                button.parentElement.children[4].classList.remove(button.parentElement.children[4].classList[1])
                button.parentElement.children[4].classList.add("position-2")

                // Template-5
                button.parentElement.children[5].classList.remove(button.parentElement.children[5].classList[1])
                button.parentElement.children[5].classList.add("position-1")

                // Template-6
                button.parentElement.children[6].classList.remove(button.parentElement.children[6].classList[1])
                button.parentElement.children[6].classList.add("position0")

                // Template-7
                button.parentElement.children[7].classList.remove(button.parentElement.children[7].classList[1])
                button.parentElement.children[7].classList.add("position1")

                // Template-8
                button.parentElement.children[8].classList.remove(button.parentElement.children[8].classList[1])
                button.parentElement.children[8].classList.add("position2")
            }

            if (click == 6) {

                // Template-1
                button.parentElement.children[1].classList.remove(button.parentElement.children[1].classList[1])
                button.parentElement.children[1].classList.add("positionleft")

                // Template-2
                button.parentElement.children[2].classList.remove(button.parentElement.children[2].classList[1])
                button.parentElement.children[2].classList.add("positionleft")

                // Template-3
                button.parentElement.children[3].classList.remove(button.parentElement.children[3].classList[1])
                button.parentElement.children[3].classList.add("positionleft")

                // Template-4
                button.parentElement.children[4].classList.remove(button.parentElement.children[4].classList[1])
                button.parentElement.children[4].classList.add("positionleft")

                // Template-5
                button.parentElement.children[5].classList.remove(button.parentElement.children[5].classList[1])
                button.parentElement.children[5].classList.add("position-2")

                // Template-6
                button.parentElement.children[6].classList.remove(button.parentElement.children[6].classList[1])
                button.parentElement.children[6].classList.add("position-1")

                // Template-7
                button.parentElement.children[7].classList.remove(button.parentElement.children[7].classList[1])
                button.parentElement.children[7].classList.add("position0")

                // Template-8
                button.parentElement.children[8].classList.remove(button.parentElement.children[8].classList[1])
                button.parentElement.children[8].classList.add("position1")
            }

            if (click == 7) {

                // Template-1
                button.parentElement.children[1].classList.remove(button.parentElement.children[1].classList[1])
                button.parentElement.children[1].classList.add("positionleft")

                // Template-2
                button.parentElement.children[2].classList.remove(button.parentElement.children[2].classList[1])
                button.parentElement.children[2].classList.add("positionleft")

                // Template-3
                button.parentElement.children[3].classList.remove(button.parentElement.children[3].classList[1])
                button.parentElement.children[3].classList.add("positionleft")

                // Template-4
                button.parentElement.children[4].classList.remove(button.parentElement.children[4].classList[1])
                button.parentElement.children[4].classList.add("positionleft")

                // Template-5
                button.parentElement.children[5].classList.remove(button.parentElement.children[5].classList[1])
                button.parentElement.children[5].classList.add("positionleft")

                // Template-6
                button.parentElement.children[6].classList.remove(button.parentElement.children[6].classList[1])
                button.parentElement.children[6].classList.add("position-2")

                // Template-7
                button.parentElement.children[7].classList.remove(button.parentElement.children[7].classList[1])
                button.parentElement.children[7].classList.add("position-1")

                // Template-8
                button.parentElement.children[8].classList.remove(button.parentElement.children[8].classList[1])
                button.parentElement.children[8].classList.add("position0")

                // Disabling the Next button
                if (button.parentElement.children[8].classList[1] == "position0") {
                    button.classList.add("disabled")
                }
            }
        }

        if (button.classList[1] == "previous") {


            // Reducing the next button value
            nextButtonClick--

            // Getting the template in the zeroth position
            let template = button.parentElement.querySelector(".position0")

            if (template.classList[0] == "template-2") {

                // Template-1
                template.parentElement.children[1].classList.remove(template.parentElement.children[1].classList[1])
                template.parentElement.children[1].classList.add("position0")

                // Template-2
                template.parentElement.children[2].classList.remove(template.parentElement.children[2].classList[1])
                template.parentElement.children[2].classList.add("position1")

                // Template-3
                template.parentElement.children[3].classList.remove(template.parentElement.children[3].classList[1])
                template.parentElement.children[3].classList.add("position2")

                // Template-4
                template.parentElement.children[4].classList.remove(template.parentElement.children[4].classList[1])
                template.parentElement.children[4].classList.add("positionright")

                // Disabling the Previous button
                if (button.parentElement.children[1].classList[1] == "position0") {
                    button.classList.add("disabled")
                }
            }

            if (template.classList[0] == "template-3") {

                // Template-1
                template.parentElement.children[1].classList.remove(template.parentElement.children[1].classList[1])
                template.parentElement.children[1].classList.add("position-1")

                // Template-2
                template.parentElement.children[2].classList.remove(template.parentElement.children[2].classList[1])
                template.parentElement.children[2].classList.add("position0")

                // Template-3
                template.parentElement.children[3].classList.remove(template.parentElement.children[3].classList[1])
                template.parentElement.children[3].classList.add("position1")

                // Template-4
                template.parentElement.children[4].classList.remove(template.parentElement.children[4].classList[1])
                template.parentElement.children[4].classList.add("position2")

                // Template-5
                template.parentElement.children[5].classList.remove(template.parentElement.children[5].classList[1])
                template.parentElement.children[5].classList.add("positionright")
            }

            if (template.classList[0] == "template-4") {

                // Template-1
                template.parentElement.children[1].classList.remove(template.parentElement.children[1].classList[1])
                template.parentElement.children[1].classList.add("position-2")

                // Template-2
                template.parentElement.children[2].classList.remove(template.parentElement.children[2].classList[1])
                template.parentElement.children[2].classList.add("position-1")

                // Template-3
                template.parentElement.children[3].classList.remove(template.parentElement.children[3].classList[1])
                template.parentElement.children[3].classList.add("position0")

                // Template-4
                template.parentElement.children[4].classList.remove(template.parentElement.children[4].classList[1])
                template.parentElement.children[4].classList.add("position1")

                // Template-5
                template.parentElement.children[5].classList.remove(template.parentElement.children[5].classList[1])
                template.parentElement.children[5].classList.add("position2")

                // Template-6
                template.parentElement.children[6].classList.remove(template.parentElement.children[6].classList[1])
                template.parentElement.children[6].classList.add("positionright")
            }

            if (template.classList[0] == "template-5") {

                // Template-2
                template.parentElement.children[2].classList.remove(template.parentElement.children[2].classList[1])
                template.parentElement.children[2].classList.add("position-2")

                // Template-3
                template.parentElement.children[3].classList.remove(template.parentElement.children[3].classList[1])
                template.parentElement.children[3].classList.add("position-1")

                // Template-4
                template.parentElement.children[4].classList.remove(template.parentElement.children[4].classList[1])
                template.parentElement.children[4].classList.add("position0")

                // Template-5
                template.parentElement.children[5].classList.remove(template.parentElement.children[5].classList[1])
                template.parentElement.children[5].classList.add("position1")

                // Template-6
                template.parentElement.children[6].classList.remove(template.parentElement.children[6].classList[1])
                template.parentElement.children[6].classList.add("position2")

                // Template-7
                template.parentElement.children[7].classList.remove(template.parentElement.children[7].classList[1])
                template.parentElement.children[7].classList.add("positionright")
            }

            if (template.classList[0] == "template-6") {

                // Template-3
                template.parentElement.children[3].classList.remove(template.parentElement.children[3].classList[1])
                template.parentElement.children[3].classList.add("position-2")

                // Template-4
                template.parentElement.children[4].classList.remove(template.parentElement.children[4].classList[1])
                template.parentElement.children[4].classList.add("position-1")

                // Template-5
                template.parentElement.children[5].classList.remove(template.parentElement.children[5].classList[1])
                template.parentElement.children[5].classList.add("position0")

                // Template-6
                template.parentElement.children[6].classList.remove(template.parentElement.children[6].classList[1])
                template.parentElement.children[6].classList.add("position1")

                // Template-7
                template.parentElement.children[7].classList.remove(template.parentElement.children[7].classList[1])
                template.parentElement.children[7].classList.add("position2")

                // Template-8
                template.parentElement.children[8].classList.remove(template.parentElement.children[8].classList[1])
                template.parentElement.children[8].classList.add("positionright")
            }

            if (template.classList[0] == "template-7") {

                // Template-4
                template.parentElement.children[4].classList.remove(template.parentElement.children[4].classList[1])
                template.parentElement.children[4].classList.add("position-2")

                // Template-5
                template.parentElement.children[5].classList.remove(template.parentElement.children[5].classList[1])
                template.parentElement.children[5].classList.add("position-1")

                // Template-6
                template.parentElement.children[6].classList.remove(template.parentElement.children[6].classList[1])
                template.parentElement.children[6].classList.add("position0")

                // Template-7
                template.parentElement.children[7].classList.remove(template.parentElement.children[7].classList[1])
                template.parentElement.children[7].classList.add("position1")

                // Template-8
                template.parentElement.children[8].classList.remove(template.parentElement.children[8].classList[1])
                template.parentElement.children[8].classList.add("position2")
            }

            if (template.classList[0] == "template-8") {

                // Template-5
                template.parentElement.children[5].classList.remove(template.parentElement.children[5].classList[1])
                template.parentElement.children[5].classList.add("position-2")

                // Template-6
                template.parentElement.children[6].classList.remove(template.parentElement.children[6].classList[1])
                template.parentElement.children[6].classList.add("position-1")

                // Template-7
                template.parentElement.children[7].classList.remove(template.parentElement.children[7].classList[1])
                template.parentElement.children[7].classList.add("position0")

                // Template-8
                template.parentElement.children[8].classList.remove(template.parentElement.children[8].classList[1])
                template.parentElement.children[8].classList.add("position1")

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
const templatePreviousButton = document.querySelector(".templates .template-slider .arrow-button.previous")
//
templatePreviousButton.addEventListener("click", templateSwitcher)

var nextButtonClick = 0
// Getting the Template Page - Next button
const templateNextButton = document.querySelector(".templates .template-slider .arrow-button.next")
//
templateNextButton.addEventListener("click", templateSwitcher)



// ------ Script for sending request to create new resume with the user picked template ---------------------- //
const createNewResume = (event) => {

    // Preventing the page from reload
    event.preventDefault()

    // Disabling the submit button after clicked
    let button = downloadForm.querySelector(".submit-button")
    button.disabled = true

    // Creating a new element to show the status as message
    let autoHidMsg = document.createElement("h4")
    autoHidMsg.classList.add("status")
    autoHidMsg.innerHTML = "Rendering template with provided data..."
    templateNextButton.parentElement.before(autoHidMsg)

    // Getting the name of template which has the focus
    let templateChoosen = templateNextButton.parentElement.querySelector(".position0")

    if (templateChoosen != null && templateChoosen.classList[0] != "") {
        let templateName = templateChoosen.classList[0].replace("-", "_")

        $.ajax({
            type: "POST",
            url: "/resume-builder/download-template-pdf",
            data: {
                selectedtemplate: templateName,
                dataholder: "convert",
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            },
            success: (data) => {

                let sec
                if (data.message[0] == "Success") {

                    // Changing the status message to show success
                    autoHidMsg.innerHTML = "Process complete."
                    sec = 400

                    // Creating a new Input element to hold pdf path
                    let pathHolder = document.createElement("input")
                    downloadForm.children[1].before(pathHolder)

                    // Assigning the attributes and thier values
                    pathHolder.classList.add("data-holder")
                    pathHolder.value = data.message[1]
                    Object.assign(pathHolder, { name: "dataholder", type: "text", hidden: true })

                    // Sending the converted pdf file path as new parameter
                    downloadForm.submit()
                    pathHolder.remove()
                }
                else {
                    // Changing the status message to show error
                    autoHidMsg.innerHTML = "Something went wrong, Try Again!"
                    sec = 2000
                }
                setTimeout(() => {

                    // Enabling the Submit button again
                    button.disabled = false
                    autoHidMsg.remove()
                }, sec)

            },
            error: () => {
                window.location.reload()
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
// -------------------------------------------- //

// Getting the form element in current page
const downloadForm = document.querySelector(".templates .template-toolbar")
//
downloadForm.onsubmit = createNewResume
downloadForm.querySelector(".edit-button").addEventListener("click", () => {
    window.location.pathname = "/resume-builder/career-objective"
})