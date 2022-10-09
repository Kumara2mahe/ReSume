/*--- JavaScript for tips section and dropdown boxes ---*/



// ------------------- Hover and click function for the tips  buttons -------------------------------------------------------------------- //

const changeHoveringImage = (active) => {

    // Getting the current button which has focus
    let button = active.target

    // Getting current button's img-src
    let buttonImage = button.childNodes[0].getAttribute("src")

    // Confirming is a tips button
    if (button.className == "tips-button") {

        // Function for Mouse Hovering Style
        const buttonHoverStyle1 = () => {

            // Changing the image
            button.childNodes[0].setAttribute("src", "/static/Assets/Images/tips_02.png")

            // Changing the text color
            button.childNodes[2].style.color = "#007BFF"
        }

        // Function for Mouse Leaving Style
        const buttonHoverStyle2 = () => {

            // Changing the image
            button.childNodes[0].setAttribute("src", "/static/Assets/Images/tips_01.png")

            // Changing the text color
            button.childNodes[2].style.color = "#FFA500"
        }

        // Function for Hiding the Tips section
        const hideTipsSection = () => {

            button.removeEventListener("click", hideTipsSection)

            if (button.parentElement.childNodes[3].classList[1] == "show") {
                button.parentElement.childNodes[3].classList.toggle("show")
                buttonHoverStyle2()
            }
            else {
                button.parentElement.childNodes[3].classList.toggle("show")
                buttonHoverStyle1()
            }

            setTimeout(() => {
                button.addEventListener("click", hideTipsSection)
            }, 400)

        }

        button.addEventListener("click", hideTipsSection)

        if (buttonImage == "/static/Assets/Images/tips_01.png") {

            buttonHoverStyle1()
        }
        if (buttonImage == "/static/Assets/Images/tips_02.png") {

            buttonHoverStyle2()
        }
    }
}

// Getting the Tips 's element
const tips = document.querySelector(".forms-tips-preview .tips-button")
//
tips.addEventListener("mouseenter", changeHoveringImage)
tips.addEventListener("mouseleave", changeHoveringImage)

// ------------------------------------------------------------------------------------------------------------------------------------ //



// -------------------- Hovering style for the Education section' high-school or college selection button ----------------------------- //

// Function for showing Highschool form
const showHighSchoolForm = () => {

    // Hiding the School or College selection buttons
    schoolSelectionButton.parentElement.parentElement.classList.add("hide")

    //Showing the HighSchool form section
    schoolSelectionButton.parentElement.parentElement.parentElement.childNodes[3].classList.add("show")

}

// Function for showing College form
const showCollegeForm = () => {

    // Hiding the School or College selection buttons
    collegeSelectionButton.parentElement.parentElement.classList.add("hide")

    //Showing the College form section
    collegeSelectionButton.parentElement.parentElement.parentElement.childNodes[5].classList.add("show")

    // Showing the tip for College Form Section
    let collegeTip = document.querySelector(".higher-education .forms-tips-preview .tips-advice.show .college-tip")
    collegeTip.classList.add("show")
}


// Function for changing button image while leaving the button after hovering
const educationLeavingImageChanger = (active) => {

    // Getting the active element
    let button = active.target

    if (button.classList[0] == "high-school") {

        button.childNodes[1].childNodes[1].setAttribute("src", "/static/Assets/Images/school_01.png")

        // Changing the text color and border color relative to the image
        button.style.color = "#FFA500"
        button.style.borderColor = "rgba(255, 165, 0, 0.5)"
    }

    if (button.classList[0] == "college-university") {

        button.childNodes[1].childNodes[1].setAttribute("src", "/static/Assets/Images/university_01.png")

        // Changing the text color and border color relative to the image
        button.style.color = "#FFA500"
        button.style.borderColor = "rgba(255, 165, 0, 0.5)"
    }
}


// Function for changing button image while hovering
const educationHoveringImageChanger = (active) => {

    // Getting the active element
    let button = active.target

    if (button.classList[0] == "high-school") {

        button.childNodes[1].childNodes[1].setAttribute("src", "/static/Assets/Images/school_02.png")

        // Changing the text color and border color relative to the image
        button.style.color = "rgb(14, 121, 0)"
        button.style.borderColor = "rgba(14, 121, 0, 0.5)"
    }

    if (button.classList[0] == "college-university") {

        button.childNodes[1].childNodes[1].setAttribute("src", "/static/Assets/Images/university_02.png")

        // Changing the text color and border color relative to the image
        button.style.color = "rgb(14, 121, 0)"
        button.style.borderColor = "rgba(14, 121, 0, 0.5)"
    }

}

