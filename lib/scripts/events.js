import * as musicMatchInterface from './music_match_interface.js';
import * as backendApiInterface from './backend_api_interface.js';

$(document).ready(() => {
  searchClickListener()
  searchEnterListener()
  backendApiInterface.getFavorites()
  backendApiInterface.populatePlaylistList()
  playlistShowListener()
  createPlaylistListener()
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
})}

const favoriteSongListener = () => {
  $('.favorite-button').on('click', (row) => {
    var songData = row.currentTarget.parentElement.parentElement.children
    backendApiInterface.postFavorite(songData)
  })
}

const playlistShowListener = () => {
  $('#show-playlist').on('click', () => {
    $('.add-to-playlist').slideDown('fast')
    $('#show-playlist').addClass('hidden')
    playlistListener()
  })
}


const playlistListener = () => {
  $('.playlist-link').on('click', (event) => {
    backendApiInterface.populatePlaylistTable(event.currentTarget.id)
  })
}

const createPlaylistListener = () => {
  $('#create-playlist').on('click', (event) => {
    $('.create-playlist-div').slideDown('fast')
    $('#create-playlist').addClass('hidden')
    submitCreatePlaylistListener()
  })
}

const submitCreatePlaylistListener = () => {
  $('#playlist-submit').on('click', () => {
    var query = $('#playlist-name').val()
    backendApiInterface.playlistCreate(query)
  })
}

