/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./scripts/events */ "./lib/scripts/events.js");

/***/ }),

/***/ "./lib/scripts/backend_api_interface.js":
/*!**********************************************!*\
  !*** ./lib/scripts/backend_api_interface.js ***!
  \**********************************************/
/*! exports provided: postFavorite, getFavorites, populatePlaylistList, populatePlaylistTable, playlistCreate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postFavorite", function() { return postFavorite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFavorites", function() { return getFavorites; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "populatePlaylistList", function() { return populatePlaylistList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "populatePlaylistTable", function() { return populatePlaylistTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playlistCreate", function() { return playlistCreate; });
var postFavorite = function postFavorite(songData) {
  var url = "https://obscure-temple-38871.herokuapp.com/api/v1/songs";
  var data = {
    name: songData[0].innerText,
    artist_name: songData[1].innerText,
    genre: " ",
    song_rating: songData[3].innerText
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    mode: "cors",
    body: JSON.stringify(data)
  }).catch(function (error) {
    return console.error({
      error: error
    });
  });
};

var getFavorites = function getFavorites() {
  var url = "https://obscure-temple-38871.herokuapp.com/api/v1/favorites";
  fetch(url, {
    mode: 'cors'
  }).then(function (result) {
    return result.json();
  }).then(function (parsedResults) {
    renderFavorites(parsedResults);
  });
};

var renderFavorites = function renderFavorites(favorites) {
  $(".favorites-table .favorites-row").remove();
  favorites.forEach(function (song) {
    $('.favorites-table').append("\n      <tr class='favorites-row' id='".concat(song['id'], "'>\n        <td>").concat(song['name'], "</td>\n        <td>").concat(song['artist_name'], "</td>\n        <td>").concat(song['song_rating'], "</td>\n        <td> <select class=\"playlist-dropdown\"> </select></td>\n        <td><button class='playlist-button table-button-wide' id='").concat(song['id'], "'>Add to Playlist</button></td>\n      </tr>"));
  });
  populatePlaylistDropdown();
  addToPlaylistListener();
};

var populatePlaylistDropdown = function populatePlaylistDropdown() {
  var url = 'https://obscure-temple-38871.herokuapp.com/api/v1/playlists';
  $.get(url, function (data) {
    data.forEach(function (playlist) {
      $('.playlist-dropdown').append("\n      <option value=\"".concat(playlist.id, "\">").concat(playlist.playlist_name, "</option>\n      "));
    });
  });
};

var populatePlaylistList = function populatePlaylistList() {
  var url = 'https://obscure-temple-38871.herokuapp.com/api/v1/playlists';
  $(".playlist-list-table .playlist-row").remove();
  $.get(url, function (data) {
    data.forEach(function (playlist) {
      $('.playlist-list-table').append("\n      <tr class='playlist-row'>\n        <td><button class=\"playlist-link\" id=\"".concat(playlist.id, "\">").concat(playlist.playlist_name, "</button></td>\n      </tr>\n      "));
    });
    playlistListener();
  });
};

var populatePlaylistTable = function populatePlaylistTable(id) {
  var url = "https://obscure-temple-38871.herokuapp.com/api/v1/playlists/".concat(id, "/songs");
  $.get(url, function (data) {
    data['songs'].forEach(function (song) {
      $('.playlist-table').append("\n      <tr>\n        <td>".concat(song['name'], "</td>\n        <td>").concat(song['artist_name'], "</td>\n        <td>").concat(song['song_rating'], "</td>\n      </tr>"));
    });
    addToPlaylistListener();
  });
};

var playlistListener = function playlistListener() {
  $('.playlist-link').on('click', function (event) {
    populatePlaylistTable(event.currentTarget.id);
    $('.playlist-list-div').removeClass('flex');
    $('.playlist-list-div').addClass('hidden');
    $('#create-playlist').addClass('hidden');
    $('.playlist-table-div').removeClass('hidden');
    $('.playlist-table-div').addClass('flex');
  });
};

var playlistCreate = function playlistCreate(name) {
  var url = "https://obscure-temple-38871.herokuapp.com/api/v1/playlists";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    mode: "cors",
    body: JSON.stringify({
      "playlist_name": name
    })
  }).catch(function (error) {
    return console.error({
      error: error
    });
  });
};

var addToPlaylistListener = function addToPlaylistListener() {
  $('.playlist-button').on('click', function (event) {
    var playlist = event.currentTarget.parentElement.parentElement.children[3].children[0].value;
    var song = event.currentTarget.parentElement.parentElement.id;
    addToPlaylist(playlist, song);
  });
};

var addToPlaylist = function addToPlaylist(playlist, song) {
  var url = "https://obscure-temple-38871.herokuapp.com/api/v1/playlists/".concat(playlist, "/songs/").concat(song);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    mode: "cors"
  }).catch(function (error) {
    return console.error({
      error: error
    });
  });
};



/***/ }),

