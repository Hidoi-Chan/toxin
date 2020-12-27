import datepicker from 'air-datepicker'

let myDatepicker = document.querySelector('.field_js-datepicker')

$('.field_js-datepicker').datepicker({
    minDate: new Date(),
    range: true,
    dateFormat: 'd M',
    multipleDatesSeparator: ' - ',
    clearButton: true,
    navTitles: {
        days: 'MM yyyy'
    },
    offset: 6
})

// let myDatepickerJQuerry = $('.field_js-datepicker').datepicker().data('datepicker')


let datepickerButtonsContainer = myDatepicker.querySelector('.datepicker--buttons')
datepickerButtonsContainer.innerHTML = ''

let buttonForDatepickerClear = document.createElement('button')
buttonForDatepickerClear.classList.add('datepicker--button')
buttonForDatepickerClear.innerHTML = '<h3 class="button__text_color_purple" data-action="clear">Очистить</h3>'
datepickerButtonsContainer.append(buttonForDatepickerClear)

let buttonForDatepickerApply = document.createElement('button')
buttonForDatepickerApply.classList.add('datepicker--button')
buttonForDatepickerApply.innerHTML = '<h3 class="button__text_color_purple">Применить</h3>'
datepickerButtonsContainer.append(buttonForDatepickerApply)