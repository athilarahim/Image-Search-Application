
let albumList = [];
let photoList = [];

let getAlbums = new Promise(resolve => {
  fetch('https://jsonplaceholder.typicode.com/albums')
    .then(function (response) { return response.json() })
    .then(function (json) { resolve(json) })
})

let getPhotos = new Promise(resolve => {
  fetch('https://jsonplaceholder.typicode.com/photos')
    .then(function (response) { return response.json() })
    .then(function (json) { resolve(json) })
})


async function storePhotos() {


  let x = await getPhotos
  //console.log(x);


  const request = indexedDB.open("photodb", 3);

  request.onerror = (event) => {

    console.log("error");
  };


  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    const objectStore = db.createObjectStore("photos", { keyPath: "id" });
  }

  request.onsuccess = (event) => {
    const db = event.target.result;

    const photosObjectStore = db.transaction('photos', "readwrite").objectStore('photos');
    x.forEach((album) => {
      //console.log(album);
      const updatedList = photosObjectStore.add(album);
      updatedList.onsuccess = () => {
        console.log("photos added");

      }

    });
  }
}


async function obtainPhotos() {

  const request = indexedDB.open("photodb", 3);

  request.onerror = (event) => {

    console.log("error");
  };


  request.onsuccess = (event) => {
    const db = event.target.result;
    const photoObjectStore = db.transaction('photos', "readwrite").objectStore('photos');


    const getdata = photoObjectStore.getAll()
    getdata.onsuccess = (event) => {
      photoList.push(getdata.result)



    }
  }
}


async function storeAlbums() {


  let x = await getAlbums
  //console.log(x);


  const request = indexedDB.open("albumdb", 3);

  request.onerror = (event) => {

    console.log("error");
  };


  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    const objectStore = db.createObjectStore("albums", { keyPath: "id" });
  }

  request.onsuccess = (event) => {
    const db = event.target.result;

    const albumObjectStore = db.transaction('albums', "readwrite").objectStore('albums');
    x.forEach((album) => {
      //console.log(album);
      const updatedList = albumObjectStore.add(album);
      updatedList.onsuccess = () => {
        console.log("albums added");

      }

    });
  }
}


async function obtainAlbum() {

  const request = indexedDB.open("albumdb", 3);

  request.onerror = (event) => {

    console.log("error");
  };


  request.onsuccess = (event) => {
    const db = event.target.result;

    const albumObjectStore = db.transaction('albums', "readwrite").objectStore('albums');


    const getdata = albumObjectStore.getAll()
    getdata.onsuccess = (event) => {
      // console.log("gotcha!!")
      // console.log(getdata.result)
      albumList.push(getdata.result)
      //////////////////
      var html = document.querySelector('.main')

      var row = 0;
      html.innerHTML = ""
      //console.log(albumList);
      while (row < albumList[0].length) {

        html.innerHTML += `<div class="row mainrow">`

        for (var k = 0; k < 5; k++) {

          html.innerHTML += `
    <div class="col-sm-2 col-md-2">
    <div class="card" id="pp">
    <div class="card-body">
    <h5 class="card-title">${albumList[0][row].title}</h5>
    </div>
    </div>
    </div>`
          row += 1;
        }


        html.innerHTML += `</div>`

      }



      var cardss = document.getElementsByClassName("card")
      for (var i = 0; i < cardss.length; i++) {
        cardss[i].setAttribute("id", albumList[0][i].id)
      }




      var clickable = document.querySelectorAll(".card")
      //console.log(clickable);


      clickable.forEach((x) => {
        x.addEventListener('click', () => {
          // console.log(x);
          Modal(x.id)
        })
      })
    }


    getdata.onerror = (event) => {
      console.log("error occured on get");
    }
  }
}


storeAlbums()
storePhotos()
obtainAlbum()
obtainPhotos()


function search() {
  console.log("searching...............");
  var searchname = document.getElementById("search").value;


  searchBy(searchname, albumList);

}



function searchBy(searchname, albumList) {
  console.log("inner serach......");
  var searching = new RegExp(`${searchname}`, "gi")
  var result = [];

  var resultalbumname = albumList[0].filter(function (el) {
    return searching.test(el.title);

  });

  result.push(...resultalbumname);

  var ss = document.querySelector('.main')
  ss.innerHTML = ""
  
  var row = 0;
  //console.log(result.length);
  console.log(result);
  while (row < result.length) {
    ss.innerHTML += `<div class="row mainrow">`
    for (var k = 0; k < 5; k++) {
      // console.log(result[row]);

        ss.innerHTML +=
          `
<div class="col-sm-2 col-md-2">
<div class="card" id="pp">
<div class="card-body">
<h5 class="card-title">${result[row].title}</h5>
</div>
</div>
</div>`
      row += 1;
    }
    ss.innerHTML += `</div>`
  }


  
  var cardss = document.getElementsByClassName("card")
 

  for (var i = 0; i < cardss.length; i++) {
    cardss[i].setAttribute("id", result[i].id)
  }


  var clickable = document.querySelectorAll(".card")

  clickable.forEach((x) => {
    x.addEventListener('click', () => {
      Modal(x.id)
    })
  })
}


/////////////////////search debounced///////////////////////////
function debounce(func, timeout) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const processChanges = debounce(() => search(), 500);


function Modal(num) {

  var disp = document.getElementById("showmodal");
  disp.innerHTML = ""
  var string = ""
  string += `<div id="myModal" class="modal">


  <div class="modal-content">
    <span class="close">&times;</span>`

  var row = 0;
  while (row < photoList[0].length) {
    string += `<div class="row mainrow">`
    for (var k = 0; k < 5; k++) {


      if (num == photoList[0][row].albumId) {
        string +=
          `

<div class="col-md-2">
<div class="card" id="pp">
<div class="card-body">
<div class="card-image" id="ph1"><img src="${photoList[0][row].url}"></div>
</div>
</div>
</div>

`
      }
      row += 1;
    }
   string += `</div>`

  }
  string += `</div></div>`

  disp.innerHTML = string
  var modal = document.getElementById("myModal");

  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";


  span.onclick = function () {
    modal.style.display = "none";
  }


  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
