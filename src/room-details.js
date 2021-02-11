import '@img/room-details.jpg'
import '@img/room-details-2.jpg'
import '@img/room-details-3.jpg'
import '@img/whitelist.png'
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
import '@blocks/room-info-item/room-info-item.scss'
import '@blocks/like-button/like-button.scss'
import '@blocks/review/review.scss'
import '@blocks/bullet-list/bullet-list.scss'
import '@blocks/pie/pie.scss'
import drow from '@blocks/pie/pie.js'
import '@blocks/field/field.scss'
import '@blocks/dropdown/dropdown.scss'
import {myDropdown} from '@blocks/dropdown/dropdown.js'
import '@blocks/datepicker/datepicker.scss'
import {myDatepicker} from '@blocks/datepicker/datepicker.js'
import '@blocks/copyright-bar/copyright-bar.scss'
import '@blocks/footer/footer.scss'
import '@pages/room-details/room-details.scss'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import {capitalizedString, declOfNum, timeHasPassed, getParamsFromUrl} from '@/functions.js'
import firebase from "firebase/app"
import {downloadFullExample, firebaseConfig} from '@/firebase-storage.js'


let url = `https://toxin-b35b5-default-rtdb.firebaseio.com/rooms.json?orderBy="index"&equalTo=${getParamsFromUrl().index}`
let filterParams = {}
let filters
let click = new Event('click')

let dropdownGuests = document.querySelector('.js-dropdown-guests')
let dropdownGuestsStr = dropdownGuests.querySelector('.js-dropdown__item-name[name="guests"]').parentElement
let dropdownIncrButtonGuest = dropdownGuestsStr.querySelector('.js-dropdown__button-increment')
let dropdownBabiesStr = dropdownGuests.querySelector('.js-dropdown__item-name[name="babies"]').parentElement
let dropdownIncrButtonBabies = dropdownBabiesStr.querySelector('.js-dropdown__button-increment')

const datepickerFields = document.querySelectorAll('.js-field__wrapper')
const field = document.querySelector('.field_js-datepicker')
const altField = document.querySelector('.field_js-datepicker-altfield')

let firstScreenImgBlocks = document.querySelectorAll('.js-main__first-screen-image')
let firstScreenCarouselImages = document.querySelectorAll('.owl-carousel-image')

let card = document.querySelector('.js-card')
let cardNumber = card.querySelector('.js-card-number')
let cardCost = card.querySelector('.js-card-cost')
let cardTable = card.querySelector('.js-card__table')
let cardButtons = card.querySelectorAll('.card__button_round')
let totalCostBlock = card.querySelector('.js-total-cost')
let buttonSubmit = card.querySelector('.js-card-submit-button')

let titleInReviewBlock = document.querySelector('.js__review-block__title')
let ReviewBlock = document.querySelector('.js__review-block')
let ReviewButton = document.querySelector('.js-reviews-button')

//Функции

function countNumberOfDays(filterParams) {
    if (filterParams.bookedDate) {
        let duration = filterParams.bookedDate[1] - filterParams.bookedDate[0]
        let days = Math.ceil(duration / 1000 / 60 / 60 / 24)
        return days
    } else {
        return 1
    }
}

function renderCostTable(filterParams, data) {    
    let days = countNumberOfDays(filterParams)
    let costByDays = data.cost * days
    let totalCost = costByDays + data.additionalСosts.services + data.additionalСosts.additionalServices
    cardTable.rows[0].cells[0].innerHTML = `${data.cost}р x ${days} ${declOfNum(days, ['сутки', 'суток', 'суток'])}`
    cardTable.rows[0].cells[2].innerHTML = `${costByDays}р`
    totalCostBlock.innerHTML = `${totalCost}р`
}

function renderReviews(arrReviews, container) {

    for (let review of arrReviews) {
        let reviewBlock = document.createElement('div')
        reviewBlock.classList.add('review')
        let html = `
            <div class='review__circle-for-avatar'>
                <img src='assets/images/whitelist.png' alt='avatar' class='review__avatar js-review__avatar'> 
            </div>
            <div class='review__header-text'>
                <p class='review__username'>${review.name}</p>
                <p class='review__date-added'>${timeHasPassed(review.date)}</p>
            </div>
            <div class='review__like-button-wrapper'>
                <label class='like-button review__like-button like-button_checked'>
                    <input type='checkbox' disabled>
                    <div class='like-button__btn'>
                        <p class='like-button__num'>${review.rating}</p>
                    </div>
                </label>
            </div>
            <div class='review__text'>
                <p>${review.text}</p>
            </div>
        `
        reviewBlock.innerHTML = html

        container.append(reviewBlock)

        downloadFullExample(review.image, function f(url) {
            let img = reviewBlock.querySelector('.js-review__avatar')
            img.src = url
        })
    }
}

