/* ------ Script for Resume Builder's (SignUp and LogIn) Windows ------ */


// Script for disabling scrollbar
const disableScrollBars = () => {

    // Hiding and disabling the scroll functionality
    document.documentElement.style.overflow = "hidden"
    document.body.scroll = "no"

    // Disabling TAB key from transfering focus to 'a' tags
    document.querySelectorAll("a").forEach((element) => {
        element.tabIndex = "-1"
    })
}

// Script for enabling scrollbar
const enableScrollBars = () => {

    // Showing and enabling the scroll functionality back
    document.documentElement.style.overflow = "auto"
    document.body.scroll = "yes"

    // Enabling back TAB key from transfering focus to 'a' tags
    document.querySelectorAll("a").forEach((element) => {
        element.tabIndex = "1"
    })
}

// ----- Script for showing SignUp window with blured background ------------------------------------------------ //
const popSignUp = (event, emailID = null, pathToGo = null) => {

    // ----- Script for hiding SignUp window and blured background ----------------------------- //
    const removeSignUp = () => {

        // Hiding the SignUp window and its contents
        signUpParent.classList.toggle("active")
        signUpContents.classList.toggle("active")

        // Enabling scrollbar
        enableScrollBars()

        // Removing the click functionality from the links
        signUpCloseButton.removeEventListener("click", removeSignUp)
        logInLink.removeEventListener("click", popLogIn)
        signUpForm.removeEventListener("submit", authenticate_or_Create_User)

        // Removing the 'Esc' key to close functionality from SignUp window
        window.removeEventListener("keydown", closeSignUp)

        if (pathToGo != null) {
            window.location.pathname = pathToGo
        }
    }

    // ----- Script to trigger the close SignUp window script when 'Esc' key is pressed ---- //
    const closeSignUp = (event) => {
        if (event.key == "Escape") {
            event.preventDefault()
            removeSignUp()
        }
    }

    // ----- Script for removing signUp window and popup logIn window ------------------------- //
    const popLogIn = () => {

        // ----- Script for removing logIn window and blured background ----- //
        const removeLogIn = (event = null) => {

            // Hiding the LogIn window
            logInParent.classList.toggle("active")
            logInContents.classList.toggle("active")

            // Enabling scrollbar
            enableScrollBars()

            // Removing the click functionality from the links
            signUpCloseButton.removeEventListener("click", removeSignUp)
            logInCloseButton.removeEventListener("click", removeLogIn)
            logInLink.removeEventListener("click", popLogIn)
            signUpLink.removeEventListener("click", popSignUpAgain)
            signUpForm.removeEventListener("submit", authenticate_or_Create_User)
            logInForm.removeEventListener("submit", authenticate_or_Create_User)

            // Removing the 'Esc' key to close functionality from LogIn window
            window.removeEventListener("keydown", closeLogIn)

            if (event != null && pathToGo != null) {
                window.location.pathname = pathToGo
            }
        }

        // ----- Script to trigger the close LogIn window script when 'Esc' key is pressed ---- //
        const closeLogIn = (event) => {
            if (event.key == "Escape") {
                event.preventDefault()
                removeLogIn()
            }
        }

        // ----- Script for removing logIn window and popup signUp window ---- //
        const popSignUpAgain = () => {
            removeLogIn()
            popSignUp(event, emailID, pathToGo)
        }

        // Removing the SignUp window from screen with the CSS stylesheet
        signUpParent.classList.toggle("active")
        signUpContents.classList.toggle("active")

        // Showing the LogIn window on screen with the CSS stylesheet
        let logInParent = document.querySelector(".login-container")
        logInParent.classList.toggle("active")

        let logInContents = logInParent.querySelector(".login-menu")
        logInContents.classList.toggle("active")

        // Getting the Close button's element from the LogIn window
        let logInCloseButton = logInContents.querySelector(".login-close")
        //
        logInCloseButton.addEventListener("click", removeLogIn)

        // Removing the 'Esc' key to close functionality from SignUp window and assigning it to LogIn window
        window.removeEventListener("keydown", closeSignUp)
        window.addEventListener("keydown", closeLogIn)

        // Getting the signUp link's element from the LogIn window
        let signUpLink = logInContents.querySelector(".form-container .signup-wrapper a")
        //
        signUpLink.addEventListener("click", popSignUpAgain)

        // Getting the form element from the LogIn window
        let logInForm = logInContents.querySelector(".form-container .userAuthentication_form")
        //
        logInForm.addEventListener("submit", authenticate_or_Create_User)

        // Focusing the input in the LogIn window
        logInForm.querySelector(".user_2name").focus()
    }

    // ----- Script for sending a request to authenticate or create new user using the data collected from the submitted form ----- //
    const authenticate_or_Create_User = (e) => {

        // Preventing the page from reloading
        e.preventDefault()

        // Getting the element of the submitted form
        let form = e.target

        // Getting a element to show the current status as some message
        let autoHidMsg = form.previousElementSibling

        // Disabling the submit button after clicked
        let button = form.querySelector(".submit-button")
        button.disabled = true
        button.classList.add("disabled")

        // Confirming the submitted form is from SignUp window
        if (button.value == "Continue") {

            $.ajax({
                type: "POST",
                url: "/create-account",
                data: {
                    username: $(".user_name").val(),
                    email: $(".email_id").val(),
                    password: $(".pass_word").val(),
                    password2: $(".pass_word2").val(),
                    csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                },
                success: (data) => {

                    if (data.message[0] == "Success") {

                        // Showing the success message
                        autoHidMsg.innerHTML = `${data.message[1]}`
                        autoHidMsg.style.color = "rgb(41, 191, 18)"
                        autoHidMsg.classList.toggle("show")

                        // Calling the function to close SignUp & open LogIn window
                        setTimeout(popLogIn, 1500)
                    }
                    else {

                        // Showing the error message
                        autoHidMsg.innerHTML = `${data.message}`
                        autoHidMsg.style.color = "rgb(247, 90, 90)"
                        if (autoHidMsg.classList[1] != "show") {
                            autoHidMsg.classList.add("show")
                        }

                        // Clearing all the input box in SignUp window
                        form.querySelector(".user_name").value = ""
                        form.querySelector(".email_id").value = ""
                        form.querySelector(".pass_word").value = ""
                        form.querySelector(".pass_word2").value = ""
                    }
                },
                error: () => {
                    window.location.reload()
                }
            })
        }

        // Confirming the submitted form is from LogIn window
        else if (button.value == "Log In") {

            $.ajax({
                type: "POST",
                url: "/authenticate-user",
                data: {
                    user2name: $(".user_2name").val(),
                    pass2word: $(".pass_2word").val(),
                    csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                },
                success: (data) => {

                    if (data.message[0] == "Success" && pathToGo != null) {
                        // Directing to the URL passed through script call
                        window.location.pathname = pathToGo

                    }
                    else if (data.message[0] == "Success") {
                        // Redirecting to the URL return through JSONresponse
                        window.location.pathname = data.message[1]
                    }
                    else {

                        // Showing the error message
                        autoHidMsg.innerHTML = `${data.message[0]}`
                        if (autoHidMsg.classList[1] != "show") {
                            autoHidMsg.classList.add("show")
                        }

                        // Clearing all the input box in LogIn window
                        form.querySelector(".user_2name").value = ""
                        form.querySelector(".pass_2word").value = ""
                    }
                },
                error: () => {
                    window.location.reload()
                }
            })
        }

        // Hiding the element which displays some kind of message
        setTimeout(() => {
            if (autoHidMsg.classList[1] == "show") {
                autoHidMsg.classList.remove("show")
            }
            button.disabled = false
            button.classList.remove("disabled")
        }, 2000)
    }

    // Showing the SignUp window and its contents on screen with the CSS stylesheet
    let signUpParent = document.querySelector(".signup-container")
    signUpParent.classList.toggle("active")

    let signUpContents = signUpParent.querySelector(".signup-menu")
    signUpContents.classList.toggle("active")

    // Disabling scrollbar
    disableScrollBars()

    // Assigning the 'Esc' key to close functionality in SignUp window
    window.addEventListener("keydown", closeSignUp)

    // Getting the Close button's element from the SignUp window
    let signUpCloseButton = signUpContents.querySelector(".signup-close")
    //
    signUpCloseButton.addEventListener("click", removeSignUp)

    // Getting the logIn link's element from the SignUp window
    let logInLink = signUpContents.querySelector(".form-container .login-wrapper a")
    //
    logInLink.addEventListener("click", popLogIn)

    // Getting the form element from the SignUp window
    let signUpForm = signUpContents.querySelector(".form-container .userAuthentication_form")
    //
    signUpForm.addEventListener("submit", authenticate_or_Create_User)

    // Focusing the input in the SignUp window
    signUpForm.querySelector(".user_name").focus()

    if (emailID != null) {
        signUpForm.querySelector(".email_id").value = emailID
        signUpForm.querySelector(".email_id").focus()
    }
}

