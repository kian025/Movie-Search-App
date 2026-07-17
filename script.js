const movieInput = document.querySelector(".movie-input");
const searchBtn = document.querySelector(".search-btn");
const Moviecontainer = document.querySelector(".movies");
const apiKey = "837d3acf";

searchBtn.addEventListener("click", function () {
  const movieName = movieInput.value.trim();
  if (movieName === "") return;
  searchMovie(movieName);
});
/////////////////
movieInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const movieName = movieInput.value.trim();
    if (!movieName) return;

    searchMovie(movieName);
  }
});

async function searchMovie(movieName) {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert("movie not found");
      return;
    }
    const Data = await response.json();

    if (Data.Response === "False") {
      Moviecontainer.innerHTML =
        "<h2 style='color:white;text-align:center;'>Movie Not Found 😢</h2>";
      return;
    }
    rendermovies(Data.Search);
    movieInput.focus();
    movieInput.value = "";
  } catch (error) {
    console.log(error);
    Moviecontainer.innerHTML =
      "<h2 style='color:white;text-align:center;'>Something Went Wrong!</h2>";
  }
}

function rendermovies(movies) {
  Moviecontainer.innerHTML = "";
  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movie-card");

    div.innerHTML = ` <img src="${movie.Poster}" class="poster">

            <div class="movie-info">

                <h2 class="title">${movie.Title}</h2>

                <p class="year">
                    Year : ${movie.Year}
                </p>

                <p class="type">
                    ${movie.Type}
                </p>

            </div>`;
    Moviecontainer.append(div);
  });
}