// Getting the high school and college button's element
const schoolSelectionButton = document.querySelector(".higher-education .forms-content-section .selection-section .high-school")
//
const collegeSelectionButton = document.querySelector(".higher-education .forms-content-section .selection-section .college-university")

if (collegeSelectionButton != null && schoolSelectionButton != null) {

    // Mouse Enter
    schoolSelectionButton.addEventListener("mouseover", educationHoveringImageChanger)
    collegeSelectionButton.addEventListener("mouseover", educationHoveringImageChanger)

    // Mouse Leave
    schoolSelectionButton.addEventListener("mouseleave", educationLeavingImageChanger)
    collegeSelectionButton.addEventListener("mouseleave", educationLeavingImageChanger)

    // Mouse Click
    schoolSelectionButton.addEventListener("click", showHighSchoolForm)
    collegeSelectionButton.addEventListener("click", showCollegeForm)
}


// -------------------- Changing the current_country dropdown box color in personal-details page when selected ------------------------ //
const currentCountryDropDown = document.querySelector(".forms-content-section .forms-entry .personal-details-form select")

if (currentCountryDropDown != null) {

    const changeDropDownColor = () => {

        let selectedOption = currentCountryDropDown.options[currentCountryDropDown.selectedIndex].text

        if (selectedOption != "Country") {
            currentCountryDropDown.style.color = "black"
        }
    }
    currentCountryDropDown.addEventListener("click", changeDropDownColor)

    let preSelectedOption = currentCountryDropDown.options[currentCountryDropDown.selectedIndex].text

    // Default color for unselected dropdown menu
    if (preSelectedOption != "Country") {
        currentCountryDropDown.style.color = "black"
    }
    if (preSelectedOption == "Country") {
        currentCountryDropDown.style.color = "#918C89"
    }

    // Default color for options in dropdown menu
    let countries = currentCountryDropDown.querySelectorAll("option:not(:checked)")

    countries.forEach((option) => {
        option.style.color = "black"
    })
}
// --------------------------------------------------------------------------------------------------------------------------- //


// -------------------- Changing the country_name dropdown box color in years-of-experience page when selected ------------------------ //
const countryNameDropDown = document.querySelector(".forms-content-section .forms-entry .years-of-experience-form .country_name")

if (countryNameDropDown != null) {

    const changeDropDownColor = () => {

        let selectedOption = countryNameDropDown.options[countryNameDropDown.selectedIndex].text

        if (selectedOption != "Country") {
            countryNameDropDown.style.color = "black"
        }
    }
    countryNameDropDown.addEventListener("click", changeDropDownColor)

    let preSelectedOption = countryNameDropDown.options[countryNameDropDown.selectedIndex].text

    // Default color for unselected dropdown menu
    if (preSelectedOption != "Country") {
        countryNameDropDown.style.color = "black"
    }
    if (preSelectedOption == "Country") {
        countryNameDropDown.style.color = "#918C89"
    }

    // Default color for options in dropdown menu
    let countries = countryNameDropDown.querySelectorAll("option:not(:checked)")

    countries.forEach((option) => {
        option.style.color = "black"
    })
}


// -------------------- Changing the start_month DropDown box color in years-of-experience page when selected ------------------------ //

const startMonthDropDown = document.querySelector(".forms-content-section .forms-entry .years-of-experience-form .start_month")

if (startMonthDropDown != null) {

    const changeDropDownColor = () => {

        let selectedOption = startMonthDropDown.options[startMonthDropDown.selectedIndex].text

        if (selectedOption != "Start Month") {
            startMonthDropDown.style.color = "black"
        }
    }
    startMonthDropDown.addEventListener("click", changeDropDownColor)

    let preSelectedOption = startMonthDropDown.options[startMonthDropDown.selectedIndex].text

    // Default color for unselected dropdown menu
    if (preSelectedOption != "Start Month") {
        startMonthDropDown.style.color = "black"
    }
    if (preSelectedOption == "Start Month") {
        startMonthDropDown.style.color = "#918C89"
    }

    // Default color for options in dropdown menu
    let months = startMonthDropDown.querySelectorAll("option:not(:checked)")

    months.forEach((option) => {
        option.style.color = "black"
    })
}
// --------------------------------------------------------------------------------------------------------------------------- //


