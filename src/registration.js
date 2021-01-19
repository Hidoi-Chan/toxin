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
import '@blocks/radio/radio.scss'
import '@blocks/toggle/toggle.scss'
import '@blocks/card/card.scss'
import '@blocks/field/field.scss'
import '@blocks/copyright-bar/copyright-bar.scss'
import '@blocks/footer/footer.scss'
import '@pages/registration/registration.scss'
import Inputmask from 'inputmask'
import {registrationWithEmailAndPassword} from '@/auth/auth.js'
import {addNewUserToDatabase} from '@/users/users.js'

Inputmask({
    alias: 'datetime',
    inputFormat: 'dd.mm.yyyy',
    placeholder: 'ДД.ММ.ГГГГ'
}).mask('.field_js-date')

let form = document.querySelector('.js-registration--form')

form.addEventListener('submit', registrationFormHandler)

function registrationFormHandler(event) {
    event.preventDefault()

    let target = event.target
    let btn = target.querySelector('.js-registration--btn-submit')
    let name = target.querySelector('.js-registration--name-field').value
    let surname = target.querySelector('.js-registration--surname-field').value
    let gender = target.querySelector('[name=gender]:checked')
    let birthday = target.querySelector('.js-registration--birthday-field').value
    let email = target.querySelector('.js-registration--email-field').value
    let password = target.querySelector('.js-registration--password-field').value
    let offers = target.querySelector('[name=offers]:checked')

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

    if (!gender || breakCount) {
        return
    }

    let obj = {
        name,
        surname,
        gender: gender.value,
        birthday,
        email,
        password,
        offers: offers ? true : false
    }

    btn.disabled = true
    try {
        registrationWithEmailAndPassword(email, password)
            .then(localId => {
                obj.localId = localId
                btn.disabled = false
                return obj
            })
            .then(obj => addNewUserToDatabase(obj))
            .then(obj => localStorage.setItem('user', JSON.stringify(obj)))
            // .then(() => document.location.href = "/")
    }
    catch (e) {
        console.log(e)
    }
}