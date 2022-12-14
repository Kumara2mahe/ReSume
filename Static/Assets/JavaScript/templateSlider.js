/*--- JavaScript for Choose-Template page (Image Silder) & for (Download) resumes in user selected templates ---*/


// Getting the article element of Choose-Templates page
const templateArticle = document.querySelector(".templates")
//
if (templateArticle != null) {


    // -------- Script for arranging the templates in the Templates-Slider in some order ---------------------------- //
    const sliderPositioner = (position, tScale, tWidth, tOpacity, count, direction) => {

        let val = (direction == "right") ? 1 : -1

        if (count >= 4) {
            tWidth = tWidth + 10
            tOpacity = 0
        }

        // Positioning the current template
        templates[position].style.scale = tScale
        templates[position].style.transform = `translateX(${tWidth * (val)}em)`
        templates[position].style.opacity = tOpacity
        templates[position].style.zIndex = templatesCount - count

        // Getting the index of adjacent template
        let nextIndex = position + (val)
        //
        if (templates[nextIndex] != null) {

            // Calculating the next position of template
            let newWidth = (template0Width / 16) + (33 * count)
            //
            sliderPositioner(
                position = nextIndex,
                tScale = tScale - 0.125,
                tWidth = newWidth,
                tOpacity = tOpacity - 0.15,
                count = ++count,
                direction = (direction == "right") ? "right" : "left"
            )
        }
    }
    // -------------------------------------------- //


    // ------ Script for horizontally sliding the templates arranged the Templates-Slider by using the arrow button ---------------------- //
    const templatesReLocator = (event, button = null) => {

        // ---- Script for re-positioning the last template in either right or left ------------- //
        const lastTemplateReLocator = (length, index, direction) => {

            let values
            switch (length - 1) {
                case 0:
                    values = [0.975, 6, 0.85]
                    break;
                case 1:
                    values = [0.85, 33 * (length - 1), 0.7]
                    break;
                case 2:
                    values = [0.725, 33 * (length - 1), 0.55]
                    break;

                default:
                    values = [0.6, 33 * (length - 1), 0.4]
                    break;
            }

            // Positioning the last template in its position by passing the its positional values
            sliderPositioner(
                index,
                values[0],
                (template0Width / 16) + values[1],
                values[2],
                length,
                direction
            )
        }
        // ------------------- //

        // Getting the element of arrow button which is clicked
        let arrow = (event.type == "click") ? event.target : button

        // Getting the element of template which has focus
        let focusTemplate = templatesSlider.querySelector(".position0")
        focusTemplate.classList.remove("position0")

        let all_templates = [], templatesInLeft, templatesInRight
        templates.forEach((item) => {
            all_templates.push(item)
        })

        if (arrow.classList[1] == "next") {

            // Changing the focus to the next element in order
            focusTemplate.nextElementSibling.classList.add("position0")
            focusTemplate.nextElementSibling.setAttribute("style", focusTemplate.getAttribute("style"))

            // Collecting the templates in the left and right of newly focused element
            templatesInLeft = all_templates.slice(0, all_templates.indexOf(focusTemplate) + 1)
            templatesInRight = all_templates.slice(all_templates.indexOf(focusTemplate) + 2)

            // Re-positioning the templates in the left of newly focused element
            for (let length = templatesInLeft.length, i = length - 1; i >= 0; i--) {

                if (i > 0) {
                    templatesInLeft[i].setAttribute("style", templatesInLeft[i - 1].getAttribute("style"))
                }
                else {
                    // Re-Positioning the last template in the left side
                    lastTemplateReLocator(length, i, "left")
                }
            }

            // Re-positioning the templates in the right of newly focused element
            templatesInLeft.reverse()
            for (let i = 0, length = templatesInRight.length; i < length; i++) {

                if (templatesInLeft[i] != null) {
                    templatesInRight[i].setAttribute("style", templatesInLeft[i].getAttribute("style"))
                    templatesInRight[i].style.transform = templatesInRight[i].style.transform.replace("-", "")
                }
                else {
                    // Re-Positioning the last template in the right side
                    lastTemplateReLocator(i + 1, all_templates.indexOf(templatesInRight[i]), "right")
                }
            }
        }
        else {

            // Changing the focus to the previous element in order
            focusTemplate.previousElementSibling.classList.add("position0")
            focusTemplate.previousElementSibling.setAttribute("style", focusTemplate.getAttribute("style"))

            // Collecting the templates in the left and right of newly focused element
            templatesInLeft = all_templates.slice(0, all_templates.indexOf(focusTemplate) - 1)
            templatesInRight = all_templates.slice(all_templates.indexOf(focusTemplate))

            // Re-positioning the templates in the right of newly focused element
            for (let i = 0, length = templatesInRight.length; i < length; i++) {

                if (i != length - 1) {
                    templatesInRight[i].setAttribute("style", templatesInRight[i + 1].getAttribute("style"))
                }
                else {
                    // Re-Positioning the last template in the right side
                    lastTemplateReLocator(length, all_templates.length - 1, "right")
                }
            }

            // Re-positioning the templates in the left of newly focused element
            templatesInLeft.reverse()
            for (let i = 0, length = templatesInLeft.length; i < length; i++) {

                if (templatesInRight[i] != null) {
                    templatesInLeft[i].setAttribute("style", templatesInRight[i].getAttribute("style"))
                    templatesInLeft[i].style.transform = `translateX(-${templatesInLeft[i].style.transform.split("translateX(")[1]}`
                }
                else {
                    // Re-Positioning the last template in the left side
                    lastTemplateReLocator(i + 1, all_templates.indexOf(templatesInLeft[i]), "left")
                }
            }
        }

        // Disabling & Enabling the arrow buttons on click
        if (templatesInRight.length < 1) {
            arrow.classList.add("disabled")
            arrow.removeEventListener("click", templatesReLocator)
            window.removeEventListener("keydown", templateChangerByRightArrow)
        }
        else if (templatesInLeft.length < 1) {
            arrow.classList.add("disabled")
            arrow.removeEventListener("click", templatesReLocator)
            window.removeEventListener("keydown", templateChangerByLeftArrow)
        }
        else if (nextArrow.classList[2] == "disabled") {
            nextArrow.classList.remove("disabled")
            nextArrow.addEventListener("click", templatesReLocator)
            window.addEventListener("keydown", templateChangerByRightArrow)
        }
        else if (previousArrow.classList[2] == "disabled") {
            previousArrow.classList.remove("disabled")
            previousArrow.addEventListener("click", templatesReLocator)
            window.addEventListener("keydown", templateChangerByLeftArrow)
        }
    }
    // -------------------------------------------- //


    // ------ Scripts for changing the functionality of (Left & Right) Arrow buttons in keyboard ---------------------- //
    const templateChangerByLeftArrow = (event) => {
        if (event.key == "ArrowLeft") {
            event.preventDefault()
            templatesReLocator(event, previousArrow)
        }
    }
    const templateChangerByRightArrow = (event) => {
        if (event.key == "ArrowRight") {
            event.preventDefault()
            templatesReLocator(event, nextArrow)
        }
    }
    // -------------------------------------------- //


    // ------ Script for sending request to create new resume with the user picked template ---------------------- //
    const createNewResume = (event) => {

        // ---- Script for reloading the page ------------ //
        const pageReload = (reload, msec) => {

            if (reload) {
                setTimeout(() => {
                    window.location.reload()
                }, msec)
            }
        }

        // ---- Script for showing and setting the Format-Selection Dialog --------------- //
        const popFormatSelection = (selectedImage) => {

            // --- Script for styling the selected option --------- //
            const optStyler = (event, defaultFormat = null) => {

                let formatToSelect
                if (event == null) {
                    formatToSelect = defaultFormat
                }
                else {
                    formatToSelect = event.target
                    if (formatToSelect.nodeName != "DIV") {
                        formatToSelect = formatToSelect.parentElement
                    }
                }
                // Getting the element of pre-selected input, if has one un-selecting it
                let preSelectedFormat = formatToSelect.parentElement.querySelector("input:checked")
                if (preSelectedFormat != null) {
                    preSelectedFormat.checked = false
                    preSelectedFormat.parentElement.removeAttribute("style")
                    formatDialogForm.removeEventListener("submit", downloadResume)
                }
                formatToSelect.querySelector("input").checked = true
                formatToSelect.style.cursor = "not-allowed"

                // Getting the name of the selected option and the element of download button
                let formatToSelectName = formatToSelect.querySelector("label")
                let downloadButton = formatDialog.querySelector(".download-button")
                //
                downloadButton.disabled = false
                downloadButton.value = "Download"

                if (formatToSelectName.innerText == "Word" && isNotUser != null) {
                    downloadButton.value = "Login & Download"
                    downloadButton.disabled = true
                    formatDialogForm.removeEventListener("submit", downloadResume)
                }
                else {
                    formatDialogForm.addEventListener("submit", downloadResume)
                }
            }

            // Changing the page title to next step
            let pageTitle = document.documentElement.querySelector("head title")
            pageTitle.innerHTML = "Step 3 : Download your Resume | ReSume Builder"

            // Getting the element of Format-Selection Dialog
            const formatDialog = templateArticle.querySelector(".selection-wrapper")
            formatDialog.classList.add("show")
            //
            formatDialog.addEventListener("click", (event) => {
                let container = event.target
                if (container.classList[0] == "selection-wrapper") {

                    // Changing the page title to default
                    pageTitle.innerHTML = pageDefaultTitle

                    // Removing the Format-Selection Dialog when not being clicked
                    container.classList.remove("show")
                    let preview = container.querySelector("img")
                    if (preview != null) preview.remove()
                }
            })
            // Creating 'img' element to show the selected template as a preview
            let previewThumb = document.createElement("img")
            previewThumb.setAttribute("src", selectedImage)
            formatDialog.children[0].prepend(previewThumb)

            // Getting the element of form in the Format-Selection Dialog
            const formatDialogForm = formatDialog.querySelector(".format-selection")

            // Setting the 'pdf' option as default
            optStyler(null, formatDialog.querySelector("input.pdf").parentElement)

            // Getting all the elements of format options and Setting a click functionality to it
            formatDialog.querySelectorAll(".format").forEach((option) => {
                option.addEventListener("click", optStyler)
            })
        }

        // ----- Script for validating and submitting the selected format of resume as a JSON data -------------- //
        const downloadResume = (event) => {

            // --- Script for submitting the JSON data to download resume ---------- //
            const submitData = (fileformat, status) => {

                // Creating a new Input element to hold JSON data
                let taskHolder = document.createElement("input")
                form.children[0].after(taskHolder)

                // Assigning the attributes and their values as the task to do
                taskHolder.value = JSON.stringify(
                    {
                        "name": "download",
                        "fileformat": fileformat
                    }
                )
                Object.assign(taskHolder, { name: "tasktodo", type: "text", hidden: true })

                // Submitting and Sending the new task as a JSON data
                form.submit()
                taskHolder.remove()

                setTimeout(() => {

                    // Enabling the Submit button again
                    button.disabled = false
                    status.remove()
                    form.parentElement.click()
                }, 800)
            }

            // Preventing the page from reload
            event.preventDefault()

            // Disabling the submit button after clicked
            const form = event.target
            let button = form.querySelector(".download-button")
            button.disabled = true

            // Creating a new element to show the status as message
            let autoHidMsg = document.createElement("h4")
            autoHidMsg.classList.add("status")
            templatesSlider.before(autoHidMsg)

            // Getting the name of the selected option
            let selectedFormat = form.querySelector("input:checked~label")
            //
            if (selectedFormat != null && ((selectedFormat.innerText == "Word" && isNotUser == null) || selectedFormat.innerText != "Word")) {

                // Showing current status as message
                autoHidMsg.innerHTML = `Converting resume to ${selectedFormat.innerText} format...`

                // Coverting the name of the selected format to their extentions
                selectedFormat = selectedFormat.innerText.toLowerCase()

                if (selectedFormat == "pdf") {

                    $.ajax({
                        type: "POST",
                        url: "/builder/choose-templates",
                        data: {
                            tasktodo: JSON.stringify({
                                name: "convert"
                            }),
                            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                        },
                        success: (data) => {

                            if (data.message == "Success") {

                                // Changing the status message to show success and submitting the download request
                                autoHidMsg.innerHTML = "Done converting."
                                submitData(selectedFormat, autoHidMsg)
                            }
                            else {
                                // Changing the status message to show error
                                autoHidMsg.innerHTML = errorMsg
                                sec = 2000

                                // Reloading the page
                                pageReload(true, sec)
                            }
                        },
                        error: () => {
                            // Reloading the page
                            pageReload(true, 10)
                        }
                    })
                }
                else {
                    submitData("docx", autoHidMsg)
                }
            }
            else if (selectedFormat != null && (selectedFormat.innerText == "Word" && isNotUser != null)) {

                // Changing the status message to show error
                autoHidMsg.innerHTML = "Invalid download request, authenticate and Try Again!"

                setTimeout(() => {

                    // Enabling the Submit button again
                    button.disabled = false
                    autoHidMsg.remove()
                    form.parentElement.click()
                }, 2000)
            }
            else {
                // Changing the status message to show error
                autoHidMsg.innerHTML = "Invalid file format, reloading in few seconds.."

                // Reloading the page
                pageReload(true, 2000)
            }
        }

        // Preventing the page from reload
        event.preventDefault()

        // Disabling the submit button after clicked
        let button = downloadForm.querySelector(".submit-button")
        button.disabled = true

        // Creating a new element to show the status as message
        let autoHidMsg = document.createElement("h4")
        autoHidMsg.classList.add("status")
        templatesSlider.before(autoHidMsg)

        // Getting the element of Sign-Up button from the Menu-bar
        const isNotUser = document.querySelector("header .menubar.nav-links .sign-up")

        const pageDefaultTitle = document.documentElement.querySelector("head title").innerHTML
        const errorMsg = "Something went wrong, reloading in few seconds.."

        // Getting the name of template which has the focus
        let templateChoosen = templatesSlider.querySelector(".position0")
        //
        if (templateChoosen != null && templateChoosen.classList[0] != "") {

            // Showing current status as message
            autoHidMsg.innerHTML = "Rendering template with provided data..."

            $.ajax({
                type: "POST",
                url: "/builder/choose-templates",
                data: {
                    tasktodo: JSON.stringify({
                        name: "render",
                        selectedtemplate: templateChoosen.classList[0]
                    }),
                    csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                },
                success: (data) => {

                    let sec
                    if (data.message == "Success") {

                        // Changing the status message to show success
                        autoHidMsg.innerHTML = "Process complete."
                        sec = 400

                        // Getting the image src from the selected template
                        let imgSrc = templateChoosen.querySelector("img").getAttribute("src")

                        // Showing the Format-Selection Dialog
                        popFormatSelection(imgSrc)
                    }
                    else {
                        // Changing the status message to show error
                        autoHidMsg.innerHTML = errorMsg
                        sec = 2000

                        // Reloading the page
                        pageReload(true, sec)
                    }
                    setTimeout(() => {

                        // Enabling the Submit button again
                        button.disabled = false
                        autoHidMsg.remove()
                    }, sec)
                },
                error: () => {
                    // Reloading the page
                    pageReload(true, 10)
                }
            })
        }
        else {
            autoHidMsg.innerHTML = errorMsg
            // Reloading the page
            pageReload(true, 3000)
        }
    }
    // -------------------------------------------- //


    // Getting the element of Templates-Slider & its templates
    const templatesSlider = templateArticle.querySelector(".template-slider")
    const templates = templatesSlider.querySelectorAll("div")
    //
    const templatesCount = templates.length

    // Calculating the index of zeroth template and getting the element which lies on the index
    const templateIndex = Math.round(templatesCount / 2) - 1
    const template0 = templates[templateIndex]
    //
    template0.classList.add("position0")
    template0.style.zIndex = templatesCount
    //
    const template0Width = Number(window.getComputedStyle(template0).width.replace("px", ""))
    //
    window.addEventListener("DOMContentLoaded", () => {

        if (templates[templateIndex - 1] != null) {

            // Arranging the templates that comes after zeroth template to the left side
            sliderPositioner(
                templateIndex - 1,
                0.975,
                (template0Width / 16) + 6,
                0.85,
                1,
                "left"
            )

            // Enabling the left arrow
            previousArrow.classList.remove("disabled")
            previousArrow.addEventListener("click", templatesReLocator)

            // Assigning a template changer function with the 'Left' arrow button
            window.addEventListener("keydown", templateChangerByLeftArrow)
        }
        if (templates[templateIndex + 1] != null) {

            // Arranging the templates that comes after zeroth template to the right side
            sliderPositioner(
                templateIndex + 1,
                0.975,
                (template0Width / 16) + 6,
                0.85,
                1,
                "right"
            )

            // Enabling the right side arrow
            nextArrow.classList.remove("disabled")
            nextArrow.addEventListener("click", templatesReLocator)

            // Assigning a template changer function with the 'Right' arrow button
            window.addEventListener("keydown", templateChangerByRightArrow)
        }
    })

    // Getting the element of Slider Next & Previous buttons
    const previousArrow = templatesSlider.querySelector(".arrow-button.previous")
    const nextArrow = templatesSlider.querySelector(".arrow-button.next")

    // Getting the form element in current page
    const downloadForm = templateArticle.querySelector(".template-toolbar")
    //
    downloadForm.onsubmit = createNewResume
    downloadForm.querySelector(".edit-button").addEventListener("click", () => {
        window.location.pathname = "/builder/career-objective"
    })
}