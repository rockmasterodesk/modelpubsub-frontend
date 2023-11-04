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









// START: Left Menu Buttons Related Scripts

// Function to update the media library (images) according to the button clicked
function fetchAndUpdateMediaLibrary(model) {
    // URL to fetch media library for a model:-
    // We are using fake server json files to fetch the media library for a model
    // TODO: please change the url to fetch the actual media library for a model
    // TODO: also, parse the response JSON contents and generate HTML according to your needs
    // TODO: this is just an example implementation using fake server json files
    var url = 'fake_server/models/' + model + '.json';
    console.log("Fetching: " + url);

    $.ajax({
        url: url,
        type: 'GET',
        data: {
            model: model
        },
        success: function (data) {
            // console.log(data.data.description);
            console.log(data);

            // Update the small description of the model
            $('#ModelDescriptionText').text(data.data.description);

            // Update the images in the media library
            var imagesHtml = '';
            $.each(data.data.images, function (index, image) {
                // If image url is from a folder "media", then add a smaller version of the image from media/min
                let small_image = image.url;
                let large_image = image.url;

                if (image.url.includes('media/')) {
                    small_image = image.url.replace('media/', 'media/min/');
                }

                // onerror, replace the image with large image
                let on_error = "this.onerror=null;this.src='" + large_image + "';";

                imagesHtml += '<div class="single-media"><img src="' + small_image + '" data-original-src="'+large_image+'" data-image-id="'+image.id+'" onerror="'+on_error+'" alt=""></div>';
            });

            $('.predefined-media-library #MediaLibraryImages').html(imagesHtml);
        },
        error: function (error) {
            console.log(error);
        }
    });

}

// Clicking on Left Menu buttons should do the following things:-
// 1. Activate the associated button
// 2. Update the media library (images) according to the button clicked

$(document).on('click', '#LeftMenuButtons li.nav-link', function(){
    // 1. Activate the associated button

    //   a. Remove "active" class from all the buttons
    $('#LeftMenuButtons li.nav-link.active').removeClass('active');
    //   b. Add 'active' class to the clicked button
    $(this).addClass('active');
    //   c. For mobile screens, close the menu when a button is clicked
    $('#LeftMenuButtons').parent().removeClass('mobile-open');
    //   d. For mobile screens, update the icon of the active menu display
    $('#ActiveMenuDisplay i.bx').attr('class', $(this).find('i.bx').attr('class'));
    //   e. For mobile screens, update the text of the active menu display
    $('#ActiveMenuDisplay .classifier-name-text').text($(this).find('.classifier-name-text').text());




    // 2. Update the media library (images) according to the button clicked
    // console.log("Fetching: " + $(this).attr('data-model'));
    fetchAndUpdateMediaLibrary($(this).attr('data-model'));
});

// END: Left Menu Buttons Related Scripts



















// START: Images in Media Library Related Scripts
function displayResults(model, data){
    let $tagsContainer = $('#TagsContainer');
    let $imageCaptionContainer = $('#ImageCaptionContainer');
    let $imageTags = $('#ImageTags');

    switch (model) {
        case 'safe_unsafe_classifier':
        case 'ai_generated_detector':
            // Show the #TagsContainer
            // Hide #ImageCaptionContainer and #ImageTags
            $tagsContainer.show();
            $imageCaptionContainer.hide();
            $imageTags.hide();

            // Update the tags
            let tagsHtml = '';
            $.each(data.data.tags, function (index, tag) {
                tagsHtml += `
                    <div class="single-result">
                        <div class="color" style="background-color: ${tag.color};"></div>
                        <div class="name">${tag.name}</div>
                        <div class="score">${tag.score.toFixed(3)}</div>
                    </div>
                `;
            });
            $tagsContainer.html(tagsHtml);
            break;

        case 'image_captioning':
            // Show the #ImageCaptionContainer
            // Hide #TagsContainer and #ImageTags
            $imageCaptionContainer.show();
            $tagsContainer.hide();
            $imageTags.hide();

            // Update the caption
            $imageCaptionContainer.find('#caption_label').text('Caption');
            $imageCaptionContainer.find('#caption_textarea').val(data.data.caption);
            break;

        case 'tags_prompts_generator':
            // Show the #ImageTags and #ImageCaptionContainer
            // Hide #TagsContainer
            $imageTags.show();
            $imageCaptionContainer.show();
            $tagsContainer.hide();

            // Update the tags
            let imageTagsHtml = '';
            $.each(data.data.tags, function (index, tag) {
                imageTagsHtml += `
                    <div class="single-image-tag">
                        ${tag}
                    </div>`;
            });
            $imageTags.find('.image-tags-container').html(imageTagsHtml);

            // Update the prompt
            $imageCaptionContainer.find('#caption_label').text('Prompt');
            $imageCaptionContainer.find('#caption_textarea').val(data.data.prompt);
            break;
    }
}

