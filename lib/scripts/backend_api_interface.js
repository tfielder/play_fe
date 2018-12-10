const postFavorite = (songData) => {
  data = {"songs": {
            "id": songData[4].innerText,
            "name": songData[0].innerText,
            "artist_name": songData[1].innerText,
            "genre": " ",
            "song_rating": songData[3].innerText
  }}
    return fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data)
    })
}

const getFavorites = () => {
  var url = `http://localhost:8181/api/v1/favorites`
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
      </tr>`)
  })
}

export { postFavorite, getFavorites }
