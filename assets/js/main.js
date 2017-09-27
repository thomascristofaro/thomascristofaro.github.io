
particlesJS.load('particles-js', 'assets/particles.json');

$(function() {
  $(window).resize(height);
  height();

  //margin-top per centrare il contenitore
  var margin = ($(window).height()/2) - ($("#home").height()/2);
  $("#home").css("margin-top", margin);

  // Init ScrollMagic
  var controller = new ScrollMagic.Controller();

  $("section").each(function() {
    new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 'onLeave'
      })
      .setPin(this)
      .addTo(controller);
  });
});

function height() {
     var h = $(window).height();
     //var h = screen.height;
     $("section").height(h);
     $("#particles-js").height(h);
     $("canvas").attr("height", h);
}
