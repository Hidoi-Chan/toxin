export function myRangeSlider(resultObj) {

    let slider = document.querySelector('.range-slider')
    let sliderField = slider.querySelector('.range-slider__field')
    let thumbMin = sliderField.querySelector('.range-slider__minPoint')
    let thumbMax = sliderField.querySelector('.range-slider__maxPoint')
    let filling = sliderField.querySelector('.range-slider__fill')
    let rangeResult = slider.querySelector('.range-slider__range')

    let min = resultObj.min
    let max = resultObj.max

    function resultString(min, max) {
        return min + 'Р - ' + max + 'Р'
    }
    
    rangeResult.innerText = resultString(resultObj.min, resultObj.max)
    
    function fillingCoords() {
        filling.style.left = thumbMin.offsetLeft + thumbMin.offsetWidth / 2 + 'px'
        filling.style.right = sliderField.offsetWidth - thumbMax.offsetLeft - thumbMax.offsetWidth / 2 + 'px'
    }
    thumbMin.style.left = 0 + 'px'
    thumbMax.style.left = sliderField.offsetWidth - thumbMax.offsetWidth + 'px'
    fillingCoords()
    
    function moveSlider(elem) {
        let point = (max - min) / (sliderField.offsetWidth - elem.offsetWidth)
        elem.addEventListener('pointerdown', function(event) {
            event.preventDefault()
            let shiftX = event.clientX - elem.getBoundingClientRect().left
            document.addEventListener('pointermove', drag)
            document.addEventListener('pointerup', (event) => {
                document.removeEventListener('pointermove', drag)
            })
            function drag(event) {
                let left = event.clientX - sliderField.getBoundingClientRect().left - shiftX
    
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
                    if (left > sliderField.offsetWidth - elem.offsetWidth) {
                        left = sliderField.offsetWidth - elem.offsetWidth
                    }
                }
    
                elem.style.left = left + 'px'            
                fillingCoords()
                thumbMin.offsetLeft ? resultObj.min = min + Math.round(point * thumbMin.offsetLeft) : resultObj.min = min
                thumbMax.offsetLeft ? resultObj.max = min + Math.round(point * thumbMax.offsetLeft) : resultObj.max = min
                rangeResult.innerText = resultString(resultObj.min, resultObj.max)
            }
        })
    }
    
    moveSlider(thumbMin)
    moveSlider(thumbMax)    
}