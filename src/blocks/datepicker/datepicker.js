import 'air-datepicker'

const months = ['Янв', 'Фев', 'Мар ', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']

function getAltField() {
    if (document.querySelector('.field_js-datepicker-altfield')) {
        return document.querySelector('.field_js-datepicker-altfield')
    }
}

function getDateFormat() {
    if (document.querySelector('.field_js-datepicker-altfield')) {
        return 'dd.mm.yyyy'
    } else {
        return 'd M'
    }    
}

const msInDay = 24 * 60 * 60 * 1000

export function myDatepicker(resultObj) {
    
    $('.field_js-datepicker').datepicker({
        minDate: new Date(),
        range: true,
        dateFormat: getDateFormat(),
        multipleDatesSeparator: ' - ',
        clearButton: true,
        navTitles: {
            days: 'MM yyyy'
        },
        offset: 6,
        altField: getAltField(),
        onHide: function(inst, animationCompleted) {
            inst.el.classList.remove('field_hover')
            if (inst.$altField) {
                inst.$altField.classList.remove('field_hover')
            }
        },
        onSelect: function(formattedDate, date, inst) {
            if (inst.$altField) {
                inst.$altField.value = ''

                let formattedDateArr = formattedDate.split(' - ')
                inst.el.value = formattedDateArr[0]
                if (formattedDateArr.length == 2) {
                    inst.$altField.value = formattedDateArr[1]
                }
            }

            if (date.length === 1) {
                let tomorrow = new Date(date[0].getTime() + msInDay)
                date.push(tomorrow)
            }
            
            if (date) resultObj.bookedDate = [date[0].setHours(13), date[1].setHours(12)]
        }
    })

    const datepicker = $('.field_js-datepicker').datepicker().data('datepicker')
    
    let datepickerButtonsContainer = document.querySelector('.datepicker--buttons')
    datepickerButtonsContainer.innerHTML = ''
    
    let buttonForDatepickerClear = document.createElement('button')
    buttonForDatepickerClear.classList.add('datepicker--button')
    buttonForDatepickerClear.innerHTML = '<h3 class="button__text_color_purple" data-action="clear">Очистить</h3>'
    buttonForDatepickerClear.addEventListener('click', () => {
        delete resultObj.bookedDate
        if (datepicker.$altField) {
            datepicker.$altField.value = ''
        }
    })
    datepickerButtonsContainer.append(buttonForDatepickerClear)
    
    let buttonForDatepickerApply = document.createElement('button')
    buttonForDatepickerApply.innerHTML = '<h3 class="button__text_color_purple js-datepicker-apply">Применить</h3>'
    buttonForDatepickerApply.addEventListener('click', () => {

        let selectedDates = datepicker.selectedDates
        if (selectedDates.length === 1) {
            let tomorrow = new Date(selectedDates[0].getTime() + msInDay)
            if (datepicker.$altField) {
                datepicker.$altField.value = `${('0' + tomorrow.getDate()).slice(-2)}.${('0' + (tomorrow.getMonth() + 1)).slice(-2)}.${tomorrow.getFullYear()}`
            } else {
                datepicker.el.value = `${selectedDates[0].getDate()} ${months[selectedDates[0].getMonth()]} - ${tomorrow.getDate()} ${months[tomorrow.getMonth()]}`
            }
        }

        datepicker.hide()
    })
    datepickerButtonsContainer.append(buttonForDatepickerApply)

    return datepicker
}