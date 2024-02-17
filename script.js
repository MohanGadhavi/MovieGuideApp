const movieElement = document.getElementById("movieName");
const searchElement = document.getElementById("search");
const resultElement = document.getElementById("result");

let getMovie = () => {
  let movieName = movieElement.value;
  let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  if (movieName.length <= 0) {
    resultElement.innerHTML = `<h3 class="emptySubmit">Please enter movie name first!</h3>`;
    console.log("Please enter movie name first!");
  } else {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.Poster);
        console.log(data.Title);
        console.log(data.Genre);
        console.log(data.Year);
        console.log(data.Director);
        console.log(data.Actors);
        console.log(data.imdbRating);
        console.log(data.Runtime);
        console.log(data.Plot);
      });
  }
};

window.addEventListener("load", getMovie);
