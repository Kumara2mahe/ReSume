/* ------ Script for Resume Builder's (Home & About -Page) ------ */



// Taking the background image's element
const backgroundImage = document.querySelector(".content-slider")
const aboutTitleSection = document.querySelector(".aboutpage .main-title")

// ------ Function for Changing the Slider Image with respect to time ---------------------------------------------- //
const imageChangerFunction = () => {

    let sliderButtons = document.querySelector(".slider-buttons")

    // Getting the background color of 'sliderButtons's' buttons
    let sliderButton1 = window.getComputedStyle(sliderButtons.childNodes[1]).backgroundColor
    let sliderButton2 = window.getComputedStyle(sliderButtons.childNodes[3]).backgroundColor

    // Setting the previous image as background for the ImageSlider
    backgroundImage.parentElement.style.background = `${window.getComputedStyle(backgroundImage).backgroundImage} no-repeat top/cover`

    if (sliderButton1 == "rgb(0, 18, 25)") {

        // Changing the background color of button
        sliderButtons.childNodes[1].classList.toggle("highlight")
        sliderButtons.childNodes[3].classList.toggle("highlight")

        // Changing the background image
        backgroundImage.classList.replace("slider-2", "slider-1")
    }
    if (sliderButton2 == "rgb(0, 18, 25)") {

        // Changing the background color of button
        sliderButtons.childNodes[3].classList.toggle("highlight")
        sliderButtons.childNodes[1].classList.toggle("highlight")

        // Changing the background image
        if (backgroundImage.classList[1] == "slider-1") {
            backgroundImage.classList.replace("slider-1", "slider-2")
        }
        else {
            backgroundImage.classList.toggle("slider-2")
        }
    }
}

let imageChangeTimer
if (backgroundImage != null) {

    // Assigning a function for automatically Changing the Slider Image after 5 seconds
    imageChangeTimer = setInterval(imageChangerFunction, 5500)
}
else if (aboutTitleSection != null) {

    // Getting the About-page title's background image container
    const aboutBgImage = aboutTitleSection.querySelector(".bg-image")

    // Changing the About-page title's background image for the first time
    aboutBgImage.classList.add("initial")

    // Fading in image
    aboutBgImage.style.animation = "bGfade-in 2s both"

    // Script for Automatically changing the About-page title's background image
    setInterval(() => {

        // Getting the current class of image
        let className = aboutBgImage.classList[1]

        // Fading out image
        aboutBgImage.style.animation = "bGfade-out 3s both"
        setTimeout(() => {

            // Changing the background image
            if (className == "initial") {
                aboutBgImage.classList.replace(className, "after")
            }
            else if (className == "after") {
                aboutBgImage.classList.replace(className, "initial")
            }
            else {
                aboutBgImage.classList.replace(className, "initial")
            }
            // Fading in image
            aboutBgImage.style.animation = "bGfade-in 2s both"
        }, 1800)

    }, 8000)
}
// ----------------------------------------------------------------------------------------------------------------- //


// ----- Function for Changing the Slider Image relative to left click --------------------------------------------- //
const sliderImageButton = (event) => {

    // Taking the specific element which is clicked 
    let sliderButton = event.target

    // Re-setting the timer on the automatic ImageSlider
    clearInterval(imageChangeTimer)
    imageChangeTimer = setInterval(imageChangerFunction, 5500)

    // Setting the previous image as background for the ImageSlider
    backgroundImage.parentElement.style.background = `${window.getComputedStyle(backgroundImage).backgroundImage} no-repeat top/cover`

    // Checking for the clicked button is 'button-1'
    if (sliderButton.className == "button-1") {

        // Changing the background color of button
        sliderButton.classList.toggle("highlight")
        sliderButton2.classList.toggle("highlight")

        // Changing the background image
        if (backgroundImage.classList[1] != "") {
            backgroundImage.classList.toggle("slider-1")
        }
        if (backgroundImage.classList[1] == "slider-2") {
            backgroundImage.classList.replace("slider-2", "slider-1")
        }
    }
    // Checking for the clicked button is 'button-2'
    else if (sliderButton.className == "button-2") {

        // Changing the background color according to the button click
        sliderButton.classList.toggle("highlight")
        sliderButton1.classList.toggle("highlight")

        // Changing the background image
        if (backgroundImage.classList[1] != "") {
            backgroundImage.classList.toggle("slider-2")
        }
        if (backgroundImage.classList[1] == "slider-1") {
            backgroundImage.classList.replace("slider-1", "slider-2")
        }
    }
}

