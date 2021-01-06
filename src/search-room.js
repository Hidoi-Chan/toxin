import '@fortawesome/fontawesome-free/css/all.min.css'

import '@style/global.scss'
import '@blocks/logo/logo.scss'
import '@blocks/button/button.scss'
import '@blocks/sign-in/sign-in.scss'
import '@blocks/nav/nav.scss'
import '@blocks/nav/nav.js'
import '@blocks/burger/burger.scss'
import '@blocks/header/header.scss'
import '@blocks/range-slider/range-slider.scss'
import {livenUpTheRangeSlider} from '@blocks/range-slider/range-slider.js'
import '@blocks/expandable-list/expandable-list.scss'
import '@blocks/expandable-list/expandable-list.js'
import '@blocks/checkbox/checkbox.scss'
import '@blocks/room-card/room-card.scss'
import '@blocks/room-card/room-card.js'
import '@blocks/rate/rate.scss'
import '@blocks/pagination/pagination.scss'
import '@blocks/field/field.scss'
import '@blocks/dropdown/dropdown.scss'
import {livenUpTheDropdown} from '@blocks/dropdown/dropdown.js'
import '@blocks/copyright-bar/copyright-bar.scss'
import '@blocks/footer/footer.scss'
import '@pages/search-room/search-room.scss'
import {declOfNum} from '@/functions.js'

let filterButton = document.querySelector('.js-filter-button')
let leftSidebarCloseButton = document.querySelector('.js-left-sidebar-close')
let leftSidebarAcceptButton = document.querySelector('.js-left-sidebar-accept')
let filterBlock = document.querySelector('.left-sidebar')

function closeSidebar() {
    filterBlock.style.left = -400 + 'px'
}

filterButton.addEventListener('click', function() {
    if (filterBlock.style.left == '0px') {
        closeSidebar()
    } else {
        filterBlock.style.left = 0
    }
})

leftSidebarCloseButton.addEventListener('click', closeSidebar)
leftSidebarAcceptButton.addEventListener('click', closeSidebar)

let filterParams = {}
livenUpTheDropdown(filterParams)


// Fetch
let roomCardContainer = document.querySelector('.main__room-card-container')

function renderPagination(pagination) {

    let paginationDiv
    if (document.querySelector('.pagination')) {
        paginationDiv = document.querySelector('.pagination')
    } else {
        paginationDiv = document.createElement('div')
        paginationDiv.classList.add('pagination')
        paginationDiv.classList.add('main__pagination')
        
        roomCardContainer.parentElement.append(paginationDiv)
    }

    paginationDiv.innerHTML = ''

    let paginationList = document.createElement('div')
    paginationList.classList.add('pagination__list')

    if (pagination.currentPage > 1) {
        let prev = document.createElement('button')
        prev.className = 'pagination__link next material-icons'
        prev.innerText = 'arrow_back'
        paginationList.append(prev)
    }
    
    function createEllipsis() {
        let ellipsis = document.createElement('span')
        ellipsis.innerHTML = '...'
        paginationList.append(ellipsis)
    }

    for (let i = 1; i <= pagination.allPages(); i++) {

        if (i == pagination.allPages() && pagination.allPages() - 3 > pagination.currentPage) {
            createEllipsis()
        }

        if (i == 1 || 
            i == pagination.allPages() ||
            (i - pagination.currentPage >= -2 &&
            i - pagination.currentPage <= 2)) {
            let button = document.createElement('button')
            button.classList.add('pagination__link')
            if (i == pagination.currentPage) {
                button.classList.add('active')
            }
            button.innerText = i
            paginationList.append(button)
        }

        if (i == 1 && pagination.currentPage - 3 > 1 ) {
            createEllipsis()
        }
    }
    if (pagination.currentPage < pagination.allPages()) {
        let next = document.createElement('button')
        next.className = 'pagination__link next material-icons'
        next.innerText = 'arrow_forward'
        paginationList.append(next) 
    }

    let description = document.createElement('p')
    description.classList.add('pagination__description')
    description.innerText = `${pagination.firstRoomIndex() + 1} – ${pagination.lastRoomIndex() + 1} из ${pagination.allCards <= 100? pagination.allCards : '100+'} вариантов аренды`

    paginationDiv.append(paginationList)
    paginationDiv.append(description)
}

