import * as backendApiInterface from './backend_api_interface.js';

const artistSearch = (artist) => {
  var url = `https://api.musixmatch.com/ws/1.1/track.search?apikey=9664f01522de1910e847029ef487fd8f&q_artist=${artist}&format=json&page_size=50`
  fetch(url, {
    mode: 'cors'
  })
    .then(result => {
      return result.json();
    })
    .then(parsedResults => {
      renderResults(parsedResults['message']['body']['track_list'])
      favoriteSongListener()

    })
}

const renderResults = (songs) => {
  songs.forEach(song => {
  $('.search-table').append(`
      <tr>
        <td>${song['track']['track_name']}</td>
        <td>${song['track']['artist_name']}</td>
        <td>${song['track']['album_name']}</td>
        <td>${song['track']['track_rating']}</td>
        <td>${song['track']['track_id']}</td>
        <td><button class='favorite-button' id='${song['track']['track_id']}'>Favorite</button></td>
      </tr>
      `)})}


const favoriteSongListener = () => {
  $('.favorite-button').on('click', (row) => {
    var songData = row.currentTarget.parentElement.parentElement.children
    backendApiInterface.postFavorite(songData)
  })
}

export { artistSearch };

