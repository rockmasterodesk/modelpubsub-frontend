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






$('.single-media').on('click', function () {
    $('.single-media').removeClass('active');
    $(this).addClass('active');

    let src = $(this).find('img').attr('src');
    $('.image-preview-inner img').attr('src', src);
});