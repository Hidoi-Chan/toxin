import '@img/image_registration.jpg'
import '@fortawesome/fontawesome-free/css/all.min.css'

import '@style/global.scss'
import '@blocks/logo/logo.scss'
import '@blocks/button/button.scss'
import '@blocks/sign-in/sign-in.scss'
import '@blocks/nav/nav.scss'
import '@blocks/nav/nav.js'
import '@blocks/burger/burger.scss'
import '@blocks/header/header.scss'
import '@blocks/header/header.js'
import '@blocks/card/card.scss'
import '@blocks/field/field.scss'
import '@blocks/copyright-bar/copyright-bar.scss'
import '@blocks/footer/footer.scss'
import '@pages/sign-in/sign-in.scss'
import {authWithEmailAndPassword} from '@/auth/auth.js'
import {findUserObjFromDatabase} from '@/users/users.js'

let form = document.querySelector('.js-sign-in--form')

form.addEventListener('submit', authFormHandler)

function authFormHandler(event) {
    event.preventDefault()

    let target = event.target
    let btn = target.querySelector('.js-sign-in--btn-submit')
    let email = target.querySelector('.js-sign-in--email-field').value
    let password = target.querySelector('.js-sign-in--password-field').value

    if (localStorage.hasOwnProperty('user')) {
        if (!target.querySelector('p.error-text')) {
            let p = document.createElement('p')
            p.classList.add('error-text')
            p.innerText = 'Вы уже авторизованы'
            btn.before(p)
        }
        return
    }
    
    let fields = target.querySelectorAll('.field')
    let breakCount = false
    for (let field of fields) {
        if (!field.value) {
            field.classList.add('error')

            field.addEventListener('focus', () => {
                field.classList.remove('error')
            })
            breakCount = true
        }
    }

    if (breakCount) return;

    btn.disabled = true
    authWithEmailAndPassword(email, password)
        .then(localId => findUserObjFromDatabase(localId))
        .then(() => {
            btn.disabled = false
            document.location.href = "/"
        })
        .catch(error => {
            if (!target.querySelector('p.error-text')) {
                let p = document.createElement('p')
                p.classList.add('error-text')
                btn.before(p)
            }
            let message
            switch (error.message) {
                case 'EMAIL_NOT_FOUND':
                    message = 'Нет пользовательской записи, соответствующей этому идентификатору. Возможно, пользователь был удален'
                    break
                case 'INVALID_PASSWORD':
                    message = 'Пароль недействителен или у пользователя нет пароля'
                    break
                case 'USER_DISABLED':
                    message = 'Учетная запись пользователя отключена администратором'
                    break
                default:
                    message = error.message
                    break 
            }
            target.querySelector('p.error-text').innerText = message

            btn.disabled = false
        })
}