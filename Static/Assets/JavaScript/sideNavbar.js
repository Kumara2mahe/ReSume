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
                window.location.pathname = "/resume-builder/personal-details"
            }
            else if (link.classList[0] == "second-link") {
                window.location.pathname = "/resume-builder/years-of-experience"
            }
            else if (link.classList[0] == "third-link") {
                window.location.pathname = "/resume-builder/higher-education"
            }
            else if (link.classList[0] == "fourth-link") {
                window.location.pathname = "/resume-builder/certifications"
            }
            else if (link.classList[0] == "fifth-link") {
                window.location.pathname = "/resume-builder/additional-skills"
            }
            else if (link.classList[0] == "sixth-link") {
                window.location.pathname = "/resume-builder/career-objective"
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
        const validatingPersonalDetails = (event, firstTime = false) => {

            // Preventing the page from reload
            event.preventDefault()

            // Disabling the submit button after clicked
            let button = currentForm.querySelector(".form-buttons .continue-button")
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

                success: (data) => {

                    if (data.message[0] == "Verified" && firstTime) {

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
                        let emptyField

                        if (data.message[0] == "fName") {
                            emptyField = currentForm.querySelector(".first_name")
                        }
                        else if (data.message[0] == "lName") {
                            emptyField = currentForm.querySelector(".last_name")
                        }
                        else if (data.message[0] == "Email") {
                            emptyField = currentForm.querySelector(".current_email")
                        }

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

        if (sideNavBar.previousElementSibling.value == "personal") {

            // Active link name & activated link count
            activeFormsLinkCount = 1

            // Progress Bar Percentage
            newWidth = "7%"

            // Re-assigning the validator function with some arguments to change the default behaviour of current form
            currentForm.removeEventListener("submit", validatingPersonalDetails)
            currentForm.addEventListener("submit", (event) => {
                validatingPersonalDetails(event, true)
            })
        }
        else if (sideNavBar.previousElementSibling.value == "experience") {

            // Active link name & activated link count
            activeFormsLinkCount = 2

            // Progress Bar Percentage
            newWidth = "10%"
        }
        else if (sideNavBar.previousElementSibling.value == "education") {

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
        else if (sideNavBar.previousElementSibling.value == "skills") {

            // Active link name & activated link count
            activeFormsLinkCount = 5

            // Progress Bar Percentage
            newWidth = "63%"
        }
        else {

            // Active link name & activated link count
            activeFormsLinkCount = 6

            // Progress Bar Percentage
            newWidth = (sideNavBar.previousElementSibling.value == "objective") ? "72%" : "94%"
        }

        // Getting and setting a quit function to Back button on the current form
        buttonContainer.children[0].addEventListener("click", () => {
            openConfirmation("/resume-builder")
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
                    window.location.pathname = "/resume-builder/personal-details"
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
                        window.location.pathname = "/resume-builder/higher-education"
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

        if (sideNavBar.previousElementSibling.value == "experience") {

            // Active link name & activated link count
            activeFormsLinkCount = 2

            // Progress Bar Percentage
            newWidth = "10%"
        }
        else if (sideNavBar.previousElementSibling.value == "education") {

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
        else if (sideNavBar.previousElementSibling.value == "skills") {

            // Active link name & activated link count
            activeFormsLinkCount = 5

            // Progress Bar Percentage
            newWidth = "63%"
        }
        else {

            // Active link name & activated link count
            activeFormsLinkCount = 6

            // Progress Bar Percentage
            newWidth = (sideNavBar.previousElementSibling.value == "objective") ? "72%" : "94%"
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
                                                    <a><img src="/static/Assets/Images/edit.png"></a>
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
                            window.location.pathname = "/resume-builder/years-of-experience"
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

            let submittedData, emptyDataDict
            if (higherEd.classList[0] == "school_form") {

                // Collecting the data from HighSchool form
                submittedData = {
                    schoolform: "school",
                    schoolname: $(".school_form .school_name").val(),
                    schoolpercentage: $(".school_form .percent_grade").val(),
                    schoolpassedyear: $(".school_form .passed_year").val(),
                    schoolcountry: $(".school_form .country_name").val(),
                    schoolcity: $(".school_form .city_name").val(),
                    csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                }

                // Assigning a dict of error message with their respective class names
                emptyDataDict = {
                    "emptyname": "school_name",
                    "emptyyear": "passed_year"
                }
            }
            else if (higherEd.classList[0] == "college_form") {

                // Collecting the data from HighSchool form
                submittedData = {
                    collegeform: "college",
                    collegename: $(".college_form .college_name").val(),
                    collegepercentage: $(".college_form .percent_grade").val(),
                    collegepassedyear: $(".college_form .passed_year").val(),
                    collegedegree: $(".college_form .college_degree").val(),
                    collegebranch: $(".college_form .college_branch").val(),
                    collegecountry: $(".college_form .country_name").val(),
                    collegecity: $(".college_form .city_name").val(),
                    csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                }

                // Assigning a dict of error message with their respective class names
                emptyDataDict = {
                    "emptyname": "college_name",
                    "emptyyear": "passed_year",
                    "emptydegree": "college_degree",
                    "emptybranch": "college_branch"
                }
            }

            $.ajax({
                type: "POST",
                url: "/resume-builder/higher-education",
                data: submittedData,

                success: (data) => {

                    if (data.message[0] == "Notempty") {

                        // Reloading the page to go to Education Edit section
                        window.location.reload()
                    }
                    else {
                        // Getting the element by the name returned in the JSON data
                        let class_name = emptyDataDict[data.message[0]]
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

        if (sideNavBar.previousElementSibling.value == "education") {

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
        else if (sideNavBar.previousElementSibling.value == "skills") {

            // Active link name & activated link count
            activeFormsLinkCount = 5

            // Progress Bar Percentage
            newWidth = "63%"
        }
        else if (sideNavBar.previousElementSibling.value == "objective" || sideNavBar.previousElementSibling.value == "templates") {

            // Active link name & activated link count
            activeFormsLinkCount = 6

            // Progress Bar Percentage
            newWidth = (sideNavBar.previousElementSibling.value == "objective") ? "72%" : "94%"
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

    else if (currentForm.classList[0] == "certifications-form") {

        // Function for adding More Certificate Inputs
        const addingMoreCertificates = () => {

            let count = ++certiCount

            // Getting the certificate input section
            let certificateInputSection = currentForm.querySelector(".skills-container")

            if (count <= 6) {
                // Showing the new certificate input on screen
                let newCertificate = certificateInputSection.querySelector(`.certification_${count}`)
                newCertificate.classList.remove("hide")
            }
            else {
                addMoreButton.classList.add("hide")
                addMoreButton.nextElementSibling.classList.remove("hide")
                setTimeout(() => {
                    addMoreButton.nextElementSibling.remove()
                    addMoreButton.remove()
                }, 1300)
            }
        }

        // Function for checking entries are valid and redirecting to Additional Skills Page
        const goToAdditionalSkills = (active) => {

            // Preventing the page from reload
            active.preventDefault()

            // Disabling the submit button after clicked
            let button = currentForm.querySelector(".form-buttons .continue-button")
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
                        let value1 = currentForm.querySelector(".certification_1")
                        let value2 = currentForm.querySelector(".certification_2")
                        let value3 = currentForm.querySelector(".certification_3")
                        let value4 = currentForm.querySelector(".certification_4")
                        let value5 = currentForm.querySelector(".certification_5")
                        let value6 = currentForm.querySelector(".certification_6")

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

        // Assigning the current form concurrent link name to a variable
        activeFormLink = "Certifications"

        if (sideNavBar.previousElementSibling.value == "certifications") {

            // Active link name & activated link count
            activeFormsLinkCount = 4

            // Progress Bar Percentage
            newWidth = "59%"
        }
        else if (sideNavBar.previousElementSibling.value == "skills") {

            // Active link name & activated link count
            activeFormsLinkCount = 5

            // Progress Bar Percentage
            newWidth = "63%"
        }
        else {

            // Active link name & activated link count
            activeFormsLinkCount = 6

            // Progress Bar Percentage
            newWidth = (sideNavBar.previousElementSibling.value == "objective") ? "72%" : "94%"
        }

        var certiCount = 1
        // Getting the element of add more button
        const addMoreButton = currentForm.querySelector(".add-more a")
        //
        addMoreButton.addEventListener("click", addingMoreCertificates)

        // Assigning a validator function to change the default behaviour of current form
        currentForm.addEventListener("submit", goToAdditionalSkills)

        // Getting the Back Button of Certifications page
        const certiifcationsBackButton = currentForm.querySelector(".form-buttons .back-button")
        //
        certiifcationsBackButton.addEventListener("click", () => {
            window.location.pathname = "/resume-builder/higher-education"
        })

        // Getting the values inputs in Certificates Form
        let certificate_1 = currentForm.querySelector(".certification_1")
        let certificate_2 = currentForm.querySelector(".certification_2")
        let certificate_3 = currentForm.querySelector(".certification_3")
        let certificate_4 = currentForm.querySelector(".certification_4")
        let certificate_5 = currentForm.querySelector(".certification_5")
        let certificate_6 = currentForm.querySelector(".certification_6")

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
    }

    else if (currentForm.classList[0] == "additional-skills-form") {

        // Function for adding More Skills Inputs
        const addingMoreSkills = () => {

            let count = ++skillCount

            // Showing the new Skill input on screen
            let newSkill = currentForm.querySelector(`.skills-container .skill_${count}`)
            //
            newSkill.classList.remove("hide")
            if (count >= 16) {
                addMoreButton.removeEventListener("click", addingMoreSkills)
                addMoreButton.remove()
            }
        }

        // Function for checking entries are valid and redirecting to Career Objective Page
        const goToCareerObjective = (active) => {

            // Preventing the page from reload
            active.preventDefault()

            // Disabling the submit button after clicked
            let button = currentForm.querySelector(".form-buttons .continue-button")
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

                        let value1 = currentForm.querySelector(".skill_1")
                        let value2 = currentForm.querySelector(".skill_2")
                        let value3 = currentForm.querySelector(".skill_3")
                        let value4 = currentForm.querySelector(".skill_4")
                        let value5 = currentForm.querySelector(".skill_5")
                        let value6 = currentForm.querySelector(".skill_6")
                        let value7 = currentForm.querySelector(".skill_7")
                        let value8 = currentForm.querySelector(".skill_8")
                        let value9 = currentForm.querySelector(".skill_9")
                        let value10 = currentForm.querySelector(".skill_10")
                        let value11 = currentForm.querySelector(".skill_11")
                        let value12 = currentForm.querySelector(".skill_12")
                        let value13 = currentForm.querySelector(".skill_13")
                        let value14 = currentForm.querySelector(".skill_14")
                        let value15 = currentForm.querySelector(".skill_15")
                        let value16 = currentForm.querySelector(".skill_16")

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

                            addMoreButton.nextElementSibling.classList.remove("hide")

                            setTimeout(() => {
                                addMoreButton.nextElementSibling.classList.add("hide")
                            }, 1300)
                        }

                        else if (data.message[0] == "Error") {

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
        // Assigning the current form concurrent link name to a variable
        activeFormLink = "Additional Skills"

        if (sideNavBar.previousElementSibling.value == "skills") {

            // Active link name & activated link count
            activeFormsLinkCount = 5

            // Progress Bar Percentage
            newWidth = "63%"
        }
        else {

            // Active link name & activated link count
            activeFormsLinkCount = 6

            // Progress Bar Percentage
            newWidth = (sideNavBar.previousElementSibling.value == "objective") ? "72%" : "94%"
        }

        var skillCount = 3
        // Getting the element of add more button
        const addMoreButton = currentForm.querySelector(".add-more a")
        //
        addMoreButton.addEventListener("click", addingMoreSkills)

        // Assigning a validator function to change the default behaviour of current form
        currentForm.addEventListener("submit", goToCareerObjective)

        // Getting the Back Button of Additional-Skill page
        const additionalSkillsBackButton = currentForm.querySelector(".form-buttons .back-button")
        //
        additionalSkillsBackButton.addEventListener("click", () => {
            window.location.pathname = "/resume-builder/certifications"
        })

        // Getting the values of inputs in Additional-Skills Form
        let skill1 = currentForm.querySelector(".skill_1")
        let skill2 = currentForm.querySelector(".skill_2")
        let skill3 = currentForm.querySelector(".skill_3")
        let skill4 = currentForm.querySelector(".skill_4")
        let skill5 = currentForm.querySelector(".skill_5")
        let skill6 = currentForm.querySelector(".skill_6")
        let skill7 = currentForm.querySelector(".skill_7")
        let skill8 = currentForm.querySelector(".skill_8")
        let skill9 = currentForm.querySelector(".skill_9")
        let skill10 = currentForm.querySelector(".skill_10")
        let skill11 = currentForm.querySelector(".skill_11")
        let skill12 = currentForm.querySelector(".skill_12")
        let skill13 = currentForm.querySelector(".skill_13")
        let skill14 = currentForm.querySelector(".skill_14")
        let skill15 = currentForm.querySelector(".skill_15")
        let skill16 = currentForm.querySelector(".skill_16")

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
                    window.location.pathname = "/resume-builder/additional-skills"
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
                        window.location.pathname = "/resume-builder/templates"
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
                        url: "/resume-builder/career-objective",
                        data: {
                            careerobjective: $(".career_objective").val(),
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
        newWidth = (sideNavBar.previousElementSibling.value == "objective") ? "72%" : "94%"

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
