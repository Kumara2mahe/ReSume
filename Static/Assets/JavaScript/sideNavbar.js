/*--- JavaScript for activating the Side-Navbar and for progressbar percentage---*/

import popSignUp from "./logs.js"


// ------------------- Function for redirecting to the navbar option's page ---------------------------------------------------------------- //
const navbarLinkActivator = (active) => {

    // Getting the clicked option
    if (active.target.tagName == "A") {

        let button = active.target

        setTimeout(() => {

            if (button.classList[0] == "first-link") {

                window.location.pathname = "/resume-builder/personal-details"
            }
            if (button.classList[0] == "second-link") {

                window.location.pathname = "/resume-builder/years-of-experience"
            }
            if (button.classList[0] == "third-link") {

                window.location.pathname = "/resume-builder/higher-education"
            }
            if (button.classList[0] == "fourth-link") {

                window.location.pathname = "/resume-builder/certifications"
            }
            if (button.classList[0] == "fifth-link") {

                window.location.pathname = "/resume-builder/additional-skills"
            }
            if (button.classList[0] == "sixth-link") {

                window.location.pathname = "/resume-builder/career-objective"
            }

        }, 200)
    }

    if (active.target.tagName == "IMG") {

        let button = active.target.parentElement

        setTimeout(() => {

            if (button.classList[0] == "first-link") {

                window.location.pathname = "/resume-builder/personal-details"
            }
            if (button.classList[0] == "second-link") {

                window.location.pathname = "/resume-builder/years-of-experience"
            }
            if (button.classList[0] == "third-link") {

                window.location.pathname = "/resume-builder/higher-education"
            }
            if (button.classList[0] == "fourth-link") {

                window.location.pathname = "/resume-builder/certifications"
            }
            if (button.classList[0] == "fifth-link") {

                window.location.pathname = "/resume-builder/additional-skills"
            }
            if (button.classList[0] == "sixth-link") {

                window.location.pathname = "/resume-builder/career-objective"
            }

        }, 200)
    }

    if (active.target.tagName == "SPAN") {

        let button = active.target.parentElement

        setTimeout(() => {

            if (button.classList[0] == "first-link") {

                window.location.pathname = "/resume-builder/personal-details"
            }

            if (button.classList[0] == "second-link") {

                window.location.pathname = "/resume-builder/years-of-experience"
            }

            if (button.classList[0] == "third-link") {

                window.location.pathname = "/resume-builder/higher-education"
            }

            if (button.classList[0] == "fourth-link") {

                window.location.pathname = "/resume-builder/certifications"
            }

            if (button.classList[0] == "fifth-link") {

                window.location.pathname = "/resume-builder/additional-skills"
            }

            if (button.classList[0] == "sixth-link") {

                window.location.pathname = "/resume-builder/career-objective"
            }

        }, 200)
    }
}

// Getting the current navbar
const currentSideNavbarOption = document.querySelector(".forms-navbar .navbar-names .nav-bar-active")

// Getting the current progress bar
const mainProgressBar = document.querySelector(".forms-navbar .form-progress .form-progress-bar")
const overallProgress = document.querySelector(".forms-navbar .form-progress .form-progress-percentage")


if (currentSideNavbarOption.classList[0] == "first-link") {

    // Function for opening a confirmation dialog box
    const backToGettingStarted = () => {

        // Function for redirecting to the previous page or staying in the current page
        let yesORno = (active) => {

            let button = active.target

            if (button.innerHTML == "Yes") {

                setTimeout(() => {
                    window.location.pathname = "/resume-builder/getting-started"
                }, 200)
            }
            if (button.innerHTML == "No") {
                // Getting the confirmation box element and poping it on the screen
                let confirmMessage = document.querySelector(".forms-content-section .confirmation-box")
                //
                confirmMessage.classList.remove("show")
            }
        }

        // Getting the confirmation box element and poping it on the screen
        let confirmMessage = document.querySelector(".forms-content-section .confirmation-box")
        //
        confirmMessage.classList.add("show")

        // Getting the yes and no buttons from the confirmation box
        let yesButton = confirmMessage.querySelector(".confirm-option .confirm-yes")
        let noButton = confirmMessage.querySelector(".confirm-option .confirm-no")
        //
        yesButton.addEventListener("click", yesORno)
        noButton.addEventListener("click", yesORno)


    }

    // Getting the back button and setting a redirect function to it
    const backButton = document.querySelector(".forms-content-section .personal-details-back-button")
    //
    backButton.addEventListener("click", backToGettingStarted)


    // Function for checking entries are valid and redirecting to experience option
    const goToExperienceOption = (active) => {

        // Preventing the page from reload
        active.preventDefault()

        // Disabling the submit button after clicked
        let button = personalDetailsForm.querySelector(".personal-details-continue-button")
        button.disabled = true

        $.ajax({
            type: "POST",
            url: "/resume-builder/personal-details",
            data: {
                firstname: $(".first_name").val(),
                lastname: $(".last_name").val(),
                currentemail: $(".current_email").val(),
                phonenumber: $(".phone_number").val(),
                currentaddress: $(".current_address").val(),
                currentcountry: $(".current_country").val(),
                currentcity: $(".current_city").val(),
                currentstate: $(".current_state").val(),
                pincode: $(".pin_code").val(),
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            },

            success: function (data) {

                if (data.message[0] == "Verified") {

                    if (closeClick == 0) {

                        // Opening the signup panel
                        popSignUp()

                        // Filling the email field in signup form with user entered email in personal-details-form
                        let emailInput = document.querySelector(".sign-up .userAuthentication_form .email_id")
                        emailInput.value = personalDetailsForm.querySelector(".current_email").value

                        let newsSignUpCloseButton = document.querySelector(".sign-up .signup-close")
                        newsSignUpCloseButton.addEventListener("click", () => {

                            // Redirecting to experiece page
                            window.location.pathname = data.message[1]
                            // 
                            button.disabled = false
                            closeClick = 2
                        })
                    }
                    else {
                        // Redirecting to experiece page
                        window.location.pathname = data.message[1]
                        // Enabling the button back
                        button.disabled = false
                    }
                }

                else {

                    let value = ""

                    if (data.message[0] == "fName") {

                        value = personalDetailsForm.querySelector(".first_name")
                        value.style.borderColor = "#fc1919b3"
                    }
                    if (data.message[0] == "lName") {

                        value = personalDetailsForm.querySelector(".last_name")
                        value.style.borderColor = "#fc1919b3"
                    }
                    if (data.message[0] == "Email") {

                        value = personalDetailsForm.querySelector(".current_email")
                        value.style.borderColor = "#fc1919b3"
                    }

                    // Removing the border color
                    setTimeout(() => {

                        value.style.borderColor = "rgb(227, 227, 227)"

                        button.disabled = false
                    }, 1500)
                }
            }
        })
    }

    var closeClick = 0
    // Getting the Personal Details Form
    const personalDetailsForm = document.querySelector(".forms-content-section .personal-details-form")
    //
    personalDetailsForm.addEventListener("submit", goToExperienceOption)

    // Activating the navbar according to it's class
    if (currentSideNavbarOption.classList[2] == "personal" || currentSideNavbarOption.classList[2] == "none") {

        // Option-1
        currentSideNavbarOption.classList.add("nav-bar-activated")

        // Progress Bar Percentage
        let width = "7%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    if (currentSideNavbarOption.classList[2] == "experience") {

        closeClick = 2

        // Option-1
        currentSideNavbarOption.classList.add("nav-bar-activated")

        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "10%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    if (currentSideNavbarOption.classList[2] == "education") {

        closeClick = 2

        // Option-1
        currentSideNavbarOption.classList.add("nav-bar-activated")

        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)

        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "22%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    if (currentSideNavbarOption.classList[2] == "certifications") {

        closeClick = 2

        // Option-1
        currentSideNavbarOption.classList.add("nav-bar-activated")

        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)

        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)

        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "59%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    if (currentSideNavbarOption.classList[2] == "skills") {

        closeClick = 2

        // Option-1
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)
        // Option-5
        currentSideNavbarOption.parentElement.childNodes[9].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[9].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "63%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    if (currentSideNavbarOption.classList[2] == "objective") {

        // Option-1
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)
        // Option-5
        currentSideNavbarOption.parentElement.childNodes[9].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[9].addEventListener("click", navbarLinkActivator)
        // Option-6
        currentSideNavbarOption.parentElement.childNodes[11].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[11].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "72%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width

    }

    if (currentSideNavbarOption.classList[2] == "templates") {

        // Option-1
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)
        // Option-5
        currentSideNavbarOption.parentElement.childNodes[9].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[9].addEventListener("click", navbarLinkActivator)
        // Option-6
        currentSideNavbarOption.parentElement.childNodes[11].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[11].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "94%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width

    }
}