function renderRoom(data) {

    data.images.map((imgSrc, index) => {
        downloadFullExample(imgSrc, function f(url) {
            firstScreenImgBlocks[index].style.backgroundImage = `url(${url})`
            firstScreenCarouselImages[index].src = url
        })
    })

    cardNumber.innerHTML = `
        № ${data.roomNumber}
        ${data.luxury ? '<span class="h3 card__room-characteristics_color_purple">  люкс</span>' : ''}
    `
    
    cardCost.prepend(data.cost)

    renderCostTable(filterParams, data)

    cardTable.rows[1].cells[2].innerHTML = `${data.additionalСosts.services}р`
    cardTable.rows[2].cells[2].innerHTML = `${data.additionalСosts.additionalServices}р`

    let datepickerButtonApply = document.querySelector('.js-datepicker-apply')
    datepickerButtonApply.addEventListener('click', () => renderCostTable(filterParams, data))

    let RoomInfoItemsBlock = document.querySelector('.js-room-info-items')
    let RoomInfoItemsBlockHTML = `<h2>Сведения о номере</h2>`
    let iconArr = ['mood', 'location_city', 'whatshot']
    data.additionalInformation.map((item, index) => {
        RoomInfoItemsBlockHTML += `
            <div class='room-info-item form-elements__room-info-item'>
                <i class='material-icons room-info-item__icon'>
                    ${iconArr[index]}
                </i>
                <div class='room-info-item__text'>
                    <p class='room-info-item__text-title'>${capitalizedString(item.title)}</p>
                    <p class='room-info-item__text-description'>${capitalizedString(item.description)}</p>
                </div>
            </div>
        `
    })
    RoomInfoItemsBlock.innerHTML = RoomInfoItemsBlockHTML

    drow(data.impressions)

    let reviews = data.reviews.content
    reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    titleInReviewBlock.querySelector('p').innerText = `${reviews.length} ${declOfNum(reviews.length, ['отзыв', 'отзыва', 'отзывов'])}`

    renderReviews(reviews.splice(0, 5), ReviewBlock)
    if (!reviews.length) ReviewButton.style.display = 'none'
    

    ReviewButton.addEventListener('click', () => {
        renderReviews(reviews.splice(0, 5), ReviewBlock)
        if (!reviews.length) ReviewButton.style.display = 'none'
    })
}

function buttonClick(button, filterObj, data) {
    
    button.addEventListener('click', (event) => {
        event.preventDefault()
        button.disabled = true

        let filtrDates = true
        if (filterObj.bookedDate) {
            for (let date of data.bookedDate) {
                let dateMS = new Date(date).getTime()
                if (dateMS >= filterObj.bookedDate[0] && dateMS <= filterObj.bookedDate[1]) {
                    filtrDates = false
                }
            }
        }
        
        if (!filterObj.guests.guests || !filterObj.bookedDate || !localStorage.hasOwnProperty('user') || !filtrDates) {
            if (!card.querySelector('p.error-text')) {
                let p = document.createElement('p')
                p.classList.add('error-text')
                button.before(p)
            }
            let message
        
            if (!filterObj.guests.guests) {
                message = 'Укажите количество гостей, в т.ч. как минимум 1 взрослого'
            } 
            if (!filterObj.bookedDate) {
                message = 'Выберите дату проживания'
            }
            if (!localStorage.hasOwnProperty('user')) {
                message = 'Пожалуйста, авторизуйтесь'
            }
            if (!filtrDates) {
                message = 'Комната забронирована в выбранном диапазоне дат'
            }
        
            card.querySelector('p.error-text').innerText = message
            button.disabled = false
            return
        }
    
        sendNewBookedDatesToDB(filterObj, data)
        // .then

        card.classList.add('h3')
        card.classList.add('card_form-sent')
        card.innerHTML = 'Ваша заявка принята. Оператор свяжется с вами в ближайшее время'
    })
}

function sendNewBookedDatesToDB(filterObj, data) {
    // let url = `https://toxin-b35b5-default-rtdb.firebaseio.com/rooms/${data.index}/bookedDate.json`

    // let date = new Date(filterObj.bookedDate[0])
    // let str = `${data.bookedDate.length}: ${date}`

    // return fetch(url, {
    //     method: 'POST',
    //     body: JSON.stringify(date),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(response => {
    //          console.log(response)
    //     })
}

// Выполнение кода на странице

myDropdown(filterParams)
const datepicker = myDatepicker(filterParams)

for (let datepickerField of datepickerFields) {
    datepickerField.addEventListener('click', (event) => {
        field.classList.add('field_hover')
        altField.classList.add('field_hover')
        datepicker.show()
    })
}

if (localStorage.hasOwnProperty('filters')) {
    filters = JSON.parse(localStorage.getItem('filters'))
    localStorage.removeItem('filters')
    
    for (let key in filters.guests) {
        while(filters.guests[key]) {
            if (key == 'guests') {
                dropdownIncrButtonGuest.dispatchEvent(click)
            }
            if (key == 'babies') {
                dropdownIncrButtonBabies.dispatchEvent(click)
            }
            filters.guests[key] -= 1
        }
    }

    if (filters.bookedDate && filters.bookedDate.length) {
        datepicker.selectDate([new Date(filters.bookedDate[0]), new Date(filters.bookedDate[1])])
    }
}

document.addEventListener('click', (event) => {
    if (event.target.closest('.js-card-submit-button')) return;
    if (!card.querySelector('p.error-text')) return;
    card.querySelector('p.error-text').innerText = ''
})

for (let button of cardButtons) {
    button.onclick = (event) => {
        event.preventDefault()
    }
}

//Fetch

fetch(url)
    .then(response => response.json())
    .then(data => {
        let roomObj
        for (let key in data) {
            roomObj = data[key]
        }
        return roomObj
    })
    .then(roomObj => {
        renderRoom(roomObj)
        return roomObj
    })
    .then(roomObj => {
        buttonSubmit.disabled = false
        buttonClick(buttonSubmit, filterParams, roomObj)
        return roomObj
    })

$('.owl-carousel').owlCarousel({
    items: 1,
    mouseDrag: false,
    nav: true,
    dotsEach: true
})

firebase.initializeApp(firebaseConfig)