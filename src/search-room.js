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
import '@blocks/range-slider/range-slider.js'
import '@blocks/expandable-list/expandable-list.scss'
import '@blocks/checkbox/checkbox.scss'
import '@blocks/room-card/room-card.js'
import '@blocks/room-card/room-card.scss'
import '@blocks/rate/rate.scss'
import '@blocks/pagination/pagination.scss'
import '@blocks/field/field.scss'
import '@blocks/dropdown/dropdown.scss'
import '@blocks/dropdown/dropdown.js'
import '@blocks/copyright-bar/copyright-bar.scss'
import '@blocks/footer/footer.scss'
import '@pages/search-room/search-room.scss'

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