if (currentSideNavbarOption.classList[0] == "second-link") {

    // Function for checking entries are valid and redirecting to education option
    const goToEducationOption = (active) => {

        // Preventing the page from reload
        active.preventDefault()

        // Getting the Personal Details Form
        let yearOfExperienceForm = document.querySelector(".forms-content-section .years-of-experience-form")

        // Disabling the submit button after clicked
        let button = yearOfExperienceForm.querySelector(".years-of-experience-continue-button")
        button.disabled = true

        $.ajax({
            type: "POST",
            url: "/resume-builder/years-of-experience",
            data: {
                jobtitle: $(".job_title").val(),
                companyname: $(".company_name").val(),
                countryname: $(".country_name").val(),
                cityname: $(".city_name").val(),
                startmonth: $(".start_month").val(),
                startyear: $(".start_year").val(),
                endmonth: $(".end_month").val(),
                endyear: $(".end_year").val(),
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            },

            success: function (data) {

                if (data.message[0] == "Notempty") {

                    // Redirecting to experiece page
                    window.location.pathname = data.message[1]
                    // Enabling the button back
                    button.disabled = false

                }

                else {

                    // Function for redirecting to the next page or staying in the current page
                    let yesORno = (active) => {

                        let button = active.target

                        if (button.innerHTML == "Continue") {

                            setTimeout(() => {
                                window.location.pathname = data.message[1]
                            }, 200)
                        }
                        if (button.innerHTML == "Back") {
                            // Getting the confirmation box element and removing it from the screen
                            let confirmMessage = document.querySelector(".forms-content-section .confirmation-box")
                            //
                            confirmMessage.classList.remove("show")
                        }
                    }

                    // Getting the confirmation box element and poping it on the screen
                    let confirmMessage = document.querySelector(".forms-content-section .confirmation-box")
                    //
                    confirmMessage.classList.add("show")

                    // Getting the yes and no buttons from the confirmation box
                    let yesButton = confirmMessage.querySelector(".confirm-option .confirm-yes")
                    let noButton = confirmMessage.querySelector(".confirm-option .confirm-no")
                    //
                    yesButton.addEventListener("click", yesORno)
                    noButton.addEventListener("click", yesORno)

                    // Enabling the submit button after clicked
                    button.disabled = false
                }

            }
        })
    }

    // Function for showing and skiping the experience section
    const showingExperienceSection = (active) => {

        let button = active.target

        if (button.classList[0] == "yes-button") {

            // Hiding the yes or no question and showing the years of experience form 
            button.parentElement.parentElement.classList.add("hide")
            button.parentElement.parentElement.nextElementSibling.classList.add("show")

            // Getting the Personal Details Form
            let yearOfExperienceForm = document.querySelector(".forms-content-section .years-of-experience-form")
            //
            yearOfExperienceForm.addEventListener("submit", goToEducationOption)

            // Creating a function for back button
            let yearOfExperienceFormBackButton = yearOfExperienceForm.querySelector(".years-of-experience-back-button")
            //
            yearOfExperienceFormBackButton.addEventListener("click", () => {
                window.location.pathname = "/resume-builder/personal-details"
            })

        }

        if (button.classList[0] == "no-button") {

            setTimeout(() => {
                window.location.pathname = "/resume-builder/higher-education"
            }, 300)
        }
    }

    // Getting the elements of 'yes' buttons
    const experienceYesButton = document.querySelector(".years-of-experience .forms-content-section .yes-button")
    //
    experienceYesButton.addEventListener("click", showingExperienceSection)
    // Getting the elements of 'no' buttons
    const experienceNoButton = document.querySelector(".years-of-experience .forms-content-section .no-button")
    //
    experienceNoButton.addEventListener("click", showingExperienceSection)


    // Getting the form's input elements
    let jobTitleElement = document.querySelector(".forms-content-section .years-of-experience-form .job_title")
    let companyNameElement = document.querySelector(".forms-content-section .years-of-experience-form .company_name")
    let countryNameElement = document.querySelector(".forms-content-section .years-of-experience-form .country_name")
    let cityNameElement = document.querySelector(".forms-content-section .years-of-experience-form .city_name")
    let startMonthElement = document.querySelector(".forms-content-section .years-of-experience-form .start_month")
    let startYearElement = document.querySelector(".forms-content-section .years-of-experience-form .start_year")
    let endMonthElement = document.querySelector(".forms-content-section .years-of-experience-form .end_month")
    let endYearElement = document.querySelector(".forms-content-section .years-of-experience-form .end_year")

    // Checking if the fields are not empty
    if (jobTitleElement.value != "" || companyNameElement.value != "" || countryNameElement.value != "Country" || cityNameElement.value != "" || startMonthElement.value != "Start Month" || startYearElement.value != "Start Year" || endMonthElement.value != "End Month" || endYearElement.value != "End Year") {

        // Hiding the yes or no question and showing the years of experience form 
        experienceYesButton.parentElement.parentElement.classList.add("hide")
        experienceYesButton.parentElement.parentElement.nextElementSibling.classList.add("show")

        // Getting the Personal Details Form
        let yearOfExperienceForm = document.querySelector(".forms-content-section .years-of-experience-form")
        //
        yearOfExperienceForm.addEventListener("submit", goToEducationOption)

        // Creating a function for back button
        let yearOfExperienceFormBackButton = yearOfExperienceForm.querySelector(".years-of-experience-back-button")
        //
        yearOfExperienceFormBackButton.addEventListener("click", () => {

            window.location.pathname = "/resume-builder/personal-details"
        })
    }


    // Activating the navbar according to it's class
    if (currentSideNavbarOption.classList[2] == "experience") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.classList.add("nav-bar-activated")

        // Progress Bar Percentage
        let width = "10%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    if (currentSideNavbarOption.classList[2] == "education") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "22%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    if (currentSideNavbarOption.classList[2] == "certifications") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "59%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    if (currentSideNavbarOption.classList[2] == "skills") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)
        // Option-5
        currentSideNavbarOption.parentElement.childNodes[9].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[9].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "63%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    if (currentSideNavbarOption.classList[2] == "objective") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)
        // Option-5
        currentSideNavbarOption.parentElement.childNodes[9].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[9].addEventListener("click", navbarLinkActivator)
        // Option-6
        currentSideNavbarOption.parentElement.childNodes[11].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[11].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "72%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width

    }

    if (currentSideNavbarOption.classList[2] == "templates") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)
        // Option-5
        currentSideNavbarOption.parentElement.childNodes[9].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[9].addEventListener("click", navbarLinkActivator)
        // Option-6
        currentSideNavbarOption.parentElement.childNodes[11].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[11].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "94%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width

    }

}

