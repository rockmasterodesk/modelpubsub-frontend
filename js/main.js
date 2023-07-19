// START: Global Variables

const body        = document.querySelector('body');

// END: Global Variables







// START: Theme Mode (light or dark theme related scripts)

// If the localStorage has "theme_mode" key, then get the value from localStorage
if (localStorage.getItem("theme_mode")) {
    const themeMode = localStorage.getItem("theme_mode");

    if (themeMode === "light") {
        body.classList.remove("dark");
    }
}

const modeSwitch  = body.querySelector(".toggle-switch");
modeSwitch.addEventListener("click", () => {
    // If the body contains "dark" class, then remove it and add "light" class
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        localStorage.setItem("theme_mode", "light");
    }
    // Else, if the body contains "light" class, then remove it and add "dark" class
    else {
        body.classList.add("dark");
        localStorage.setItem("theme_mode", "dark");
    }
});

// END: Theme Mode (light or dark theme related scripts)







// START: Bootstrap Tooltips Related Scripts

// Initialize Tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// END: Bootstrap Tooltips Related Scripts



// START: Open menu selection on mobile menu
$('.active-menu-display').on('click', function () {
    $('.menu-bar .menu').toggleClass('mobile-open');
});

// Clicking outside ".menu-bar .menu" except ".active-menu-display" will close the "mobile-open" class
$(document).on('click', function (e) {
    if (!$(e.target).closest('.menu-bar .menu').length && !$(e.target).closest('.active-menu-display').length) {
        $('.menu-bar .menu').removeClass('mobile-open');
    }
});

// END: Open menu selection on mobile menu



$('.single-media').on('click', function () {
    $('.single-media').removeClass('active');
    $(this).addClass('active');

    let src = $(this).find('img').attr('src');
    $('.image-preview-inner img').attr('src', src);
});