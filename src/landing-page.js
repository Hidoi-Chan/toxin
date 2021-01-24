import '@img/better_room_1.jpg'
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
import {myDatepicker} from '@blocks/datepicker/datepicker.js'
import '@blocks/datepicker/datepicker.scss'
import '@blocks/dropdown/dropdown.scss'
import {livenUpTheDropdown} from '@blocks/dropdown/dropdown.js'
import '@blocks/copyright-bar/copyright-bar.scss'
import '@blocks/footer/footer.scss'
import '@pages/landing-page/landing-page.scss'

const datepickerFields = document.querySelectorAll('.js-field__wrapper')
const field = document.querySelector('.field_js-datepicker')
const altField = document.querySelector('.field_js-datepicker-altfield')
const linkButton = document.querySelector('.js-link-button')

let filterParams = {}
livenUpTheDropdown(filterParams)
myDatepicker(filterParams)

const datepicker = myDatepicker(filterParams)

for (let datepickerField of datepickerFields) {
    datepickerField.addEventListener('click', () => {
        // field.classList.add('field_hover')
        // altField.classList.add('field_hover')
        datepicker.show()
    })
}

linkButton.addEventListener('click', (event) => {
    event.preventDefault()
    // localStorage.setItem('filters', JSON.stringify(filterParams))
    // console.log(filterParams.bookedDate)
})