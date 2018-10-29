function closeAnnouncements() {
    $('#announcements').slideUp("slow", function () { });
}
function closeWarning() {
    $('#warning').slideUp("slow", function () { });
}

var memCount = new CountUp("members", 0, 33, 0, 3);
var robotCount = new CountUp("robots", 0, 4, 0, 3);
var yearCount = new CountUp("years", 0, 4, 0, 3);
var winCount = new CountUp("wins", 0, 1, 0, 3);
var sponsorCount = new CountUp("sponsors", 0, 12, 0, 3);


$(window).scroll(function() {
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