if (currentSideNavbarOption.classList[0] == "third-link") {

    // Function for adding Additional Education
    const addAdditionalEducation = () => {

        // Function for returning to Education Edit Section
        const backToAgainEditSection = () => {

            // Showing the Education edit-section
            educationHighSchoolForm.parentElement.parentElement.childNodes[7].classList.add("show")

            // Hiding the HighSchool form section
            educationHighSchoolForm.parentElement.classList.remove("show")
        }

        let button = document.querySelector(".higher-education .forms-content-section .edit-section .edit-container .add-school-college")

        if (button.childNodes[1].childNodes[2].innerHTML == "Add School") {

            // Showing the HighSchool form section
            educationHighSchoolForm.parentElement.classList.add("show")

            // Hiding the Education edit-section
            educationHighSchoolForm.parentElement.parentElement.childNodes[7].classList.remove("show")

            // Removing Old Back Button and Continue Button Functions
            educationHighSchoolFormBackButton.removeEventListener("click", backToExperience)

            // Adding new Back Button and Continue Button Functions
            educationHighSchoolFormBackButton.addEventListener("click", backToAgainEditSection)

            // Hiding the Add School Button
            button.classList.add("hide")
        }

        if (button.childNodes[1].childNodes[2].innerHTML == "Add College") {

            // Showing the College form section
            educationCollegeForm.parentElement.classList.add("show")

            // Hiding the Education edit-section
            educationCollegeForm.parentElement.parentElement.childNodes[7].classList.remove("show")

            // Removing Old Back Button and Continue Button Functions
            educationCollegeFormBackButton.removeEventListener("click", backToExperience)

            // Adding new Back Button and Continue Button Functions
            educationCollegeFormBackButton.addEventListener("click", backToAgainEditSection)

            // Hiding the Add School Button
            button.classList.add("hide")
        }

    }

    // Function for checking entries are valid and redirecting to education-edit-section
    const goToEducationEdit = (active) => {

        // Preventing the page from reload
        active.preventDefault()

        if (active.target.classList[0] == "higher-education-highschool-form") {

            // Disabling the submit button after clicked
            let button = educationHighSchoolForm.querySelector(".education-school-continue-button")
            button.disabled = true

            $.ajax({
                type: "POST",
                url: "/resume-builder/higher-education",
                data: {
                    schoolform: $(".school_form").val(),
                    schoolname: $(".school_name").val(),
                    schoolpercentage: $(".school_percentage").val(),
                    schoolpassedyear: $(".school_passedyear").val(),
                    schoolcountry: $(".school_country").val(),
                    schoolcity: $(".school_city").val(),
                    csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                },

                success: function (data) {

                    if (data.message[0] == "Notempty") {

                        // Hiding the HighSchool form section
                        educationHighSchoolForm.parentElement.classList.remove("show")

                        // Showing the Education edit-section
                        educationHighSchoolForm.parentElement.parentElement.childNodes[7].classList.add("show")

                        // Getting the user typed values
                        let schoolName = educationHighSchoolForm.querySelector(".school_name").value
                        let schoolYear = educationHighSchoolForm.querySelector(".school_passedyear").value

                        // Setting the user typed value as innerHTML
                        let editSection = document.querySelector(".higher-education .forms-content-section .edit-section .edit-container")

                        // Showing the School Tile on Edit Screen
                        editSection.childNodes[3].classList.add("show")

                        // SchoolName
                        editSection.childNodes[3].childNodes[1].childNodes[1].innerHTML = schoolName

                        // School PassedYear
                        editSection.childNodes[3].childNodes[1].childNodes[3].innerHTML = `High School Diploma (${schoolYear})`
                        editSection.childNodes[3].childNodes[1].childNodes[3].style.textAlign = "left"

                        // School Edit icon function
                        editSection.childNodes[3].childNodes[3].childNodes[1].addEventListener("click", () => {

                            //Showing the HighSchool form section
                            educationHighSchoolForm.parentElement.classList.add("show")

                            // Hiding the Education edit-section
                            educationHighSchoolForm.parentElement.parentElement.childNodes[7].classList.remove("show")
                        })

                        // Add College Option
                        let collegeOption = editSection.childNodes[5].childNodes[1]

                        if (collegeOption.childNodes[2].innerHTML == "Add School") {

                            if (currentSideNavbarOption.classList[2] == "certifications") {
                                // Progress Bar Percentage
                                let width = "59%"
                                mainProgressBar.style.width = width
                                overallProgress.innerHTML = width
                            }
                            else {
                                // Progress Bar Percentage
                                let width = "55%"
                                mainProgressBar.style.width = width
                                overallProgress.innerHTML = width
                            }
                        }

                        else {

                            if (currentSideNavbarOption.classList[2] == "certifications") {

                                // Progress Bar Percentage
                                let width = "59%"
                                mainProgressBar.style.width = width
                                overallProgress.innerHTML = width
                            }
                            else {
                                // Progress Bar Percentage
                                let width = "51%"
                                mainProgressBar.style.width = width
                                overallProgress.innerHTML = width
                            }

                            collegeOption.childNodes[2].innerHTML = "Add College"
                            //
                            collegeOption.addEventListener("click", addAdditionalEducation)
                        }
                        // Enabling the button back
                        button.disabled = false
                    }

                    else {

                        let value = ""

                        if (data.message[0] == "emptyname") {

                            value = educationHighSchoolForm.querySelector(".school_name")
                            value.style.borderColor = "#fc1919b3"
                        }

                        if (data.message[0] == "emptyyear") {

                            value = educationHighSchoolForm.querySelector(".school_passedyear")
                            value.style.borderColor = "#fc1919b3"
                        }

                        // Removing the border color
                        setTimeout(() => {

                            value.style.borderColor = "rgb(227, 227, 227)"

                            button.disabled = false
                        }, 1500)
                    }

                }
            })
        }

        if (active.target.classList[0] == "higher-education-college-form") {

            // Disabling the submit button after clicked
            let button = educationCollegeForm.querySelector(".education-college-continue-button")
            button.disabled = true

            $.ajax({
                type: "POST",
                url: "/resume-builder/higher-education",
                data: {
                    collegeform: $(".college_form").val(),
                    collegename: $(".college_name").val(),
                    collegepercentage: $(".college_percentage").val(),
                    collegepassedyear: $(".college_passedyear").val(),
                    collegedegree: $(".college_degree").val(),
                    collegebranch: $(".college_branch").val(),
                    collegecountry: $(".college_country").val(),
                    collegecity: $(".college_city").val(),
                    csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                },

                success: function (data) {

                    if (data.message[0] == "Notempty") {

                        // Hiding the HighSchool form section
                        educationCollegeForm.parentElement.classList.remove("show")

                        // Showing the Education edit-section
                        educationCollegeForm.parentElement.parentElement.childNodes[7].classList.add("show")

                        // Hiding the tip for College Form Section
                        let collegeTip = document.querySelector(".higher-education .forms-tips-preview .tips-advice.show .college-tip")
                        collegeTip.classList.remove("show")

                        // Getting the user typed values
                        let collegeName = educationCollegeForm.querySelector(".college_name").value
                        let collegeYear = educationCollegeForm.querySelector(".college_passedyear").value
                        let collegeDegree = educationCollegeForm.querySelector(".college_degree").value
                        let collegeBranch = educationCollegeForm.querySelector(".college_branch").value

                        // Setting the user typed value as innerHTML
                        let editSection = document.querySelector(".higher-education .forms-content-section .edit-section .edit-container")

                        // Showing the College Tile on Edit Screen
                        editSection.childNodes[1].classList.add("show")

                        // CollegeName
                        editSection.childNodes[1].childNodes[1].childNodes[1].innerHTML = collegeName

                        // College Degree Branch (PassedYear)
                        editSection.childNodes[1].childNodes[1].childNodes[3].innerHTML = `${collegeDegree} ${collegeBranch} (${collegeYear})`
                        editSection.childNodes[1].childNodes[1].childNodes[3].style.textAlign = "left"

                        // College Edit icon function
                        editSection.childNodes[1].childNodes[3].childNodes[1].addEventListener("click", () => {

                            // Showing the College form section
                            educationCollegeForm.parentElement.classList.add("show")

                            // Hiding the Education edit-section
                            educationCollegeForm.parentElement.parentElement.childNodes[7].classList.remove("show")
                        })

                        // Add School Option
                        let schoolOption = editSection.childNodes[5].childNodes[1]

                        if (schoolOption.childNodes[2].innerHTML == "Add College") {

                            if (currentSideNavbarOption.classList[2] == "certifications") {
                                // Progress Bar Percentage
                                let width = "59%"
                                mainProgressBar.style.width = width
                                overallProgress.innerHTML = width
                            }
                            else {
                                // Progress Bar Percentage
                                let width = "55%"
                                mainProgressBar.style.width = width
                                overallProgress.innerHTML = width
                            }

                        }

                        else {

                            if (currentSideNavbarOption.classList[2] == "certifications") {

                                // Progress Bar Percentage
                                let width = "59%"
                                mainProgressBar.style.width = width
                                overallProgress.innerHTML = width
                            }
                            else {
                                // Progress Bar Percentage
                                let width = "51%"
                                mainProgressBar.style.width = width
                                overallProgress.innerHTML = width
                            }

                            schoolOption.childNodes[2].innerHTML = "Add School"
                            //
                            schoolOption.addEventListener("click", addAdditionalEducation)
                        }

                        // Enabling the button back
                        button.disabled = false

                    }

                    else {

                        let value = ""

                        if (data.message[0] == "emptyname") {

                            value = educationCollegeForm.querySelector(".college_name")
                            value.style.borderColor = "#fc1919b3"
                        }

                        if (data.message[0] == "emptyyear") {

                            value = educationCollegeForm.querySelector(".college_passedyear")
                            value.style.borderColor = "#fc1919b3"
                        }

                        if (data.message[0] == "emptydegree") {

                            value = educationCollegeForm.querySelector(".college_degree")
                            value.style.borderColor = "#fc1919b3"
                        }

                        if (data.message[0] == "emptybranch") {

                            value = educationCollegeForm.querySelector(".college_branch")
                            value.style.borderColor = "#fc1919b3"
                        }

                        // Removing the border color
                        setTimeout(() => {

                            value.style.borderColor = "rgb(227, 227, 227)"

                            button.disabled = false
                        }, 1500)
                    }

                }
            })
        }

    }

    // Function for education page back button
    const backToExperience = () => {
        window.location.pathname = "/resume-builder/years-of-experience"
    }

    // Getting the --------------------------- Education - HighSchool Form --------------------------------------------------------- //
    const educationHighSchoolForm = document.querySelector(".forms-content-section .higher-education-highschool-form")
    //
    educationHighSchoolForm.addEventListener("submit", goToEducationEdit)

    // Creating a function for Education - HighSchool Form back button
    const educationHighSchoolFormBackButton = educationHighSchoolForm.querySelector(".education-school-back-button")
    //
    educationHighSchoolFormBackButton.addEventListener("click", backToExperience)

    // Getting the HighSchool form's input elements
    let schoolNameElement = document.querySelector(".forms-content-section .higher-education-highschool-form .school_name")
    let schoolPercentageElement = document.querySelector(".forms-content-section .higher-education-highschool-form .school_percentage")
    let schoolPassedYearElement = document.querySelector(".forms-content-section .higher-education-highschool-form .school_passedyear")
    let schoolCountryElement = document.querySelector(".forms-content-section .higher-education-highschool-form .school_country")
    let schoolCityElement = document.querySelector(".forms-content-section .higher-education-highschool-form .school_city")

    // Checking if the fields are not empty
    if (schoolNameElement.value != "" || schoolPercentageElement.value != "" || schoolPassedYearElement.value != "Passed Out Year*" || schoolCountryElement.value != "Country" || schoolCityElement.value != "") {

        // Getting the School selection button
        let schoolSelectionButton = document.querySelector(".higher-education .forms-content-section .selection-section .high-school")

        // Hiding the School or College selection buttons
        schoolSelectionButton.parentElement.parentElement.classList.add("hide")

        // Showing the Education edit-section
        educationHighSchoolForm.parentElement.parentElement.childNodes[7].classList.add("show")

        // Getting the user typed values
        let schoolName = educationHighSchoolForm.querySelector(".school_name").value
        let schoolYear = educationHighSchoolForm.querySelector(".school_passedyear").value

        // Setting the user typed value as innerHTML
        let editSection = document.querySelector(".higher-education .forms-content-section .edit-section .edit-container")

        // Showing the School Tile on Edit Screen
        editSection.childNodes[3].classList.add("show")

        // SchoolName
        editSection.childNodes[3].childNodes[1].childNodes[1].innerHTML = schoolName

        // School PassedYear
        editSection.childNodes[3].childNodes[1].childNodes[3].innerHTML = `High School Diploma (${schoolYear})`
        editSection.childNodes[3].childNodes[1].childNodes[3].style.textAlign = "left"

        // School Edit icon function
        editSection.childNodes[3].childNodes[3].childNodes[1].addEventListener("click", () => {

            // Showing the HighSchool form section
            educationHighSchoolForm.parentElement.classList.add("show")

            // Hiding the Education edit-section
            educationHighSchoolForm.parentElement.parentElement.childNodes[7].classList.remove("show")
        })

        // Add College Option
        let collegeOption = editSection.childNodes[5].childNodes[1]

        collegeOption.childNodes[2].innerHTML = "Add College"
        //
        collegeOption.addEventListener("click", addAdditionalEducation)

        // Progress Bar Percentage
        let width = "51%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width

    }

    // Getting the --------------------------- Education - College Form --------------------------------------------------------- //
    const educationCollegeForm = document.querySelector(".forms-content-section .higher-education-college-form")
    //
    educationCollegeForm.addEventListener("submit", goToEducationEdit)

    // Creating a function for Education - College Form back button
    let educationCollegeFormBackButton = educationCollegeForm.querySelector(".education-college-back-button")
    //
    educationCollegeFormBackButton.addEventListener("click", backToExperience)

    // Getting the College form's input elements
    let collegeNameElement = document.querySelector(".forms-content-section .higher-education-college-form .college_name")
    let collegePercentageElement = document.querySelector(".forms-content-section .higher-education-college-form .college_percentage")
    let collegePassedYearElement = document.querySelector(".forms-content-section .higher-education-college-form .college_passedyear")
    let collegeDegreeElement = document.querySelector(".forms-content-section .higher-education-college-form .college_degree")
    let collegeBranchElement = document.querySelector(".forms-content-section .higher-education-college-form .college_branch")
    let collegeCountryElement = document.querySelector(".forms-content-section .higher-education-college-form .college_country")
    let collegeCityElement = document.querySelector(".forms-content-section .higher-education-college-form .college_city")

    // Checking if the fields are not empty
    if (collegeNameElement.value != "" || collegePercentageElement.value != "" || collegePassedYearElement.value != "Passed Out Year*" || collegeDegreeElement.value != "" || collegeBranchElement.value != "" || collegeCountryElement.value != "Country" || collegeCityElement.value != "") {

        // Getting the College selection button
        let collegeSelectionButton = document.querySelector(".higher-education .forms-content-section .selection-section .college-university")

        // Hiding the School or College selection buttons
        collegeSelectionButton.parentElement.parentElement.classList.add("hide")

        // Showing the Education edit-section
        educationCollegeForm.parentElement.parentElement.childNodes[7].classList.add("show")

        // Hiding the tip for College Form Section
        let collegeTip = document.querySelector(".higher-education .forms-tips-preview .tips-advice.show .college-tip")
        collegeTip.classList.remove("show")

        // Getting the user typed values
        let collegeName = educationCollegeForm.querySelector(".college_name").value
        let collegeYear = educationCollegeForm.querySelector(".college_passedyear").value
        let collegeDegree = educationCollegeForm.querySelector(".college_degree").value
        let collegeBranch = educationCollegeForm.querySelector(".college_branch").value

        // Setting the user typed value as innerHTML
        let editSection = document.querySelector(".higher-education .forms-content-section .edit-section .edit-container")

        // Showing the College Tile on Edit Screen
        editSection.childNodes[1].classList.add("show")

        // CollegeName
        editSection.childNodes[1].childNodes[1].childNodes[1].innerHTML = collegeName

        // College Degree Branch (PassedYear)
        editSection.childNodes[1].childNodes[1].childNodes[3].innerHTML = `${collegeDegree} ${collegeBranch} (${collegeYear})`
        editSection.childNodes[1].childNodes[1].childNodes[3].style.textAlign = "left"

        // College Edit icon function
        editSection.childNodes[1].childNodes[3].childNodes[1].addEventListener("click", () => {

            // Showing the College form section
            educationCollegeForm.parentElement.classList.add("show")

            // Hiding the Education edit-section
            educationCollegeForm.parentElement.parentElement.childNodes[7].classList.remove("show")
        })

        // Add School Option
        let schoolOption = editSection.childNodes[5].childNodes[1]

        schoolOption.childNodes[2].innerHTML = "Add School"
        //
        schoolOption.addEventListener("click", addAdditionalEducation)

        // Progress Bar Percentage
        let width = "51%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    const completedEditSection = document.querySelector(".higher-education .forms-content-section .edit-section .edit-container")

    // Checking Both School and College Details is filled
    if (completedEditSection.childNodes[1].classList[1] == "show" && completedEditSection.childNodes[3].classList[1] == "show") {

        // Hiding the add College or School button
        completedEditSection.childNodes[5].classList.add("hide")

        // Progress Bar Percentage
        let width = "55%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    // Creating a back button function for Edit section
    const editSectionBackButton = completedEditSection.querySelector(".edit-buttons .edit-back-button")
    //
    editSectionBackButton.addEventListener("click", backToExperience)

    // Creating a continue button function for Edit section
    const editSectionContinueButton = completedEditSection.querySelector(".edit-buttons .edit-continue-button")
    //
    editSectionContinueButton.addEventListener("click", () => {
        window.location.pathname = "/resume-builder/certifications"
    })


    // Activating the navbar according to it's class
    if (currentSideNavbarOption.classList[2] == "education") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.classList.add("nav-bar-activated")

        // Progress Bar Percentage
        let width = "22%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    if (currentSideNavbarOption.classList[2] == "certifications") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "59%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    if (currentSideNavbarOption.classList[2] == "skills") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)
        // Option-5
        currentSideNavbarOption.parentElement.childNodes[9].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[9].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "63%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    if (currentSideNavbarOption.classList[2] == "objective") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)
        // Option-5
        currentSideNavbarOption.parentElement.childNodes[9].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[9].addEventListener("click", navbarLinkActivator)
        // Option-6
        currentSideNavbarOption.parentElement.childNodes[11].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[11].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "72%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width

    }

    if (currentSideNavbarOption.classList[2] == "templates") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)
        // Option-5
        currentSideNavbarOption.parentElement.childNodes[9].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[9].addEventListener("click", navbarLinkActivator)
        // Option-6
        currentSideNavbarOption.parentElement.childNodes[11].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[11].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "94%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width

    }

}

