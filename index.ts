let x;

let getAlbums = new Promise(resolve =>{
    fetch('https://jsonplaceholder.typicode.com/albums')
    .then(function(response){return response.json()})
    .then(function(json){resolve(json)})
})

let getPhotos = new Promise(resolve =>{
    fetch('https://jsonplaceholder.typicode.com/photos')
    .then(function(response){return response.json()})
    .then(function(json){resolve(json)})
})

async function AlbumNames() {
    x = await getAlbums
    console.log(x);
    
}

async function DisplayPhotos() {
    x = await getPhotos
    console.log(x);
    
}
DisplayPhotos()
AlbumNames()





// const indexedDB1 = window.indexedDB;

// if (!indexedDB1) {
//   console.log("IndexedDB could not be found in this browser.");
// }

// // 2
// const request = indexedDB.open("maindb", 1);


// function debounce(func, timeout = 500){
//     let timer;
//     return (...args) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => { func.apply(this, args); }, timeout);
//     };
//   }
    
//   function SearchSong(){
//     //console.log('Saving data');


//   }
  
//   const processChanges = debounce(() => SearchSong());
