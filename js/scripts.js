$(document).ready(function() {
    $('.navTrigger').click(function() {
        $(this).toggleClass('active');
        console.log("Clicked menu");
        $("#mainListDiv").toggleClass("show_list").slideToggle();
    });
});

$('.navlinks').click(function () {
    $('.navTrigger').removeClass('active');
    $("#mainListDiv").removeClass("show_list");

});