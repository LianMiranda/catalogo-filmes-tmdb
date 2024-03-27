const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjEzODE5MzM0NDlkNWQxNWY3ZDBiNmE2YjFmODdhMSIsInN1YiI6IjYxMTcxNmY0MzUwMzk4MDAyZGI3Yzk1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ys_LkZ7sDiPL14OdvOVP0N5VZr3-IbyR1G4BwIeCLXs",
  },
};

const divFilme = document.querySelector("#bloco-filmes");
const formater = Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', year: 'numeric'})

function cor(vote_average){
    if((vote_average * 10).toFixed(0) >= 70){
      return "green";
    }
    
    if (vote_average * 10 >= 50){
      return "orange";
    }
    
    return "red";
}

const lista_filmes = fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
  )
  .then((response) => response.json())
  .then((response) => {
    console.log(response.results);
    
    response.results.forEach((film) => {
      let color = cor(film.vote_average);
      divFilme.innerHTML += `
      <div class="filme" id=${film.id}>
      
        <div class="filme-card">

          <img src=https://image.tmdb.org/t/p/w200${film.poster_path}>
        
          <div class="info-geral">
              <div class="circulo-porcentagem">
                <p class="vote">${(film.vote_average * 10).toFixed(0)}<sup>%</sup></p>
              
                <div class="porcentagem-line ${color}"></div>
              </div>
              
              <div class= "info-filme">
                <a href=""><h2 class = "title">${film.title}</h2></a>
                <p class="date">${formater.format(new Date(film.release_date))}</p>
              </div>
            </div>
        </div>
      </div>
    `;
    });
  })
  .catch((err) => console.error(err));
  