if (currentSideNavbarOption.classList[0] == "fourth-link") {


    // Function for adding More Certificate Inputs
    const addingMoreCertificates = () => {

        let count = ++certiCount

        // Getting the certificate input section
        let certificateInputSection = licenseCertificationForm.querySelector(".license-certifications-input-section")

        if (count <= 6) {
            // Showing the new certificate input on screen
            let newCertificate = certificateInputSection.querySelector(`.certification_${count}`)
            //
            newCertificate.classList.remove("hide")
        }
        else {
            addCertificateButton.childNodes[1].classList.add("hide")
            //
            addCertificateButton.childNodes[3].classList.remove("hide")

            setTimeout(() => {
                addCertificateButton.childNodes[3].classList.add("hide")
            }, 1300)
        }

    }

    // Function for checking entries are valid and redirecting to Additional Skills Page
    const goToAdditionalSkills = (active) => {

        // Preventing the page from reload
        active.preventDefault()

        // Disabling the submit button after clicked
        let button = licenseCertificationForm.querySelector(".license-certifications-continue-button")
        button.disabled = true

        $.ajax({
            type: "POST",
            url: "/resume-builder/certifications",
            data: {
                certification1: $(".certification_1").val(),
                certification2: $(".certification_2").val(),
                certification3: $(".certification_3").val(),
                certification4: $(".certification_4").val(),
                certification5: $(".certification_5").val(),
                certification6: $(".certification_6").val(),
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            },

            success: function (data) {

                if (data.message[0] == "Success") {

                    // Redirecting to Additional Skills page
                    window.location.pathname = data.message[1]
                    // Enabling the button back
                    button.disabled = false

                }
                else {

                    let value1 = licenseCertificationForm.querySelector(".certification_1")
                    let value2 = licenseCertificationForm.querySelector(".certification_2")
                    let value3 = licenseCertificationForm.querySelector(".certification_3")
                    let value4 = licenseCertificationForm.querySelector(".certification_4")
                    let value5 = licenseCertificationForm.querySelector(".certification_5")
                    let value6 = licenseCertificationForm.querySelector(".certification_6")

                    if (data.message[0] == "Error") {

                        // Showing Error through border color
                        if (value1.value == "") {
                            value1.style.borderColor = "#fc1919b3"
                        }
                        if (value2.value == "") {
                            value2.style.borderColor = "#fc1919b3"
                        }
                        if (value3.value == "") {
                            value3.style.borderColor = "#fc1919b3"
                        }
                        if (value4.value == "") {
                            value4.style.borderColor = "#fc1919b3"
                        }
                        if (value5.value == "") {
                            value5.style.borderColor = "#fc1919b3"
                        }
                        if (value6.value == "") {
                            value6.style.borderColor = "#fc1919b3"
                        }
                    }

                    // Removing the border color
                    setTimeout(() => {

                        value1.style.borderColor = "rgb(227, 227, 227)"
                        value2.style.borderColor = "rgb(227, 227, 227)"
                        value3.style.borderColor = "rgb(227, 227, 227)"
                        value4.style.borderColor = "rgb(227, 227, 227)"
                        value5.style.borderColor = "rgb(227, 227, 227)"
                        value6.style.borderColor = "rgb(227, 227, 227)"

                        button.disabled = false
                    }, 1500)

                }

            }
        })
    }


    // Getting the Certifications Form
    const licenseCertificationForm = document.querySelector(".license-certifications .forms-content-section .forms-entry .license-certifications-form")
    //
    licenseCertificationForm.addEventListener("submit", goToAdditionalSkills)

    // Getting the Add Certification Button
    const addCertificateButton = licenseCertificationForm.querySelector(".license-certifications-add")
    //
    var certiCount = 1
    addCertificateButton.childNodes[1].addEventListener("click", addingMoreCertificates)

    // Getting the Back Button of Certifications page
    const certiifcationsBackButton = licenseCertificationForm.querySelector(".license-certifications-buttons .license-certifications-back-button")
    //
    certiifcationsBackButton.addEventListener("click", () => {
        window.location.pathname = "/resume-builder/higher-education"
    })

    // Getting the values inputs in Certificates Form
    let certificate_1 = licenseCertificationForm.querySelector(".certification_1")
    let certificate_2 = licenseCertificationForm.querySelector(".certification_2")
    let certificate_3 = licenseCertificationForm.querySelector(".certification_3")
    let certificate_4 = licenseCertificationForm.querySelector(".certification_4")
    let certificate_5 = licenseCertificationForm.querySelector(".certification_5")
    let certificate_6 = licenseCertificationForm.querySelector(".certification_6")

    // Checking the number of certificates added
    if (certificate_1.value != "" || certificate_2.value != "" || certificate_3.value != "" || certificate_4.value != "" || certificate_5.value != "" || certificate_6.value != "") {

        if (certificate_2.value != "") {

            // Showing the second Certificate Input
            certificate_2.classList.remove("hide")

            certiCount = 2
        }
        if (certificate_3.value != "") {

            // Showing the third Certificate Input
            certificate_3.classList.remove("hide")

            certiCount = 3
        }
        if (certificate_4.value != "") {

            // Showing the fourth Certificate Input
            certificate_4.classList.remove("hide")

            certiCount = 4
        }
        if (certificate_5.value != "") {

            // Showing the fifth Certificate Input
            certificate_5.classList.remove("hide")

            certiCount = 5
        }
        if (certificate_6.value != "") {

            // Showing the sixth Certificate Input
            certificate_6.classList.remove("hide")

            certiCount = 6
        }
    }


    // Activating the navbar according to it's class
    if (currentSideNavbarOption.classList[2] == "certifications") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.classList.add("nav-bar-activated")

        // Progress Bar Percentage
        let width = "59%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    if (currentSideNavbarOption.classList[2] == "skills") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-5
        currentSideNavbarOption.parentElement.childNodes[9].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[9].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "63%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    if (currentSideNavbarOption.classList[2] == "objective") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-5
        currentSideNavbarOption.parentElement.childNodes[9].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[9].addEventListener("click", navbarLinkActivator)
        // Option-6
        currentSideNavbarOption.parentElement.childNodes[11].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[11].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "72%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width

    }

    if (currentSideNavbarOption.classList[2] == "templates") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-5
        currentSideNavbarOption.parentElement.childNodes[9].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[9].addEventListener("click", navbarLinkActivator)
        // Option-6
        currentSideNavbarOption.parentElement.childNodes[11].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[11].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "94%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width

    }
}

