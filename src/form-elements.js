import '@img/image.png';
import '@img/image_4.png';

import '@style/global.scss'
import '@blocks/field/field.scss'
import '@blocks/field/field.js'
import '@blocks/datepicker/datepicker.scss'
import '@blocks/button/button.scss'
import '@blocks/dropdown/dropdown.scss'
import {myDropdown} from '@blocks/dropdown/dropdown.js'
import '@blocks/checkbox/checkbox.scss'
import '@blocks/radio/radio.scss'
import '@blocks/toggle/toggle.scss'
import '@blocks/like-button/like-button.scss'
import '@blocks/rate/rate.scss'
import '@blocks/expandable-list/expandable-list.scss'
import '@blocks/expandable-list/expandable-list.js'
import '@blocks/room-info-item/room-info-item.scss'
import '@blocks/review/review.scss'
import '@blocks/range-slider/range-slider.scss'
import {myRangeSlider} from '@blocks/range-slider/range-slider.js'
import '@blocks/pagination/pagination.scss'
import '@blocks/bullet-list/bullet-list.scss'
import '@pages/form-elements/form-elements.scss'

myRangeSlider({min: 5000, max: 10000})
myDropdown({})