// Left Button
const sliderButton1 = document.querySelector(".slider-buttons .button-1")
//
if (sliderButton1 != null) {
    sliderButton1.addEventListener("click", sliderImageButton)
}
// Right Button
const sliderButton2 = document.querySelector(".slider-buttons .button-2")
//
if (sliderButton2 != null) {
    sliderButton2.addEventListener("click", sliderImageButton)
}
// -------------------------------------------------------------------------------------------------------------- //


// ----- Script for changing the Middle Slider images --------------------------------------------------------------- //

// Function for changing the image
const sliderChangeImage = (event) => {

    // Taking the specific element which is clicked 
    let sliderArrow = event.target

    // Getting the sibiling of the arrow buttons
    let sibilings = nextButton.parentElement.childNodes

    // Getting the initial src value of each 'img' element
    let lastImage = sibilings[9].attributes[0].value.split("_")
    let thirdImage = sibilings[7].attributes[0].value.split("_")
    let secondImage = sibilings[5].attributes[0].value.split("_")
    let firstImage = sibilings[3].attributes[0].value.split("_")

    // Getting image number from src attribute
    let image4Num = parseInt(lastImage.pop().replace(".jpg", ""))
    let image3Num = parseInt(thirdImage.pop().replace(".jpg", ""))
    let image2Num = parseInt(secondImage.pop().replace(".jpg", ""))
    let image1Num = parseInt(firstImage.pop().replace(".jpg", ""))

    // Checking for the clicked button is 'next'
    if (sliderArrow.className == "next") {

        setTimeout(() => {

            if (image4Num < 8) {

                // First-Image
                image1Num = image1Num + 1
                sibilings[3].attributes[0].value = `${firstImage.join("_")}_0${image1Num}.jpg`

                // Second-Image
                image2Num = image2Num + 1
                sibilings[5].attributes[0].value = `${secondImage.join("_")}_0${image2Num}.jpg`

                // Third-Image
                image3Num = image3Num + 1
                sibilings[7].attributes[0].value = `${thirdImage.join("_")}_0${image3Num}.jpg`

                // Fourth-Image
                image4Num = image4Num + 1
                sibilings[9].attributes[0].value = `${lastImage.join("_")}_0${image4Num}.jpg`

                if (image4Num == 8) {
                    sliderArrow.disabled = true
                    sliderArrow.classList.toggle("disabled-arrow")
                }
                else {
                    previousButton.disabled = false
                    if (previousButton.classList[1] == "disabled-arrow") {
                        previousButton.classList.remove("disabled-arrow")
                    }
                }
            }
        }, 300)
    }
    // Checking for the clicked button is 'previous'
    else if (sliderArrow.className == "previous") {

        setTimeout(() => {

            if (image1Num > 1) {

                // First-Image
                image1Num = image1Num - 1
                sibilings[3].attributes[0].value = `${firstImage.join("_")}_0${image1Num}.jpg`

                // Second-Image
                image2Num = image2Num - 1
                sibilings[5].attributes[0].value = `${secondImage.join("_")}_0${image2Num}.jpg`

                // Third-Image
                image3Num = image3Num - 1
                sibilings[7].attributes[0].value = `${thirdImage.join("_")}_0${image3Num}.jpg`

                // Fourth-Image
                image4Num = image4Num - 1
                sibilings[9].attributes[0].value = `${lastImage.join("_")}_0${image4Num}.jpg`

                if (image1Num == 1) {

                    sliderArrow.disabled = true
                    sliderArrow.classList.toggle("disabled-arrow")
                }
                else {
                    nextButton.disabled = false
                    if (nextButton.classList[1] == "disabled-arrow") {
                        nextButton.classList.remove("disabled-arrow")
                    }
                }
            }
        }, 300)
    }
}

// Getting the element of previous button
const previousButton = document.querySelector(".middle-imageslider .previous")
//
if (previousButton != null) {
    previousButton.addEventListener("click", sliderChangeImage)
}

// Getting the element of next button
const nextButton = document.querySelector(".middle-imageslider .next")
//
if (nextButton != null) {
    nextButton.addEventListener("click", sliderChangeImage)
}
// ------------------------------------------------------------------------------------------------------------ //