if (currentSideNavbarOption.classList[0] == "fifth-link") {

    // Function for adding More Skills Inputs
    const addingMoreSkills = () => {

        let count = ++skillCount

        // Getting the skills input section
        let skillsInputSection = additionalSkillsForm.querySelector(".additional-skills-input-section")

        if (count <= 16) {
            // Showing the new Skill input on screen
            let newSkill = skillsInputSection.querySelector(`.skill_${count}`)
            //
            newSkill.classList.remove("hide")
        }
        else {
            addSkillButton.childNodes[1].classList.add("hide")
        }

    }

    // Function for checking entries are valid and redirecting to Career Objective Page
    const goToCareerObjective = (active) => {

        // Preventing the page from reload
        active.preventDefault()

        // Disabling the submit button after clicked
        let button = additionalSkillsForm.querySelector(".additional-skills-continue-button")
        button.disabled = true

        $.ajax({
            type: "POST",
            url: "/resume-builder/additional-skills",
            data: {
                skill1: $(".skill_1").val(),
                skill2: $(".skill_2").val(),
                skill3: $(".skill_3").val(),
                skill4: $(".skill_4").val(),
                skill5: $(".skill_5").val(),
                skill6: $(".skill_6").val(),
                skill7: $(".skill_7").val(),
                skill8: $(".skill_8").val(),
                skill9: $(".skill_9").val(),
                skill10: $(".skill_10").val(),
                skill11: $(".skill_11").val(),
                skill12: $(".skill_12").val(),
                skill13: $(".skill_13").val(),
                skill14: $(".skill_14").val(),
                skill15: $(".skill_15").val(),
                skill16: $(".skill_16").val(),
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            },

            success: function (data) {

                if (data.message[0] == "Success") {

                    // Redirecting to Career Objective page
                    window.location.pathname = data.message[1]
                    // Enabling the button back
                    button.disabled = false

                }
                else {

                    let value1 = additionalSkillsForm.querySelector(".skill_1")
                    let value2 = additionalSkillsForm.querySelector(".skill_2")
                    let value3 = additionalSkillsForm.querySelector(".skill_3")
                    let value4 = additionalSkillsForm.querySelector(".skill_4")
                    let value5 = additionalSkillsForm.querySelector(".skill_5")
                    let value6 = additionalSkillsForm.querySelector(".skill_6")
                    let value7 = additionalSkillsForm.querySelector(".skill_7")
                    let value8 = additionalSkillsForm.querySelector(".skill_8")
                    let value9 = additionalSkillsForm.querySelector(".skill_9")
                    let value10 = additionalSkillsForm.querySelector(".skill_10")
                    let value11 = additionalSkillsForm.querySelector(".skill_11")
                    let value12 = additionalSkillsForm.querySelector(".skill_12")
                    let value13 = additionalSkillsForm.querySelector(".skill_13")
                    let value14 = additionalSkillsForm.querySelector(".skill_14")
                    let value15 = additionalSkillsForm.querySelector(".skill_15")
                    let value16 = additionalSkillsForm.querySelector(".skill_16")

                    if (data.message[0] == "requiredError") {
                        // Showing Error through border color
                        if (value1.value == "") {
                            value1.style.borderColor = "#fc1919b3"
                        }
                        if (value2.value == "") {
                            value2.style.borderColor = "#fc1919b3"
                        }
                        if (value3.value == "") {
                            value3.style.borderColor = "#fc1919b3"
                        }

                        addSkillButton.childNodes[3].classList.remove("hide")

                        setTimeout(() => {
                            addSkillButton.childNodes[3].classList.add("hide")
                        }, 1300)
                    }

                    if (data.message[0] == "Error") {

                        // Showing Error through border color
                        if (value1.value == "") {
                            value1.style.borderColor = "#fc1919b3"
                        }
                        if (value2.value == "") {
                            value2.style.borderColor = "#fc1919b3"
                        }
                        if (value3.value == "") {
                            value3.style.borderColor = "#fc1919b3"
                        }
                        if (value4.value == "") {
                            value4.style.borderColor = "#fc1919b3"
                        }
                        if (value5.value == "") {
                            value5.style.borderColor = "#fc1919b3"
                        }
                        if (value6.value == "") {
                            value6.style.borderColor = "#fc1919b3"
                        }
                        if (value7.value == "") {
                            value7.style.borderColor = "#fc1919b3"
                        }
                        if (value8.value == "") {
                            value8.style.borderColor = "#fc1919b3"
                        }
                        if (value9.value == "") {
                            value9.style.borderColor = "#fc1919b3"
                        }
                        if (value10.value == "") {
                            value10.style.borderColor = "#fc1919b3"
                        }
                        if (value11.value == "") {
                            value11.style.borderColor = "#fc1919b3"
                        }
                        if (value12.value == "") {
                            value12.style.borderColor = "#fc1919b3"
                        }
                        if (value13.value == "") {
                            value13.style.borderColor = "#fc1919b3"
                        }
                        if (value14.value == "") {
                            value14.style.borderColor = "#fc1919b3"
                        }
                        if (value15.value == "") {
                            value15.style.borderColor = "#fc1919b3"
                        }
                        if (value16.value == "") {
                            value16.style.borderColor = "#fc1919b3"
                        }
                        if (value6.value == "") {
                            value6.style.borderColor = "#fc1919b3"
                        }
                    }

                    // Removing the border color
                    setTimeout(() => {

                        value1.style.borderColor = "rgb(227, 227, 227)"
                        value2.style.borderColor = "rgb(227, 227, 227)"
                        value3.style.borderColor = "rgb(227, 227, 227)"
                        value4.style.borderColor = "rgb(227, 227, 227)"
                        value5.style.borderColor = "rgb(227, 227, 227)"
                        value6.style.borderColor = "rgb(227, 227, 227)"
                        value7.style.borderColor = "rgb(227, 227, 227)"
                        value8.style.borderColor = "rgb(227, 227, 227)"
                        value9.style.borderColor = "rgb(227, 227, 227)"
                        value10.style.borderColor = "rgb(227, 227, 227)"
                        value11.style.borderColor = "rgb(227, 227, 227)"
                        value12.style.borderColor = "rgb(227, 227, 227)"
                        value13.style.borderColor = "rgb(227, 227, 227)"
                        value14.style.borderColor = "rgb(227, 227, 227)"
                        value15.style.borderColor = "rgb(227, 227, 227)"
                        value16.style.borderColor = "rgb(227, 227, 227)"

                        button.disabled = false
                    }, 1500)

                }

            }
        })

    }

    // Getting the Additional-Skills Form
    const additionalSkillsForm = document.querySelector(".additional-skills .forms-content-section .forms-entry .additional-skills-form")
    //
    additionalSkillsForm.addEventListener("submit", goToCareerObjective)

    // Getting the Add Skills Button
    const addSkillButton = additionalSkillsForm.querySelector(".additional-skills-add")
    //
    var skillCount = 3
    addSkillButton.childNodes[1].addEventListener("click", addingMoreSkills)

    // Getting the Back Button of Additional-Skill page
    const additionalSkillsBackButton = additionalSkillsForm.querySelector(".additional-skills-buttons .additional-skills-back-button")
    //
    additionalSkillsBackButton.addEventListener("click", () => {
        window.location.pathname = "/resume-builder/certifications"
    })


    // Getting the values of inputs in Additional-Skills Form
    let skill1 = additionalSkillsForm.querySelector(".skill_1")
    let skill2 = additionalSkillsForm.querySelector(".skill_2")
    let skill3 = additionalSkillsForm.querySelector(".skill_3")
    let skill4 = additionalSkillsForm.querySelector(".skill_4")
    let skill5 = additionalSkillsForm.querySelector(".skill_5")
    let skill6 = additionalSkillsForm.querySelector(".skill_6")
    let skill7 = additionalSkillsForm.querySelector(".skill_7")
    let skill8 = additionalSkillsForm.querySelector(".skill_8")
    let skill9 = additionalSkillsForm.querySelector(".skill_9")
    let skill10 = additionalSkillsForm.querySelector(".skill_10")
    let skill11 = additionalSkillsForm.querySelector(".skill_11")
    let skill12 = additionalSkillsForm.querySelector(".skill_12")
    let skill13 = additionalSkillsForm.querySelector(".skill_13")
    let skill14 = additionalSkillsForm.querySelector(".skill_14")
    let skill15 = additionalSkillsForm.querySelector(".skill_15")
    let skill16 = additionalSkillsForm.querySelector(".skill_16")

    // Checking the number of Skills added
    if (skill1.value != "" || skill2.value != "" || skill3.value != "" || skill4 == "" || skill5 == "" || skill6 == "" || skill7 == "" || skill8 == "" || skill9 == "" || skill10 == "" || skill11 == "" || skill12 == "" || skill13 == "" || skill14 == "" || skill15 == "" || skill16 == "") {

        if (skill4.value != "") {

            // Showing the fourth Skill Input
            skill4.classList.remove("hide")

            skillCount = 4
        }
        if (skill5.value != "") {

            // Showing the fifth Skill Input
            skill5.classList.remove("hide")

            skillCount = 5
        }
        if (skill6.value != "") {

            // Showing the sixth Skill Input
            skill6.classList.remove("hide")

            skillCount = 6
        }
        if (skill7.value != "") {

            // Showing the seventh Skill Input
            skill7.classList.remove("hide")

            skillCount = 7
        }
        if (skill8.value != "") {

            // Showing the eighth Skill Input
            skill8.classList.remove("hide")

            skillCount = 8
        }
        if (skill9.value != "") {

            // Showing the nineth Skill Input
            skill9.classList.remove("hide")

            skillCount = 9
        }
        if (skill10.value != "") {

            // Showing the tenth Skill Input
            skill10.classList.remove("hide")

            skillCount = 10
        }
        if (skill11.value != "") {

            // Showing the eleventh Skill Input
            skill11.classList.remove("hide")

            skillCount = 11
        }
        if (skill12.value != "") {

            // Showing the twelth Skill Input
            skill12.classList.remove("hide")

            skillCount = 12
        }
        if (skill13.value != "") {

            // Showing the thirteenth Skill Input
            skill13.classList.remove("hide")

            skillCount = 13
        }
        if (skill14.value != "") {

            // Showing the fourteenth Skill Input
            skill14.classList.remove("hide")

            skillCount = 14
        }
        if (skill15.value != "") {

            // Showing the fifteenth Skill Input
            skill15.classList.remove("hide")

            skillCount = 15
        }
        if (skill16.value != "") {

            // Showing the sixteenth Skill Input
            skill16.classList.remove("hide")

            skillCount = 16
        }
    }

    // Activating the navbar according to it's class
    if (currentSideNavbarOption.classList[2] == "skills") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)
        // Option-5
        currentSideNavbarOption.classList.add("nav-bar-activated")

        // Progress Bar Percentage
        let width = "63%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    if (currentSideNavbarOption.classList[2] == "objective") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)
        // Option-5
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-6
        currentSideNavbarOption.parentElement.childNodes[11].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[11].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "72%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width

    }

    if (currentSideNavbarOption.classList[2] == "templates") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)
        // Option-5
        currentSideNavbarOption.classList.add("nav-bar-activated")
        // Option-6
        currentSideNavbarOption.parentElement.childNodes[11].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[11].addEventListener("click", navbarLinkActivator)

        // Progress Bar Percentage
        let width = "94%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }
}