/***/ "./lib/scripts/events.js":
/*!*******************************!*\
  !*** ./lib/scripts/events.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _music_match_interface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./music_match_interface.js */ "./lib/scripts/music_match_interface.js");
/* harmony import */ var _backend_api_interface_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./backend_api_interface.js */ "./lib/scripts/backend_api_interface.js");


$(document).ready(function () {
  // new
  searchMainListener();
  searchClickListener();
  searchEnterListener();
  favoritesMainListener();
  playlistsMainListener();
});

var searchMainListener = function searchMainListener() {
  $('#main-search').on('click', function () {
    clear();
    $('#search-div').removeClass('hidden');
    $('#search-div').addClass('flex');
  });
};

var clear = function clear() {
  // SEARCH
  $('#search-div').removeClass('flex');
  $('#search-div').addClass('hidden');
  $('.search-result-div').removeClass('flex');
  $('.search-result-div').addClass('hidden'); // FAVORITES

  $('.favorites-div').removeClass('flex');
  $('.favorites-div').addClass('hidden'); // Playlists

  $('.playlist-div').removeClass('flex');
  $('.playlist-div').addClass('hidden');
};

var favoritesMainListener = function favoritesMainListener() {
  $('#main-favorites').on('click', function () {
    clear();
    _backend_api_interface_js__WEBPACK_IMPORTED_MODULE_1__["getFavorites"]();
    $('.favorites-div').removeClass('hidden');
    $('.favorites-div').addClass('flex');
  });
};

var playlistsMainListener = function playlistsMainListener() {
  $('#main-playlists').on('click', function () {
    clear();
    _backend_api_interface_js__WEBPACK_IMPORTED_MODULE_1__["populatePlaylistList"]();
    $('.playlist-div').removeClass('hidden');
    $('.playlist-div').addClass('flex');
    $('.playlist-list-div').removeClass('hidden');
    $('.playlist-list-div').addClass('flex');
    createPlaylistListener();
  });
};

var searchClickListener = function searchClickListener() {
  $('#search-submit').on('click', function () {
    var query = $('#search-field').val();
    _music_match_interface_js__WEBPACK_IMPORTED_MODULE_0__["artistSearch"](query);
    $('#search-div').removeClass('flex');
    $('#search-div').addClass('hidden');
    $('.search-result-div').removeClass('hidden');
    $('.search-result-div').addClass('flex');
  });
};

var searchEnterListener = function searchEnterListener() {
  $("#search-field").keyup(function (event) {
    if (event.keyCode === 13) {
      $("#search-submit").click();
    }
  });
};

var favoriteSongListener = function favoriteSongListener() {
  $('.favorite-button').on('click', function (row) {
    var songData = row.currentTarget.parentElement.parentElement.children;
    _backend_api_interface_js__WEBPACK_IMPORTED_MODULE_1__["postFavorite"](songData);
  });
};

var playlistListener = function playlistListener() {
  $('.playlist-link').on('click', function () {
    _backend_api_interface_js__WEBPACK_IMPORTED_MODULE_1__["populatePlaylistTable"](event.currentTarget.id);
    $('.playlist-list-div').addClass('hidden');
    $('#create-playlist').addClass('hidden');
    $('.playlist-table').removeClass('hidden');
    $('.playlist-table').addClass('flex');
  });
};

var createPlaylistListener = function createPlaylistListener() {
  $('#create-playlist').on('click', function (event) {
    $('.playlist-list-div').addClass('hidden');
    $('#create-playlist').addClass('hidden');
    $('.create-playlist-div').removeClass('hidden');
    $('.create-playlist-div').addClass('flex');
    submitCreatePlaylistListener();
  });
};

var submitCreatePlaylistListener = function submitCreatePlaylistListener() {
  $('#playlist-submit').on('click', function () {
    var query = $('#playlist-name').val();
    _backend_api_interface_js__WEBPACK_IMPORTED_MODULE_1__["playlistCreate"](query);
    $('.create-playlist-div').removeClass('flex');
    $('.create-playlist-div').addClass('hidden');
  });
};

/***/ }),

/***/ "./lib/scripts/music_match_interface.js":
/*!**********************************************!*\
  !*** ./lib/scripts/music_match_interface.js ***!
  \**********************************************/
/*! exports provided: artistSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "artistSearch", function() { return artistSearch; });
/* harmony import */ var _backend_api_interface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./backend_api_interface.js */ "./lib/scripts/backend_api_interface.js");


var artistSearch = function artistSearch(artist) {
  var url = "https://api.musixmatch.com/ws/1.1/track.search?apikey=9664f01522de1910e847029ef487fd8f&q_artist=".concat(artist, "&format=json&page_size=50");
  fetch(url, {
    mode: 'cors'
  }).then(function (result) {
    return result.json();
  }).then(function (parsedResults) {
    renderResults(parsedResults['message']['body']['track_list']);
    favoriteSongListener();
  });
};

