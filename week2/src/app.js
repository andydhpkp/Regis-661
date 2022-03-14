var object = {
  name: 'Andrew',
  favArtist: 'Red Hot Chili Peppers',
  favTv: 'Breaking Bad',
  favMovie: 'Jaws'
};

class Person {
  name;
  favArtist;
  favTv;
  favMovie;

  constructor(name, favArtist, favTv, favMovie) {
    this.name = name;
    this.favArtist = favArtist;
    this.favTv = favTv;
    this.favMovie = favMovie;
  }
}

function displayFavs() {

  const userName = document.getElementById('name').value
  const artist = document.getElementById('musicArtist').value
  const show = document.getElementById('tvShow').value
  const movie = document.getElementById('movie').value
  console.log(userName)

  let favsDiv = document.createElement('div');
  let favsContent = 'Hello ' + userName + ', Your favorite artist is: ' + artist + ', Your favorite TV show is: ' + show + ', and Your favorite Movie is: ' + movie
  favsDiv.innerHTML = favsContent;
  favsDiv.setAttribute('id', 'newFavsDiv')
  document.body.appendChild(favsDiv)
}


