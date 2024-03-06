const movieElement = document.getElementById("movieName");
const searchElement = document.getElementById("search");
const loadingAnimation = document.getElementById("loading");
const resultElement = document.getElementById("result");

let getMovie = () => {
  let movieName = movieElement.value;

  let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  if (movieName.length <= 0) {
    resultElement.innerHTML = `<h3 class="emptySubmit">Please enter movie name first!!!</h3>`;
    // console.log("Please enter movie name first!");
  } else {
    resultElement.style.display = "none";
    loadingAnimation.style.display = "initial";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        if (data.Response == "True") {
          resultElement.style.display = "initial";
          loadingAnimation.style.display = "none";
          resultElement.innerHTML = `
          <div class="mainDetails">
            <div class="poster" id="poster">
              <img src="${data.Poster}" alt="${data.Title} Movie poster">
            </div>
            <div class="details">
              <h3 class="title" id="title">${data.Title}</h3>
              <div class="rating">
                <span><i class="fa-solid fa-star"></i></span>
                <span id="imbd">${data.imdbRating}</span>
              </div>
              <div class="yearAndTime">
                <span id="otherRatings">${data.Rated}</span>
                <span class="dividers">|</span>
                <span id="year">${data.Year}</span>
                <span class="dividers">|</span>
                <span id="runTime">${data.Runtime}</span>
              </div>
              <div class="genre" id="genre">
                <div>${data.Genre.split(",").join("</div><div>")}</div>
              </div>
            </div>
          </div>
          <div class="otherDetails">
            <div id="cast" class="cast">
              <h4>Cast:</h4>
              <p>${data.Actors}</p>
            </div>
            <div id="plot" class="plot">
              <h4>Plot:</h4>
              <p>${data.Plot}</p>
            </div>
          </div>
    `;
        } else {
          resultElement.style.display = "initial";
          loadingAnimation.style.display = "none";
          resultElement.innerHTML = `
          <div class="ErrorMsg">
            <img src="./assets/not-found.png">
            <h3>${data.Error}</h3>
          </div>`;
        }
      })

      .catch(() => {
        resultElement.style.display = "initial";
        loadingAnimation.style.display = "none";
        resultElement.innerHTML = `<h3 class="ErrorMsg">Error Occured</h3>`;
      });
  }
};

//code for give result after enter pressed
movieElement.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    getMovie();
    event.target.blur();
  }
});

searchElement.addEventListener("click", getMovie);
