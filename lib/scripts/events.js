import * as musicMatchInterface from './music_match_interface.js';
import * as backendApiInterface from './backend_api_interface.js';

$(document).ready(() => {
  // new
  searchMainListener()
  searchClickListener()
  searchEnterListener()
  favoritesMainListener()
  playlistsMainListener()
});

const searchMainListener= () => {
  $('#main-search').on('click', () => {
    clear()
    $('#search-div').removeClass('hidden')
    $('#search-div').addClass('flex')
  })
}

const clear = () => {
  // SEARCH
  $('#search-div').removeClass('flex')
  $('#search-div').addClass('hidden')

  $('.search-result-div').removeClass('flex')
  $('.search-result-div').addClass('hidden')

  // FAVORITES
  $('.favorites-div').removeClass('flex')
  $('.favorites-div').addClass('hidden')

  // Playlists
  $('.playlist-div').removeClass('flex')
  $('.playlist-div').addClass('hidden')
}


const favoritesMainListener= () => {
  $('#main-favorites').on('click', () => {
    clear()
    backendApiInterface.getFavorites()
    $('.favorites-div').removeClass('hidden')
    $('.favorites-div').addClass('flex')
  })
}

const playlistsMainListener= () => {
  $('#main-playlists').on('click', () => {
    clear()
    backendApiInterface.populatePlaylistList()
    $('.playlist-div').removeClass('hidden')
    $('.playlist-div').addClass('flex')
    $('.playlist-list-div').removeClass('hidden')
    $('.playlist-list-div').addClass('flex')
    createPlaylistListener()
  })
}

const searchClickListener = () => {
  $('#search-submit').on('click', () => {
    var query = $('#search-field').val()
    musicMatchInterface.artistSearch(query)
    $('#search-div').removeClass('flex')
    $('#search-div').addClass('hidden')
    $('.search-result-div').removeClass('hidden')
    $('.search-result-div').addClass('flex')
  })
}

const searchEnterListener= () => {
  $("#search-field").keyup(function(event) {
    if (event.keyCode === 13) {
      $("#search-submit").click();
    }
})}

const favoriteSongListener = () => {
  $('.favorite-button').on('click', (row) => {
    var songData = row.currentTarget.parentElement.parentElement.children
    backendApiInterface.postFavorite(songData)
  })
}


const playlistListener = () => {
  $('.playlist-link').on('click', () => {
    backendApiInterface.populatePlaylistTable(event.currentTarget.id)
    $('.playlist-list-div').addClass('hidden')
    $('#create-playlist').addClass('hidden')
    $('.playlist-table').removeClass('hidden')
    $('.playlist-table').addClass('flex')
  })
}

const createPlaylistListener = () => {
  $('#create-playlist').on('click', (event) => {
    $('.playlist-list-div').addClass('hidden')
    $('#create-playlist').addClass('hidden')
    $('.create-playlist-div').removeClass('hidden')
    $('.create-playlist-div').addClass('flex')
    submitCreatePlaylistListener()
  })
}

const submitCreatePlaylistListener = () => {
  $('#playlist-submit').on('click', () => {
    var query = $('#playlist-name').val()
    backendApiInterface.playlistCreate(query)
    $('.create-playlist-div').removeClass('flex')
    $('.create-playlist-div').addClass('hidden')
  })
}

