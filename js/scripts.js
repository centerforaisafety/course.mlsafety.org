$(document).ready(function () {
    $("a.youtube").on("click", function () {
        console.log("clicked");
        var $this = $(this);
        var mediaId = $this.attr("media-id");
        var popup = $this.attr("href");
        var $popupIframe = $(popup).find("iframe");
        $popupIframe.attr("src", "//www.youtube.com/embed/"+mediaId);
        $(".popup").addClass("show");
        $(".fader").addClass("show");
    });
    $(".fader").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        $(".fader").removeClass("show");
        $(".popup").removeClass("show");
        var $popupIframe = $(this).find("iframe")
        $popupIframe.attr("src", "")
    });
});

