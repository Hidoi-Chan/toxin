import '@img/room-details.jpg'
import '@img/room-details-2.jpg'
import '@img/room-details-3.jpg'
import '@img/image.png'
import '@img/image_4.png'
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
import '@blocks/dropdown/dropdown.js'
import '@blocks/copyright-bar/copyright-bar.scss'
import '@blocks/footer/footer.scss'
import '@pages/room-details/room-details.scss'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import {capitalizedString} from '@/functions.js'

let params = {}
location.search.slice(1).split('&').map(item => {
    let arr = item.split('=')
    params[arr[0]] = arr[1]
})
let roomNumber = params.number // Разобраться с get запросами

let url = `https://toxin-b35b5-default-rtdb.firebaseio.com/rooms.json?roomNumber=${roomNumber}`

function renderRoom(data) {
    let cardNumber = document.querySelector('.js-card-number')
    cardNumber.innerHTML = `
        № ${data.roomNumber}
        ${data.luxury ? '<span class="h3 card__room-characteristics_color_purple">  люкс</span>' : ''}
    `

    let cardCost = document.querySelector('.js-card-cost')
    cardCost.prepend(data.cost)

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
}

fetch(url)
    .then(response => response.json())
    .then(data => {
        renderRoom(data[0])
        console.log(data)
    })

$('.owl-carousel').owlCarousel({
    items: 1,
    mouseDrag: false,
    nav: true,
    // navText: ['expand_more','expand_more'],
    dotsEach: true
})