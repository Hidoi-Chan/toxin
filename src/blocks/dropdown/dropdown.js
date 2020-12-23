function declOfNum(n, text_forms) {  
    n = Math.abs(n) % 100
    let n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

function nameArr(name) {
    switch (name) {
        case 'гости':
        return ['гость', 'гостя', 'гостей']
        case 'младенцы':
        return ['младенец', 'младенца', 'младенцев']
        case 'спальни':
        return ['спальня', 'спальни', 'спален']
        case 'кровати':
        return ['кровать', 'кровати', 'кроватей']
        case 'ванные комнаты':
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

    let result = new Map()
    function nullResult() {
        if (dropdown.classList.contains('js-dropdown-guests')) {
            result.set('гости', 0)
            result.set('младенцы', 0)
        }
        if (dropdown.classList.contains('js-dropdown-room')) {
            result.set('спальни', 0)
            result.set('кровати', 0)
            result.set('ванные комнаты', 0)
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
        let name = dropdownItem.querySelector('.js-dropdown__item-name').textContent

        buttonDecrement.classList.add('dropdown__button_disabled')

        function resultString() {
            let resultString = ''
            let sum = 0

            for (let entry of result) {
                if (entry[1]) {
                    resultString += entry[1] + ' ' + declOfNum(entry[1], nameArr(entry[0])) + ', '
                }
                sum += entry[1]
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

            if (name == 'взрослые' || name == 'дети') {
                result.set('гости', result.get('гости') + 1)
            } else {
                result.set(name, result.get(name) + 1)
            }
        
            input.value = resultString()
        })

        buttonDecrement.addEventListener('click', function(event) {
            event.preventDefault()
            if (+counterItem.textContent > 0) {
                counterItem.textContent -= 1

                if (name == 'взрослые' || name == 'дети') {
                    result.set('гости', result.get('гости') - 1)
                } else {
                    result.set(name, result.get(name) - 1)
                }

                input.value = resultString()
            }

            if (counterItem.textContent == 0) {
                buttonDecrement.classList.add('dropdown__button_disabled')
            }
        })

        if (name == 'спальни') {
            buttonIncrement.dispatchEvent(click)
            buttonIncrement.dispatchEvent(click)
        }

        if (name == 'кровати') {
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