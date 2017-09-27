particlesJS.load('particles-js', 'assets/particles.json');

$(function() {
  $(window).resize(height);
  height();

  //margin-top per centrare il contenitore
  var margin = ($(window).height() / 2) - ($("#home").height() / 2);
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
});

function height() {
  var h = $(window).height();
  //var h = screen.height;
  $("section").height(h + 5);
  $("#particles-js").height(h);
  $("canvas").attr("height", h);
}

function wavesfunc() {
  return new SineWaves({
    el: document.getElementById('waves'),

    speed: 4,

    width: $(window).width(),
    height: $(window).height(),

    ease: 'SineInOut',

    wavesWidth: '90%',

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