// -------------------- Changing the end_month DropDown box color in years-of-experience page when selected ------------------------ //

const endMonthDropDown = document.querySelector(".forms-content-section .forms-entry .years-of-experience-form .end_month")

if (endMonthDropDown != null) {

    const changeDropDownColor = () => {

        let selectedOption = endMonthDropDown.options[endMonthDropDown.selectedIndex].text

        if (selectedOption != "End Month") {
            endMonthDropDown.style.color = "black"
        }
    }
    endMonthDropDown.addEventListener("click", changeDropDownColor)

    let preSelectedOption = endMonthDropDown.options[endMonthDropDown.selectedIndex].text

    // Default color for unselected dropdown menu
    if (preSelectedOption != "End Month") {
        endMonthDropDown.style.color = "black"
    }
    if (preSelectedOption == "End Month") {
        endMonthDropDown.style.color = "#918C89"
    }

    // Default color for options in dropdown menu
    let months = endMonthDropDown.querySelectorAll("option:not(:checked)")

    months.forEach((option) => {
        option.style.color = "black"
    })
}
// --------------------------------------------------------------------------------------------------------------------------- //


// -------------------- Changing the start_year DropDown box color in years-of-experience page when selected ------------------------ //

const startYearDropDown = document.querySelector(".forms-content-section .forms-entry .years-of-experience-form .start_year")

if (startYearDropDown != null) {

    const changeDropDownColor = () => {

        let selectedOption = startYearDropDown.options[startYearDropDown.selectedIndex].text

        if (selectedOption != "Start Year") {
            startYearDropDown.style.color = "black"
        }
    }
    startYearDropDown.addEventListener("click", changeDropDownColor)

    let preSelectedOption = startYearDropDown.options[startYearDropDown.selectedIndex].text

    // Default color for unselected dropdown menu
    if (preSelectedOption != "Start Year") {
        startYearDropDown.style.color = "black"
    }
    if (preSelectedOption == "Start Year") {
        startYearDropDown.style.color = "#918C89"
    }

    // Default color for options in dropdown menu
    let years = startYearDropDown.querySelectorAll("option:not(:checked)")

    years.forEach((option) => {
        option.style.color = "black"
    })
}
// --------------------------------------------------------------------------------------------------------------------------- //



// -------------------- Changing the end_year DropDown box color in years-of-experience page when selected ------------------------ //

const endYearDropDown = document.querySelector(".forms-content-section .forms-entry .years-of-experience-form .end_year")

if (endYearDropDown != null) {

    const changeDropDownColor = () => {

        let selectedOption = endYearDropDown.options[endYearDropDown.selectedIndex].text

        if (selectedOption != "End Year") {
            endYearDropDown.style.color = "black"
        }
    }
    endYearDropDown.addEventListener("click", changeDropDownColor)

    let preSelectedOption = endYearDropDown.options[endYearDropDown.selectedIndex].text

    // Default color for unselected dropdown menu
    if (preSelectedOption != "End Year") {
        endYearDropDown.style.color = "black"
    }
    if (preSelectedOption == "End Year") {
        endYearDropDown.style.color = "#918C89"
    }

    // Default color for options in dropdown menu
    let years = endYearDropDown.querySelectorAll("option:not(:checked)")

    years.forEach((option) => {
        option.style.color = "black"
    })
}
// --------------------------------------------------------------------------------------------------------------------------- //



// -------------------- Changing the school_country DropDown box color in higher-education-highschool form when selected ------------------------ //

const schoolCountryDropDown = document.querySelector(".forms-content-section .forms-entry .higher-education-highschool-form .school_country")

