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

    // Gettings the element of clicked arrow and disabling it
    let arrow = event.target
    arrow.removeEventListener("click", sliderChangeImage)

    // Getting the element of each visible image
    let visibleImages = thumbContainer.querySelectorAll("img.show")
    let lenImages = visibleImages.length

    let oppArrow, nextImage
    setTimeout(() => {

        // Checking the clicked button is 'next'
        if (arrow.classList[0] == "next" && arrow.classList[1] != "disabled-arrow") {

            if (lenImages > 1) {
                for (let i = 0; i < lenImages; i++) {

                    if (i == 0) {
                        visibleImages[i].style.width = 0
                        visibleImages[i].classList.remove("show")
                    }
                    else if (i == lenImages - 1) {
                        visibleImages[i].nextElementSibling.removeAttribute("style")
                        visibleImages[i].nextElementSibling.classList.add("show")
                    }
                }
                // Setting the element of next image in list from left
                nextImage = visibleImages[lenImages - 1].nextElementSibling.nextElementSibling
            }
            else {
                visibleImages[0].style.width = 0
                visibleImages[0].classList.remove("show")
                visibleImages[0].nextElementSibling.removeAttribute("style")
                visibleImages[0].nextElementSibling.classList.add("show")

                // Setting the element of next image in list from left
                nextImage = visibleImages[0].nextElementSibling.nextElementSibling
            }
            // Setting the element of non-clicked arrow
            oppArrow = previousButton
        }

        // Checking the clicked button is 'previous'
        else if (arrow.classList[0] == "previous" && arrow.classList[1] != "disabled-arrow") {

            if (lenImages > 1) {
                for (let i = 0; i < lenImages; i++) {

                    if (i == 0) {
                        visibleImages[i].previousElementSibling.removeAttribute("style")
                        visibleImages[i].previousElementSibling.classList.add("show")
                    }
                    else if (i == lenImages - 1) {
                        visibleImages[i].style.width = 0
                        visibleImages[i].classList.remove("show")
                    }
                }
            }
            else {
                visibleImages[0].previousElementSibling.removeAttribute("style")
                visibleImages[0].previousElementSibling.classList.add("show")
                visibleImages[0].style.width = 0
                visibleImages[0].classList.remove("show")
            }
            // Setting the element of next image in list from right and non-clicked arrow
            nextImage = visibleImages[0].previousElementSibling.previousElementSibling
            oppArrow = nextButton
        }
        // Enabling the another arrow if disabled
        oppArrow.classList.remove("disabled-arrow")
        oppArrow.addEventListener("click", sliderChangeImage)

        // Enabling or Disabling the clicked arrow according to the presence of next image in list
        if (nextImage == null) {
            arrow.classList.add("disabled-arrow")
        }
        else {
            arrow.classList.remove("disabled-arrow")
            arrow.addEventListener("click", sliderChangeImage)
        }
    }, 150)
}

// Getting the element of next & previous button
const previousButton = document.querySelector(".middle-imageslider .previous")
const nextButton = document.querySelector(".middle-imageslider .next")

// Getting the element of Thumbnail-Container in the Home-Page
const thumbContainer = document.querySelector(".middle-imageslider .images-section .thumb-container")
//
if (thumbContainer != null) {

    // Disabling the arrow buttons
    nextButton.classList.add("disabled-arrow")
    previousButton.classList.add("disabled-arrow")

    window.addEventListener("DOMContentLoaded", () => {

        // Getting all the 'img' elements inside the Thumbnail-Container
        const thumbImages = Array.from(thumbContainer.querySelectorAll("img"))
        const thumblen = thumbImages.length

        // Getting the screen width & calculating the position of the image to split the Thumbnail-Container
        const screenWidth = window.outerWidth
        const splitThumb = Math.round(thumblen / 2)

        let pos1, pos2
        switch (true) {
            case (screenWidth >= 1300 && screenWidth <= 1900):
                pos1 = splitThumb - 2
                pos2 = splitThumb + 2
                break
            case (screenWidth >= 900 && screenWidth <= 1299):
                pos1 = splitThumb - 2
                pos2 = splitThumb + 1
                break
            case (screenWidth >= 540 && screenWidth <= 899):
                pos1 = splitThumb - 1
                pos2 = splitThumb + 1
                break
            case (screenWidth <= 539):
                pos1 = splitThumb - 1
                pos2 = splitThumb
                break
            default:
                pos1 = splitThumb - 3
                pos2 = splitThumb + 3
        }

        // Splitting the 'img' elements inside the Thumbnail-Container into separate arrays
        let leftImages = thumbImages.slice(0, pos1)
        let visibleImages = thumbImages.slice(pos1, pos2)
        let rightImages = thumbImages.slice(pos2)

        for (let i = 0, j = 0, vlen = visibleImages.length - 1; i < thumblen; i++) {

            if (visibleImages.includes(thumbImages[i])) {

                // Making some of the images in Thumbnail-Container visible
                thumbImages[i].classList.add("show")

                if (vlen != 0 && j == 0 && thumbImages[i].previousElementSibling != null) {
                    previousButton.addEventListener("click", sliderChangeImage)
                    previousButton.classList.remove("disabled-arrow")
                }
                else if (vlen != 0 && j == vlen && thumbImages[i].nextElementSibling != null) {
                    nextButton.addEventListener("click", sliderChangeImage)
                    nextButton.classList.remove("disabled-arrow")
                }
                else if (vlen == 0) {
                    if (thumbImages[i].previousElementSibling != null) {
                        previousButton.addEventListener("click", sliderChangeImage)
                        previousButton.classList.remove("disabled-arrow")
                    }
                    if (thumbImages[i].nextElementSibling != null) {
                        nextButton.addEventListener("click", sliderChangeImage)
                        nextButton.classList.remove("disabled-arrow")
                    }
                }
                j++
            }
            else if (leftImages.includes(thumbImages[i])) {
                thumbImages[i].style.width = 0
            }
            else if (rightImages.includes(thumbImages[i])) {
                thumbImages[i].style.width = 0
            }
        }
    })
}
// ------------------------------------------------------------------------------------------------------------ //