// let AlbumList:any = [];
// let PhotoList:any = [];
// var html:any
// var searchname:any
// var ss:any
// var disp:any
// var modal:any
// var span:any
// var x:any
// interface IAlbums{
//     userId:number;
//     id:number;
//     title:string;
// }
// interface IPhotos{
//     albumId:number;
//     id:number;
//     title:string;
//     url: string,
//     thumbnailUrl: string
// }
// interface DataStore{
//     database:string;
//     objectstore:string;
// }
// class DBstore implements DataStore{
//     database:string;
//     objectstore:string;
//     api;
//     public constructor( database:string,objectstore:string,api:any){
//         this.database=database;
//         this.objectstore=objectstore;
//         this.api=this.callAPI(api)
//     }
//     public callAPI(api: string){
//         var getapi: Promise<Array<IAlbums|IPhotos>>=new Promise(resolve => {
//             fetch(api)
//               .then(function (response) { return response.json() })
//               .then(function (json) { resolve(json) })
//           })
//           return getapi;
//     }
// }
// interface ISetstorage{
//     StoreData():any
// }
// class storeALbumintoIndexDB implements ISetstorage{
//     storealbum=new DBstore("albumdb","albums","https://jsonplaceholder.typicode.com/albums");
//     StoreData():any{
//         return this.storealbum;
//     }
// }
// class storePhotointoIndexDB implements ISetstorage{
//     storephotos=new DBstore("photodb","photoss","https://jsonplaceholder.typicode.com/photos");
//     StoreData():any{
//         return this.storephotos;
//     }
// }
// interface Initialize{
//     Initialize():any;
// }
// class InitializeAlbumData implements Initialize{
//     data = new storeALbumintoIndexDB();
//     albumlist=this.data.storealbum.api
//     public async Initialize() {
//         console.log("hiiiiiiiiiii");
//         x = await this.albumlist
//         console.log(x);
//         const request = indexedDB.open(this.data.storealbum.database, 3);
//         request.onerror = (event) => {
//           console.log("error");
//         };
//         request.onupgradeneeded = (event:any) => {
//           const db = event.target.result;
//           const objectStore = db.createObjectStore(this.data.storealbum.objectstore, { keyPath: "id" });
//         }
//         request.onsuccess = (event:any) => {
//           const db = event.target.result;
//           const albumsObjectStore = db.transaction(this.data.storealbum.objectstore, "readwrite").objectStore(this.data.storealbum.objectstore);
//           x.forEach((data:any) => {
//             const updatedList = albumsObjectStore.add(data);
//             updatedList.onsuccess = () => {
//               console.log("Items added");
//             }
//           });
//         }
//     }
// }
// class InitializePhotoData implements Initialize{
//     data= new storePhotointoIndexDB();
//     photolist=this.data.storephotos.api
//     public async Initialize() {
//         console.log("heloooooo");
//         x=await this.photolist;
//         console.log(x);
//         const request = indexedDB.open(this.data.storephotos.database, 3);
//         request.onerror = (event) => {
//           console.log("error");
//         };
//         request.onupgradeneeded = (event:any) => {
//           const db = event.target.result;
//           const objectStore = db.createObjectStore(this.data.storephotos.objectstore, { keyPath: "id" });
//         }
//         request.onsuccess = (event:any) => {
//           const db = event.target.result;
//           const photosObjectStore = db.transaction(this.data.storephotos.objectstore, "readwrite").objectStore(this.data.storephotos.objectstore);
//           x.forEach((data:any) => {
//             const updatedList = photosObjectStore.add(data);
//             updatedList.onsuccess = () => {
//               console.log("Items added");
//             }
//           });
//         }     
//     }
// }
// interface Obtain{
//     ObtainDatas():any;
// }
// class ObtainAlbumData implements Obtain{
//     dsalbum=new InitializeAlbumData();
//     public async ObtainDatas() {
//         await this.dsalbum.Initialize();
//         const request = indexedDB.open(this.dsalbum.data.storealbum.database, 3);
//           request.onerror = (event:any) => {   
//             console.log("error");
//           };   
//           request.onsuccess = (event:any) => {
//             const db = event.target.result;
//             const albumObjectStore = db.transaction(this.dsalbum.data.storealbum.objectstore, "readwrite").objectStore(this.dsalbum.data.storealbum.objectstore);  
//             const getdata = albumObjectStore.getAll()
//             getdata.onsuccess = (event:any) => {
//                console.log("gotcha albums!!")
//               // console.log(getdata.result)
//               AlbumList.push(getdata.result)
//               let show = new DisplayAlbumData(AlbumList);
//               show.ShowData(AlbumList);
//     }
// }}
// }
// class ObtainPhotoData implements Obtain{
//     dsphotos=new InitializePhotoData();
//     public async ObtainDatas() {
//         await this.dsphotos.Initialize();
//         const request = indexedDB.open(this.dsphotos.data.storephotos.database, 3);
//           request.onerror = (event:any) => {    
//             console.log("error");
//           };        
//           request.onsuccess = (event:any) => {
//             const db = event.target.result;
//             const photoObjectStore = db.transaction(this.dsphotos.data.storephotos.objectstore, "readwrite").objectStore(this.dsphotos.data.storephotos.objectstore);
//             const getdata = photoObjectStore.getAll()
//             getdata.onsuccess = (event:any) => {
//                console.log("gotcha photos!!")
//               // console.log(getdata.result)
//               PhotoList.push(getdata.result)
//             var cardss = document.getElementsByClassName("card")
//             for (var i = 0; i < cardss.length; i++) {
//             cardss[i].setAttribute("id", AlbumList[0][i].id)
//             console.log(cardss[i].id);
//             console.log("iddddddddddddddd");
//             }
//              var clickable = document.querySelectorAll(".card")
//              clickable.forEach((cr) => {
//              cr.addEventListener('click', () => {
//              console.log("clicking");
//             let dis=new ModalView();
//             dis.View(cr.id)
//     })
// })
//     }
// }}
// }
// async function run(){
// let dss=new ObtainAlbumData();
// await dss.ObtainDatas();
// let dsss=new ObtainPhotoData();
// await dsss.ObtainDatas();
// }
// interface Display{
//     list: Array<any>;
//     ShowData(albumdata:any):any;
// }
// run();
// class DisplayAlbumData implements Display{
//     list: Array<any>;
//     public constructor(list:Array<any>){
//         this.list=list;
//     }
//     ShowData(AlbumList:any){
//       html = document.querySelector('.main')
//       html.innerHTML = ""
//       for (var i = 0; i < AlbumList[0].length; i++) {
//         html.innerHTML += `<div class ="card">
//                                 <div class="cardcontents">
//                                 <div class="cardtitle">
//                                 <h3>${AlbumList[0][i].title}</h3>
//                                 </div>
//                                 </div>
//                         </div>`
//         }
//         var clickable = document.querySelectorAll(".card")
//         clickable.forEach((cr) => {
//         cr.addEventListener('click', () => {
//         console.log("clicking");
//        let dis=new ModalView();
//        dis.View(cr.id)
// })
// })
//     }
// }
// interface ShowModal{
//     View(idnum:any):any;
// }
// class ModalView implements ShowModal{
//     View(idnum:any) {
//         disp = document.querySelector(".modal-content");
//         disp.innerHTML=""
//           for (var i = 0; i < PhotoList[0].length; i++) {
//               if (idnum == PhotoList[0][i].albumId) {
//               disp.innerHTML+= `<div class ="card">
//                                       <div class="cardcontents">
//                                       <div class="cardtitle">
//                                       <h3>${PhotoList[0][i].title}</h3>
//                                       </div>
//                                       <div class="card-image">
//                                       <img src="${PhotoList[0][i].url}">
//                                       </div>
//                                       </div>
//                               </div>`
//           }
//       }
//         modal = document.getElementById("myModal");
//         span = document.getElementsByClassName("close")[0];
//         modal.style.display = "block";
//         span.onclick = function () {
//           modal.style.display = "none";
//         }
//         window.onclick = function (event) {
//                 if (event.target == modal) {
//                   modal.style.display = "none";
//                 }
//               }
//     } 
// }
// interface SearchData{
//   alblist:Array<any>
// }
// class Seaching implements SearchData{
//   alblist: any;
//   public constructor(alblist:Array<any>){
//     this.alblist=this.search(alblist);
//   }
//   public search(AlbumList:any) {
//     console.log("searching...............");
//     var searchname1 = <HTMLInputElement>document.getElementById("search");
//       var searchname = searchname1.value
//     searchBy(searchname, AlbumList);
//   } 
// }
// function searchBy(searchname:any, albumList:any) {
//   console.log("inner serach......");
//   var searching = new RegExp(`${searchname}`, "gi")
//   var result = [];
//   var resultalbumname = albumList[0].filter(function (el:any) {
//     return searching.test(el.title);
//   });
//   result.push(...resultalbumname);
//   html = document.querySelector('.main')
//   html.innerHTML = ""
//   for (var i = 0; i < result.length; i++) {
//     html.innerHTML += `<div class ="card">
//                             <div class="cardcontents">
//                             <div class="cardtitle">
//                             <h3>${result[i].title}</h3>
//                             </div>
//                             </div>
//                     </div>`
//     }
// }
// function debounce(func: Function, timeout = 500) {
//     let timer: number;
//     return function (this: any, ...args: any[]) {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             func.apply(this, args);
//         }, timeout);
//     };
// }
// const processChanges = debounce(() => {
//   let fn = new Seaching(AlbumList);
//   fn.search(AlbumList);
// });
var text;
var display;
var tss;
function Show() {
    text = document.getElementById("txt");
    console.log(text);
    var ts = text.value;
    display = document.querySelector(".showdiv");
    display.innerHTML = ts;
}
