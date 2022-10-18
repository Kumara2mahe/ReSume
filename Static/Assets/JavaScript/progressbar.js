/* ------ Script for Resume Builder's (Builder-Page) Progressbar loader and for resizing the article element as well ------ */



// ----------- Script for resizing the BuilderPage article element according to the screen size --------------------------------- //
const resizeArticle = () => {

    // Getting the height of header, footer and BuilderPage's article and also margin of it
    let headerHeight = window.getComputedStyle(document.querySelector("header")).height.replace("px", "")
    let footerHeight = window.getComputedStyle(document.querySelector("footer")).height.replace("px", "")
    let articleHeight = window.getComputedStyle(builderArticle).height.replace("px", "")
    let articleMargin = window.getComputedStyle(builderArticle).marginTop.replace("px", "")

    if (window.innerHeight > (window.outerHeight / 2) && articleHeight < window.innerHeight) {

        // Setting the new height of article element
        builderArticle.style.height = `${window.innerHeight - headerHeight - (articleMargin * 2) - footerHeight}px`
    }
}

// Getting the article element from the BuilderPage
const builderArticle = document.querySelector("article.builder")
//
if (builderArticle != null) {
    window.addEventListener("resize", resizeArticle)
    resizeArticle()
}


// ---------- Script for showing and triggering the loading animation of Progress-bar ---------------------------------- //
const showProgressBar = () => {

    // ------ Script for loading the Progress-bar from 0 to 100% by increasing it's width ------- //
    const startProgress = () => {

        // Checking for the width of Progress-bar's slider element is greater than or equal
        if (sliderWidth >= 100) {

            // Stopping the loading of Progress-bar
            clearInterval(load)

            // Redirecting to the Builder's first formpage
            setTimeout(() => {

                // Submitting the form to trigger a POST request to the url specified on it
                beginForm.submit()
                setTimeout(() => {

                    // Hiding the Progress-bar
                    progressSlider.parentElement.parentElement.classList.remove("run")
                    progressSlider.parentElement.classList.remove("run")
                    progressSlider.classList.remove("run")
                    // Showing the Begin form
                    beginForm.classList.remove("hide")

                    // Reseting the Progress-bar's slider width back to default
                    progressSlider.style.width = "4%"
                }, 200)

            }, 100)
        }
        else {

            if (sliderWidth > 80) {
                sliderWidth++
                sliderWidth++
            }
            else {
                sliderWidth++
            }
            // Assigning the new computed width to the Progress-bar's slider element
            progressSlider.style.width = sliderWidth + "%"
        }
    }

    // Showing the Progress-bar
    progressSlider.parentElement.parentElement.classList.add("run")
    progressSlider.parentElement.classList.add("run")
    progressSlider.classList.add("run")

    // Getting the Progress-bar's slider width value as integer
    let sliderWidth = window.getComputedStyle(progressSlider).width.replace("px", "")

    // Calling the function to load the Progress-bar with particular time interval
    let load = setInterval(startProgress, 20)
}

// Getting the element of Progress-bar's slider from the BuildPage
const progressSlider = document.querySelector(".builder .progress-bar .bar")
// Getting the element of Begin form from the BuildPage
const beginForm = document.querySelector(".builder .continue-button form")
//
if (progressSlider != null && beginForm != null) {

    // Getting the height of Begin form container
    let beginContainHeight = window.getComputedStyle(beginForm.parentElement).height.replace("px", "")

    beginForm.addEventListener("submit", (e) => {

        // Preventing the page from reloading
        e.preventDefault()

        // Getting the screen width and setting it as value of input
        beginForm.children[1].value = window.outerWidth

        // Setting the height of Progress-bar
        progressSlider.parentElement.parentElement.style.height = `${beginContainHeight}px`

        setTimeout(() => {

            // Hiding the Begin form and calling the function to show and trigger the loading animation of Progress-bar
            beginForm.classList.add("hide")
            setTimeout(showProgressBar, 200)
        }, 200)
    })
}
// ------------------------------------------------------------------------------------------------------------------------------------- //