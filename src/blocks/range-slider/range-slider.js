export function myRangeSlider(resultObj) {

    let slider = document.querySelector('.range-slider')
    let sliderField = slider.querySelector('.range-slider__field')
    let thumbMin = sliderField.querySelector('.range-slider__minPoint')
    let thumbMax = sliderField.querySelector('.range-slider__maxPoint')
    let filling = sliderField.querySelector('.range-slider__fill')
    let rangeResult = slider.querySelector('.range-slider__range')

    let min = resultObj.min
    let max = resultObj.max
    
    let point = (max - min) / (sliderField.offsetWidth - thumbMin.offsetWidth)

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

    function renderFinallyValues(elem, left) {
        elem.style.left = left + 'px'            
        fillingCoords()
        thumbMin.offsetLeft ? resultObj.min = min + Math.round(point * thumbMin.offsetLeft) : resultObj.min = min
        thumbMax.offsetLeft ? resultObj.max = min + Math.round(point * thumbMax.offsetLeft) : resultObj.max = min
        rangeResult.innerText = resultString(resultObj.min, resultObj.max)
    }
    
    function moveSlider(elem) {
        elem.addEventListener('mousedown', function(event) {
            event.preventDefault()
            
            let target, left
            if(event.target != thumbMin && event.target != thumbMax) {
                if (event.clientX >= thumbMax.getBoundingClientRect().left ||
                    thumbMax.getBoundingClientRect().left + thumbMax.offsetWidth / 2 - event.clientX <= event.clientX - thumbMin.getBoundingClientRect().left - thumbMin.offsetWidth / 2) {
                    target = thumbMax
                }
                if (event.clientX <= thumbMin.getBoundingClientRect().left ||
                    event.clientX - thumbMin.getBoundingClientRect().left - thumbMin.offsetWidth / 2 < thumbMax.getBoundingClientRect().left + thumbMax.offsetWidth / 2 - event.clientX) {
                    target = thumbMin
                }
                left = event.clientX - thumbMax.offsetWidth / 2 - elem.getBoundingClientRect().left
                if (left < 0) left = 0
                if (left > elem.offsetWidth - target.offsetWidth) {
                    left = elem.offsetWidth - target.offsetWidth
                }
                renderFinallyValues(target, left)
            } else {
                target = event.target
            }
            document.addEventListener('mousemove', drag)
            document.addEventListener('mouseup', (event) => {
                document.removeEventListener('mousemove', drag)
            })
            function drag(event) {
                left = event.clientX - thumbMax.offsetWidth / 2 - elem.getBoundingClientRect().left
    
                if (target == thumbMin) {
                    if (left < 0) {
                        left = 0
                    }
                    if (left > thumbMax.offsetLeft) {
                        left = thumbMax.offsetLeft
                    }
                }
    
                if (target == thumbMax) {
                    if (left < thumbMin.offsetLeft) {
                        left = thumbMin.offsetLeft
                    }
                    if (left > sliderField.offsetWidth - target.offsetWidth) {
                        left = sliderField.offsetWidth - target.offsetWidth
                    }
                }
                renderFinallyValues(target, left)
            }
        })

        elem.addEventListener('touchstart', function(event) {
            event.preventDefault()
            
            let target, left
            if(event.target != thumbMin && event.target != thumbMax) {
                if (event.targetTouches[0].clientX >= thumbMax.getBoundingClientRect().left ||
                    thumbMax.getBoundingClientRect().left + thumbMax.offsetWidth / 2 - event.targetTouches[0].clientX <= event.targetTouches[0].clientX - thumbMin.getBoundingClientRect().left - thumbMin.offsetWidth / 2) {
                        target = thumbMax
                }
                if (event.targetTouches[0].clientX <= thumbMin.getBoundingClientRect().left ||
                    event.targetTouches[0].clientX - thumbMin.getBoundingClientRect().left - thumbMin.offsetWidth / 2 < thumbMax.getBoundingClientRect().left + thumbMax.offsetWidth / 2 - event.targetTouches[0].clientX) {
                        target = thumbMin
                }
                left = event.targetTouches[0].clientX - thumbMax.offsetWidth / 2 - elem.getBoundingClientRect().left
                if (left < 0) left = 0

                if (left > elem.offsetWidth - target.offsetWidth) {
                    left = elem.offsetWidth - target.offsetWidth
                }
                renderFinallyValues(target, left)
            } else {
                target = event.target
            }
            document.addEventListener('touchmove', drag)
            document.addEventListener('touchend', (event) => {
                document.removeEventListener('touchmove', drag)
            })
            function drag(event) {
                left = event.targetTouches[0].clientX - thumbMax.offsetWidth / 2 - elem.getBoundingClientRect().left
    
                if (target == thumbMin) {
                    if (left < 0) {
                        left = 0
                    }
                    if (left > thumbMax.offsetLeft) {
                        left = thumbMax.offsetLeft
                    }
                }
    
                if (target == thumbMax) {
                    if (left < thumbMin.offsetLeft) {
                        left = thumbMin.offsetLeft
                    }
                    if (left > sliderField.offsetWidth - target.offsetWidth) {
                        left = sliderField.offsetWidth - target.offsetWidth
                    }
                }
                renderFinallyValues(target, left)
            }
        })
    }

    moveSlider(sliderField)
}