import Inputmask from 'inputmask'

Inputmask({
    alias: 'datetime',
    inputFormat: 'dd.mm.yyyy',
    placeholder: 'ДД.ММ.ГГГГ'
}).mask('.field_js-date')