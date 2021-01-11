import 'air-datepicker'

// let myDatepicker = document.querySelector('.field_js-datepicker')

export function myDatepicker(resultObj) {
    
    $('.field_js-datepicker').datepicker({
        minDate: new Date(),
        range: true,
        dateFormat: 'd M',
        multipleDatesSeparator: ' - ',
        clearButton: true,
        navTitles: {
            days: 'MM yyyy'
        },
        offset: 6,
        onSelect: function(formattedDate, date, inst) {
            resultObj.bookedDate = [] // Настроить добавление дат в массив
            for (let day of date) {
                resultObj.bookedDate.push(day)
                while(date[date.length - 1].getDate() - day.getDate() != 1) {

                }
            }
        }
    })
    
    // let myDatepickerJQuerry = $('.field_js-datepicker').datepicker().data('datepicker')
    
    // myDatepicker.check = function(date) {
    //     console.log(date)
    // }
    
    let datepickerButtonsContainer = document.querySelector('.datepicker--buttons')
    datepickerButtonsContainer.innerHTML = ''
    
    let buttonForDatepickerClear = document.createElement('button')
    buttonForDatepickerClear.classList.add('datepicker--button')
    buttonForDatepickerClear.innerHTML = '<h3 class="button__text_color_purple" data-action="clear">Очистить</h3>'
    datepickerButtonsContainer.append(buttonForDatepickerClear)
    
    let buttonForDatepickerApply = document.createElement('button')
    buttonForDatepickerApply.classList.add('datepicker--button')
    buttonForDatepickerApply.innerHTML = '<h3 class="button__text_color_purple">Применить</h3>'
    // buttonForDatepickerApply.addEventListener('click', function (event) {
    //     myDatepicker.selectDate(date)
    // })
    datepickerButtonsContainer.append(buttonForDatepickerApply)
}