/* ------ Script for Resume Builder's SignUp and LogIn ------ */


// Function for disabling scrollbar
function disableScrollBars() {
    document.documentElement.style.overflow = "hidden"
    document.body.scroll = "no"

    // Disabling TAB key from transfering focus to 'a' tags
    $("a").attr("tabindex", "-1");
}

// Function for enabling scrollbar
function enableScrollBars() {
    document.documentElement.style.overflow = "auto"
    document.body.scroll = "yes"

    // Enabling back TAB key from transfering focus to 'a' tags
    $("a").attr("tabindex", "1");
}

// ----- Script for showing signup window with blured background ------------------------------------------------ //
const popSignUp = () => {

    // Showing the Signup window on screen with css stylesheet
    let signupParent = document.querySelector(".sign-up")
    signupParent.classList.toggle("active")

    let signupContents = document.querySelector(".signup-popup")
    signupContents.classList.toggle("active")

    // Disabling scrollbar
    disableScrollBars()

}

// Getting the signup button's element
let signupButton = document.querySelector(".menubar.options .log")

if (signupButton != null) {
    signupButton.addEventListener("click", popSignUp)
}


// ------------------------------------------------------------------------------------------------------------ //


// ----- Script for removing signup window and blured background ------------------------------------------------ //
const removeSignUp = () => {

    // Hiding the Signup window
    let signupParent = document.querySelector(".sign-up")
    signupParent.classList.toggle("active")

    let signupContents = document.querySelector(".signup-popup")
    signupContents.classList.toggle("active")

    // Enabling scrollbar
    enableScrollBars()
}


// Getting the signup window's close button
let signupCloseButton = document.querySelector(".sign-up .signup-close")
signupCloseButton.addEventListener("click", removeSignUp)

// ------------------------------------------------------------------------------------------------------------ //


// ----- Script for removing signup window and popup login window ------------------------------------------------ //
const popLogIn = () => {

    // Removing the Signup window from screen with css stylesheet
    let signupParent = document.querySelector(".sign-up")
    signupParent.classList.toggle("active")

    let signupContents = document.querySelector(".signup-popup")
    signupContents.classList.toggle("active")

    // Showing the Login window on screen with css stylesheet
    let loginParent = document.querySelector(".login-menu")
    loginParent.classList.toggle("active")

    let loginContents = document.querySelector(".login-popup")
    loginContents.classList.toggle("active")
}

// Getting the logIn button's element
const logInButton = document.querySelector(".sign-up .form-container .log-in")
logInButton.addEventListener("click", popLogIn)

// ------------------------------------------------------------------------------------------------------------ //

// ----- Script for removing login window and blured background ------------------------------------------------ //
const removeLogIn = () => {

    // Hiding the LogIn window
    let loginParent = document.querySelector(".login-menu")
    loginParent.classList.toggle("active")

    let loginContents = document.querySelector(".login-popup")
    loginContents.classList.toggle("active")

    // Enabling scrollbar
    enableScrollBars()
}


// Getting the login window's close button
let loginCloseButton = document.querySelector(".login-menu .login-close")
loginCloseButton.addEventListener("click", removeLogIn)

// ------------------------------------------------------------------------------------------------------------ //


// ----- Script for removing login window and popup signup window ------------------------------------------------ //
const popSignUpAgain = () => {

    // Showing the Signup window on screen with css stylesheet
    let loginParent = document.querySelector(".login-menu")
    loginParent.classList.toggle("active")

    let loginContents = document.querySelector(".login-popup")
    loginContents.classList.toggle("active")

    // Removing the Login window from screen with css stylesheet
    let signupParent = document.querySelector(".sign-up")
    signupParent.classList.toggle("active")

    let signupContents = document.querySelector(".signup-popup")
    signupContents.classList.toggle("active")
}

// Getting the logIn button's element
const signUPButton = document.querySelector(".login-menu .form-container .log-in")
signUPButton.addEventListener("click", popSignUpAgain)

