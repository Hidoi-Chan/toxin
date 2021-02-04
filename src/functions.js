export function declOfNum(n, text_forms) {  
    n = Math.abs(n) % 100
    let n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

export function capitalizedString(str) {
    return str[0].toUpperCase() + str.slice(1)
}

export function timeHasPassed(date) {
    let today = new Date().getTime()
    let timePassed = today - new Date(date).getTime()

    if (timePassed < 1000 * 60) {
        return 'меньше минуты назад'
    } else if (timePassed < 1000 * 60 * 60) {
        let minutes = Math.floor(timePassed / (1000 * 60))
        return `${minutes} ${declOfNum(minutes, ['минуту', 'минуты', 'минут'])} назад`
    } else if (timePassed < 1000 * 60 * 60 * 24) {
        let hours = Math.floor(timePassed / (1000 * 60 * 60))
        return `${hours} ${declOfNum(hours, ['час', 'часа', 'часов'])} назад`
    } else if (timePassed < 1000 * 60 * 60 * 24 * 30) {
        let days = Math.floor(timePassed / (1000 * 60 * 60 * 24))
        return `${days} ${declOfNum(days, ['день', 'дня', 'дней'])} назад`
    } else if (timePassed < 1000 * 60 * 60 * 24 * 30 * 12) {
        let months = Math.floor(timePassed / (1000 * 60 * 60 * 24 * 30))
        return `${months} ${declOfNum(months, ['месяц', 'месяца', 'месяцев'])} назад`
    } else {
        return 'Более года назад'
    }
}

export function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export function getParamsFromUrl() {
    let params = {}
    location.search.slice(1).split('&').map(item => {
        let arr = item.split('=')
        params[arr[0]] = arr[1]
    })
    return params
}