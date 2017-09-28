/** Colors **/
var options = {
  nColors: 5,
  colors: ["#3f51b5", "#4caf50", "#ff5722", "#03a9f4", "#9c27b0"],
  interval: 6000,
  index: 1
};

$(function() {
  //margin-top per centrare il contenitore
  //var margin = ($(window).height() / 2) - ($("#home").height() / 2) - ($("#name").height()/2);
  //$("#home").css("margin-top", margin);
  particlesJS.load('particles-js', 'assets/particles.json');

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

  controller.scrollTo(function(newpos) {
    TweenMax.to(window, 0.4, {
      scrollTo: {
        y: newpos
      }
    });
  });

  $(document).on("click", "a[href^='#']", function(e) {
    var id = $(this).attr("href");
    if ($(id).length > 0) {
      e.preventDefault();
      // trigger scroll
      controller.scrollTo(id);
    }
  });

  //waves
  var waves = wavesfunc();

  $('.slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    centerMode: true,
    centerPadding: '60px'
  });

  setInterval(ChangeBackground, options.interval);
});

function wavesfunc() {
  return new SineWaves({
    el: document.getElementById('waves'),
    speed: 4,
    ease: 'SineInOut',
    wavesWidth: '100%',

    waves: [{
        timeModifier: 4,
        lineWidth: 2,
        amplitude: -25,
        wavelength: 25
      },
      {
        timeModifier: 2,
        lineWidth: 3,
        amplitude: -50,
        wavelength: 50
      },
      {
        timeModifier: 1,
        lineWidth: 2,
        amplitude: -100,
        wavelength: 100
      },
      {
        timeModifier: 0.5,
        lineWidth: 2,
        amplitude: -200,
        wavelength: 200
      },
      {
        timeModifier: 0.25,
        lineWidth: 3,
        amplitude: -400,
        wavelength: 400
      }
    ],
    // Called on window resize
    resizeEvent: function() {
      var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 255)");
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.5)");

      var index = -1;
      var length = this.waves.length;
      while (++index < length) {
        this.waves[index].strokeStyle = gradient;
      }

      // Clean Up
      index = void 0;
      length = void 0;
      gradient = void 0;
    }
  });
}

function ChangeBackground() {
  var index = options.index;
  if(index == (options.nColors-1)) options.index = 0;
  else options.index += 1;
  $("#cover").css("background-color", options.colors[index]);
  $(".cbtn").hover(function() {
    $(this).css("color", options.colors[index]);
  }, function() {
    $(this).css("color", "#fff");
  });
  var index2 = index;
  if(index2 == 0) index2 = 5;
  else index2 -= 1;
  $("#projects").css("background-color", options.colors[index2]);
}
