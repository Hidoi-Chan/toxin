import {declOfNum} from '@/functions.js'

export default function draw(obj) {

    let rating = {
        sumptuously: {
            amount: 0,
            color: {
                from: '#FFE39C',
                to: '#FFBA9C'
            }
        },
        good: {
            amount: 0,
            color: {
                from: '#6FCF97',
                to: '#66D2EA'
            }
        },
        satisfactorily: {
            amount: 0,
            color: {
                from: '#BC9CFF',
                to: '#8BA4F9'
            }
        },
        disappointed: {
            amount: 0,
            color: {
                from: '#919191',
                to: '#3D4975'
            }
        }
    }

    for (let key in obj) {
        rating[key].amount = obj[key]
    }
    
    let sum = 0

    let canvas = document.getElementById('pie')
    let ctx = canvas.getContext('2d')

    let cw = canvas.width
    let ch = canvas.height
    let lineWidth = ctx.lineWidth = 4

    let objLength = 0
    let keyForOneColor
    for (let key in rating) {
        if (rating[key].amount) {
            objLength++
            keyForOneColor = key
        }
        sum += rating[key].amount
    }

    let begin = 269;

    
    if (objLength <= 1) {
        ctx.strokeStyle = 'rgba(31, 32, 65, 0.25)'
        if (objLength) {
            let gradient = ctx.createLinearGradient(60, 0, 60, 120)
            gradient.addColorStop(0, rating[keyForOneColor].color.from)
            gradient.addColorStop(1, rating[keyForOneColor].color.to)
            ctx.strokeStyle = gradient
        }
        ctx.beginPath()
        ctx.arc(cw/2, ch/2, cw/2 - lineWidth/2, rad(0), rad(360))
        ctx.stroke()
    }

    if (objLength > 1) {
        for (let key in rating) {
            let gradient = ctx.createLinearGradient(60, 0, 60, 120)
            gradient.addColorStop(0, rating[key].color.from)
            gradient.addColorStop(1, rating[key].color.to)
            ctx.strokeStyle = gradient

            let percent = rating[key].amount * 100 / sum
            let arcLength = (360 - objLength * 2) * percent / 100
            let end = begin - arcLength
            if (end < 0) {
                end = 360 + end
            }
            ctx.beginPath()
            ctx.arc(cw/2, ch/2, cw/2 - lineWidth/2, rad(begin), rad(end), true)
            ctx.stroke()
            begin = end - 2
        }
    }

    function rad(angle) {
        return Math.PI*angle/180
    }
    
    document.querySelector('.pie__sum').textContent = sum
    document.querySelector('.pie__word').textContent = declOfNum(sum, ['голос', 'голоса', 'голосов'])
}