$(document).ready(function() {
    $('.navTrigger').click(function() {
        $(this).toggleClass('active');
        $("#mainListDiv").toggleClass("show_list").slideToggle();
    });
});

var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
if (width < 756)
{
    $('.navlinks').click(function () {
        $('.navTrigger').toggleClass('active');
        $("#mainListDiv").slideToggle().toggleClass("show_list");
    });
}