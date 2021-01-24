// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyBKAOMhKCHBX0K8ff1TMM9pPIPbubnJd5c",
//     authDomain: "toxin-b35b5.firebaseapp.com",
//     projectId: "toxin-b35b5",
//     storageBucket: "toxin-b35b5.appspot.com",
//     messagingSenderId: "435154402172",
//     appId: "1:435154402172:web:1d4239f457a72cbc0a82f9"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// </script>

const apiKey = 'AIzaSyBKAOMhKCHBX0K8ff1TMM9pPIPbubnJd5c'

export function registrationWithEmailAndPassword(email, password) {    
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({email, password, returnSecureToken: true}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error.message)
            } else {
                return data.localId
            }
        })
}

export function authWithEmailAndPassword(email, password) {
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({email, password, returnSecureToken: true}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => alert(error))
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error.message)
            } else {
                return data.localId
            }
        })
}