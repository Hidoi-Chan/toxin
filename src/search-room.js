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
import {declOfNum, getParamsFromUrl} from '@/functions.js'
import firebase from "firebase/app"
import {downloadFullExample, firebaseConfig} from '@/firebase-storage.js'


// Переменные
let filterButton = document.querySelector('.js-filter-button')
let leftSidebarCloseButton = document.querySelector('.js-left-sidebar-close')
let leftSidebarAcceptButton = document.querySelector('.js-left-sidebar-accept')
let filterBlock = document.querySelector('.left-sidebar')
let filterParams = {}
let filters, pagination
let click = new Event('click')
let change = new Event('change')

let dropdownGuests = document.querySelector('.js-dropdown-guests')
let dropdownGuestsStr = dropdownGuests.querySelector('.js-dropdown__item-name[name="guests"]').parentElement
let dropdownIncrButtonGuest = dropdownGuestsStr.querySelector('.js-dropdown__button-increment')
let dropdownBabiesStr = dropdownGuests.querySelector('.js-dropdown__item-name[name="babies"]').parentElement
let dropdownIncrButtonBabies = dropdownBabiesStr.querySelector('.js-dropdown__button-increment')

const datepickerField = document.querySelector('.js-field__wrapper')

let roomCardContainer = document.querySelector('.main__room-card-container')


// Функции
function Pagination(data) {
    this.currentPage = 1
    this.onPage = 12
    this.allData = data
    this.allCards = this.allData.length
    this.firstRoomIndex = function() {
        return (this.currentPage - 1) * this.onPage
    }
    this.lastRoomIndex = function() {
        if (this.currentPage == this.allPages()) {
            return this.allData.length - 1
        } else {
            return (this.currentPage * this.onPage) - 1
        }
    }
    this.allPages = function() {
        return Math.ceil(this.allCards / 12)
    }
    this.data = function() {
        return this.allData.slice(this.firstRoomIndex(), this.lastRoomIndex() + 1)
    }
}

function renderRoomCards(pagination) {

    roomCardContainer.innerHTML = ''
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

        let roomCard = document.createElement('div')
        roomCard.classList.add('room-card')
        
        let link = document.createElement('a')
        link.href = `/room-details.html?index=${room.index}`
        link.className = 'room-card__text-block js-link-to-room'
        link.innerHTML = `
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
        `
        roomCard.append(link)

        link.addEventListener('click', () => {
            let filters = {}
            filters.guests = filterParams.guests
            if (filterParams.bookedDate) {
                filters.bookedDate = filterParams.bookedDate
            }
            localStorage.setItem('filters', JSON.stringify(filters))
        })

        Promise.all(room.promiseArr)
            .then(urls => {
                room.images = urls

                let carousel = document.createElement('div')
                carousel.className = 'owl-carousel owl-theme'
                for (let url of room.images) {
                    let img = document.createElement('img')
                    img.src = url
                    carousel.append(img)
                }
                roomCard.prepend(carousel)

                $('.owl-carousel').owlCarousel({
                    items: 1,
                    mouseDrag: false,
                    nav: true,
                    dotsEach: true
                })
            })

        roomCardContainer.append(roomCard)
    })
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
    
    addEventsForPagination(paginationDiv, pagination)

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })

    
}

