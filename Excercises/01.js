$(() => {
  $('div.poem-stanza').addClass('highlight');
  $('.author').addClass('highlight');
  $('#paragraph1')
    .css('color', 'red')
    .css('background-color', 'yellow')
    .slideUp(100)
    .slideDown(1000);
});
