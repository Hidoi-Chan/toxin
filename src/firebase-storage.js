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