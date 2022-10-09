/* ------ Script for Resume Builder's home.html ------ */



// Taking the background image's element
const backgroundImage = document.querySelector(".content-slider")

// ------ Function for Changing the Slider Image with respect to time ---------------------------------------------- //

const imageChangerFunction = () => {

    let sliderButtons = document.querySelector(".slider-buttons")

    // Getting the background color of 'sliderButton's' buttons
    let sliderButton1 = window.getComputedStyle(sliderButtons.childNodes[1]).backgroundColor
    let sliderButton2 = window.getComputedStyle(sliderButtons.childNodes[3]).backgroundColor

    if (sliderButton1 == "rgb(0, 18, 25)") {

        // Changing the background color of button
        sliderButtons.childNodes[1].classList.toggle("highlight")
        sliderButtons.childNodes[3].classList.toggle("highlight")

        // Changing the background image
        backgroundImage.classList.replace("content-image-2", "content-image-1")
    }

    if (sliderButton2 == "rgb(0, 18, 25)") {

        // Changing the background color of button
        sliderButtons.childNodes[3].classList.toggle("highlight")
        sliderButtons.childNodes[1].classList.toggle("highlight")

        // Changing the background image
        if (backgroundImage.classList[1] == "content-image-1") {
            backgroundImage.classList.replace("content-image-1", "content-image-2")
        }
        else {
            backgroundImage.classList.toggle("content-image-2")
        }
    }
}

// Function for repeating the imageChangerFunction
var imageChangeTimer = setInterval(imageChangerFunction, 5500)
// ----------------------------------------------------------------------------------------------------------------- //


// ----- Function for Changing the Slider Image relative to left click --------------------------------------------- //
const sliderImageButton = (event) => {

    // Taking the specific element which is clicked 
    let sliderButton = event.target

    // Checking for the clicked button is 'button-1'
    if (sliderButton.className == "button-1") {

        // Changing the background color of button
        sliderButton.classList.toggle("highlight")
        sliderButton2.classList.toggle("highlight")

        // Changing the background image
        if (backgroundImage.classList[1] != "") {

            backgroundImage.classList.toggle("content-image-1")
        }
        if (backgroundImage.classList[1] == "content-image-2") {

            backgroundImage.classList.replace("content-image-2", "content-image-1")
        }
    }


    // Checking for the clicked button is 'button-2'
    if (sliderButton.className == "button-2") {

        // Changing the background color according to the button click
        sliderButton.classList.toggle("highlight")
        sliderButton1.classList.toggle("highlight")

        // Changing the background image
        if (backgroundImage.classList[1] != "") {

            backgroundImage.classList.toggle("content-image-2")
        }
        if (backgroundImage.classList[1] == "content-image-1") {

            backgroundImage.classList.replace("content-image-1", "content-image-2")
        }
    }
}

// Left Button
const sliderButton1 = document.querySelector(".slider-buttons .button-1")
//
sliderButton1.addEventListener("click", sliderImageButton)

// Right Button
const sliderButton2 = document.querySelector(".slider-buttons .button-2")
//
sliderButton2.addEventListener("click", sliderImageButton)
// -------------------------------------------------------------------------------------------------------------- //


// ----- Script for changing the slider-2 images --------------------------------------------------------------- //

// Function for changing the image
const sliderChangeImage = (event) => {

    // Taking the specific element which is clicked 
    let sliderArrow = event.target

    // Getting the sibiling of the arrow buttons
    let sibilings = nextButton.parentElement.childNodes

    // Getting the initial src value of each 'img' element
    let lastImage = sibilings[9].attributes[0].value
    let thirdImage = sibilings[7].attributes[0].value
    let secondImage = sibilings[5].attributes[0].value
    let firstImage = sibilings[3].attributes[0].value

    // Getting image number from src attribute
    let image4Num = parseInt((lastImage.replace("/static/Assets/Images/temp_slider_", "")).replace(".jpg", ""))
    let image3Num = parseInt((thirdImage.replace("/static/Assets/Images/temp_slider_", "")).replace(".jpg", ""))
    let image2Num = parseInt((secondImage.replace("/static/Assets/Images/temp_slider_", "")).replace(".jpg", ""))
    let image1Num = parseInt((firstImage.replace("/static/Assets/Images/temp_slider_", "")).replace(".jpg", ""))

    // Checking for the clicked button is 'next'
    if (sliderArrow.className == "next") {

        setTimeout(() => {

            if (image4Num < 8) {

                // First-Image
                image1Num = image1Num + 1
                sibilings[3].attributes[0].value = `/static/Assets/Images/temp_slider_0${image1Num}.jpg`

                // Second-Image
                image2Num = image2Num + 1
                sibilings[5].attributes[0].value = `/static/Assets/Images/temp_slider_0${image2Num}.jpg`

                // Third-Image
                image3Num = image3Num + 1
                sibilings[7].attributes[0].value = `/static/Assets/Images/temp_slider_0${image3Num}.jpg`

                // Fourth-Image
                image4Num = image4Num + 1
                sibilings[9].attributes[0].value = `/static/Assets/Images/temp_slider_0${image4Num}.jpg`

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
    if (sliderArrow.className == "previous") {

        setTimeout(() => {

            if (image1Num > 1) {

                // First-Image
                image1Num = image1Num - 1
                sibilings[3].attributes[0].value = `/static/Assets/Images/temp_slider_0${image1Num}.jpg`

                // Second-Image
                image2Num = image2Num - 1
                sibilings[5].attributes[0].value = `/static/Assets/Images/temp_slider_0${image2Num}.jpg`

                // Third-Image
                image3Num = image3Num - 1
                sibilings[7].attributes[0].value = `/static/Assets/Images/temp_slider_0${image3Num}.jpg`

                // Fourth-Image
                image4Num = image4Num - 1
                sibilings[9].attributes[0].value = `/static/Assets/Images/temp_slider_0${image4Num}.jpg`

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
const previousButton = document.querySelector(".content.slider-2 .previous")
//
previousButton.addEventListener("click", sliderChangeImage)

// Getting the element of next button
const nextButton = document.querySelector(".content.slider-2 .next")
//
nextButton.addEventListener("click", sliderChangeImage)
// ------------------------------------------------------------------------------------------------------------ //

