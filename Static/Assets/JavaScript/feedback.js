/* ------ Script for Resume Builder's (Contact-Page) ------ */



// ----- Script for Validating and sending a request to mail the data collected from the submitted form ----- //
const sendUserFeedback = (e) => {

    // Preventing the page from reloading
    e.preventDefault()

    // Getting all the input elements in the Feedback Form
    let formInputs = feedbackForm.querySelectorAll("input")
    let messageBox = feedbackForm.querySelector(".customer_feedback")

    // Disabling all input elements an textarea
    formInputs.forEach((input) => {
        input.disabled = true
    })
    messageBox.disabled = true

    // Setting the Feedback form's mouse pointer to loading
    feedbackForm.classList.add("processing")

    // Getting values from the Feedback form's inputs
    let cName = formInputs[1].value
    let cEmail = formInputs[2].value
    let cMessage = messageBox.value

    // Getting the element of message container to show the current status
    let autoHidMsg = feedbackForm.querySelector(".error-message")

    if (cName != "" && cEmail != "" && cMessage != "") {

        $.ajax({
            type: "POST",
            url: "/contact",
            data: {
                customername: $(".customer_name").val(),
                customeremail: $(".customer_email").val(),
                customerfeedback: $(".customer_feedback").val(),
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            },
            success: (data) => {

                // Populating and showing the message container with a success message
                autoHidMsg.innerHTML = `${data}`
                autoHidMsg.classList.add("show")
                autoHidMsg.style.color = "rgb(41, 191, 18)"

                // Clearing the all the inputs in Feedback form
                formInputs[1].value = ""
                formInputs[2].value = ""
                messageBox.value = ""

                // Hiding the element which displays some kind of message
                setTimeout(() => {
                    autoHidMsg.classList.remove("show")
                    autoHidMsg.innerHTML = "404 : Try Again"

                    // Re-enabling back all input elements
                    formInputs.forEach((input) => {
                        input.disabled = false
                    })
                    messageBox.disabled = false

                    // Re-setting the Feedback form's mouse pointer
                    feedbackForm.classList.remove("processing")
                }, 2000)
            },
            error: () => {
                window.location.reload()
            }
        })
    }
    else {
        if (cName == "" && cEmail == "" && cMessage == "") {

            // Populating the message container with a error message
            autoHidMsg.innerHTML = "Make sure the fields are not empty"
        }
        else if (cName == "") {

            // Populating the message container with a error message
            autoHidMsg.innerHTML = "Oops! without a name how can we call you"
        }
        else if (cEmail == "") {

            // Populating the message container with a error message
            autoHidMsg.innerHTML = "Sorry, you forgot to enter your email"
        }
        else if (cMessage == "") {

            // Populating the message container with a error message
            autoHidMsg.innerHTML = "Don't hesitate to give us feedback"
        }
        // Showing the message container with a error message
        autoHidMsg.classList.add("show")
        autoHidMsg.style.color = "rgb(247, 90, 90)"

        // Hiding the element which displays some kind of message
        setTimeout(() => {
            autoHidMsg.classList.remove("show")
            autoHidMsg.innerHTML = "404 : Try Again"

            // Re-enabling back all input elements and textarea
            formInputs.forEach((input) => {
                input.disabled = false
            })
            messageBox.disabled = false

            // Re-setting the Feedback form's mouse pointer
            feedbackForm.classList.remove("processing")
        }, 2000)
    }
}

// Getting the Feedback Form's element from the Contact-Page
const feedbackForm = document.querySelector(".contactpage .form-wrapper .feedback_form")
//
if (feedbackForm != null) {
    feedbackForm.addEventListener("submit", sendUserFeedback)
}
// ------------------------------------------------------------------------------------------------------------- //