// Getting the signUp button's element from the Menubar
const signUpButton = document.querySelector(".menubar.nav-links .sign-up")

// Getting the signUp button's element from the Menubar
const signUpButton2 = document.querySelector(".navigation-menu .pages-container .signup-link")
//
if (signUpButton != null && signUpButton2 != null) {
    signUpButton.addEventListener("click", popSignUp)

    // Assigning a click function to SignUp-Link from the Navigation Menu
    signUpButton2.addEventListener("click", () => {

        // Hiding the Hamburger Menu
        let navigationMenu = document.querySelector(".navigation-menu")
        navigationMenu.classList.add("hide")
        navigationMenu.querySelector(".pages-container").classList.add("hide")

        // Enabling the hamIcon
        document.querySelector(".menubar.nav-links .ham-menu .ham-button").disabled = false

        // Removing hiding effect from the main scroll bar
        document.documentElement.style.overflowY = "visible"

        // Calling the function to open SignUp window
        popSignUp()
    })
}
// ------------------------------------------------------------------------------------------------------------ //


// ----- Script for showing logged-in user's dropdown window while entering their profile-picture ------------------------------------------------ //
const userDropdownMenu = (event, status = null) => {

    // ----- Script for tracking the mouse movement to hide the dropdown menu when not in focus ----- //
    const mouseTracker = (event) => {

        let element = event.target

        // Checking if the mouse pointer is inside the relative elements of dropdown
        let isPointerIn = element.nodeName == "H3" && element.classList[0] == "user-profile"
            || element.nodeName == "IMG" && element.parentElement.classList[0] == "user-profile" || element.nodeName == "SPAN" && element.parentElement.classList[0] == "user-profile"
            || element.nodeName == "DIV" && element.classList[0] == "profile-options" || element.nodeName == "A" && element.parentElement.classList[0] == "profile-options"

        if (!isPointerIn) {

            // Removing the mouse track function and adding back the function to user's profile
            window.removeEventListener("mousemove", mouseTracker)
            userProfile.addEventListener("mouseenter", userDropdownMenu)

            // Calling the function to hide the dropdown menu
            userDropdownMenu(event, status = "closed")
        }
    }

    // Checking the user's dropdown window is already visible or not
    if (userProfile.nextElementSibling.classList[1] == "hide") {

        if (userProfile.classList[1] == undefined) {

            // Show a animation in the user's profile
            userProfile.classList.add("spin")
        }
        else if (userProfile.classList[1] == "re-spin") {

            // Changing the animation in the user's profile
            userProfile.classList.replace("re-spin", "spin")
        }

        // Showing the dropdown window on the screen
        userProfile.nextElementSibling.classList.remove("hide")
    }

    else if (userProfile.classList[1] == "spin") {

        // Changing the animation in the user's profile
        userProfile.classList.replace("spin", "re-spin")

        // Hiding the dropdown window from the screen
        userProfile.nextElementSibling.classList.add("hide")
    }

    if (status == null) {
        // Adding a function with the window to track the mouse movement over the elements
        window.addEventListener("mousemove", mouseTracker)

        // Removing the function assigned with the user's profile
        userProfile.removeEventListener("mouseenter", userDropdownMenu)
    }
}