if (currentSideNavbarOption.classList[0] == "sixth-link") {

    // Function for checking entries are valid and redirecting to Templates Page
    const goToTemplates = (active) => {

        // Preventing the page from reload
        active.preventDefault()

        // Disabling the submit button after clicked
        let button = document.querySelector(".forms-content-section .career-objective-form .career-objective-continue-button")
        button.disabled = true

        // Checking if the checkbox is selected are not
        let checkBox = document.querySelector(".forms-content-section .career-objective-form .career-objective-checkbox .want_career")

        // Getting the Career-Objective textbox
        let textBox = document.querySelector(".forms-content-section .career-objective-form .objective-section .career_objective")

        if (checkBox.checked == false || textBox.value != "" && checkBox.checked == true) {

            $.ajax({
                type: "POST",
                url: "/resume-builder/career-objective",
                data: {
                    careerobjective: $(".career_objective").val(),
                    csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                },
                success: function (data) {

                    if (data.message[0] == "Success") {

                        // Redirecting to Templates page
                        window.location.pathname = data.message[1]
                        // Enabling the button back
                        button.disabled = false

                    }
                }
            })
        }
        else {

            // Adding error like border color
            textBox.style.borderColor = "#fc1919b3"

            // Removing the border color after 1.5s
            setTimeout(() => {

                textBox.style.borderColor = "rgb(227, 227, 227)"
                button.disabled = false

            }, 1500)
        }
    }

    // Function for showing and skiping the Career-Objective section
    const showingCareerObjectiveSection = (active) => {

        let button = active.target

        if (button.classList[0] == "yes-button") {

            // Hiding the yes or no question and showing the Career-Objective form 
            button.parentElement.parentElement.classList.add("hide")
            button.parentElement.parentElement.nextElementSibling.classList.add("show")

            // Getting the Career Objective Form
            let careerObjectiveForm = document.querySelector(".forms-content-section .career-objective-form")
            //
            careerObjectiveForm.addEventListener("submit", goToTemplates)

            // Creating a function for back button
            let careerObjectiveFormBackButton = careerObjectiveForm.querySelector(".career-objective-back-button")
            //
            careerObjectiveFormBackButton.addEventListener("click", () => {
                window.location.pathname = "/resume-builder/additional-skills"
            })

            // Showing the tip for Career Objective Edit-Section
            let careerTipsSection = document.querySelector(".forms-content-section .forms-tips-preview .tips-advice")
            careerTipsSection.childNodes[5].classList.remove("hide")

            // Hiding the tip for Career Objective Selection-Section
            careerTipsSection.childNodes[3].classList.add("hide")

        }
        if (button.classList[0] == "no-button") {

            setTimeout(() => {
                window.location.pathname = "/resume-builder/templates"
            }, 300)
        }
    }

    // Getting the element of 'yes' button from Career Objective page
    const careerObjectiveYesButton = document.querySelector(".career-objective .forms-content-section .yes-button")
    //
    careerObjectiveYesButton.addEventListener("click", showingCareerObjectiveSection)

    // Getting the element of 'no' button from Career Objective page
    const careerObjectiveNoButton = document.querySelector(".career-objective .forms-content-section .no-button")
    //
    careerObjectiveNoButton.addEventListener("click", showingCareerObjectiveSection)


    // Getting the Career-Objective form's textarea element
    let careerObjectiveText = document.querySelector(".forms-content-section .career-objective-form .objective-section .career_objective")

    // Checking if the fields are not empty
    if (careerObjectiveText.value != "") {

        // Hiding the yes or no question and showing the Career-Objective form 
        careerObjectiveYesButton.parentElement.parentElement.classList.add("hide")
        careerObjectiveYesButton.parentElement.parentElement.nextElementSibling.classList.add("show")

        // Getting the Career Objective Form
        let careerObjectiveForm = document.querySelector(".forms-content-section .career-objective-form")
        //
        careerObjectiveForm.addEventListener("submit", goToTemplates)

        // Creating a function for back button
        let careerObjectiveFormBackButton = careerObjectiveForm.querySelector(".career-objective-back-button")
        //
        careerObjectiveFormBackButton.addEventListener("click", () => {
            window.location.pathname = "/resume-builder/additional-skills"
        })

        // Showing the tip for Career Objective Edit-Section
        let careerTipsSection = document.querySelector(".forms-content-section .forms-tips-preview .tips-advice")
        careerTipsSection.childNodes[5].classList.remove("hide")

        // Hiding the tip for Career Objective Selection-Section
        careerTipsSection.childNodes[3].classList.add("hide")

        // Progress Bar Percentage
        let width = "94%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }

    // Activating the navbar according to it's class
    if (currentSideNavbarOption.classList[2] == "objective") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)
        // Option-5
        currentSideNavbarOption.parentElement.childNodes[9].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[9].addEventListener("click", navbarLinkActivator)
        // Option-6
        currentSideNavbarOption.classList.add("nav-bar-activated")

        // Progress Bar Percentage
        let width = "72%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width

    }

    if (currentSideNavbarOption.classList[2] == "templates") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)
        // Option-5
        currentSideNavbarOption.parentElement.childNodes[9].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[9].addEventListener("click", navbarLinkActivator)
        // Option-6
        currentSideNavbarOption.classList.add("nav-bar-activated")

        // Progress Bar Percentage
        let width = "94%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width

    }
}

