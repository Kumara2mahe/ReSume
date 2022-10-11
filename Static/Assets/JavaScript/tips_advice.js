/* ------ Script for Resume Builder's (BuilderTemplate-Page) show/hide Tips & Advice ------ */


// ------- Script for changing the Tip's button icon & text ---------------------------------------------------------- //
const changeTipsIcon = (image, text) => {

    // Getting current button's img-src and swapping the image name
    let imageSrc = image.getAttribute("src").split("/")
    imageSrc.push((imageSrc.pop() == "tips_01.png") ? "tips_02.png" : "tips_01.png")

    // Changing the image
    image.setAttribute("src", imageSrc.join("/"))

    // Changing the text color
    text.style.color = (window.getComputedStyle(text).color == "rgb(255, 165, 0)") ? "rgb(0, 123, 255)" : "rgb(255, 165, 0)"
}

// ------ Script for showing/hiding the Tip & Advice Section ---------------------------------------------------------- //
const toggleTipsAdvice = (button) => {

    // Disabling the click function from button
    button.removeEventListener("click", toggleTipsAdvice)

    // Showing/Hiding the Tips & Advice section
    button.parentElement.parentElement.classList.toggle("shrinked")
    button.parentElement.children[1].classList.toggle("show")

    // Calling the function to change the Tip's button icon & text
    changeTipsIcon(button.children[0], button.children[1])

    setTimeout(() => {
        // Enabling back the click function
        button.addEventListener("click", toggleTipsAdvice)
    }, 400)
}
// ------------------------------------------------------------------ //

// Getting the Tips's button element from the BuilderTemplate-Page
const tipsButton = document.querySelector(".builder-template .forms-content-section .forms-tips-preview .tips-button")
//
tipsButton.addEventListener("mouseenter", () => {
    changeTipsIcon(tipsButton.children[0], tipsButton.children[1])
})
tipsButton.addEventListener("mouseleave", () => {
    changeTipsIcon(tipsButton.children[0], tipsButton.children[1])
})
tipsButton.addEventListener("click", () => {
    toggleTipsAdvice(tipsButton)
})
// ------------------------------------------------------------------------------------------------------------------------------------ //