// ----- Script for prompting a image file upload dialog to authenticated users -------------------------- //
const imageUploader = (event) => {

    // ----- Script for enabling the change profile button ---- //
    const enableChangeProfile = (sec = 500) => {

        setTimeout(() => {

            // Enabling the button back
            button.classList.remove("disabled")
            button.addEventListener("click", imageUploader)
            imageChangeForm.remove()
        }, sec)
    }

    // ----- Script for sending request to update profile picture ----- //
    const changeProfile = (formData) => {

        // Creating a progress bar to show the status of image upload process through animation
        let statusbar = document.createElement("div")
        statusbar.classList.add("menubar-status")
        statusbar.innerHTML = `<div class="progress" style="height: 0.2em; background-color: var(--mountbattenpink);">
                                    <div class="progress-bar"
                                        style="background: linear-gradient(to right, rgba(255, 22, 100), var(--orangeweb) 30%);width: 0%;height: 100%;transition: 1000ms">
                                    </div>
                                </div>`
        document.querySelector("header nav").append(statusbar)
        //
        let msec = 1000
        let status = statusbar.querySelector(".progress-bar")

        setTimeout(() => {

            // Sending update request throught AJAX 
            $.ajax({
                type: "POST",
                url: "/update-profile",
                enctype: "multipart/form-data",
                data: formData,
                contentType: false,
                processData: false,
                beforeSend: () => {
                    status.style.width = "40%"
                },
                success: (data) => {

                    if (data.message[0] == "Success") {

                        // Setting the returned new image as the User's profile
                        if (button.classList[0] == "change") {
                            userProfile.children[0].setAttribute("src", data.message[1])
                        }
                        else {
                            userProfileChange.nextElementSibling.setAttribute("src", data.message[1])
                        }
                        // Completing the progress of status bar
                        status.style.width = "100%"
                    }
                    else {
                        alert(data.message[1])
                    }
                    enableChangeProfile(msec * 2)
                    setTimeout(() => {
                        statusbar.remove()
                    }, msec)

                },
                error: () => {
                    window.location.reload()
                }
            })
        }, msec * 0.75)
    }

    // Getting the element of the clicked button
    let button = event.target

    // Disabling the button by removing the function assigned to it
    button.classList.add("disabled")
    button.removeEventListener("click", imageUploader)

    // Creating a new form with input element to prompt file upload dialog and also hold the user uploaded image
    let image, imageChangeForm = document.createElement("form")
    imageChangeForm.innerHTML = `<input name='csrfmiddlewaretoken' value='${csrfToken}'>
                                <input name='newprofile' type='file' accept='image/jpeg, image/png'>
                                <input type='submit'>`

    let imageInput = imageChangeForm.querySelector("input[type='file']")
    imageInput.click()

    // Monitoring the file dialog for a new image file
    window.onfocus = () => {

        setTimeout(() => {
            if (image = imageInput.value) {

                // Spliting the extension from the uploaded file 
                const supportedFormats = ["jpg", "jpeg", "png"]
                let extension = image.toLowerCase().split(".")[1]

                if (supportedFormats.includes(extension)) {

                    // Sending a request to update profile picture with the uploaded image
                    changeProfile(new FormData(imageChangeForm))
                }
                else {
                    alert("InValid file format!, try upload a valid image file.")
                    enableChangeProfile()
                }
            }
            else {
                enableChangeProfile()
            }

        }, 250)
        window.onfocus = null
    }
}
// -------------------------------------------------------------- //

// Getting the logged-in user's profile from the Menubar
const userProfile = document.querySelector(".menubar.nav-links .user-profile")
//
if (userProfile != null) {
    userProfile.addEventListener("mouseenter", userDropdownMenu)

    // Adding a script to send a request to change the current user profile by uploading a new one
    userProfile.nextElementSibling.children[0].addEventListener("click", imageUploader)
}

// Getting the logged-in user's profile change element from the Navbar
const userProfileChange = document.querySelector(".navigation-menu .navigation-menu-container .user-profile span")
//
if (userProfileChange != null) {
    // Adding a script to send a request to change the current user profile by uploading a new one
    userProfileChange.addEventListener("click", imageUploader)
}

// Getting and storing the value of CSRF token and deleting the input
let csrfToken = document.querySelector("header~input[name='csrfmiddlewaretoken']")
if (csrfToken != null) {
    csrfToken.remove()
    csrfToken = csrfToken.value
}
// ------------------------------------------------------------------------------------------------------------ //


export default (popSignUp)