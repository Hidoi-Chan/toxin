import {firebaseConfig} from '@/firebase-storage.js'

export function registrationWithEmailAndPassword(email, password) {    
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`, {
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
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`, {
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