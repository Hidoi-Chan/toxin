import {declOfNum} from '@/functions.js'

export function livenUpTheDropdown(resultObj) {

    function nameArr(name) {
        switch (name) {
            case 'guests':
            return ['гость', 'гостя', 'гостей']
            case 'babies':
            return ['младенец', 'младенца', 'младенцев']
            case 'bedrooms':
            return ['спальня', 'спальни', 'спален']
            case 'bed':
            return ['кровать', 'кровати', 'кроватей']
            case 'bathrooms':
            return ['ванная комната', 'ванные комнаты', 'ванных комнат']
        }
    }
    
    let dropdownsArr = document.querySelectorAll('.js-dropdown')
    
    for (let dropdown of dropdownsArr) {
        let dropdownField = dropdown.querySelector('.js-dropdown__field-wrapper')
        let input = dropdown.querySelector('input.field')
        let container = dropdown.querySelector('.js-dropdown__container')
        let dropdownItemsArr = container.querySelectorAll('.js-dropdown__item')
        let buttonClear = container.querySelector('.js-dropdown-button-clear')
        let buttonApply = container.querySelector('.js-dropdown-button-apply')
    
        let click = new Event('click')
    
        function nullResult() {
            if (dropdown.classList.contains('js-dropdown-guests')) {
                resultObj.guests = {
                    guests: 0,
                    babies: 0
                }
            }
            if (dropdown.classList.contains('js-dropdown-room')) {
                resultObj.conveniences = {
                    bedrooms: 0,
                    bed: 0,
                    bathrooms: 0
                }
            }
        }
        nullResult()
    
        dropdownField.addEventListener('click', function() {
            if (container.style.display == 'block') {
                if (dropdown.classList.contains('dropdown_hover')) {
                    dropdown.classList.remove('dropdown_hover')
                }
                container.style.display = ''
            } else {
                dropdown.classList.add('dropdown_hover')
                container.style.display = 'block'
            }
        })
    
        for (let dropdownItem of dropdownItemsArr) {
            let buttonIncrement = dropdownItem.querySelector('.js-dropdown__button-increment')
            let buttonDecrement = dropdownItem.querySelector('.js-dropdown__button-decrement')
            let counterItem = dropdownItem.querySelector('.js-dropdown__counter')
            let name = dropdownItem.querySelector('.js-dropdown__item-name').getAttribute('name')
    
            buttonDecrement.classList.add('dropdown__button_disabled')
    
            function resultString() {
                let resultString = ''
                let sum = 0
                let obj

                if (dropdown.classList.contains('js-dropdown-guests')) {
                    obj = resultObj.guests
                }
                if (dropdown.classList.contains('js-dropdown-room')) {
                    obj = resultObj.conveniences
                }

                for (let key in obj) {
                    if (obj[key]) {
                        resultString += obj[key] + ' ' + declOfNum(obj[key], nameArr(key)) + ', '
                    }
                    sum += obj[key]
                }
    
                if (sum && buttonClear) {
                    buttonClear.classList.remove('dropdown__footer-button_disabled')
                }
                if (sum == 0 && buttonClear) {
                    buttonClear.classList.add('dropdown__footer-button_disabled')
                }

                return resultString.slice(0, -2)
            }
    
            buttonIncrement.addEventListener('click', function(event) {
                event.preventDefault()
    
                if (counterItem.textContent == 0) {
                    buttonDecrement.classList.remove('dropdown__button_disabled')
                }
    
                counterItem.textContent = +counterItem.textContent + 1
    
                if (name == 'guests' || name == 'babies') {
                    resultObj.guests[name] += 1
                } else {
                    resultObj.conveniences[name] += 1
                }
                
                input.value = resultString()
            })
    
            buttonDecrement.addEventListener('click', function(event) {
                event.preventDefault()
                if (+counterItem.textContent > 0) {
                    counterItem.textContent -= 1
    
                    if (name == 'guests' || name == 'babies') {
                        resultObj.guests[name] -= 1
                    } else {
                        resultObj.conveniences[name] -= 1
                    }

                    input.value = resultString()
                }
    
                if (counterItem.textContent == 0) {
                    buttonDecrement.classList.add('dropdown__button_disabled')
                }
            })
    
            if (name == 'bedrooms') {
                buttonIncrement.dispatchEvent(click)
                buttonIncrement.dispatchEvent(click)
            }
    
            if (name == 'bed') {
                buttonIncrement.dispatchEvent(click)
                buttonIncrement.dispatchEvent(click)
            }
        }
    
        if (buttonClear && buttonApply) {
            buttonClear.classList.add('dropdown__footer-button_disabled')
    
            buttonClear.addEventListener('click', function(event) {
                event.preventDefault()
                nullResult()
                buttonClear.classList.add('dropdown__footer-button_disabled')
                input.value = input.getAttribute('placeholder')
                for (let dropdownItem of dropdownItemsArr) {
                    dropdownItem.querySelector('.js-dropdown__counter').textContent = 0
                    dropdownItem.querySelector('.js-dropdown__button-decrement').classList.add('dropdown__button_disabled')
                }
            })
    
            buttonApply.addEventListener('click', function(event) {
                event.preventDefault()
                container.style.display = ''
            })
        }
    }
}