if (schoolCountryDropDown != null) {

    const changeDropDownColor = () => {

        let selectedOption = schoolCountryDropDown.options[schoolCountryDropDown.selectedIndex].text

        if (selectedOption != "Country") {
            schoolCountryDropDown.style.color = "black"
        }
    }
    schoolCountryDropDown.addEventListener("click", changeDropDownColor)

    let preSelectedOption = schoolCountryDropDown.options[schoolCountryDropDown.selectedIndex].text

    // Default color for unselected dropdown menu
    if (preSelectedOption != "Country") {
        schoolCountryDropDown.style.color = "black"
    }
    if (preSelectedOption == "Country") {
        schoolCountryDropDown.style.color = "#918C89"
    }

    // Default color for options in dropdown menu
    let years = schoolCountryDropDown.querySelectorAll("option:not(:checked)")

    years.forEach((option) => {
        option.style.color = "black"
    })
}
// --------------------------------------------------------------------------------------------------------------------------- //



// -------------------- Changing the school_passedyear DropDown box color in higher-education-highschool form when selected ------------------------ //

const passedYearDropDown = document.querySelector(".forms-content-section .forms-entry .higher-education-highschool-form .school_passedyear")

if (passedYearDropDown != null) {

    const changeDropDownColor = () => {

        let selectedOption = passedYearDropDown.options[passedYearDropDown.selectedIndex].text

        if (selectedOption != "Passed Out Year*") {
            passedYearDropDown.style.color = "black"
        }
    }
    passedYearDropDown.addEventListener("click", changeDropDownColor)

    let preSelectedOption = passedYearDropDown.options[passedYearDropDown.selectedIndex].text

    // Default color for unselected dropdown menu
    if (preSelectedOption != "Passed Out Year*") {
        passedYearDropDown.style.color = "black"
    }
    if (preSelectedOption == "Passed Out Year*") {
        passedYearDropDown.style.color = "#918C89"
    }

    // Default color for options in dropdown menu
    let years = passedYearDropDown.querySelectorAll("option:not(:checked)")

    years.forEach((option) => {
        option.style.color = "black"
    })
}
// --------------------------------------------------------------------------------------------------------------------------- //



// -------------------- Changing the college_passedyear DropDown box color in higher-education-college form when selected ------------------------ //

const passedCollegeYearDropDown = document.querySelector(".forms-content-section .forms-entry .higher-education-college-form .college_passedyear")

if (passedCollegeYearDropDown != null) {

    const changeDropDownColor = () => {

        let selectedOption = passedCollegeYearDropDown.options[passedCollegeYearDropDown.selectedIndex].text

        if (selectedOption != "Passed Out Year*") {
            passedCollegeYearDropDown.style.color = "black"
        }
    }
    passedCollegeYearDropDown.addEventListener("click", changeDropDownColor)

    let preSelectedOption = passedCollegeYearDropDown.options[passedCollegeYearDropDown.selectedIndex].text

    // Default color for unselected dropdown menu
    if (preSelectedOption != "Passed Out Year*") {
        passedCollegeYearDropDown.style.color = "black"
    }
    if (preSelectedOption == "Passed Out Year*") {
        passedCollegeYearDropDown.style.color = "#918C89"
    }

    // Default color for options in dropdown menu
    let years = passedCollegeYearDropDown.querySelectorAll("option:not(:checked)")

    years.forEach((option) => {
        option.style.color = "black"
    })
}
// --------------------------------------------------------------------------------------------------------------------------- //



// -------------------- Changing the college_country DropDown box color in higher-education-college form when selected ------------------------ //

const collegeCountryDropDown = document.querySelector(".forms-content-section .forms-entry .higher-education-college-form .college_country")

if (collegeCountryDropDown != null) {

    const changeDropDownColor = () => {

        let selectedOption = collegeCountryDropDown.options[collegeCountryDropDown.selectedIndex].text

        if (selectedOption != "Country") {
            collegeCountryDropDown.style.color = "black"
        }
    }
    collegeCountryDropDown.addEventListener("click", changeDropDownColor)

    let preSelectedOption = collegeCountryDropDown.options[collegeCountryDropDown.selectedIndex].text

    // Default color for unselected dropdown menu
    if (preSelectedOption != "Country") {
        collegeCountryDropDown.style.color = "black"
    }
    if (preSelectedOption == "Country") {
        collegeCountryDropDown.style.color = "#918C89"
    }

    // Default color for options in dropdown menu
    let years = collegeCountryDropDown.querySelectorAll("option:not(:checked)")

    years.forEach((option) => {
        option.style.color = "black"
    })
}
// --------------------------------------------------------------------------------------------------------------------------- //
