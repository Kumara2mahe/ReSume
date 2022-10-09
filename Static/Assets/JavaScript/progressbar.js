/*--- JavaScript for loading a progress bar ---*/



// Function for creating a animation for loading the progress bar
const loading = () => {

    // Getting the progressbar's slider element and it's width
    let progressBar = document.querySelector(".getting-started .progress-bar .bar")
    let barWidth = window.getComputedStyle(progressBar).width

    // Taking only the integer and neglecting the string from the width value
    barWidth = barWidth.replace("px", "")

    // Function for loading the progressbar from 0 to 100% by increasing it's width
    const loadingBar = () => {

        if (barWidth >= 100) {
            clearInterval(load)

            // Redirecting the screen
            setTimeout(() => {
                window.location.pathname = "/resume-builder/personal-details"

                setTimeout(() => {

                    // Hiding the progress bar
                    progressBarElement.parentElement.parentElement.classList.remove("run")
                    progressBarElement.parentElement.classList.remove("run")
                    progressBarElement.classList.remove("run")
                    // Showing the begin button
                    beginButton.parentElement.classList.remove("hide")

                    // Reseting the progressbar
                    progressBar.style.width = "4%"
                }, 100)

            }, 100)
        }
        else {

            if (barWidth > 80) {
                barWidth++
                barWidth++
            }
            else {
                barWidth++
            }

            // Assigning the new computed width to the progressbar's slider element
            progressBar.style.width = barWidth + "%"
        }
    }
    let load = setInterval(loadingBar, 20)
}



// Function for Running the progressbar before changing to landing page
const reDirect = () => {

    let RunningProgressBar = () => {

        // Showing the progress bar
        progressBarElement.parentElement.parentElement.classList.add("run")
        progressBarElement.parentElement.classList.add("run")
        progressBarElement.classList.add("run")

        // Calling the progressbar function after a particular time
        setTimeout(loading, 200)
    }

    setTimeout(() => {

        // Hiding the begin button
        beginButton.parentElement.classList.add("hide")

        setTimeout(RunningProgressBar, 200)
    }, 100)
}

// Getting the progress bar
const progressBarElement = document.querySelector(".getting-started .progress-bar .bar")
// Getting the "Let's begin" button from the DOM
const beginButton = document.querySelector(".getting-started .continue-button a")
//
beginButton.addEventListener("click", reDirect)