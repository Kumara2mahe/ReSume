/* ------ Script for Resume Builder's Menubar ------ */


// ------ Changing the Menubar's position relative to scrollbar position ------------------------------------------- //
const scrollBarPosition = () => {

    if (window.scrollY >= 60 && menuBar.classList[1] != "floating-menubar") {
        menuBar.classList.add("floating-menubar")
    }
    else if (window.scrollY < 60 && menuBar.classList[1] == "floating-menubar") {
        menuBar.classList.remove("floating-menubar")
    }
}
const menuBar = document.querySelector(".fixed-menubar")
window.addEventListener("scroll", scrollBarPosition)
// ------------------------------------------------------------------------------------------------------------------ //



// ------ Function for Showing and Hiding the Hamburger Navigation Menu ------------------------------------------- //
const showHamNavMenu = () => {

    // Showing the Hamburger Menu
    let navigationMenu = document.querySelector(".navigation-menu")
    navigationMenu.classList.remove("hide")

    setTimeout(() => {
        navigationMenu.querySelector(".pages-container").classList.remove("hide")
    }, 100)

    // Disabling the hamIcon
    hamBurgerIcon.disabled = true

    // Hiding the main scroll bar
    document.documentElement.style.overflowY = "hidden"

    // Getting the close hammenu button
    let closeNavigationMenu = navigationMenu.querySelector(".navigation-menu-container .close-menu")
    closeNavigationMenu.addEventListener("click", () => {

        // Hiding the Hamburger Menu
        navigationMenu.classList.add("hide")
        navigationMenu.querySelector(".pages-container").classList.add("hide")

        // Enabling the hamIcon
        hamBurgerIcon.disabled = false

        // Removing hiding effect from the main scroll bar
        document.documentElement.style.overflowY = "visible"
    })

    // Getting only the path name from the current url
    let currentURL = window.location.pathname

    if (currentURL.split("/").length - 1 == 1) {

        // Checking the current page is Home-page or not
        let linkname = (currentURL == "/") ? "home-link" : `${currentURL.split("/")[1]}-link`

        // Getting the element of link concurrent to the active page 
        let activeLink = navigationMenu.querySelector(`.navigation-menu-container .${linkname}`)

        // Highlighting and removing the 'href' from concurrent
        activeLink.classList.remove("inactive")
        activeLink.removeAttribute("href")
    }
}

// Getting the Hamburger Icon from the Menubar
const hamBurgerIcon = document.querySelector(".menubar.nav-links .ham-menu .ham-button")
//
setTimeout(() => {
    hamBurgerIcon.addEventListener("click", showHamNavMenu)
}, 1100)
// ------------------------------------------------------------------------------------------------------------------ //
