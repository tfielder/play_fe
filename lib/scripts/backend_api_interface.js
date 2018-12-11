const postFavorite = (songData) => {
  var url = `http://localhost:3000/api/v1/songs`
  var data = {
            name: songData[0].innerText,
            artist_name: songData[1].innerText,
            genre: "abcd",
            song_rating: songData[3].innerText
  }

    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json",
                "Accept": "application/json"},
        mode: "cors",
        body: JSON.stringify(data)

    }).catch( ( error ) => console.error({ error }) )

}

const getFavorites = () => {
  var url = `http://localhost:3000/api/v1/favorites`
  fetch(url, {
    mode: 'cors'
  })
    .then(result => {
      return result.json();
    })
    .then(parsedResults => {
      renderFavorites(parsedResults)
    })
}

const renderFavorites = (favorites) => {
  favorites.forEach(song => {
  $('.favorites-table').append(`
      <tr id='${song['id']}'>
        <td>${song['name']}</td>
        <td>${song['artist_name']}</td>
        <td>${song['song_rating']}</td>
        <td>${song['song_rating']}</td>
        <td> <select class="playlist-dropdown"> </select></td>
        <td><button class='playlist-button' id='${song['id']}'>Add to Playlist</button></td>
      </tr>`)
  })
  populatePlaylistDropdown()
}

const populatePlaylistDropdown = () => {
  var url = 'http://localhost:3000/api/v1/playlists'
  $.get( url, function( data ) {
    data.forEach(playlist => {
      $('.playlist-dropdown').append(`
      <option value="${playlist.id}">${playlist.playlist_name}</option>
      `)
    })
  })}

export { postFavorite, getFavorites }
