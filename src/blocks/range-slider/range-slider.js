export function livenUpTheRangeSlider(resultObj) {

    let slider = document.querySelector('.range-slider')
    let thumbMin = slider.querySelector('.range-slider__minPoint')
    let thumbMax = slider.querySelector('.range-slider__maxPoint')
    let filling = slider.querySelector('.range-slider__fill')
    let rangeResult = slider.querySelector('.range-slider__range')

    let min = resultObj.min
    let max = resultObj.max

    function resultString(min, max) {
        return min + 'Р - ' + max + 'Р'
    }
    
    rangeResult.innerText = resultString(resultObj.min, resultObj.max)
    
    function fillingCoords() {
        filling.style.left = thumbMin.offsetLeft + thumbMin.offsetWidth / 2 + 'px'
        filling.style.right = slider.offsetWidth - thumbMax.offsetLeft - thumbMax.offsetWidth / 2 + 'px'
    }
    thumbMin.style.left = 0 + 'px'
    thumbMax.style.left = slider.offsetWidth - thumbMax.offsetWidth + 'px'
    fillingCoords()
    
    function moveSlider(elem) {
        let point = (max - min) / (slider.offsetWidth - elem.offsetWidth)
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
                thumbMin.offsetLeft ? resultObj.min = min + Math.round(point * thumbMin.offsetLeft) : resultObj.min = min
                thumbMax.offsetLeft ? resultObj.max = min + Math.round(point * thumbMax.offsetLeft) : resultObj.max = min
                rangeResult.innerText = resultString(resultObj.min, resultObj.max)
            }
        })
    }
    
    moveSlider(thumbMin)
    moveSlider(thumbMax)    
}