import datepicker from 'air-datepicker'

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

let myDatepicker = $('.field_js-datepicker').datepicker().data('datepicker')

console.log(myDatepicker)
$('.datepicker--nav-action[data-action=prev]').html('<i class="material-icons datepicker--icon">arrow_back</i>')
$('.datepicker--nav-action[data-action=next]').html('<i class="material-icons datepicker--icon">arrow_forward</i>')
console.log($('.datepicker--nav-action'))