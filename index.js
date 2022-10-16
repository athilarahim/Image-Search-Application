
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
    console.log(x);


    const request = indexedDB.open("photodb", 3);

    request.onerror = (event) => {

        console.log("error");
    };


    request.onupgradeneeded = (event) => {
        const db = event.target.result;

        const objectStore = db.createObjectStore("photos", { keyPath: "id" });

        //     objectStore.createIndex("albumId", "albumId", { unique: false });

        //     objectStore.createIndex("title", "title", { unique: false });
        //     objectStore.createIndex("thumbnailUrl", "thumbnailUrl", { unique: true });

        //     objectStore.createIndex("url", "url", { unique: true });
        //    //  console.log("hiiiii");

        objectStore.transaction.oncomplete = (event) => {

            const photoObjectStore = db.transaction('photos', "readwrite").objectStore('photos');
            x.forEach((photo) => {
                //console.log(photo);
                const updatedList = photoObjectStore.add(photo);
                updatedList.onsuccess = () => {
                    console.log("photos added");

                }

            });

            const getdata = photoObjectStore.getAll()
            getdata.onsuccess = (event) => {
                console.log("gotcha!!");
                photoList.push(getdata.result)
                //console.log(getdata.result);
            }
            getdata.onerror = (event) => {
                console.log("error occured on get");
            }

        };
    };

}


async function storeAlbums() {


    let x = await getAlbums
    console.log(x);


    const request = indexedDB.open("albumdb", 3);

    request.onerror = (event) => {

        console.log("error");
    };


    request.onupgradeneeded = (event) => {
        const db = event.target.result;

        const objectStore = db.createObjectStore("albums", { keyPath: "id" });

        //     objectStore.createIndex("albumId", "albumId", { unique: false });

        //     objectStore.createIndex("title", "title", { unique: false });
        //     objectStore.createIndex("thumbnailUrl", "thumbnailUrl", { unique: true });

        //     objectStore.createIndex("url", "url", { unique: true });
        //    //  console.log("hiiiii");

        objectStore.transaction.oncomplete = (event) => {

            const albumObjectStore = db.transaction('albums', "readwrite").objectStore('albums');
            x.forEach((album) => {
                //console.log(album);
                const updatedList = albumObjectStore.add(album);
                updatedList.onsuccess = () => {
                    console.log("albums added");

                }

            });


            const getdata = albumObjectStore.getAll()
            getdata.onsuccess = (event) => {
                console.log("gotcha!!")
                console.log(getdata.result)
                albumList.push(getdata.result)
                //////////////////
                let j = 0;
                var html = document.querySelector('.main')
                for (let i = 0; i < (albumList[0].length) / 5; i++) {
                    html.innerHTML += `
                <div class="row mainrow">
        <div class="col-sm-2 col-md-2" >
          <div class="card" >
            <div class="card-body" id="cc">
              <h5 class="card-title" id="cr1">${albumList[0][j].title}</h5>
              
            </div>
          </div>
        </div>
        <div class="col-sm-2 col-md-2">
          <div class="card" >
            <div class="card-body" id="cc">
              <h5 class="card-title" id="cr2">${albumList[0][j + 1].title}</h5>
              
            </div>
          </div>
        </div>
        <div class="col-sm-2 col-md-2">
            <div class="card" >
              <div class="card-body" id="cc" >
                <h5 class="card-title" id="cr3">${albumList[0][j + 2].title}</h5>
                
              </div>
            </div>
          </div>
          <div class="col-sm-2 col-md-2" >
            <div class="card" >
              <div class="card-body" id="cc">
                <h5 class="card-title" id="cr4">${albumList[0][j + 3].title}</h5>
                
              </div>
            </div>
          </div>
          <div class="col-sm-2 col-md-2" >
            <div class="card">
              <div class="card-body" id="cc" >
                <h5 class="card-title" id="cr5">${albumList[0][j + 4].title}</h5>
           
              </div>
            </div>
          </div>
    </div>
          `
                    j = j + 5;
                }
                document.getElementById("cc").addEventListener('click', ShowData)

            }


            getdata.onerror = (event) => {
                console.log("error occured on get");
            }

            function ShowData() {
                var display = document.querySelector('.show')
                // for (var i = 0; i < albumList[0].length; i++){ 
                for (var k = 0; k < 5000; k++) {
                    if (albumList[0][0].id == photoList[0][k].albumId)
                        display.innerHTML +=
                            `
                <div class="row mainrow">
        <div class="col-sm-2 col-md-2">
          <div class="card" id="pp">
            <div class="card-body">
              <div class="card-image" id="ph1"><img src="${photoList[0][k].url}"></div>
              
            </div>
          </div>
        </div>
        <div class="col-sm-2 col-md-2">
        <div class="card" id="pp">
        <div class="card-body">
          <div class="card-image" id="ph2"><img src="${photoList[0][k + 1].url}"></div>
          
            </div>
          </div>
        </div>
        <div class="col-sm-2 col-md-2">
        <div class="card" id="pp">
        <div class="card-body">
          <div class="card-image" id="ph3"><img src="${photoList[0][k + 2].url}"></div>
          
              </div>
            </div>
          </div>
          <div class="col-sm-2 col-md-2">
          <div class="card" id="pp">
          <div class="card-body">
            <div class="card-image" id="ph4"><img src="${photoList[0][k + 3].url}"></div>
             
              </div>
            </div>
          </div>
          <div class="col-sm-2 col-md-2">
          <div class="card" id="pp">
          <div class="card-body">
            <div class="card-image" id="ph5"><img src="${photoList[0][k + 4].url}"></div>
            
              </div>
            </div>
          </div>
    </div>
                `
                    k = k + 5;
                }
            }
        }

    };
};



//}


storeAlbums()
storePhotos()


function createCards(result) {

    var html = document.querySelector('.main')
    html.style.display = "none"

    var ss = document.querySelector('.searchlist')
    console.log("hooooooooooo");
    ss.style.display = "block"
    ss.innerHTML += `<div class="row">`
    for (let i = 0; i < result[0].length; i++) {
        ss.innerHTML += `
        <div class="col-sm-2 col-md-2" >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${result[0][i].title}</h5>
              
            </div>
          </div>
        </div> `

    }

    ss.innerHTML += `</div>`

}


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
    console.log(result);
    var ss = document.getElementById('searchlist')
    ss.innerHTML=""
    var html = document.querySelector('.main')
    html.style.display = "none"

    ss.innerHTML += `<div class="row">`
    for (let i = 0; i < result.length; i++) {
        ss.innerHTML += `
        <div class="col-sm-2 col-md-2" >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${result[i].title}</h5>
              
            </div>
          </div>
        </div> `

    }

    ss.innerHTML += `</div>`

    }

  











/////////////////////////////////////////////////
// function debounce(func, timeout = 500) {
//     let timer;
//     return (...args) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => { func.apply(this, args); }, timeout);
//     };
// }

// function SearchSong() {
//     //console.log('Saving data');
// }

// const processChanges = debounce(() => SearchSong());