function fetchAndUpdateDetectedTags(image_object){
    // URL to fetch detected tags for an image:-
    // We are using fake server json files to fetch the detected tags for an image
    let image_id = image_object.id;
    let image_src = image_object.src;
    let model = $('#LeftMenuButtons li.nav-link.active').attr('data-model');

    $.ajax({
        url: 'fake_server/image_info/' + model + '.json',
        type: 'GET', // TODO: change this to POST when using with real server
        data: {
            image_id: image_id,
            image_src: image_src,
            model: model
        },
        success: function (data) {
            // Display results based on Data
            displayResults(model, data);
        }
    });
}

// Clicking on any image in the media library should do the following things:-
// 1. Activate the clicked image and update image preview
// 2. Fetch and update detected tags according to the image clicked

$(document).on('click', '.single-media', function () {
    $('.single-media').removeClass('active');
    $(this).addClass('active');

    // 1. Activate the clicked image and update image preview
    let src = $(this).find('img').attr('src');
    $('.image-preview-inner img').attr('src', src);

    // Update the original src of the image
    let original_src = $(this).find('img').attr('data-original-src');
    $('.image-preview-inner img').attr('src', original_src);

    // 2. Fetch and update detected tags according to the image clicked
    let id = $(this).find('img').attr('data-image-id');
    fetchAndUpdateDetectedTags({
        id: id,
        src: src
    });
});

// END: Images in Media Library Related Scripts





// START: User uploaded and Our Images Related Scripts
function showUploadedMediaLibrary(){
    // Hide Left Menu Buttons
    $('#LeftMenuButtons').hide();

    // Hide Our Images Section
    $('.predefined-media-library').addClass('d-none');

    // Show #BackToOurMediaLibrary button
    $('#BackToOurMediaLibrary').removeClass('d-none');

    // Show User Uploaded Images Section
    $('.user-uploaded-media-library').removeClass('d-none');
}

function showWebsiteMediaLibrary(){
    // Show Left Menu Buttons
    $('#LeftMenuButtons').show();

    // Show Our Images Section
    $('.predefined-media-library').removeClass('d-none');

    // Hide #BackToOurMediaLibrary button
    $('#BackToOurMediaLibrary').addClass('d-none');

    // Hide User Uploaded Images Section
    $('.user-uploaded-media-library').addClass('d-none');
}

// Clicking "View uploads" should open the user uploaded images section and hide our images section
$(document).on('click', '#ViewUploads', function () {
    showUploadedMediaLibrary();
});





// Clicking "Back to Our Models" should open our images section and hide user uploaded images section
$(document).on('click', '#BackToOurMediaLibrary', function () {
    showWebsiteMediaLibrary();
});

// END: User uploaded and Our Images Related Scripts





// START: Upload Image Related

// Clicking "Upload Image" should open the upload image section and hide the media library
$('#UploadImageOpener').click(function () {
    $('.media-uploader-container').removeClass('d-none');

    $('.media-upload-controls-container').addClass('d-none');
});


// Clicking "Close" should close the upload image section and show the media library
$('#UploadImageCloser').click(function () {
    $('.media-uploader-container').addClass('d-none');

    $('.media-upload-controls-container').removeClass('d-none');
});


function uploadAndHandleFile(file){
    // Create a FormData object
    let formData = new FormData();
    formData.append('file', file);

    // Upload the file
    $.ajax({
        url: 'fake_server/upload_image.json',
        type: 'GET', // TODO: change this to POST when using with real server
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            // Hide the upload image section
            $('.media-uploader-container').addClass('d-none');

            // Show the media library
            $('.media-upload-controls-container').removeClass('d-none');

            // Add the uploaded image to the media library
            let html = `
                <div class="single-media">
                    <img src="${data.url}" alt="media" data-image-id="${data.id}">
                </div>
            `;
            $('.user-uploaded-media-library .media-library').prepend(html);

            // Show the uploaded image in the image preview
            showUploadedMediaLibrary();
        }
    });
}


// Choosing a file should upload the file using Ajax
$('#MediaUploader').change(function () {
    // Get the file
    let file = $(this).prop('files')[0];

    uploadAndHandleFile(file);
});

// Dropping a file in .media-uploader-label should upload the file using Ajax
$('.media-uploader-label').on('drop', function (e) {
    e.preventDefault();

    // Get the file
    let file = e.originalEvent.dataTransfer.files[0];

    uploadAndHandleFile(file);
});

// END: Upload Image Related


