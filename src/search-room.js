// import '@img/room_1.jpg'
// import '@img/room_2.jpg'
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
import '@blocks/range-slider/range-slider.scss'
import {myRangeSlider} from '@blocks/range-slider/range-slider.js'
import '@blocks/expandable-list/expandable-list.scss'
import '@blocks/expandable-list/expandable-list.js'
import '@blocks/checkbox/checkbox.scss'
import '@blocks/room-card/room-card.scss'
import '@blocks/room-card/room-card.js'
import '@blocks/rate/rate.scss'
import '@blocks/pagination/pagination.scss'
import '@blocks/field/field.scss'
import '@blocks/datepicker/datepicker.scss'
import {myDatepicker} from '@blocks/datepicker/datepicker.js'
import '@blocks/dropdown/dropdown.scss'
import {myDropdown} from '@blocks/dropdown/dropdown.js'
import '@blocks/copyright-bar/copyright-bar.scss'
import '@blocks/footer/footer.scss'
import '@pages/search-room/search-room.scss'
import {declOfNum} from '@/functions.js'


// Переменные
let filterButton = document.querySelector('.js-filter-button')
let leftSidebarCloseButton = document.querySelector('.js-left-sidebar-close')
let leftSidebarAcceptButton = document.querySelector('.js-left-sidebar-accept')
let filterBlock = document.querySelector('.left-sidebar')
let filterParams = {}
let filters, pagination
let click = new Event('click')

let dropdownGuests = document.querySelector('.js-dropdown-guests')
let dropdownGuestsStr = dropdownGuests.querySelector('.js-dropdown__item-name[name="guests"]').parentElement
let dropdownIncrButtonGuest = dropdownGuestsStr.querySelector('.js-dropdown__button-increment')
let dropdownBabiesStr = dropdownGuests.querySelector('.js-dropdown__item-name[name="babies"]').parentElement
let dropdownIncrButtonBabies = dropdownBabiesStr.querySelector('.js-dropdown__button-increment')

const datepickerField = document.querySelector('.js-field__wrapper')

let roomCardContainer = document.querySelector('.main__room-card-container')


