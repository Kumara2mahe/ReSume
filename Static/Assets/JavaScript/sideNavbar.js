/* ------ JavaScript for activating the Side-Navbar links and settings the related function for form showing in each page ---*/


import popSignUp from "./logs.js"


// Getting the main element of BuilderTemplate Page
const builderTemplate = document.querySelector(".builder-template")
//
if (builderTemplate != null) {


    // ------ Script for resizing the width of the Side-Navbar, Progress-bar and Dropdowns in the current page's form ---------------- //
    const sidePanelResizer = () => {

        // Getting the width of Side-Panel in the BuilderTemplate Page
        let leftPanelWidth = window.getComputedStyle(sideNavBar.parentElement).width

        // Setting the width of Side-Navbar and Progress-bar as same as its parent element
        sideNavBar.style.width = leftPanelWidth
        progressBar.parentElement.parentElement.style.width = leftPanelWidth

        if (dropdowns.length != 0) {

            // Getting the first adjacent 'input' sibling element of dropdown
            let firstDropInputSibling = dropdowns[0].parentElement.querySelector("input")

            // Getting the visible form on Higher-Education Page
            let higherEd = currentForm.querySelector(".show")

            if (higherEd != null && higherEd.classList[0] == "college_form") {
                firstDropInputSibling = dropdowns[dropdowns.length - 1].parentElement.querySelector("input")
            }

            // Getting the values of width, padding, border from the dropdown's adjacent sibling element
            let inputWidth = Number(window.getComputedStyle(firstDropInputSibling).width.replace("px", ""))
            let inputPadding = Number(window.getComputedStyle(firstDropInputSibling).padding.replace("px", ""))
            let inputBorder = Number(window.getComputedStyle(firstDropInputSibling).borderWidth.replace("px", ""))

            // Setting the new width for all the dropdowns in the current page's form
            dropdowns.forEach((box) => {
                box.style.width = `${inputWidth + (inputPadding * 2) + (inputBorder * 2)}px`
            })
        }
    }
    // ---------------------------------------------------------------------------------------------- //


    // ----- Script for changing the dropdown's selected and unselected option colors --------------------------------- //
    const dropDownStyler = (allDropdowns, placeholders, triggerBy) => {

        if (triggerBy == "onload") {

            for (let i = 0; i < allDropdowns.length; i++) {

                // Setting the default color for selected option in current dropdown menu
                dropDownStyler(allDropdowns[i], placeholders, "bydefault")

                // Setting the default color for all the unselected options in dropdown menu
                allDropdowns[i].querySelectorAll("option:not(:checked)").forEach((option) => {
                    option.style.color = "#000000"
                })
            }
        }
        else {

            // Getting the selected value from the current dropdown
            let selectedOption = allDropdowns.options[allDropdowns.selectedIndex].text

            let optionColor
            for (let i = 0; i < placeholders.length; i++) {

                if (selectedOption != placeholders[i]) {
                    optionColor = "#000000"
                }
                else {
                    optionColor = "#767270"
                    break
                }
            }
            allDropdowns.style.color = optionColor
        }
    }
    // -------------------------------------------------------------------------------------------- //


    // ---- Script for navigating all the pages inside the BuilderTemplate Page by corresponding link in the Side-Navbar --------------- //
    const linkNavigator = (active) => {

        let link = active.target

        if (link.tagName == "SPAN" || link.tagName == "IMG") {
            link = link.parentElement
        }
        setTimeout(() => {

            if (link.classList[0] == "first-link") {
                window.location.pathname = "/builder/personal-details"
            }
            else if (link.classList[0] == "second-link") {
                window.location.pathname = "/builder/years-of-experience"
            }
            else if (link.classList[0] == "third-link") {
                window.location.pathname = "/builder/higher-education"
            }
            else if (link.classList[0] == "fourth-link") {
                window.location.pathname = "/builder/certifications"
            }
            else if (link.classList[0] == "fifth-link") {
                window.location.pathname = "/builder/additional-skills"
            }
            else if (link.classList[0] == "sixth-link") {
                window.location.pathname = "/builder/career-objective"
            }
        }, 200)
    }
    // -------------------------------------------------------------------------------------------- //


    // ---- Script for resizing the height of Form Selection section in Right-Panel -------------------------- //
    const formSelectionResizer = (rightSection, formSelection) => {

        // Showing the Tips & Advice section
        rightSection.querySelector(".tips-button").click()

        // Getting the height of header, footer and BuilderPage's article and also margin of it
        let headerHeight = window.getComputedStyle(document.querySelector("header")).height.replace("px", "")
        let articleMargin = window.getComputedStyle(builderTemplate).marginTop.replace("px", "")
        let formMargin = window.getComputedStyle(rightSection.children[0]).marginTop.replace("px", "")

        // Setting the height of Form Selection section
        formSelection.style.height = `${window.innerHeight - headerHeight - (articleMargin * 2) - (formMargin * 2)}px`
    }
    // -------------------------------------------------------------------------------------------- //


    // ---- Script for Opening a confirmation dialog box to make a 'yes' or 'no' decisions ------------------ //
    const openConfirmation = (redirectTo) => {

        // Script for quitting the BuilderTemplate-Page or closing the confirmation dialog box according to the button click -- //
        let quitOrClose = (active) => {

            let sec = 50
            setTimeout(() => {
                if (active.target.innerHTML == "Yes") {
                    sec = sec * 4

                    if (redirectTo) {
                        window.location.pathname = redirectTo
                    }
                }
                setTimeout(() => {
                    // Closing the confirmation dialog box
                    confirmDialog.classList.remove("show")
                }, sec)
            }, sec)
        }
        // -------------------- //

        // Getting the element of confirmation dialog box and showing it on the screen
        let confirmDialog = currentForm.nextElementSibling
        confirmDialog.classList.add("show")

        // Getting the yes and no buttons from the confirmation dialog box
        let yesButton = confirmDialog.querySelector(".confirm-option .confirm-yes")
        let noButton = confirmDialog.querySelector(".confirm-option .confirm-no")
        //
        yesButton.addEventListener("click", quitOrClose)
        noButton.addEventListener("click", quitOrClose)

        if (!redirectTo) {
            return [yesButton, noButton]
        }
    }
    // ------------------------------------------------------------- //


    // Getting the element of Side-Navbar in the BuilderTemplate Page
    const sideNavBar = builderTemplate.querySelector(".forms-navbar .navbar-names")

    // Getting the element of Progress-bar and its percentage element
    const progressBar = builderTemplate.querySelector(".forms-navbar .form-progress .progress-bar")
    const overallProgress = builderTemplate.querySelector(".forms-navbar .form-progress .progress-percentage")

    // Getting the current page's form
    const currentForm = builderTemplate.querySelector(".forms-content-section .forms-entry form")

    // Getting all the dropdown elements available inside the current page's form
    const dropdowns = currentForm.querySelectorAll("select")

    // Changing the width of the some elements according to the resizing of screen
    window.addEventListener("resize", sidePanelResizer)
    builderTemplate.querySelector(".forms-content-section .forms-tips-preview .tips-button").addEventListener("click", () => {
        setTimeout(sidePanelResizer, 1)
    })
    sidePanelResizer()

    // Getting the parent element of Back & Continue buttons
    const buttonContainer = currentForm.querySelector(".form-buttons")

    // Assigning a dummy variable to hold some data
    let newWidth, activeFormsLinkCount, activeFormLink

    // Activating the relative link of Side-Navbar according to the form visible
    if (currentForm.classList[0] == "personal-details-form") {

        // ---- Script for submitting the data filled in the form through AJAX to validate ------------------- //
        const validatingPersonalDetails = (event, isFirst = false) => {

            // Preventing the page from reload
            event.preventDefault()

            // Disabling the submit button after clicked
            let button = currentForm.querySelector(".form-buttons .continue-button")
            button.disabled = true

            $.ajax({
                type: "POST",
                url: "/builder/personal-details",
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

                success: (data) => {

                    if (data.message[0] == "Verified" && isFirst) {

                        // Opening the SignUp Window with pre-filled email
                        popSignUp(event, currentForm.querySelector(".current_email").value, data.message[1])

                        // Enabling the Submit button back
                        button.disabled = false
                    }
                    else if (data.message[0] == "Verified") {
                        // Redirecting to returned url in the JSON data
                        window.location.pathname = data.message[1]
                    }
                    else {

                        // Getting the element by the name returned in the JSON data
                        let emptyField = currentForm.querySelector(`.${data.message[0]}`)

                        // Scrolling the scrollbar to the position of the element and also showing error by changing the border color
                        document.documentElement.scrollTop = emptyField.scrollHeight
                        emptyField.style.borderColor = "#fc1919b3"

                        // Enabling the Submit button and also Removing the border color indicating field is empty
                        setTimeout(() => {

                            emptyField.removeAttribute("style")
                            button.disabled = false
                        }, 1500)
                    }
                },
                error: () => {
                    window.location.reload()
                }
            })
        }
        // ------------------------------------------------------------- //

        // Assigning the current form concurrent link name to a variable
        activeFormLink = "Contact"

        // Assigning a validator function to change the default behaviour of current form
        currentForm.addEventListener("submit", validatingPersonalDetails)

        if (sideNavBar.previousElementSibling.value == "personal-details") {

            // Active link name & activated link count
            activeFormsLinkCount = 1

            // Progress Bar Percentage
            newWidth = "7%"

            // Getting the element of Sign-Up button from the Menu-bar
            let isSignUpBtn = document.querySelector("header .menubar.nav-links .sign-up")
            if (isSignUpBtn != null) {

                // Re-assigning the validator function with some arguments to change the default behaviour of current form
                currentForm.removeEventListener("submit", validatingPersonalDetails)
                currentForm.addEventListener("submit", (event) => {
                    validatingPersonalDetails(event, true)
                })
            }
        }
        else if (sideNavBar.previousElementSibling.value == "years-of-experience") {

            // Active link name & activated link count
            activeFormsLinkCount = 2

            // Progress Bar Percentage
            newWidth = "10%"
        }
        else if (sideNavBar.previousElementSibling.value == "higher-education") {

            // Active link name & activated link count
            activeFormsLinkCount = 3

            // Progress Bar Percentage
            newWidth = "22%"
        }
        else if (sideNavBar.previousElementSibling.value == "certifications") {

            // Active link name & activated link count
            activeFormsLinkCount = 4

            // Progress Bar Percentage
            newWidth = "59%"
        }
        else if (sideNavBar.previousElementSibling.value == "additional-skills") {

            // Active link name & activated link count
            activeFormsLinkCount = 5

            // Progress Bar Percentage
            newWidth = "63%"
        }
        else {

            // Active link name & activated link count
            activeFormsLinkCount = 6

            // Progress Bar Percentage
            newWidth = (sideNavBar.previousElementSibling.value == "career-objective") ? "72%" : "94%"
        }

        // Getting and setting a quit function to Back button on the current form
        buttonContainer.children[0].addEventListener("click", () => {
            openConfirmation("/builder")
        })
    }

    else if (currentForm.classList[0] == "years-of-experience-form") {

        // ---- Script for Showing/Skipping the Experience section ------------------ //
        const showOrSkipExperience = (event = null) => {

            // --- Script for showing the Experience section ---- //
            const showExperience = (button) => {

                // Hiding the Form Selection section and showing the current form 
                button.parentElement.parentElement.classList.add("hide")
                button.parentElement.parentElement.nextElementSibling.classList.add("show")

                // Hiding the Tips & Advice section
                rightPanel.querySelector(".tips-button").click()

                // Assigning a validator function to change the default behaviour of current form
                currentForm.addEventListener("submit", validatingExperience)

                // Getting and setting a go back function to Back button on the current form
                currentForm.querySelector(".form-buttons .back-button").addEventListener("click", () => {
                    window.location.pathname = "/builder/personal-details"
                })
            }
            // ------------ //

            if (event != null) {

                // Getting the element of choosen option
                let option = event.target

                if (option.classList[0] == "yes-button") {
                    showExperience(option)
                }
                else {
                    setTimeout(() => {
                        window.location.pathname = "/builder/higher-education"
                    }, 300)
                }
            }
            else {
                showExperience(rightPanel.querySelector(".forms-entry .form-selection .show-options .yes-button"))
            }
        }
        // ------------------------------------------------------------- //

        // ---- Script for submitting the data filled in the form through AJAX to validate ------------------- //
        const validatingExperience = (event) => {

            // Preventing the page from reload
            event.preventDefault()

            // Disabling the submit button after clicked
            let button = currentForm.querySelector(".form-buttons .continue-button")
            button.disabled = true

            $.ajax({
                type: "POST",
                url: "/builder/years-of-experience",
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

                success: (data) => {

                    if (data.message[0] == "Notempty") {

                        // Redirecting to experience page
                        window.location.pathname = data.message[1]
                    }
                    else {
                        // Opening a confirmation dialog box to choose to skip the next page or staying in the current page
                        openConfirmation(data.message[1])
                    }

                    // Enabling the Submit button back
                    button.disabled = false
                },
                error: () => {
                    window.location.reload()
                }
            })
        }
        // ------------------------------------------------------------- //

        // Assigning the current form concurrent link name to a variable
        activeFormLink = "Experience"

        // Getting the element of Right-Panel
        const rightPanel = builderTemplate.querySelector(".forms-content-section");
        //
        (() => {

            // Checking for the form is pre-filled or not
            if (currentForm.querySelector(".job_title").value != "" || currentForm.querySelector(".company_name").value != "") {
                showOrSkipExperience()
            }
            else {

                // Showing the Form Selection section
                rightPanel.querySelector(".forms-entry .form-selection").classList.remove("hide")
                window.addEventListener("DOMContentLoaded", () => {

                    // Setting the height of Form Selection section
                    formSelectionResizer(rightPanel, rightPanel.querySelector(".forms-entry .form-selection"))
                })
            }
        })()

        if (sideNavBar.previousElementSibling.value == "years-of-experience") {

            // Active link name & activated link count
            activeFormsLinkCount = 2

            // Progress Bar Percentage
            newWidth = "10%"
        }
        else if (sideNavBar.previousElementSibling.value == "higher-education") {

            // Active link name & activated link count
            activeFormsLinkCount = 3

            // Progress Bar Percentage
            newWidth = "22%"
        }
        else if (sideNavBar.previousElementSibling.value == "certifications") {

            // Active link name & activated link count
            activeFormsLinkCount = 4

            // Progress Bar Percentage
            newWidth = "59%"
        }
        else if (sideNavBar.previousElementSibling.value == "additional-skills") {

            // Active link name & activated link count
            activeFormsLinkCount = 5

            // Progress Bar Percentage
            newWidth = "63%"
        }
        else {

            // Active link name & activated link count
            activeFormsLinkCount = 6

            // Progress Bar Percentage
            newWidth = (sideNavBar.previousElementSibling.value == "career-objective") ? "72%" : "94%"
        }

        // Getting the element of Form Selection section options
        const formSelectionButtons = rightPanel.querySelectorAll(".forms-entry .form-selection .show-options a")
        //
        formSelectionButtons.forEach((button) => {
            button.addEventListener("click", showOrSkipExperience)
        })
    }

    else if (currentForm.classList[0] == "higher-education-form") {

        // ---- Script for showing the School or College Form ------------------ //
        const schoolOrCollegeForm = (request, option, forms = null) => {

            // --- Script for creating Qualification card -------- //
            const qualificationCard = (cardTitle, cardBrief, relForm) => {

                // Creating a new element to place the Qualification as card
                let qualificationCard = document.createElement("div")
                qualificationCard.setAttribute("class", "qualification show")
                option.prepend(qualificationCard)

                // Filling the Qualificatiion card with values from the filled form
                qualificationCard.innerHTML = `<div class="edit-content">
                                                    <h2>${cardTitle}</h2>
                                                    <p>${cardBrief}</p>
                                                </div>
                                                <div class="edit-option">
                                                    <a><img src="/Static/Assets/Images/edit.png"></a>
                                                </div>`

                qualificationCard.querySelector(".edit-option a").addEventListener("click", () => {

                    // Hiding the form edit section
                    currentForm.classList.remove("hide")
                    currentForm.nextElementSibling.classList.remove("show")

                    // Showing the Form in edit mode
                    let formToEdit = rightPanel.querySelector(`.${(relForm.classList[0] == "high-school") ? "college-university" : "high-school"}`)
                    schoolOrCollegeForm("addmore", formToEdit)
                })
            }
            // ------------ //

            // Hiding the Tips & Advice section
            rightPanel.querySelector(".tips-button").click()

            // Getting the element of the form's heading
            let formHeading = currentForm.parentElement.querySelector("h1")

            if (formHeading == null) {

                // Creating a new 'h1' tag to hold the form's heading
                formHeading = document.createElement("h1")
                currentForm.before(formHeading)
            }

            if (request == "onclick" || request == "addmore" && (option.classList[0] == "high-school" || option.classList[0] == "college-university")) {

                // Showing the current form
                option.parentElement.parentElement.nextElementSibling.classList.add("show")
                currentForm.parentElement.removeAttribute("style")

                if (option.classList[0] == "high-school") {

                    // Filling the form heading
                    formHeading.innerHTML = `Add your <span class="mid-blue">High School</span>`

                    // Making the High School Form visible
                    currentForm.children[0].classList.add("show")
                }
                else {
                    // Filling the form heading
                    formHeading.innerHTML = `Add your <span class="mid-blue">College</span> or <span class="mid-blue">University</span>`

                    // Making the College Form visible
                    currentForm.children[1].classList.add("show")

                    // Resizing the dropdowns in the current form
                    sidePanelResizer()
                }

                // Assigning a validator function to change the default behaviour of current form
                currentForm.addEventListener("submit", validatingHigherEducation)

                // Getting and setting a go back function to Back button on the current form
                currentForm.querySelectorAll(".form-buttons .back-button").forEach((button) => {
                    button.addEventListener("click", () => {
                        if (request == "onclick") {
                            window.location.pathname = "/builder/years-of-experience"
                        }
                        else {
                            window.location.reload()
                        }
                    })
                })
            }
            else {
                // Hiding the Form and Showing the form edit section
                option.previousElementSibling.classList.add("hide")
                option.parentElement.classList.add("show")
                option.classList.add("show")

                // Filling the form heading
                formHeading.innerHTML = `Add your <span class="mid-blue">Education</span>`

                // Getting the element of Add Education button
                let addButton = option.querySelector(".add-education span")

                let formOption
                for (let i = 0, title, description; i < forms.length; i++) {

                    if (forms[i].classList[0] == "school_form") {

                        // Getting the values from the filled school form
                        title = forms[i].querySelector(".school_name").value
                        description = `High School Diploma (${forms[i].querySelector(".passed_year").value})`
                        addButton.innerHTML = "Add College"

                        // Assigning the relavent option to HighSchool
                        formOption = rightPanel.querySelector(".college-university")
                    }
                    else if (forms[i].classList[0] == "college_form") {

                        // Getting the values from the filled college form
                        title = forms[i].querySelector(".college_name").value
                        description = `${forms[i].querySelector(".college_degree").value} ${forms[i].querySelector(".college_branch").value} (${forms[i].querySelector(".passed_year").value})`
                        addButton.innerHTML = "Add School"

                        // Assigning the relavent option to College
                        formOption = rightPanel.querySelector(".high-school")
                    }
                    // Creating qualification cards with the values
                    qualificationCard(title, description, formOption)
                }

                // Getting the elements of all qualification cards
                let cards = currentForm.nextElementSibling.querySelectorAll(".qualification")
                if (cards.length < 2) {

                    // Assigning a function to add more education
                    addButton.parentElement.addEventListener("click", () => {

                        // Hiding the form edit section
                        option.previousElementSibling.classList.remove("hide")
                        option.classList.remove("show")

                        // Showing the concurrent Form
                        schoolOrCollegeForm("addmore", formOption)
                    })
                }
                else {
                    // Hiding the Add Education button
                    addButton.parentElement.parentElement.remove()
                }
            }
        }
        // ------------------------------------------------------------- //

        // ---- Script for submitting the data filled in the form through AJAX to validate ------------------- //
        const validatingHigherEducation = (event) => {

            // Preventing the page from reload
            event.preventDefault()

            // Getting the element of current form which the request is submitted
            let higherEd = currentForm.querySelector(".show")

            // Disabling the submit button after clicked
            let button = higherEd.querySelector(".form-buttons .continue-button")
            button.disabled = true

            let submittedData
            if (higherEd.classList[0] == "school_form") {

                // Collecting the data from HighSchool form
                submittedData = {
                    formname: "highschool",
                    name: $(".school_form .school_name").val(),
                    grade: $(".school_form .percent_grade").val(),
                    passedyear: $(".school_form .passed_year").val(),
                    country: $(".school_form .country_name").val(),
                    city: $(".school_form .city_name").val(),
                    csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                }
            }
            else if (higherEd.classList[0] == "college_form") {

                // Collecting the data from HighSchool form
                submittedData = {
                    formname: "college",
                    name: $(".college_form .college_name").val(),
                    grade: $(".college_form .percent_grade").val(),
                    passedyear: $(".college_form .passed_year").val(),
                    degree: $(".college_form .college_degree").val(),
                    branch: $(".college_form .college_branch").val(),
                    country: $(".college_form .country_name").val(),
                    city: $(".college_form .city_name").val(),
                    csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                }
            }

            $.ajax({
                type: "POST",
                url: "/builder/higher-education",
                data: submittedData,

                success: (data) => {

                    if (data.message[0] == "Verified") {

                        // Reloading the page to go to Education Edit section
                        window.location.reload()
                    }
                    else {
                        // Assigning a dict of error message with their respective class names
                        const emptyDataDict = {
                            "highschool": {
                                "emptyname": "school_name",
                                "emptyyear": "passed_year"
                            },
                            "college": {
                                "emptyname": "college_name",
                                "emptyyear": "passed_year",
                                "emptydegree": "college_degree",
                                "emptybranch": "college_branch"
                            },
                        }

                        // Getting the element by the name returned in the JSON data
                        let class_name = emptyDataDict[data.message[1]][data.message[0]]
                        let emptyField = higherEd.querySelector(`.${class_name}`)

                        // Scrolling the scrollbar to the position of the element and also showing error by changing the border color
                        document.documentElement.scrollTop = emptyField.scrollHeight
                        emptyField.style.borderColor = "#fc1919b3"

                        // Enabling the Submit button and also Removing the border color indicating field is empty
                        setTimeout(() => {

                            if (emptyField.tagName != "SELECT") {
                                emptyField.removeAttribute("style")
                            }
                            else {
                                emptyField.style.borderColor = ""
                            }
                            button.disabled = false
                        }, 1500)
                    }
                },
                error: () => {
                    window.location.reload()
                }
            })
        }
        // ------------------------------------------------------------- //

        // Assigning the current form concurrent link name to a variable
        activeFormLink = "Education"

        if (sideNavBar.previousElementSibling.value == "higher-education") {

            // Active link name & activated link count
            activeFormsLinkCount = 3

            // Progress Bar Percentage
            newWidth = "22%"
        }

        // Getting the element of Right-Panel
        const rightPanel = builderTemplate.querySelector(".forms-content-section");
        //
        (() => {

            // Getting the element of Selected Form
            let editORselection = currentForm.parentElement

            // Getting the elements of HighSchool & College Forms
            let highschoolDAT = [currentForm.querySelector(".school_form")]
            highschoolDAT.push(currentForm.querySelector(".school_form .school_name"))
            highschoolDAT.push(currentForm.querySelector(".school_form .passed_year"))
            //
            let collegeDAT = [currentForm.querySelector(".college_form")]
            collegeDAT.push(currentForm.querySelector(".college_form .college_name"))
            collegeDAT.push(currentForm.querySelector(".college_form .passed_year"))
            collegeDAT.push(currentForm.querySelector(".college_form .college_degree"))
            collegeDAT.push(currentForm.querySelector(".college_form .college_branch"))

            // Checking for the form in current page is pre-filled or not
            if ((highschoolDAT[1].value != "" || highschoolDAT[2].value != "Passed Out Year*") && (collegeDAT[1].value != "" || collegeDAT[2].value != "Passed Out Year*" || collegeDAT[3].value != "" || collegeDAT[4].value != "")) {
                schoolOrCollegeForm("onload", currentForm.nextElementSibling, [highschoolDAT[0], collegeDAT[0]])

                // Progress Bar Percentage
                newWidth = "55%"
            }
            else if (highschoolDAT[1].value != "" || highschoolDAT[2].value != "Passed Out Year*") {
                schoolOrCollegeForm("onload", currentForm.nextElementSibling, [highschoolDAT[0]])

                // Progress Bar Percentage
                newWidth = "51%"
            }
            else if (collegeDAT[1].value != "" || collegeDAT[2].value != "Passed Out Year*" || collegeDAT[3].value != "" || collegeDAT[4].value != "") {
                schoolOrCollegeForm("onload", currentForm.nextElementSibling, [collegeDAT[0]])

                // Progress Bar Percentage
                newWidth = "51%"
            }
            else {
                // Showing the Form Selection section
                rightPanel.querySelector(".forms-entry .form-selection").classList.remove("hide")
                editORselection = rightPanel.querySelector(".forms-entry .form-selection")
            }
            window.addEventListener("DOMContentLoaded", () => {

                // Setting the height of Form Selection or Form Edit section
                formSelectionResizer(rightPanel, editORselection)
            })
        })();

        if (sideNavBar.previousElementSibling.value == "certifications") {

            // Active link name & activated link count
            activeFormsLinkCount = 4

            // Progress Bar Percentage
            newWidth = "59%"
        }
        else if (sideNavBar.previousElementSibling.value == "additional-skills") {

            // Active link name & activated link count
            activeFormsLinkCount = 5

            // Progress Bar Percentage
            newWidth = "63%"
        }
        else if (sideNavBar.previousElementSibling.value == "career-objective" || sideNavBar.previousElementSibling.value == "choose-templates") {

            // Active link name & activated link count
            activeFormsLinkCount = 6

            // Progress Bar Percentage
            newWidth = (sideNavBar.previousElementSibling.value == "career-objective") ? "72%" : "94%"
        }

        // Getting the element of Form Selection section options
        const formSelectionButtons = rightPanel.querySelectorAll(".forms-entry .form-selection .show-options a")
        //
        formSelectionButtons.forEach((button) => {
            button.addEventListener("click", () => {

                // Hiding the Form Selection section & showing the current form
                button.parentElement.parentElement.classList.add("hide")
                schoolOrCollegeForm("onclick", button)
            })
        })
    }

    else if (currentForm.classList[0] == "certifications-form" || currentForm.classList[0] == "additional-skills-form") {

        // ----- Script for adding more skills / certificates ------------------ //
        const addMoreInput = () => {

            // Disabling the add skill / certificate function
            addMoreButton.removeEventListener("click", addMoreInput)

            // Getting the element of last skill / certificate input and spliting its placeholder text
            let lastInput = currentForm.querySelector(".skills-container .skill:last-child")
            let placeholder = lastInput.getAttribute("placeholder").split("#")

            // Cloning the element of last skill / certificate input
            let newInput = lastInput.cloneNode()
            lastInput.after(newInput)

            // Adding/Modifiying multiple attributes to a single Element
            Object.assign(newInput, { value: "", placeholder: `${placeholder[0]}#${Number(placeholder[1]) + 1}`, style: "" })

            // Enabling the add skill / certificate function back
            setTimeout(() => {
                addMoreButton.addEventListener("click", addMoreInput)
            }, 800)

        }
        // ------------------------------------------------------------- //

        // ---- Script for submitting the data filled in the form through AJAX to validate ------------------- //
        const validatingCurrentForm = (event) => {

            // --- Script for styling the empty inputs ----------- //
            const emptyInputStyler = (emptyInputs) => {

                for (let j = 0, emptyCount = emptyInputs.length; j < emptyCount; j++) {

                    // Getting the empty input from empty list
                    let emptyField = emptyInputs[j]

                    // Scrolling the scrollbar to the position of the element and also showing error by changing the border color
                    document.documentElement.scrollTop = emptyField.scrollHeight
                    emptyField.style.borderColor = "#fc1919b3"

                    // Removing the border color indicating all the empty fields
                    setTimeout(() => {
                        emptyField.removeAttribute("style")
                    }, 1500)
                }
            }
            // ---------- //

            // Preventing the page from reload
            event.preventDefault()

            // Disabling the submit button after clicked
            let button = currentForm.querySelector(".form-buttons .continue-button")
            button.disabled = true

            // Getting the element of Tips Button
            let tipsButtonElement = builderTemplate.querySelector(".forms-content-section .tips-button")

            // Getting all the elements of inputs containing skills / certificates
            let allInputs = currentForm.querySelectorAll(".skills-container .skill")
            //
            let filledData = [], emptyInputs = []
            for (let i = 0, certiCount = allInputs.length; i < certiCount; i++) {

                if (allInputs[i].value == "") {

                    // Adding the element of empty input to a 'error' list
                    emptyInputs.push(allInputs[i])

                    if (currentForm.classList[0] == "additional-skills-form" && i >= 0 && i <= 2) {

                        // Calling the function to style the empty inputs
                        emptyInputStyler(emptyInputs)

                        // Emptying the 'data' list
                        filledData = []
                    }
                }
                else {

                    // Filling the 'data' list with the values from non-empty inputs
                    filledData.push(allInputs[i].value)
                    //
                    if (emptyInputs.length > 0) {

                        // Calling the function to style the empty inputs
                        emptyInputStyler(emptyInputs)

                        // Emptying the 'data' list
                        filledData = []
                    }
                }
            }

            if (currentForm.classList[0] == "certifications-form" && (filledData.length > 0 || allInputs.length == emptyInputs.length) ||
                (currentForm.classList[0] == "additional-skills-form" && filledData.length > 2)) {

                $.ajax({
                    type: "POST",
                    url: `${currentForm.classList[0].split("-form")[0]}`,
                    data: {
                        skills: filledData,
                        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                    },
                    success: (data) => {

                        // Redirecting to additional-skills page
                        window.location.pathname = data.message[1]
                    },
                    error: () => {
                        window.location.reload()
                    }
                })
            }
            else {

                // Showing the Tips & Advice section
                tipsButtonElement.click()

                // Enabling the Submit button again
                setTimeout(() => {

                    // Hiding the Tips & Advice section
                    tipsButtonElement.click()
                    button.disabled = false
                }, 1500)
            }
        }
        // ------------------------------------------------------------- //

        // Assigning the current form concurrent link name to a variable
        activeFormLink = (currentForm.classList[0] == "certifications-form") ? "Certifications" : "Additional Skills"

        if (sideNavBar.previousElementSibling.value == "certifications") {

            // Active link name & activated link count
            activeFormsLinkCount = 4

            // Progress Bar Percentage
            newWidth = "59%"
        }
        else if (sideNavBar.previousElementSibling.value == "additional-skills") {

            // Active link name & activated link count
            activeFormsLinkCount = 5

            // Progress Bar Percentage
            newWidth = "63%"
        }
        else {

            // Active link name & activated link count
            activeFormsLinkCount = 6

            // Progress Bar Percentage
            newWidth = (sideNavBar.previousElementSibling.value == "career-objective") ? "72%" : "94%"
        }

        // Getting the element of add more button
        const addMoreButton = currentForm.querySelector(".add-more a")
        //
        addMoreButton.addEventListener("click", addMoreInput)

        // Assigning a validator function to change the default behaviour of current form
        currentForm.addEventListener("submit", validatingCurrentForm)

        // Setting the go back function to Back button on the current form
        buttonContainer.children[0].addEventListener("click", (event) => {

            if (currentForm.classList[0] == "certifications-form") {
                window.location.pathname = "builder/higher-education"
            }
            else {
                window.location.pathname = "builder/certifications"
            }
        })
    }

    else if (currentForm.classList[0] == "career-objective-form") {

        // ---- Script for Showing/Skipping the Career-Objective section ------------------ //
        const showOrSkipObjective = (event = null) => {

            // --- Script for showing the Career-Objective section ---- //
            const showCareerObjective = (button) => {

                // Hiding the Form Selection section and showing the current form 
                button.parentElement.parentElement.classList.add("hide")
                button.parentElement.parentElement.nextElementSibling.classList.add("show")

                if (event != null) {
                    currentForm.querySelector(".show_objective").checked = true
                }

                // Getting the element of Tips & Advice button
                let tips_adviceButton = rightPanel.querySelector(".tips-button")

                // Changing the content inside tip & advice section
                tips_adviceButton.nextElementSibling.querySelector(".selection-tip").classList.add("hide")
                tips_adviceButton.nextElementSibling.querySelector(".objective-tip").classList.remove("hide")

                // Hiding the Tips & Advice section
                tips_adviceButton.click()

                // Assigning a validator function to change the default behaviour of current form
                currentForm.addEventListener("submit", validatingObjective)

                // Getting and setting a go back function to Back button on the current form
                currentForm.querySelector(".form-buttons .back-button").addEventListener("click", () => {
                    window.location.pathname = "/builder/additional-skills"
                })
            }
            // ------------ //

            if (event != null) {

                // Getting the element of choosen option
                let option = event.target

                if (option.classList[0] == "yes-button") {
                    showCareerObjective(option)
                }
                else {
                    setTimeout(() => {
                        window.location.pathname = "/builder/choose-templates"
                    }, 300)
                }
            }
            else {
                showCareerObjective(rightPanel.querySelector(".forms-entry .form-selection .show-options .yes-button"))
            }
        }
        // ------------------------------------------------------------- //

        // ---- Script for validating the submitted form to send the data through AJAX ------------------- //
        const validatingObjective = (event) => {

            // --- Script for submitting the data filled in the form through AJAX ------------ //
            const dataSubmitter = (submit) => {

                if (submit) {

                    $.ajax({
                        type: "POST",
                        url: "/builder/career-objective",
                        data: {
                            careerobjective: $(".career_objective").val(),
                            showobjective: $(".show_objective").is(":checked"),
                            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                        },

                        success: (data) => {

                            // Redirecting to Choose-Templates page
                            window.location.pathname = data.message[1]
                        },
                        error: () => {
                            window.location.reload()
                        }
                    })
                }
            }

            // Preventing the page from reload
            event.preventDefault()

            // Disabling the submit button after clicked
            let button = currentForm.querySelector(".form-buttons .continue-button")
            button.disabled = true

            // Getting the elements of the inputs of current form
            let textBox = currentForm.querySelector(".career_objective")
            let checkBox = currentForm.querySelector(".show_objective").checked

            if (checkBox && textBox.value == "") {

                // Scrolling the scrollbar to the position of the element and also showing error by changing the border color
                document.documentElement.scrollTop = textBox.scrollHeight
                textBox.style.borderColor = "#fc1919b3"

                // Removing the border color indicating the field is empty
                setTimeout(() => {
                    textBox.removeAttribute("style")
                }, 1500)
            }
            else if (!checkBox) {

                // Opening a confirmation dialog box to submit the incomplete form or staying in the current page
                let options = openConfirmation(false)
                //
                options.forEach((item) => {
                    item.addEventListener("click", () => {
                        dataSubmitter((item.innerHTML == "Yes" ? true : false))
                    })
                })
            }
            else {
                dataSubmitter(true)
            }

            // Enabling the Submit button again
            setTimeout(() => {
                button.disabled = false
            }, 1500)
        }
        // ------------------------------------------------------------- //

        // Assigning the current form concurrent link name to a variable
        activeFormLink = "Career Objective"

        // Getting the element of Right-Panel
        const rightPanel = builderTemplate.querySelector(".forms-content-section");
        //
        (() => {

            // Checking for the form is pre-filled or not
            if (currentForm.querySelector(".career_objective").value != "") {
                showOrSkipObjective()
            }
            else {

                // Showing the Form Selection section
                rightPanel.querySelector(".forms-entry .form-selection").classList.remove("hide")
                window.addEventListener("DOMContentLoaded", () => {

                    // Setting the height of Form Selection section
                    formSelectionResizer(rightPanel, rightPanel.querySelector(".forms-entry .form-selection"))
                })
            }
        })()

        // Active link name & activated link count
        activeFormsLinkCount = 6

        // Progress Bar Percentage
        newWidth = (sideNavBar.previousElementSibling.value == "career-objective") ? "72%" : "94%"

        // Getting the element of Form Selection section options
        const formSelectionButtons = rightPanel.querySelectorAll(".forms-entry .form-selection .show-options a")
        //
        formSelectionButtons.forEach((button) => {
            button.addEventListener("click", showOrSkipObjective)
        })
    }

    // Updating the value of Progress-bar slider and its percentage element
    progressBar.children[0].style.width = newWidth
    overallProgress.innerHTML = newWidth

    // Activating the Side-Navbar links according to the form filled & visible
    for (let i = 0; i < activeFormsLinkCount; i++) {
        sideNavBar.children[i].classList.add("nav-bar-activated")
        if (sideNavBar.children[i].children[1].innerHTML == activeFormLink) {
            sideNavBar.children[i].classList.add("nav-bar-active")
        }
        else {
            sideNavBar.children[i].addEventListener("click", linkNavigator)
        }
    }

    if (dropdowns.length != 0) {

        // Assigning the default values of all the dropdowns available in the form
        const defaultValues = ["Country",
            "Start Month",
            "Start Year",
            "End Month",
            "End Year",
            "Passed Out Year*"
        ]

        // Iterating through each dropdown element and assigning a function to it
        dropdowns.forEach((drop) => {
            drop.addEventListener("change", () => {
                dropDownStyler(drop, defaultValues, "onchange")
            })
        })

        // Calling the funtion to style the dropdown's selected and unselected options in the form
        dropDownStyler(dropdowns, defaultValues, "onload")
    }
}
