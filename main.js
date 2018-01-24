'use strict';

//Image galleries
var allImages = {
    rsImagesArray : ["rs_onboarding.png", "rs_campaigns.png", "rs_content_editor.png", "rs_social.png"],
    csImagesArray : ["cameronsparling_grid.png", "cameronsparling_full.png", "cameronsparling_contact.png", "cameronsparling_mobile.png"],
    nhlImagesArray : ["nhlrecap_full.png", "nhlrecap_hidden.png", "nhlrecap_modal.png"],
    pomoImagesArray : ["pomo_init.png", "pomo_additional_time.png"],
    syncImagesArray : ["syncline_login.png", "syncline_landing.png", "syncline_sites.png", "syncline_location.png", "syncline_drill_hole.png"]
}

function nextImage(imageId, imageArray) {
    var image = document.getElementById(imageId);
    var currentIndex = parseInt(image.dataset.index);
    var newIndex = (currentIndex + 1) >= imageArray.length ? 0 : currentIndex + 1;
    image.src = "img/" + imageArray[newIndex];
    image.dataset.index = newIndex;
}

function prevImage(imageId, imageArray) {
    var image = document.getElementById(imageId);
    var currentIndex = parseInt(image.dataset.index);
    var newIndex = (currentIndex - 1) < 0 ? imageArray.length - 1 : currentIndex - 1;
    image.src = "img/" + imageArray[newIndex];
    image.dataset.index = newIndex;
}

var nextImageElements = document.getElementsByClassName("next-image");
var prevImageElements = document.getElementsByClassName("prev-image");

for(var i = 0; i < nextImageElements.length; i++){
    nextImageElements[i].addEventListener('click', function (a) {
        var imageId = this.previousElementSibling.childNodes[1].childNodes[1].id;
        var imageArray = allImages[ imageId + "Array"];
        nextImage(imageId, imageArray);
    }, false);
}

for(var i = 0; i < prevImageElements.length; i++){
    prevImageElements[i].addEventListener('click', function (e) {
        var imageId = this.nextElementSibling.childNodes[1].childNodes[1].id;
        var imageArray = allImages[ imageId + "Array"];
        prevImage(imageId, imageArray);
    }, false);
}

//Show note if no direct link to code
function showNote(ele){
    ele.parentElement.nextElementSibling.style.display = 'block';
}