var renderResults = function renderResults(songs) {
  songs.forEach(function (song) {
    $('.search-table').append("\n      <tr class='search-result'>\n        <td class='search-td'>".concat(song['track']['track_name'], "</td>\n        <td>").concat(song['track']['artist_name'], "</td>\n        <td class='hidden'>").concat(song['track']['album_name'], "</td>\n        <td class='hidden'>").concat(song['track']['track_rating'], "</td>\n        <td class='hidden'>").concat(song['track']['track_id'], "</td>\n        <td class='search-td'><button class='table-button favorite-button' id='").concat(song['track']['track_id'], "'>Favorite</button></td>\n      </tr>\n      "));
  });
};

var favoriteSongListener = function favoriteSongListener() {
  $('.favorite-button').on('click', function (row) {
    var songData = row.currentTarget.parentElement.parentElement.children;
    _backend_api_interface_js__WEBPACK_IMPORTED_MODULE_0__["postFavorite"](songData);
  });
};



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9zY3JpcHRzL2JhY2tlbmRfYXBpX2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvc2NyaXB0cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3NjcmlwdHMvbXVzaWNfbWF0Y2hfaW50ZXJmYWNlLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJwb3N0RmF2b3JpdGUiLCJzb25nRGF0YSIsInVybCIsImRhdGEiLCJuYW1lIiwiaW5uZXJUZXh0IiwiYXJ0aXN0X25hbWUiLCJnZW5yZSIsInNvbmdfcmF0aW5nIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwibW9kZSIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJnZXRGYXZvcml0ZXMiLCJ0aGVuIiwicmVzdWx0IiwianNvbiIsInBhcnNlZFJlc3VsdHMiLCJyZW5kZXJGYXZvcml0ZXMiLCJmYXZvcml0ZXMiLCIkIiwicmVtb3ZlIiwiZm9yRWFjaCIsInNvbmciLCJhcHBlbmQiLCJwb3B1bGF0ZVBsYXlsaXN0RHJvcGRvd24iLCJhZGRUb1BsYXlsaXN0TGlzdGVuZXIiLCJnZXQiLCJwbGF5bGlzdCIsImlkIiwicGxheWxpc3RfbmFtZSIsInBvcHVsYXRlUGxheWxpc3RMaXN0IiwicGxheWxpc3RMaXN0ZW5lciIsInBvcHVsYXRlUGxheWxpc3RUYWJsZSIsIm9uIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInBsYXlsaXN0Q3JlYXRlIiwicGFyZW50RWxlbWVudCIsImNoaWxkcmVuIiwidmFsdWUiLCJhZGRUb1BsYXlsaXN0IiwiZG9jdW1lbnQiLCJyZWFkeSIsInNlYXJjaE1haW5MaXN0ZW5lciIsInNlYXJjaENsaWNrTGlzdGVuZXIiLCJzZWFyY2hFbnRlckxpc3RlbmVyIiwiZmF2b3JpdGVzTWFpbkxpc3RlbmVyIiwicGxheWxpc3RzTWFpbkxpc3RlbmVyIiwiY2xlYXIiLCJiYWNrZW5kQXBpSW50ZXJmYWNlIiwiY3JlYXRlUGxheWxpc3RMaXN0ZW5lciIsInF1ZXJ5IiwidmFsIiwibXVzaWNNYXRjaEludGVyZmFjZSIsImtleXVwIiwia2V5Q29kZSIsImNsaWNrIiwiZmF2b3JpdGVTb25nTGlzdGVuZXIiLCJyb3ciLCJzdWJtaXRDcmVhdGVQbGF5bGlzdExpc3RlbmVyIiwiYXJ0aXN0U2VhcmNoIiwiYXJ0aXN0IiwicmVuZGVyUmVzdWx0cyIsInNvbmdzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkFBLG1CQUFPLENBQUMsaURBQUQsQ0FBUCxDOzs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFNQyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDQyxRQUFELEVB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LElBQUksQ0FBQyxPQUFELENBQUosQ0FBYyxVQUFkLENBUC9FO0FBU08sR0FWUDtBQVVTLENBWFg7O0FBY0EsSUFBTXFDLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUIsR0FBTTtBQUNqQ3hDLEdBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCYyxFQUF0QixDQUF5QixPQUF6QixFQUFrQyxVQUFDMkIsR0FBRCxFQUFTO0FBQ3pDLFFBQUlsRSxRQUFRLEdBQUdrRSxHQUFHLENBQUN6QixhQUFKLENBQWtCSSxhQUFsQixDQUFnQ0EsYUFBaEMsQ0FBOENDLFFBQTdEO0FBQ0FXLDBFQUFBLENBQWlDekQsUUFBakM7QUFDRCxHQUhEO0FBSUQsQ0FMRCIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vbGliL2luZGV4LmpzXCIpO1xuIiwicmVxdWlyZSgnLi9zY3JpcHRzL2V2ZW50cycpXG5cbiIsImNvbnN0IHBvc3RGYXZvcml0ZSA9IChzb25nRGF0YSkgPT4ge1xuICB2YXIgdXJsID0gYGh0dHBzOi8vb2JzY3VyZS10ZW1wbGUtMzg4NzEuaGVyb2t1YXBwLmNvbS9hcGkvdjEvc29uZ3NgXG4gIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgbmFtZTogc29uZ0RhdGFbMF0uaW5uZXJUZXh0LFxuICAgICAgICAgICAgYXJ0aXN0X25hbWU6IHNvbmdEYXRhWzFdLmlubmVyVGV4dCxcbiAgICAgICAgICAgIGdlbnJlOiBcIiBcIixcbiAgICAgICAgICAgIHNvbmdfcmF0aW5nOiBzb25nRGF0YVszXS5pbm5lclRleHRcbiAgfVxuXG4gICAgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb25cIn0sXG4gICAgICAgIG1vZGU6IFwiY29yc1wiLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxuXG4gICAgfSkuY2F0Y2goICggZXJyb3IgKSA9PiBjb25zb2xlLmVycm9yKHsgZXJyb3IgfSkgKVxuXG59XG5cbmNvbnN0IGdldEZhdm9yaXRlcyA9ICgpID0+IHtcbiAgdmFyIHVybCA9IGBodHRwczovL29ic2N1cmUtdGVtcGxlLTM4ODcxLmhlcm9rdWFwcC5jb20vYXBpL3YxL2Zhdm9yaXRlc2BcbiAgZmV0Y2godXJsLCB7XG4gICAgbW9kZTogJ2NvcnMnXG4gIH0pXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHJldHVybiByZXN1bHQuanNvbigpO1xuICAgIH0pXG4gICAgLnRoZW4ocGFyc2VkUmVzdWx0cyA9PiB7XG4gICAgICByZW5kZXJGYXZvcml0ZXMocGFyc2VkUmVzdWx0cylcbiAgICB9KVxufVxuXG5jb25zdCByZW5kZXJGYXZvcml0ZXMgPSAoZmF2b3JpdGVzKSA9PiB7XG4gJChcIi5mYXZvcml0ZXMtdGFibGUgLmZhdm9yaXRlcy1yb3dcIikucmVtb3ZlKCk7XG4gIGZhdm9yaXRlcy5mb3JFYWNoKHNvbmcgPT4ge1xuICAkKCcuZmF2b3JpdGVzLXRhYmxlJykuYXBwZW5kKGBcbiAgICAgIDx0ciBjbGFzcz0nZmF2b3JpdGVzLXJvdycgaWQ9JyR7c29uZ1snaWQnXX0nPlxuICAgICAgICA8dGQ+JHtzb25nWyduYW1lJ119PC90ZD5cbiAgICAgICAgPHRkPiR7c29uZ1snYXJ0aXN0X25hbWUnXX08L3RkPlxuICAgICAgICA8dGQ+JHtzb25nWydzb25nX3JhdGluZyddfTwvdGQ+XG4gICAgICAgIDx0ZD4gPHNlbGVjdCBjbGFzcz1cInBsYXlsaXN0LWRyb3Bkb3duXCI+IDwvc2VsZWN0PjwvdGQ+XG4gICAgICAgIDx0ZD48YnV0dG9uIGNsYXNzPSdwbGF5bGlzdC1idXR0b24gdGFibGUtYnV0dG9uLXdpZGUnIGlkPScke3NvbmdbJ2lkJ119Jz5BZGQgdG8gUGxheWxpc3Q8L2J1dHRvbj48L3RkPlxuICAgICAgPC90cj5gKVxuICB9KVxuICBwb3B1bGF0ZVBsYXlsaXN0RHJvcGRvd24oKVxuICBhZGRUb1BsYXlsaXN0TGlzdGVuZXIoKVxufVxuXG5jb25zdCBwb3B1bGF0ZVBsYXlsaXN0RHJvcGRvd24gPSAoKSA9PiB7XG4gIHZhciB1cmwgPSAnaHR0cHM6Ly9vYnNjdXJlLXRlbXBsZS0zODg3MS5oZXJva3VhcHAuY29tL2FwaS92MS9wbGF5bGlzdHMnXG4gICQuZ2V0KCB1cmwsIGZ1bmN0aW9uKCBkYXRhICkge1xuICAgIGRhdGEuZm9yRWFjaChwbGF5bGlzdCA9PiB7XG4gICAgICAkKCcucGxheWxpc3QtZHJvcGRvd24nKS5hcHBlbmQoYFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cIiR7cGxheWxpc3QuaWR9XCI+JHtwbGF5bGlzdC5wbGF5bGlzdF9uYW1lfTwvb3B0aW9uPlxuICAgICAgYClcbiAgICB9KVxuICB9KX1cblxuY29uc3QgcG9wdWxhdGVQbGF5bGlzdExpc3Q9ICgpID0+IHtcbiAgdmFyIHVybCA9ICdodHRwczovL29ic2N1cmUtdGVtcGxlLTM4ODcxLmhlcm9rdWFwcC5jb20vYXBpL3YxL3BsYXlsaXN0cydcbiAkKFwiLnBsYXlsaXN0LWxpc3QtdGFibGUgLnBsYXlsaXN0LXJvd1wiKS5yZW1vdmUoKTtcbiAgJC5nZXQoIHVybCwgZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgZGF0YS5mb3JFYWNoKHBsYXlsaXN0ID0+IHtcbiAgICAgICQoJy5wbGF5bGlzdC1saXN0LXRhYmxlJykuYXBwZW5kKGBcbiAgICAgIDx0ciBjbGFzcz0ncGxheWxpc3Qtcm93Jz5cbiAgICAgICAgPHRkPjxidXR0b24gY2xhc3M9XCJwbGF5bGlzdC1saW5rXCIgaWQ9XCIke3BsYXlsaXN0LmlkfVwiPiR7cGxheWxpc3QucGxheWxpc3RfbmFtZX08L2J1dHRvbj48L3RkPlxuICAgICAgPC90cj5cbiAgICAgIGApXG4gICAgfSlcbiAgcGxheWxpc3RMaXN0ZW5lcigpXG4gIH0pXG5cbn1cblxuY29uc3QgcG9wdWxhdGVQbGF5bGlzdFRhYmxlPSAoaWQpID0+IHtcbiAgdmFyIHVybCA9IGBodHRwczovL29ic2N1cmUtdGVtcGxlLTM4ODcxLmhlcm9rdWFwcC5jb20vYXBpL3YxL3BsYXlsaXN0cy8ke2lkfS9zb25nc2BcbiAgJC5nZXQoIHVybCwgZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgZGF0YVsnc29uZ3MnXS5mb3JFYWNoKHNvbmcgPT4ge1xuICAgICAgJCgnLnBsYXlsaXN0LXRhYmxlJykuYXBwZW5kKGBcbiAgICAgIDx0cj5cbiAgICAgICAgPHRkPiR7c29uZ1snbmFtZSddfTwvdGQ+XG4gICAgICAgIDx0ZD4ke3NvbmdbJ2FydGlzdF9uYW1lJ119PC90ZD5cbiAgICAgICAgPHRkPiR7c29uZ1snc29uZ19yYXRpbmcnXX08L3RkPlxuICAgICAgPC90cj5gKVxuICAgIH0pXG4gICAgYWRkVG9QbGF5bGlzdExpc3RlbmVyKClcbiAgfSl9XG5cbmNvbnN0IHBsYXlsaXN0TGlzdGVuZXIgPSAoKSA9PiB7XG4gICQoJy5wbGF5bGlzdC1saW5rJykub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgcG9wdWxhdGVQbGF5bGlzdFRhYmxlKGV2ZW50LmN1cnJlbnRUYXJnZXQuaWQpXG4gICAgJCgnLnBsYXlsaXN0LWxpc3QtZGl2JykucmVtb3ZlQ2xhc3MoJ2ZsZXgnKVxuICAgICQoJy5wbGF5bGlzdC1saXN0LWRpdicpLmFkZENsYXNzKCdoaWRkZW4nKVxuICAgICQoJyNjcmVhdGUtcGxheWxpc3QnKS5hZGRDbGFzcygnaGlkZGVuJylcbiAgICAkKCcucGxheWxpc3QtdGFibGUtZGl2JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpXG4gICAgJCgnLnBsYXlsaXN0LXRhYmxlLWRpdicpLmFkZENsYXNzKCdmbGV4JylcbiAgfSlcbn1cblxuY29uc3QgcGxheWxpc3RDcmVhdGUgPSAobmFtZSkgPT4ge1xuICAgIHZhciB1cmwgPSBgaHR0cHM6Ly9vYnNjdXJlLXRlbXBsZS0zODg3MS5oZXJva3VhcHAuY29tL2FwaS92MS9wbGF5bGlzdHNgXG4gICAgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb25cIn0sXG4gICAgICAgIG1vZGU6IFwiY29yc1wiLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSgge1wicGxheWxpc3RfbmFtZVwiOiBuYW1lIH0pXG5cbiAgICB9KS5jYXRjaCggKCBlcnJvciApID0+IGNvbnNvbGUuZXJyb3IoeyBlcnJvciB9KSApXG59XG5cbmNvbnN0IGFkZFRvUGxheWxpc3RMaXN0ZW5lciA9ICgpID0+IHtcbiAgJCgnLnBsYXlsaXN0LWJ1dHRvbicpLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIHZhciBwbGF5bGlzdCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzNdLmNoaWxkcmVuWzBdLnZhbHVlXG4gICAgdmFyIHNvbmcgPSBldmVudC5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZFxuICAgIGFkZFRvUGxheWxpc3QocGxheWxpc3QsIHNvbmcpXG4gIH0pXG59XG5cbmNvbnN0IGFkZFRvUGxheWxpc3QgPSAocGxheWxpc3QsIHNvbmcgKSA9PiB7XG4gICAgdmFyIHVybCA9IGBodHRwczovL29ic2N1cmUtdGVtcGxlLTM4ODcxLmhlcm9rdWFwcC5jb20vYXBpL3YxL3BsYXlsaXN0cy8ke3BsYXlsaXN0fS9zb25ncy8ke3Nvbmd9YFxuICAgIGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9LFxuICAgICAgICBtb2RlOiBcImNvcnNcIixcblxuICAgIH0pLmNhdGNoKCAoIGVycm9yICkgPT4gY29uc29sZS5lcnJvcih7IGVycm9yIH0pIClcbn1cblxuZXhwb3J0IHsgcG9zdEZhdm9yaXRlLFxuICAgICAgICAgZ2V0RmF2b3JpdGVzLFxuICAgICAgICAgcG9wdWxhdGVQbGF5bGlzdExpc3QsXG4gICAgICAgICBwb3B1bGF0ZVBsYXlsaXN0VGFibGUsXG4gICAgICAgICBwbGF5bGlzdENyZWF0ZSB9XG4iLCJpbXBvcnQgKiBhcyBtdXNpY01hdGNoSW50ZXJmYWNlIGZyb20gJy4vbXVzaWNfbWF0Y2hfaW50ZXJmYWNlLmpzJztcbmltcG9ydCAqIGFzIGJhY2tlbmRBcGlJbnRlcmZhY2UgZnJvbSAnLi9iYWNrZW5kX2FwaV9pbnRlcmZhY2UuanMnO1xuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gIC8vIG5ld1xuICBzZWFyY2hNYWluTGlzdGVuZXIoKVxuICBzZWFyY2hDbGlja0xpc3RlbmVyKClcbiAgc2VhcmNoRW50ZXJMaXN0ZW5lcigpXG4gIGZhdm9yaXRlc01haW5MaXN0ZW5lcigpXG4gIHBsYXlsaXN0c01haW5MaXN0ZW5lcigpXG59KTtcblxuY29uc3Qgc2VhcmNoTWFpbkxpc3RlbmVyPSAoKSA9PiB7XG4gICQoJyNtYWluLXNlYXJjaCcpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICBjbGVhcigpXG4gICAgJCgnI3NlYXJjaC1kaXYnKS5yZW1vdmVDbGFzcygnaGlkZGVuJylcbiAgICAkKCcjc2VhcmNoLWRpdicpLmFkZENsYXNzKCdmbGV4JylcbiAgfSlcbn1cblxuY29uc3QgY2xlYXIgPSAoKSA9PiB7XG4gIC8vIFNFQVJDSFxuICAkKCcjc2VhcmNoLWRpdicpLnJlbW92ZUNsYXNzKCdmbGV4JylcbiAgJCgnI3NlYXJjaC1kaXYnKS5hZGRDbGFzcygnaGlkZGVuJylcblxuICAkKCcuc2VhcmNoLXJlc3VsdC1kaXYnKS5yZW1vdmVDbGFzcygnZmxleCcpXG4gICQoJy5zZWFyY2gtcmVzdWx0LWRpdicpLmFkZENsYXNzKCdoaWRkZW4nKVxuXG4gIC8vIEZBVk9SSVRFU1xuICAkKCcuZmF2b3JpdGVzLWRpdicpLnJlbW92ZUNsYXNzKCdmbGV4JylcbiAgJCgnLmZhdm9yaXRlcy1kaXYnKS5hZGRDbGFzcygnaGlkZGVuJylcblxuICAvLyBQbGF5bGlzdHNcbiAgJCgnLnBsYXlsaXN0LWRpdicpLnJlbW92ZUNsYXNzKCdmbGV4JylcbiAgJCgnLnBsYXlsaXN0LWRpdicpLmFkZENsYXNzKCdoaWRkZW4nKVxufVxuXG5cbmNvbnN0IGZhdm9yaXRlc01haW5MaXN0ZW5lcj0gKCkgPT4ge1xuICAkKCcjbWFpbi1mYXZvcml0ZXMnKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgY2xlYXIoKVxuICAgIGJhY2tlbmRBcGlJbnRlcmZhY2UuZ2V0RmF2b3JpdGVzKClcbiAgICAkKCcuZmF2b3JpdGVzLWRpdicpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKVxuICAgICQoJy5mYXZvcml0ZXMtZGl2JykuYWRkQ2xhc3MoJ2ZsZXgnKVxuICB9KVxufVxuXG5jb25zdCBwbGF5bGlzdHNNYWluTGlzdGVuZXI9ICgpID0+IHtcbiAgJCgnI21haW4tcGxheWxpc3RzJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNsZWFyKClcbiAgICBiYWNrZW5kQXBpSW50ZXJmYWNlLnBvcHVsYXRlUGxheWxpc3RMaXN0KClcbiAgICAkKCcucGxheWxpc3QtZGl2JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpXG4gICAgJCgnLnBsYXlsaXN0LWRpdicpLmFkZENsYXNzKCdmbGV4JylcbiAgICAkKCcucGxheWxpc3QtbGlzdC1kaXYnKS5yZW1vdmVDbGFzcygnaGlkZGVuJylcbiAgICAkKCcucGxheWxpc3QtbGlzdC1kaXYnKS5hZGRDbGFzcygnZmxleCcpXG4gICAgY3JlYXRlUGxheWxpc3RMaXN0ZW5lcigpXG4gIH0pXG59XG5cbmNvbnN0IHNlYXJjaENsaWNrTGlzdGVuZXIgPSAoKSA9PiB7XG4gICQoJyNzZWFyY2gtc3VibWl0Jykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgIHZhciBxdWVyeSA9ICQoJyNzZWFyY2gtZmllbGQnKS52YWwoKVxuICAgIG11c2ljTWF0Y2hJbnRlcmZhY2UuYXJ0aXN0U2VhcmNoKHF1ZXJ5KVxuICAgICQoJyNzZWFyY2gtZGl2JykucmVtb3ZlQ2xhc3MoJ2ZsZXgnKVxuICAgICQoJyNzZWFyY2gtZGl2JykuYWRkQ2xhc3MoJ2hpZGRlbicpXG4gICAgJCgnLnNlYXJjaC1yZXN1bHQtZGl2JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpXG4gICAgJCgnLnNlYXJjaC1yZXN1bHQtZGl2JykuYWRkQ2xhc3MoJ2ZsZXgnKVxuICB9KVxufVxuXG5jb25zdCBzZWFyY2hFbnRlckxpc3RlbmVyPSAoKSA9PiB7XG4gICQoXCIjc2VhcmNoLWZpZWxkXCIpLmtleXVwKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAkKFwiI3NlYXJjaC1zdWJtaXRcIikuY2xpY2soKTtcbiAgICB9XG59KX1cblxuY29uc3QgZmF2b3JpdGVTb25nTGlzdGVuZXIgPSAoKSA9PiB7XG4gICQoJy5mYXZvcml0ZS1idXR0b24nKS5vbignY2xpY2snLCAocm93KSA9PiB7XG4gICAgdmFyIHNvbmdEYXRhID0gcm93LmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuXG4gICAgYmFja2VuZEFwaUludGVyZmFjZS5wb3N0RmF2b3JpdGUoc29uZ0RhdGEpXG4gIH0pXG59XG5cblxuY29uc3QgcGxheWxpc3RMaXN0ZW5lciA9ICgpID0+IHtcbiAgJCgnLnBsYXlsaXN0LWxpbmsnKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgYmFja2VuZEFwaUludGVyZmFjZS5wb3B1bGF0ZVBsYXlsaXN0VGFibGUoZXZlbnQuY3VycmVudFRhcmdldC5pZClcbiAgICAkKCcucGxheWxpc3QtbGlzdC1kaXYnKS5hZGRDbGFzcygnaGlkZGVuJylcbiAgICAkKCcjY3JlYXRlLXBsYXlsaXN0JykuYWRkQ2xhc3MoJ2hpZGRlbicpXG4gICAgJCgnLnBsYXlsaXN0LXRhYmxlJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpXG4gICAgJCgnLnBsYXlsaXN0LXRhYmxlJykuYWRkQ2xhc3MoJ2ZsZXgnKVxuICB9KVxufVxuXG5jb25zdCBjcmVhdGVQbGF5bGlzdExpc3RlbmVyID0gKCkgPT4ge1xuICAkKCcjY3JlYXRlLXBsYXlsaXN0Jykub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgJCgnLnBsYXlsaXN0LWxpc3QtZGl2JykuYWRkQ2xhc3MoJ2hpZGRlbicpXG4gICAgJCgnI2NyZWF0ZS1wbGF5bGlzdCcpLmFkZENsYXNzKCdoaWRkZW4nKVxuICAgICQoJy5jcmVhdGUtcGxheWxpc3QtZGl2JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpXG4gICAgJCgnLmNyZWF0ZS1wbGF5bGlzdC1kaXYnKS5hZGRDbGFzcygnZmxleCcpXG4gICAgc3VibWl0Q3JlYXRlUGxheWxpc3RMaXN0ZW5lcigpXG4gIH0pXG59XG5cbmNvbnN0IHN1Ym1pdENyZWF0ZVBsYXlsaXN0TGlzdGVuZXIgPSAoKSA9PiB7XG4gICQoJyNwbGF5bGlzdC1zdWJtaXQnKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgdmFyIHF1ZXJ5ID0gJCgnI3BsYXlsaXN0LW5hbWUnKS52YWwoKVxuICAgIGJhY2tlbmRBcGlJbnRlcmZhY2UucGxheWxpc3RDcmVhdGUocXVlcnkpXG4gICAgJCgnLmNyZWF0ZS1wbGF5bGlzdC1kaXYnKS5yZW1vdmVDbGFzcygnZmxleCcpXG4gICAgJCgnLmNyZWF0ZS1wbGF5bGlzdC1kaXYnKS5hZGRDbGFzcygnaGlkZGVuJylcbiAgfSlcbn1cblxuIiwiaW1wb3J0ICogYXMgYmFja2VuZEFwaUludGVyZmFjZSBmcm9tICcuL2JhY2tlbmRfYXBpX2ludGVyZmFjZS5qcyc7XG5cbmNvbnN0IGFydGlzdFNlYXJjaCA9IChhcnRpc3QpID0+IHtcbiAgdmFyIHVybCA9IGBodHRwczovL2FwaS5tdXNpeG1hdGNoLmNvbS93cy8xLjEvdHJhY2suc2VhcmNoP2FwaWtleT05NjY0ZjAxNTIyZGUxOTEwZTg0NzAyOWVmNDg3ZmQ4ZiZxX2FydGlzdD0ke2FydGlzdH0mZm9ybWF0PWpzb24mcGFnZV9zaXplPTUwYFxuICBmZXRjaCh1cmwsIHtcbiAgICBtb2RlOiAnY29ycydcbiAgfSlcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgcmV0dXJuIHJlc3VsdC5qc29uKCk7XG4gICAgfSlcbiAgICAudGhlbihwYXJzZWRSZXN1bHRzID0+IHtcbiAgICAgIHJlbmRlclJlc3VsdHMocGFyc2VkUmVzdWx0c1snbWVzc2FnZSddWydib2R5J11bJ3RyYWNrX2xpc3QnXSlcbiAgICAgIGZhdm9yaXRlU29uZ0xpc3RlbmVyKClcblxuICAgIH0pXG59XG5cbmNvbnN0IHJlbmRlclJlc3VsdHMgPSAoc29uZ3MpID0+IHtcbiAgc29uZ3MuZm9yRWFjaChzb25nID0+IHtcbiAgJCgnLnNlYXJjaC10YWJsZScpLmFwcGVuZChgXG4gICAgICA8dHIgY2xhc3M9J3NlYXJjaC1yZXN1bHQnPlxuICAgICAgICA8dGQgY2xhc3M9J3NlYXJjaC10ZCc+JHtzb25nWyd0cmFjayddWyd0cmFja19uYW1lJ119PC90ZD5cbiAgICAgICAgPHRkPiR7c29uZ1sndHJhY2snXVsnYXJ0aXN0X25hbWUnXX08L3RkPlxuICAgICAgICA8dGQgY2xhc3M9J2hpZGRlbic+JHtzb25nWyd0cmFjayddWydhbGJ1bV9uYW1lJ119PC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPSdoaWRkZW4nPiR7c29uZ1sndHJhY2snXVsndHJhY2tfcmF0aW5nJ119PC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPSdoaWRkZW4nPiR7c29uZ1sndHJhY2snXVsndHJhY2tfaWQnXX08L3RkPlxuICAgICAgICA8dGQgY2xhc3M9J3NlYXJjaC10ZCc+PGJ1dHRvbiBjbGFzcz0ndGFibGUtYnV0dG9uIGZhdm9yaXRlLWJ1dHRvbicgaWQ9JyR7c29uZ1sndHJhY2snXVsndHJhY2tfaWQnXX0nPkZhdm9yaXRlPC9idXR0b24+PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICBgKX0pfVxuXG5cbmNvbnN0IGZhdm9yaXRlU29uZ0xpc3RlbmVyID0gKCkgPT4ge1xuICAkKCcuZmF2b3JpdGUtYnV0dG9uJykub24oJ2NsaWNrJywgKHJvdykgPT4ge1xuICAgIHZhciBzb25nRGF0YSA9IHJvdy5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblxuICAgIGJhY2tlbmRBcGlJbnRlcmZhY2UucG9zdEZhdm9yaXRlKHNvbmdEYXRhKVxuICB9KVxufVxuXG5leHBvcnQgeyBhcnRpc3RTZWFyY2ggfTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==