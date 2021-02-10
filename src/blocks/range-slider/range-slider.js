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
    
    // function moveSlider(elem) {
    //     let point = (max - min) / (sliderField.offsetWidth - elem.offsetWidth)
    //     elem.addEventListener('pointerdown', function(event) {
    //         event.preventDefault()
    //         let shiftX = event.clientX - elem.getBoundingClientRect().left
    //         document.addEventListener('pointermove', drag)
    //         document.addEventListener('pointerup', (event) => {
    //             document.removeEventListener('pointermove', drag)
    //         })
    //         function drag(event) {
    //             let left = event.clientX - sliderField.getBoundingClientRect().left - shiftX
    
    //             if (elem == thumbMin) {
    //                 if (left < 0) {
    //                     left = 0
    //                 }
    //                 if (left > thumbMax.offsetLeft) {
    //                     left = thumbMax.offsetLeft
    //                 }
    //             }
    
    //             if (elem == thumbMax) {
    //                 if (left < thumbMin.offsetLeft) {
    //                     left = thumbMin.offsetLeft
    //                 }
    //                 if (left > sliderField.offsetWidth - elem.offsetWidth) {
    //                     left = sliderField.offsetWidth - elem.offsetWidth
    //                 }
    //             }
    
    //             elem.style.left = left + 'px'            
    //             fillingCoords()
    //             thumbMin.offsetLeft ? resultObj.min = min + Math.round(point * thumbMin.offsetLeft) : resultObj.min = min
    //             thumbMax.offsetLeft ? resultObj.max = min + Math.round(point * thumbMax.offsetLeft) : resultObj.max = min
    //             rangeResult.innerText = resultString(resultObj.min, resultObj.max)
    //         }
    //     })
    // }
    
    // moveSlider(thumbMin)
    // moveSlider(thumbMax)
    
    function moveSlider(elem) {
        elem.addEventListener('mousedown', function(event) {
            event.preventDefault()
            // console.log(event)
            
            let target, left, shiftX
            if(event.target != thumbMin && event.target != thumbMax) {
                // shiftX = 0
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
                // shiftX = event.clientX - elem.getBoundingClientRect().left
            }
            document.addEventListener('mousemove', drag)
            document.addEventListener('mouseup', (event) => {
                document.removeEventListener('mousemove', drag)
            })
            function drag(event) {
                left = event.clientX - thumbMax.offsetWidth / 2 - elem.getBoundingClientRect().left // - shiftX
    
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
            console.log(event)
            event.preventDefault()
            // console.log(event)
            
            let target, left, shiftX
            if(event.target != thumbMin && event.target != thumbMax) {
                // shiftX = 0
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
                // shiftX = event.clientX - elem.getBoundingClientRect().left
            }
            document.addEventListener('touchmove', drag)
            document.addEventListener('touchend', (event) => {
                document.removeEventListener('touchmove', drag)
            })
            function drag(event) {
                left = event.clientX - thumbMax.offsetWidth / 2 - elem.getBoundingClientRect().left // - shiftX
    
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



















// // THIS IS THE RANGE SLIDER LOGIC DO NOT CHANGE !!
// var ZBRangeSlider = function(id) { 
//     var self = this;
//     var startX = 0, x = 0;
  
//     // retrieve touch button
//     var slider     = document.getElementById(id)
//     var touchLeft  = slider.querySelector('.slider-touch-left');
//     var touchRight = slider.querySelector('.slider-touch-right');
//     var lineSpan   = slider.querySelector('.slider-line span');
    
//     // get some properties
//     var min   = parseFloat(slider.getAttribute('se-min'));
//     var max   = parseFloat(slider.getAttribute('se-max'));
    
//     // retrieve default values
//     var defaultMinValue = min;
//     if(slider.hasAttribute('se-min-value'))
//     {
//       defaultMinValue = parseFloat(slider.getAttribute('se-min-value'));  
//     }
//     var defaultMaxValue = max;
    
//     if(slider.hasAttribute('se-max-value'))
//     {
//       defaultMaxValue = parseFloat(slider.getAttribute('se-max-value'));  
//     }
    
//     // check values are correct
//     if(defaultMinValue < min)
//     {
//       defaultMinValue = min;
//     }
    
//     if(defaultMaxValue > max)
//     {
//       defaultMaxValue = max;
//     }
    
//     if(defaultMinValue > defaultMaxValue)
//     {
//       defaultMinValue = defaultMaxValue;
//     }
    
//     var step  = 0.0;
    
//     if (slider.getAttribute('se-step'))
//     {
//       step  = Math.abs(parseFloat(slider.getAttribute('se-step')));
//     }
    
//     // normalize flag
//     var normalizeFact = 26;
    
//     self.slider = slider;
//     self.reset = function() {
//       touchLeft.style.left = '0px';
//       touchRight.style.left = (slider.offsetWidth - touchLeft.offsetWidth) + 'px';
//       lineSpan.style.marginLeft = '0px';
//       lineSpan.style.width = (slider.offsetWidth - touchLeft.offsetWidth) + 'px';
//       startX = 0;
//       x = 0;
//     };
    
//     self.setMinValue = function(minValue)
//     {
//       var ratio = ((minValue - min) / (max - min));
//       touchLeft.style.left = Math.ceil(ratio * (slider.offsetWidth - (touchLeft.offsetWidth + normalizeFact))) + 'px';
//       lineSpan.style.marginLeft = touchLeft.offsetLeft + 'px';
//       lineSpan.style.width = (touchRight.offsetLeft - touchLeft.offsetLeft) + 'px';
//       slider.setAttribute('se-min-value', minValue);
//     }
    
//     self.setMaxValue = function(maxValue)
//     {
//       var ratio = ((maxValue - min) / (max - min));
//       touchRight.style.left = Math.ceil(ratio * (slider.offsetWidth - (touchLeft.offsetWidth + normalizeFact)) + normalizeFact) + 'px';
//       lineSpan.style.marginLeft = touchLeft.offsetLeft + 'px';
//       lineSpan.style.width = (touchRight.offsetLeft - touchLeft.offsetLeft) + 'px';
//       slider.setAttribute('se-max-value', maxValue);
//     }
    
//     // initial reset
//     self.reset();
    
//     // usefull values, min, max, normalize fact is the width of both touch buttons
//     var maxX = slider.offsetWidth - touchRight.offsetWidth;
//     var selectedTouch = null;
//     var initialValue = (lineSpan.offsetWidth - normalizeFact);
  
//     // set defualt values
//     self.setMinValue(defaultMinValue);
//     self.setMaxValue(defaultMaxValue);
    
//     // setup touch/click events
//     function onStart(event) {
      
//       // Prevent default dragging of selected content
//       event.preventDefault();
//       var eventTouch = event;
  
//       if (event.touches)
//       {
//         eventTouch = event.touches[0];
//       }
      
//       if(this === touchLeft)
//       {
//         x = touchLeft.offsetLeft;
//       }
//       else
//       {
//         x = touchRight.offsetLeft;
//       }
  
//       startX = eventTouch.pageX - x;
//       selectedTouch = this;
//       document.addEventListener('mousemove', onMove);
//       document.addEventListener('mouseup', onStop);
//       document.addEventListener('touchmove', onMove);
//       document.addEventListener('touchend', onStop);
      
  
//     }
    
//     function onMove(event) {
//       var eventTouch = event;
  
//       if (event.touches)
//       {
//         eventTouch = event.touches[0];
//       }
  
//       x = eventTouch.pageX - startX;
      
//       if (selectedTouch === touchLeft)
//       {
//         if(x > (touchRight.offsetLeft - selectedTouch.offsetWidth + 10))
//         {
//           x = (touchRight.offsetLeft - selectedTouch.offsetWidth + 10)
//         }
//         else if(x < 0)
//         {
//           x = 0;
//         }
        
//         selectedTouch.style.left = x + 'px';
//       }
//       else if (selectedTouch === touchRight)
//       {
//         if(x < (touchLeft.offsetLeft + touchLeft.offsetWidth - 10))
//         {
//           x = (touchLeft.offsetLeft + touchLeft.offsetWidth - 10)
//         }
//         else if(x > maxX)
//         {
//           x = maxX;
//         }
//         selectedTouch.style.left = x + 'px';
//       }
      
//       // update line span
//       lineSpan.style.marginLeft = touchLeft.offsetLeft + 'px';
//       lineSpan.style.width = (touchRight.offsetLeft - touchLeft.offsetLeft) + 'px';
      
//       // write new value
//       calculateValue();
      
//       // call on change
//       if(slider.getAttribute('on-change'))
//       {
//         var fn = new Function('min, max', slider.getAttribute('on-change'));
//         fn(slider.getAttribute('se-min-value'), slider.getAttribute('se-max-value'));
//       }
      
//       if(self.onChange)
//       {
//         self.onChange(slider.getAttribute('se-min-value'), slider.getAttribute('se-max-value'));
//       }
      
//     }
    
//     function onStop(event) {
//       document.removeEventListener('mousemove', onMove);
//       document.removeEventListener('mouseup', onStop);
//       document.removeEventListener('touchmove', onMove);
//       document.removeEventListener('touchend', onStop);
      
//       selectedTouch = null;
  
//       // write new value
//       calculateValue();
      
//       // call did changed
//       if(slider.getAttribute('did-changed'))
//       {
//         var fn = new Function('min, max', slider.getAttribute('did-changed'));
//         fn(slider.getAttribute('se-min-value'), slider.getAttribute('se-max-value'));
//       }
      
//       if(self.didChanged)
//       {
//         self.didChanged(slider.getAttribute('se-min-value'), slider.getAttribute('se-max-value'));
//       }
//     }
    
//     function calculateValue() {
//       var newValue = (lineSpan.offsetWidth - normalizeFact) / initialValue;
//       var minValue = lineSpan.offsetLeft / initialValue;
//       var maxValue = minValue + newValue;
  
//       var minValue = minValue * (max - min) + min;
//       var maxValue = maxValue * (max - min) + min;
      
//       console.log(step);
//       if (step !== 0.0)
//       {
//         var multi = Math.floor((minValue / step));
//         minValue = step * multi;
        
//         multi = Math.floor((maxValue / step));
//         maxValue = step * multi;
//       }
      
//       slider.setAttribute('se-min-value', minValue);
//       slider.setAttribute('se-max-value', maxValue);
//     }
    
//     // link events
//     touchLeft.addEventListener('mousedown', onStart);
//     touchRight.addEventListener('mousedown', onStart);
//     touchLeft.addEventListener('touchstart', onStart);
//     touchRight.addEventListener('touchstart', onStart);
//   };
  
//   // -------------------
//   // How to use? 
//   var newRangeSlider = new ZBRangeSlider('my-slider');
  
//   newRangeSlider.onChange = function(min, max)
//   {
//     console.log(min, max, this);
//     document.getElementById('result').innerHTML = 'Min: ' + min + ' Max: ' + max;
//   }
  
//   newRangeSlider.didChanged = function(min, max)
//   {
//     console.log(min,max, this);
//     document.getElementById('result').innerHTML = 'Min: ' + min + ' Max: ' + max;
//   }
  
//   // call reset if needed
//   // newRangeSlider.reset();