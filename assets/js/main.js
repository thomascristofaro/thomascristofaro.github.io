/*$(function() {

  $(".row").height($(window).height());

  // Init ScrollMagic
  var controller = new ScrollMagic.Controller();

  $(".row").each(function() {
    new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 'onLeave'
      })
      .setPin(this)
      .addTo(controller);
  });

});*/

particlesJS.load('particles-js', 'assets/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

$(function() {
  var h = $(window).height();
  $("section").height(h);
  //$("canvas").attr("height", h);
  $("#particles-js").height(h-10);

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
