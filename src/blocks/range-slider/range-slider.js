let slider = document.querySelector('.range-slider')
let thumbMin = slider.querySelector('.range-slider__minPoint')
let thumbMax = slider.querySelector('.range-slider__maxPoint')
let filling = slider.querySelector('.range-slider__fill')
let rangeResult = slider.querySelector('.range-slider__range')

let range = {
    min: 0,
    max: 15000,
    result: function() {
        return this.min + 'Р - ' + this.max + 'Р'
    }
}

rangeResult.innerText = range.result()

function fillingCoords() {
    filling.style.left = thumbMin.offsetLeft + thumbMin.offsetWidth / 2 + 'px'
    filling.style.right = slider.offsetWidth - thumbMax.offsetLeft - thumbMax.offsetWidth / 2 + 'px'
}
thumbMin.style.left = 0 + 'px'
thumbMax.style.left = slider.offsetWidth - thumbMax.offsetWidth + 'px'
fillingCoords()

function moveSlider(elem) {
    let point = Math.round((range.max - range.min) / (slider.offsetWidth - elem.offsetWidth - elem.clientLeft))
    elem.addEventListener('mousedown', function(event) {
        event.preventDefault()
        let shiftX = event.clientX - elem.getBoundingClientRect().left
        document.addEventListener('mousemove', drag)
        document.addEventListener('mouseup', (event) => {
            document.removeEventListener('mousemove', drag)
        })
        function drag(event) {
            let left = event.clientX - slider.getBoundingClientRect().left - shiftX

            if (elem == thumbMin) {
                if (left < 0) {
                    left = 0
                }
                if (left > thumbMax.offsetLeft) {
                    left = thumbMax.offsetLeft
                }
            }

            if (elem == thumbMax) {
                if (left < thumbMin.offsetLeft) {
                    left = thumbMin.offsetLeft
                }
                if (left > slider.offsetWidth - elem.offsetWidth) {
                    left = slider.offsetWidth - elem.offsetWidth
                }
            }

            elem.style.left = left + 'px'            
            fillingCoords()
            range.min = point * thumbMin.offsetLeft
            range.max = point * thumbMax.offsetLeft
            rangeResult.innerText = range.result()
        }
    })
}

moveSlider(thumbMin)
moveSlider(thumbMax)