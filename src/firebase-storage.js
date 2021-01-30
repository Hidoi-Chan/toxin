import firebase from "firebase/app";
import "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBKAOMhKCHBX0K8ff1TMM9pPIPbubnJd5c",
  authDomain: "toxin-b35b5.firebaseapp.com",
  databaseURL: "https://toxin-b35b5-default-rtdb.firebaseio.com",
  projectId: "toxin-b35b5",
  storageBucket: "toxin-b35b5.appspot.com",
  messagingSenderId: "435154402172",
  appId: "1:435154402172:web:1d4239f457a72cbc0a82f9"
}

// export function downloadCreateRef(path) {
//   // [START storage_download_create_ref]
//   // Create a reference with an initial file path and name
//   var storage = firebase.storage();
//   var pathReference = storage.ref('images/stars.jpg');

//   // Create a reference from a Google Cloud Storage URI
//   var gsReference = storage.refFromURL('gs://bucket/images/stars.jpg');

//   // Create a reference from an HTTPS URL
//   // Note that in the URL, characters are URL escaped!
//   var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');  
//   // [END storage_download_create_ref]
// }

// export function downloadViaUrl(path) {
//   const storageRef = firebase.storage().ref();

//   // [START storage_download_via_url]
//   storageRef.child(path).getDownloadURL()
//     .then((url) => {
//       // `url` is the download URL for 'images/stars.jpg'
    
//       // This can be downloaded directly:
//       var xhr = new XMLHttpRequest();
//       xhr.responseType = 'blob';
//       xhr.onload = (event) => {
//         var blob = xhr.response;
//       };
//       xhr.open('GET', url);
//       xhr.send();
    
//       // Or inserted into an <img> element
//       var img = document.getElementById('myimg');
//       img.setAttribute('src', url);
//     })
//     .catch((error) => {
//       // Handle any errors
//     });
//   // [END storage_download_via_url]
// }

export function downloadFullExample(path, f) {
  const storageRef = firebase.storage().ref();

  // [START storage_download_full_example]
  // Create a reference to the file we want to download
  var starsRef = storageRef.child(path);

  // Get the download URL
  return starsRef.getDownloadURL()
  .then((url) => f(url))
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });
  // [END storage_download_full_example]
}