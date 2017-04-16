// snippet to set #welcome-section equal to viewport height writen by Jeremy Church:
// https://j.eremy.net/set-element-height-to-viewport/

$(document).ready(function() {
  function setHeight() {
    windowHeight = $(window).innerHeight();
    $('#welcome-section').css('max-height', windowHeight);
  };
  setHeight();

  $(window).resize(function() {
    setHeight();
  });
});
