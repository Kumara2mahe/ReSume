/* ------ Script for Resume Builder's Menubar ------ */


// ------ Changing the Menubar's position relative to scrollbar position ------------------------------------------- //
const menuBar = document.querySelector(".fixed-menubar")

const scrollBarPosition = (event) => {

    if (window.scrollY >= 60) {

        // If class name not matches adds new class
        if (menuBar.classList[1] != "floating-menubar") {
            menuBar.classList.toggle("floating-menubar")
        }

    }
    if (window.scrollY < 60) {

        // If class name matches removes the matched class
        if (menuBar.classList[1] == "floating-menubar") {
            menuBar.classList.toggle("floating-menubar")
        }
    }
}
window.addEventListener("scroll", scrollBarPosition)
// ------------------------------------------------------------------------------------------------------------------ //
