const body = document.querySelector('body'),
    modeSwitch = body.querySelector(".toggle-switch");

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
});

// Initialize Tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))



$('.single-media').on('click', function () {
    $('.single-media').removeClass('active');
    $(this).addClass('active');

    let src = $(this).find('img').attr('src');
    $('.image-preview-inner img').attr('src', src);
});