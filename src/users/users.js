export function addNewUserToDatabase(obj) {
    return fetch('https://toxin-b35b5-default-rtdb.firebaseio.com/users.json', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            // obj.id = response.name
            return obj
        })
}

export function findUserObjFromDatabase(localId) {
    return fetch('https://toxin-b35b5-default-rtdb.firebaseio.com/users.json')
        .then(response => response.json())
        .then(response => {
            for (let user in response) {
                if (response[user].localId === localId) {
                    return response[user]
                }
            }
        })
        .then(user => localStorage.setItem('user', JSON.stringify(user)))
}