// ------------------------------------------------------------------------------------------------------------ //


/*-------------------- Click Function for 'Continue' button from Signup window --------------------- */

const signUpForm = document.querySelector(".sign-up .userAuthentication_form")

// Calling a callback function adding the user entered email and complaints to records
signUpForm.addEventListener("submit", (e) => {

    // Preventing the page from reloading
    e.preventDefault()

    // Getting a element to show some message
    let autoHidMsg = document.querySelector(".sign-up .error-message")

    // Disabling the submit button after clicked
    let button = signUpForm.querySelector(".email-confirm")
    button.disabled = true

    // Checking if it is login or sigup page
    if (button.value == "Continue") {

        $.ajax({
            type: "POST",
            url: "/signup",
            data: {
                username: $(".user_name").val(),
                email: $(".email_id").val(),
                password: $(".pass_word").val(),
                password2: $(".pass_word2").val(),
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            },
            success: function (data) {

                if (data.message[0] == "Success") {
                    popLogIn()
                }
                else {
                    autoHidMsg.innerHTML = `${data.message[0]}`
                    autoHidMsg.classList.toggle("show")

                    // Clearing the input box
                    signUpForm.querySelector(".user_name").value = ""
                    signUpForm.querySelector(".email_id").value = ""
                    signUpForm.querySelector(".pass_word").value = ""
                    signUpForm.querySelector(".pass_word2").value = ""
                }
            }
        })
    }

    // Deleting the 'p' tag after 2 seconds
    setTimeout(() => {
        autoHidMsg.classList.toggle("show")
        button.disabled = false
    }, 2000)
})


/*-------------------- Click Function for 'Log-In' button from Login window --------------------- */

const logInForm = document.querySelector(".login-menu .userAuthentication_form")

// Calling a callback function adding the user entered email and complaints to records
logInForm.addEventListener("submit", (e) => {

    // Preventing the page from reloading
    e.preventDefault()

    // Getting a element to show some message
    let autoHidMsg = document.querySelector(".login-menu .error-message")

    // Disabling the submit button after clicked
    let button = logInForm.querySelector(".email-confirm")
    button.disabled = true

    // Checking if it is login or sigup page
    if (button.value == "Log In") {

        $.ajax({
            type: "POST",
            url: "/login",
            data: {
                user2name: $(".user_2name").val(),
                pass2word: $(".pass_2word").val(),
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            },
            success: function (data) {

                if (data.message[0] == "Success") {
                    removeLogIn()
                    window.location.pathname = data.message[1]
                }
                else {
                    autoHidMsg.innerHTML = `${data.message[0]}`
                    autoHidMsg.classList.toggle("show")

                    // Clearing the input box
                    logInForm.querySelector(".user_name2").value = ""
                    logInForm.querySelector(".pass_word2").value = ""
                }

            }
        })
    }

    // Deleting the 'p' tag after 2 seconds
    setTimeout(() => {
        autoHidMsg.classList.toggle("show")
        button.disabled = false
    }, 2000)
})


// ----- Script for showing signup window with blured background ------------------------------------------------ //
const loggedOptionsMenu = () => {

    if (loggedIn.parentElement.nextElementSibling.classList[1] == "hide") {

        // Showing the dropdown options on screen
        loggedIn.parentElement.nextElementSibling.classList.remove("hide")
    }
    else {
        // Hiding the dropdown options from screen
        loggedIn.parentElement.nextElementSibling.classList.add("hide")
    }
}


// Getting the logged in button
const loggedIn = document.querySelector(".menubar.options .logged")

if (loggedIn != null) {

    loggedIn.addEventListener("mouseenter", loggedOptionsMenu)
    loggedIn.parentElement.nextElementSibling.addEventListener("mouseleave", loggedOptionsMenu)
}
// ------------------------------------------------------------------------------------------------------------ //


export default (popSignUp, removeSignUp)