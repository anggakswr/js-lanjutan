// // jika tombol search diklik
// $('.search-button').on('click',function() {
//   searchMovie();
// });
//
// // ketika tombol enter dipencet
// $('.input-keyword').on('keyup',function(cari) {
//   if(cari.keyCode === 13) {
//     searchMovie();
//   }
// });
//
// // ambil data dr api
// function searchMovie() {
//   $.ajax({
//     url: 'http://www.omdbapi.com/?apikey=181b9517&s=' + $('.input-keyword').val(),
//     success: results => {
//       const movies = results.Search;
//       let cards = '';
//       movies.forEach(m => {
//         cards += showCards(m);
//       });
//       $('.movies').html(cards);
//     },
//     error: e => {
//       console.log(e.responseText);
//     }
//   });
// }
//
// // ketika tombol detail di klik
// // $('.modal-detail-button').on('click',function() {}); // tdk bs lgsg melakukan ini krn wkt awal hal di load, .modal-detail-button blm ada (tonton event bubbling di DOM)
// $('.movies').on('click','.modal-detail-button',function() {
//   // ketika .modal-detail-button yg di dalam .movies diklik, maka..
//   $.ajax({
//     url: 'http://www.omdbapi.com/?apikey=181b9517&i=' + $(this).data('imdbid'),
//     success: d => {
//       const movieDetail = showMovieDetail(d);
//       $('.modal-body').html(movieDetail);
//     },
//     error: e => {
//       console.log(e.responseText);
//     }
//   });
// });

// cari movie pk fetch
function searchMovie() {
  const inputKeyword = document.querySelector('.input-keyword');
  fetch('http://www.omdbapi.com/?apikey=181b9517&s=' + inputKeyword.value)
  // fetch = function yg me-return / menghasilkan promise
  .then(response => response.json()) // disini msh berbentuk promise, maka hrs lakukan then lg
  .then(response => {
    if (response.Response == "True") {
      const movies = response.Search;
      let cards = '';
      movies.forEach(m => {
        cards += showCards(m);
      });
      document.querySelector('.movies').innerHTML = cards;

      // jika tombol detail diklik
      const modalDetailButton = document.querySelectorAll('.modal-detail-button');
      modalDetailButton.forEach(btn => {
        btn.addEventListener('click',function() {
          const imdbid = this.dataset.imdbid;
          fetch('http://www.omdbapi.com/?apikey=181b9517&i=' + imdbid)
          .then(response => response.json())
          .then(m => {
            const movieDetail = showMovieDetail(m);
            document.querySelector('.modal-body').innerHTML = movieDetail;
          });
        });
      });
    } else {
      document.querySelector('.movies').innerHTML = response.Error;
    }

  })
  .catch(response => console.log(response));
}

// ketika tombol search diklik
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click',function() {
  searchMovie();
});

// ketika tombol enter kotak pencarian ditekan
const inputSearch = document.querySelector('.input-keyword');
inputSearch.addEventListener('keyup',function(e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});

function showCards(m) {
  return `
    <div class="col-md-4 my-5">
      <div class="card">
        <img src="${m.Poster}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Sinopsis</a>
        </div>
      </div>
    </div>`;
}

function showMovieDetail(d) {
  return `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
        <img src="${d.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
          <ul class="list-group">
            <li class="list-group-item"><h4>${d.Title}</h4></li>
            <li class="list-group-item"><strong>Director: </strong>${d.Director}</li>
            <li class="list-group-item"><strong>Actors: </strong>${d.Actors}</li>
            <li class="list-group-item"><strong>Writer: </strong>${d.Writer}</li>
            <li class="list-group-item"><strong>Plot: </strong> <br>${d.Plot}</li>
          </ul>
        </div>
      </div>
    </div>`;
}