function addEventsForPagination(elem, paginationObj) {

    function clickForPagination(event) {

        let target
        if (event.target.closest('.pagination__link')) {
            target = event.target.closest('.pagination__link')
        } else {
            return
        }
    
        if (target.innerText == paginationObj.currentPage) {
            return
        }
    
        if (target.innerText == 'arrow_back') {
            paginationObj.currentPage -= 1
        } else if (target.innerText == 'arrow_forward') {
            paginationObj.currentPage = +paginationObj.currentPage + 1
        } else {
            paginationObj.currentPage = target.innerText
        }

        elem.removeEventListener('click', clickForPagination)

        history.pushState('', '', `/search-room.html?page=${paginationObj.currentPage}`)

        renderRoomCards(paginationObj)
        renderPagination(paginationObj)
    }

    elem.addEventListener('click', clickForPagination)

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

        if (filterObj.bookedDate && result) {
            for (let date of room.bookedDate) {
                let dateMS = new Date(date).getTime()
                if (dateMS >= filterObj.bookedDate[0] && dateMS <= filterObj.bookedDate[1]) {
                    result = false
                    break
                }
            }
        }

        if (filterObj.selectableOptions && result) {
            for (let option of filterObj.selectableOptions) {
                if (room.selectableOptions[option] === false) {
                    result = false
                    break
                }
            }
        }

        if ((filterObj.guests.babies || filterObj.guests.guests) && result) {
            for (let option in filterObj.guests) {
                if (room.guests[option] !== filterObj.guests[option]) {
                    result = false
                    break
                }
            }            
        }

        if ((filterObj.conveniences.bathrooms || filterObj.conveniences.bed || filterObj.conveniences.bedrooms) && result) {
            for (let option in filterObj.conveniences) {
                if (filterObj.conveniences[option] && room.conveniences[option] !== filterObj.conveniences[option]) {
                    result = false
                    break
                }
            }
        }

        if ((room.cost > filterObj.cost.max || room.cost < filterObj.cost.min) && result) {
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
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

function applyFilterData(data, filterParams, pageNum) {

    let newData = filterData(data, filterParams)

    if (newData.length) {
        let pagination = new Pagination(newData)
        pagination.currentPage = pageNum
        renderRoomCards(pagination)
        renderPagination(pagination)
        history.pushState('', '', `/search-room.html?page=1`)

        roomCardContainer.parentElement.querySelector('.h1').innerText = 'Номера, которые мы для вас подобрали'

        return pagination
    } else {
        returnStringIfNoData('К сожалению, по выбранным фильтрам подходящих номеров не нашлось')
    }
}

function closeSidebar() {
    if (filterBlock.classList.contains('left-sidebar_open')) {
        filterBlock.classList.remove('left-sidebar_open')
        document.body.classList.remove('hidden')
    }
}

function addPicturesToData(data) {
    for (let room of data) {
        room.promiseArr = []
        room.images.map(imgSrc => {
            room.promiseArr.push(downloadFullExample(imgSrc, function f(url) {    
                return url
            }))
        })
    }
    return data
}


// Выполнение кода на странице
filterButton.addEventListener('click', () => {
    filterBlock.classList.toggle('left-sidebar_open')
    document.body.classList.toggle('hidden')
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
    .then(data => addPicturesToData(data))
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
        let page = 1
        if (location.search) {
            page = getParamsFromUrl().page
        }

        pagination = applyFilterData(data, filterParams, page)
        // pagination = new Pagination(data) Проверка скорости загрузки

        myRangeSlider(filterParams.cost)


        leftSidebarCloseButton.addEventListener('click', function(event) {
            closeSidebar()
            
            pagination = new Pagination(data)
            renderRoomCards(pagination)
            renderPagination(pagination)
            history.pushState('', '', `/search-room.html?page=1`)
            
            datepicker.clear()
            for (let checkbox of filterBlock.querySelectorAll('input[type="checkbox"]:checked')) {
                checkbox.parentElement.dispatchEvent(change)
                console.log(checkbox)
            }
            console.log(filterParams)
        })

        leftSidebarAcceptButton.addEventListener('click', function() {
            closeSidebar()

            pagination = applyFilterData(data, filterParams, 1)
        })
    })
    .catch(error => returnStringIfNoData('Произошла ошибка при загрузке данных. Пожалуйста, попробуйте еще раз')) //'Failed to fetch'

window.addEventListener('popstate', () => {

    if (location.search.includes('page')) {
        pagination.currentPage = getParamsFromUrl().page
    } else {
        pagination.currentPage = 1
    }

    renderRoomCards(pagination)
    renderPagination(pagination)
})

firebase.initializeApp(firebaseConfig)