if (currentSideNavbarOption.classList[0] == "seventh-link") {

    // Activating the navbar according to it's class
    if (currentSideNavbarOption.classList[2] == "templates") {

        // Option-1
        currentSideNavbarOption.parentElement.childNodes[1].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[1].addEventListener("click", navbarLinkActivator)
        // Option-2
        currentSideNavbarOption.parentElement.childNodes[3].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[3].addEventListener("click", navbarLinkActivator)
        // Option-3
        currentSideNavbarOption.parentElement.childNodes[5].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[5].addEventListener("click", navbarLinkActivator)
        // Option-4
        currentSideNavbarOption.parentElement.childNodes[7].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[7].addEventListener("click", navbarLinkActivator)
        // Option-5
        currentSideNavbarOption.parentElement.childNodes[9].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[9].addEventListener("click", navbarLinkActivator)
        // Option-6
        currentSideNavbarOption.parentElement.childNodes[11].classList.add("nav-bar-activated")
        currentSideNavbarOption.parentElement.childNodes[11].addEventListener("click", navbarLinkActivator)
        // Option-7
        currentSideNavbarOption.classList.add("nav-bar-activated")

        // Progress Bar Percentage
        let width = "94%"
        mainProgressBar.style.width = width
        overallProgress.innerHTML = width
    }
}
// --------------------------------------------------------------------------------------------------------------------------- //


