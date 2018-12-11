import * as apiInterface from './api_interface.js';

$(document).ready(() => {
  searchClickListener()
  searchEnterListener()
});

const searchClickListener = () => {
  $('#search-submit').on('click', () => {
    var query = $('#search-field').val()
    console.log(query)
    apiInterface.artistSearch(query)
  })
}

const searchEnterListener= () => {
  $("#search-submit").keyup(function(event) {
    if (event.keyCode === 13) {
      $("search-submit").click();
    }
  });
}

