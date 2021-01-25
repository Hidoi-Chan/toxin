import 'air-datepicker'

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
        }
    })

    const datepicker = $('.field_js-datepicker').datepicker().data('datepicker')
    
    let datepickerButtonsContainer = document.querySelector('.datepicker--buttons')
    datepickerButtonsContainer.innerHTML = ''
    
    let buttonForDatepickerClear = document.createElement('button')
    buttonForDatepickerClear.classList.add('datepicker--button')
    buttonForDatepickerClear.innerHTML = '<h3 class="button__text_color_purple" data-action="clear">Очистить</h3>'
    buttonForDatepickerClear.addEventListener('click', () => {
        if (datepicker.$altField) {
            datepicker.$altField.value = ''
        }
    })
    datepickerButtonsContainer.append(buttonForDatepickerClear)
    
    let buttonForDatepickerApply = document.createElement('button')
    buttonForDatepickerApply.innerHTML = '<h3 class="button__text_color_purple">Применить</h3>'
    buttonForDatepickerApply.addEventListener('click', () => {

        // resultObj.bookedDate = []
        // let date = datepicker.selectedDates
        // if (date.length == 2) {
        //     let firstDay = new Date(date[0].setDate(date[0].getDate() + 1))
        //     let lastDay = date[1]
        //     while (firstDay.getTime() != lastDay.getTime()) {
        //         resultObj.bookedDate.push(firstDay)
        //         firstDay = new Date(firstDay.setDate(firstDay.getDate() + 1))
        //     }
        // } 
        // if (date.length == 1) {
        //     let oneDay = new Date(date[0].setDate(date[0].getDate() - 1))
        //     resultObj.bookedDate.push(oneDay)

        //     let tomorrowStr = new Date(oneDay.setDate(oneDay.getDate() + 1))
        //     datepicker.$altField.value = `${('0' + tomorrowStr.getDate()).slice(-2)}.${('0' + (tomorrowStr.getMonth() + 1)).slice(-2)}.${tomorrowStr.getFullYear()}`
        // }
        
        // console.log(datepicker)

        let selectedDates = datepicker.selectedDates

        if (selectedDates.length === 1) {
            let tomorrow = new Date(selectedDates[0].getTime() + msInDay)
            selectedDates.push(tomorrow)
            if (datepicker.$altField) {
                datepicker.$altField.value = `${('0' + tomorrow.getDate()).slice(-2)}.${('0' + (tomorrow.getMonth() + 1)).slice(-2)}.${tomorrow.getFullYear()}`
            }
        }
        
        // selectedDates[0].setHours(13)
        // selectedDates[1].setHours(12)
        resultObj.bookedDate = [selectedDates[0].setHours(13), selectedDates[1].setHours(12)]
        datepicker.hide()
    })
    datepickerButtonsContainer.append(buttonForDatepickerApply)

    return datepicker
}