function renderRoomCards(pagination) {
    let newData = ''
    pagination.data().map(room => {
        let stringRate = ''
        for (let i = 1; i <= 5; i++) {
            if (i <= room.reviews.rating) {
                stringRate += `
                    <span class='active'></span>
                `
            } else {
                stringRate += `
                    <span></span>
                `                    
            }
        }

        newData += `
        <div class='room-card'>
            <div class='owl-carousel owl-theme'>
                <img src='assets/images/room_1.jpg' alt='room_1'>
                <img src='assets/images/room_2.jpg' alt='room_2'>
                <img src='assets/images/room_2.jpg' alt='room_2'>
                <img src='assets/images/room_2.jpg' alt='room_2'>
            </div>
            <div class='room-card__text-block'>
                <div class='room-card__text-block-item room-card__characteristics'>
                    <h1 class='h2'>
                        № ${room.roomNumber}<span class='h3 room-card__characteristics_color_purple'>  ${room.luxury? 'люкс' : ''}</span>
                    </h1>
                    <h2 class='room-card__price'>
                        ${room.cost}р <span class='room-card__price_thin'>  в сутки</span>
                    </h2>
                </div>
                <div class='room-card__text-block-item room-card__rating'>
                    <div class='rate-result'>
                        ${stringRate}
                    </div>
                    <h2 class='room-card__price'>
                        ${room.reviews.quantity} <span class='room-card__price_thin room-card__price_size_14'>  ${declOfNum(room.reviews.quantity, ['Отзыв', 'Отзыва', 'Отзывов'])}</span>
                    </h2>
                </div>
            </div>
        </div>
        `
    })
    roomCardContainer.innerHTML = newData

    $('.owl-carousel').owlCarousel({
        items: 1,
        mouseDrag: false,
        nav: true,
        // navText: ['expand_more','expand_more'],
        dotsEach: true
    })

    renderPagination(pagination)
}

function defaultSettingsFilterParams(data, resultObj) {
    resultObj.cost = {
        min: Infinity,
        max: 0
    }
    data.map(item => {
        if (item.cost < resultObj.cost.min) {
            resultObj.cost.min = item.cost
        }
        if (item.cost > resultObj.cost.max) {
            resultObj.cost.max = item.cost
        }
    })
}

let url = 'http://localhost:3000/rooms'

fetch(url)
    .then(response => response.json())
    .then(data => {
        let pagination = {
            currentPage: 1,
            onPage: 12,
            firstRoomIndex: function() {
                return (this.currentPage - 1) * this.onPage
            },
            lastRoomIndex: function() {
                if (this.currentPage == this.allPages()) {
                    return data.length - 1
                } else {
                    return (this.currentPage * this.onPage) - 1
                }
            },
            allCards: data.length,
            allPages: function() {
                return Math.ceil(this.allCards / 12)
            },
            data: function() {
                return data.slice(this.firstRoomIndex(), this.lastRoomIndex() + 1)
            }
        }

        renderRoomCards(pagination)

        let paginationForListener = document.querySelector('.pagination')

        paginationForListener.addEventListener('click', function(event) {
            let target
            if (event.target.closest('.pagination__link')) {
                target = event.target.closest('.pagination__link')
            } else {
                return
            }

            if (target.innerText == pagination.currentPage) {
                return
            }

            if (target.innerText == 'arrow_back') {
                pagination.currentPage -= 1
            } else if (target.innerText == 'arrow_forward') {
                pagination.currentPage += 1
            } else {
                pagination.currentPage = target.innerText
            }
            renderRoomCards(pagination)
            window.scrollTo(0,0)
        })

        defaultSettingsFilterParams(data, filterParams)

        livenUpTheRangeSlider(filterParams.cost)
  })