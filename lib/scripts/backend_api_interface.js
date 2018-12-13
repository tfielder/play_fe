const postFavorite = (songData) => {
  var url = `https://obscure-temple-38871.herokuapp.com/api/v1/songs`
  var data = {
            name: songData[0].innerText,
            artist_name: songData[1].innerText,
            genre: " ",
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
  var url = `https://obscure-temple-38871.herokuapp.com/api/v1/favorites`
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
 $(".favorites-table .favorites-row").remove();
  favorites.forEach(song => {
  $('.favorites-table').append(`
      <tr class='favorites-row' id='${song['id']}'>
        <td>${song['name']}</td>
        <td>${song['artist_name']}</td>
        <td>${song['song_rating']}</td>
        <td> <select class="playlist-dropdown"> </select></td>
        <td><button class='playlist-button table-button-wide' id='${song['id']}'>Add to Playlist</button></td>
      </tr>`)
  })
  populatePlaylistDropdown()
  addToPlaylistListener()
}

const populatePlaylistDropdown = () => {
  var url = 'https://obscure-temple-38871.herokuapp.com/api/v1/playlists'
  $.get( url, function( data ) {
    data.forEach(playlist => {
      $('.playlist-dropdown').append(`
      <option value="${playlist.id}">${playlist.playlist_name}</option>
      `)
    })
  })}

const populatePlaylistList= () => {
  var url = 'https://obscure-temple-38871.herokuapp.com/api/v1/playlists'
 $(".playlist-list-table .playlist-row").remove();
  $.get( url, function( data ) {
    data.forEach(playlist => {
      $('.playlist-list-table').append(`
      <tr class='playlist-row'>
        <td><button class="playlist-link" id="${playlist.id}">${playlist.playlist_name}</button></td>
      </tr>
      `)
    })
  playlistListener()
  })

}

const populatePlaylistTable= (id) => {
  var url = `https://obscure-temple-38871.herokuapp.com/api/v1/playlists/${id}/songs`
  $.get( url, function( data ) {
    data['songs'].forEach(song => {
      $('.playlist-table').append(`
      <tr>
        <td>${song['name']}</td>
        <td>${song['artist_name']}</td>
        <td>${song['song_rating']}</td>
      </tr>`)
    })
    addToPlaylistListener()
  })}

const playlistListener = () => {
  $('.playlist-link').on('click', (event) => {
    populatePlaylistTable(event.currentTarget.id)
    $('.playlist-list-div').removeClass('flex')
    $('.playlist-list-div').addClass('hidden')
    $('#create-playlist').addClass('hidden')
    $('.playlist-table-div').removeClass('hidden')
    $('.playlist-table-div').addClass('flex')
  })
}

const playlistCreate = (name) => {
    var url = `https://obscure-temple-38871.herokuapp.com/api/v1/playlists`
    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json",
                "Accept": "application/json"},
        mode: "cors",
        body: JSON.stringify( {"playlist_name": name })

    }).catch( ( error ) => console.error({ error }) )
}

const addToPlaylistListener = () => {
  $('.playlist-button').on('click', (event) => {
    var playlist = event.currentTarget.parentElement.parentElement.children[3].children[0].value
    var song = event.currentTarget.parentElement.parentElement.id
    addToPlaylist(playlist, song)
  })
}

const addToPlaylist = (playlist, song ) => {
    var url = `https://obscure-temple-38871.herokuapp.com/api/v1/playlists/${playlist}/songs/${song}`
    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json",
                "Accept": "application/json"},
        mode: "cors",

    }).catch( ( error ) => console.error({ error }) )
}

export { postFavorite,
         getFavorites,
         populatePlaylistList,
         populatePlaylistTable,
         playlistCreate }
