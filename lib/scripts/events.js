import * as musicMatchInterface from './music_match_interface.js';
import * as backendApiInterface from './backend_api_interface.js';

$(document).ready(() => {
  searchClickListener()
  searchEnterListener()
  backendApiInterface.getFavorites()


});

const searchClickListener = () => {
  $('#search-submit').on('click', () => {
    var query = $('#search-field').val()
    musicMatchInterface.artistSearch(query)
  })
}

const searchEnterListener= () => {
  $("#search-submit").keyup(function(event) {
    if (event.keyCode === 13) {
      $("search-submit").click();
    }
  });
}

const favoriteSongListener = () => {
  $('.favorite-button').on('click', (row) => {
    var songData = row.currentTarget.parentElement.parentElement.children
    console.log('clicked')
    backendApiInterface.postFavorite(songData)
  })
}

