/* JavaScript for contact.html */



const form = document.querySelector(".customer_complaint_form")

// Calling a callback function adding the user entered email and complaints to records
form.addEventListener("submit", (e) => {

    // Preventing the page from reloading
    e.preventDefault()

    // Getting the value from the form input
    let emailID = form.querySelector(".customer_email").value
    let customerNote = form.querySelector(".customer_query").value

    // Creating a new element to place the message
    let autoHidMsg = document.createElement("p")
    autoHidMsg.classList.add("popup-email-notification")

    if (emailID != "") {

        if (customerNote != "") {

            // Disabling the submit button after clicked
            form.querySelector(".email-confirm").disabled = true

            $.ajax({
                type: 'POST',
                url: "/contact",
                data: {
                    customer_email: $(".customer_email").val(),
                    customer_query: $(".customer_query").val(),
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                },
                success: function (data) {
                    autoHidMsg.innerHTML = `<span style="text-decoration: none;">${data}</span>`
                    autoHidMsg.style.color = "#80FF72"
                }
            })
        }
    }
    if (emailID == "") {
        autoHidMsg.innerHTML = `Sorry, you forgot to enter your email`
        autoHidMsg.style.color = "#9D0208"
    }

    if (customerNote == "") {
        autoHidMsg.innerHTML = `Don't hesitate to make complaints`
        autoHidMsg.style.color = "#9D0208"
    }

    if (customerNote == "" && emailID == "") {
        autoHidMsg.innerHTML = `Make sure the fields are not empty`
        autoHidMsg.style.color = "#9D0208"
    }

    // Showing the notification on screen
    let articleInner = document.querySelector(".contact-page .contact-box .customer_complaint_form")

    // Deleting the 'p' tag after 2 seconds
    setTimeout(() => {
        autoHidMsg.remove()
        form.querySelector(".email-confirm").disabled = false
    }, 2000)

    // Clearing the input box
    form.querySelector(".customer_email").value = ""
    form.querySelector(".customer_query").value = ""

    // Showing the message
    articleInner.append(autoHidMsg)
})
