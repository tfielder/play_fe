const artistSearch = (artist) => {
  var url = `https://api.musixmatch.com/ws/1.1/track.search?apikey=&q_artist=${artist}&format=json&page_size=50`
  fetch(url, {
    mode: 'cors'
  })
    .then(result => {
      return result.json();
    })
    .then(parsedResults => {
      renderResults(parsedResults['message']['body']['track_list'])
    })
}

const renderResults = (songs) => {
  songs.forEach(song => {
  $('.search-table').append(`
      <tr>
        <td>${song['track']['track_name']}</td>
        <td>${song['track']['album_name']}</td>
      </tr>
      `)})}

export { artistSearch };