// Функции
class Pagination {
    constructor(data) {
        this.currentPage = 1
        this.onPage = 12
        this.allCards = data.length
        this.firstRoomIndex = function() {
            return (this.currentPage - 1) * this.onPage
        }
        this.lastRoomIndex = function() {
            if (this.currentPage == this.allPages()) {
                return data.length - 1
            } else {
                return (this.currentPage * this.onPage) - 1
            }
        }
        this.allPages = function() {
            return Math.ceil(this.allCards / 12)
        }
        this.data = function() {
            return data.slice(this.firstRoomIndex(), this.lastRoomIndex() + 1)
        }
    }
}

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
    let variantStr = function() {
        if (pagination.allCards <= 100) {
            return pagination.allCards + ' ' + declOfNum(pagination.allCards, ['варианта', 'вариантов', 'вариантов'])
        } else {
            return '100+ вариантов'
        }
    }
    description.innerText = `${pagination.firstRoomIndex() + 1} – ${pagination.lastRoomIndex() + 1} из ${variantStr()} аренды`

    paginationDiv.append(paginationList)
    paginationDiv.append(description)

            

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
        // history.pushState(null, null, `/search-room.html/page=${pagination.currentPage}`)
        renderRoomCards(pagination)
        renderPagination(pagination)
        window.scrollTo(0,0)
    })
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
            <a href='/room-details.html?orderBy="index"&equalTo=${room.index}' class='room-card__text-block js-link-to-room'>
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
            </a>
        </div>
        `
    })
    roomCardContainer.innerHTML = newData

    $('.owl-carousel').owlCarousel({
        items: 1,
        mouseDrag: false,
        nav: true,
        dotsEach: true
    })

    let linksToRoom = roomCardContainer.querySelectorAll('.js-link-to-room')
    for (let link of linksToRoom) {
        link.addEventListener('click', () => {
            let filters = {}
            filters.guests = filterParams.guests
            if (filterParams.bookedDate) {
                filters.bookedDate = filterParams.bookedDate
            }
            localStorage.setItem('filters', JSON.stringify(filters))
        })
    }
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

function filterData(data, filterObj) {

    let newData = data.filter(room => {
        let result = true

        if (filterObj.bookedDate) {
            for (let date of room.bookedDate) {
                let dateMS = new Date(date).getTime()
                if (dateMS >= filterObj.bookedDate[0] && dateMS <= filterObj.bookedDate[1]) {
                    result = false
                }
            }
        }

        if (filterObj.selectableOptions) {
            for (let option of filterObj.selectableOptions) {
                if (room.selectableOptions[option] === false) {
                    result = false
                }
            }
        }

        if (filterObj.guests.babies || filterObj.guests.guests) {
            for (let option in filterObj.guests) {
                if (room.guests[option] !== filterObj.guests[option]) {
                    result = false
                }
            }            
        }

        if (filterObj.conveniences.bathrooms || filterObj.conveniences.bed || filterObj.conveniences.bedrooms) {
            for (let option in filterObj.conveniences) {
                if (filterObj.conveniences[option] && room.conveniences[option] !== filterObj.conveniences[option]) {
                    result = false
                }
            }
        }

        if (room.cost > filterObj.cost.max || room.cost < filterObj.cost.min) {
            result = false
        }
        
        return result
    })
    return newData
}

function returnStringIfNoData(str) {
    if (roomCardContainer.nextElementSibling) {
        roomCardContainer.nextElementSibling.remove()
    }
    roomCardContainer.parentElement.querySelector('.h1').innerText = str

    roomCardContainer.innerHTML = ''
    window.scrollTo(0,0)
}

function applyFilterData(data, filterParams) {

    let newData = filterData(data, filterParams)

    if (newData.length) {
        let pagination = new Pagination(newData)
        renderRoomCards(pagination)
        renderPagination(pagination)

        roomCardContainer.parentElement.querySelector('.h1').innerText = 'Номера, которые мы для вас подобрали'

        window.scrollTo(0,0)
        return pagination
    } else {
        returnStringIfNoData('К сожалению, по выбранным фильтрам подходящих номеров не нашлось')
    }
}

function closeSidebar() {
    filterBlock.style.left = -400 + 'px'
}


// Выполнение кода на странице
filterButton.addEventListener('click', () => {
    if (filterBlock.style.left == '0px') {
        closeSidebar()
    } else {
        filterBlock.style.left = 0
    }
})

myDropdown(filterParams)
const datepicker = myDatepicker(filterParams)
datepickerField.addEventListener('click', () => datepicker.show())

filterParams.selectableOptions = []
filterBlock.addEventListener('change', function(event) {
    let target
    if (event.target.closest('input[type="checkbox"]')) {
        target = event.target
    }

    let arr = filterParams.selectableOptions
    if (arr.indexOf(target.value) == -1) {
        arr.push(target.value)
    } else {
        arr.splice(arr.indexOf(target.value), 1)
    }
})


// Fetch
let url = 'https://toxin-b35b5-default-rtdb.firebaseio.com/rooms.json'

fetch(url)
    .then(response => response.json())
    .then(data => {
        
        defaultSettingsFilterParams(data, filterParams)        
        
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

            if (filters.bookedDate) {
                datepicker.selectDate([new Date(filters.bookedDate[0]), new Date(filters.bookedDate[1])])
            }
        }

        pagination = applyFilterData(data, filterParams)
        // pagination = new Pagination(data) Проверка скорости загрузки

        myRangeSlider(filterParams.cost)


        leftSidebarCloseButton.addEventListener('click', function(event) {
            closeSidebar()
            
            pagination = new Pagination(data)
            renderRoomCards(pagination)
            renderPagination(pagination)
            window.scrollTo(0,0)
        })

        leftSidebarAcceptButton.addEventListener('click', function() {
            closeSidebar()

            pagination = applyFilterData(data, filterParams)
        })
    })    
    .catch(error => returnStringIfNoData('Произошла ошибка при загрузке данных. Пожалуйста, попробуйте еще раз')) //'Failed to fetch'