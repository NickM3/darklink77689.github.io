$(document).ready(function () {
    var accordions = bulmaAccordion.attach();
    $('.accordion').slideUp();


    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });
});
function bot16() {
    if ($('#stronghold').visible()) {
        $('.accordion').slideUp();
    } else {
        $('.accordion').slideUp();
        $('#stronghold').slideToggle();
    }
}
function bot17() {
    if ($('#steamworks').visible()) {
        $('.accordion').slideUp();
    } else {
        $('.accordion').slideUp();
        $('#steamworks').slideToggle();
    }
}
function bot18() {
    if ($('#powerup').visible()) {
        $('.accordion').slideUp();
    } else {
        $('.accordion').slideUp();
        $('#powerup').slideToggle();
    }
}
function closeAnnouncements() {
    $('#announcements').slideUp("slow", function () { });
}
function closeWarning() {
    $('#warning').slideUp("slow", function () { });
}

var memCount = new CountUp("members", 0, 33, 0, 3);
var robotCount = new CountUp("robots", 0, 7, 0, 3);
var yearCount = new CountUp("years", 0, 4, 0, 3);
var winCount = new CountUp("wins", 0, 1, 0, 3);
var sponsorCount = new CountUp("sponsors", 0, 12, 0, 3);


$(window).scroll(function () {
    if ($('#members').visible()) {
        if (!memCount.error) {
            memCount.start();
        } else {
            console.error(memCount.error);
        }


        if (!robotCount.error) {
            robotCount.start();
        } else {
            console.error(robotCount.error);
        }

        if (!yearCount.error) {
            yearCount.start();
        } else {
            console.error(yearCount.error);
        }

        if (!winCount.error) {
            winCount.start();
        } else {
            console.error(winCount.error);
        }

        if (!sponsorCount.error) {
            sponsorCount.start();
        } else {
            console.error(sponsorCount.error);
        }
    }
});