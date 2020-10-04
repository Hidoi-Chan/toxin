export default function dropdown(id) {
    const dropdown = document.getElementById(id)
    const dropdownBtn = dropdown.querySelector('.dropdown__btn')
    const dropdownBtnText = dropdownBtn.firstElementChild
    const dropdownList = dropdown.querySelector('.dropdown__list')
    const listArr = dropdown.querySelectorAll('.dropdown__list-item')
    const dropdownBtnClean = dropdown.querySelector('.dropdown__footer_button:first-child')
    const dropdownBtnCheck = dropdown.querySelector('.dropdown__footer_button:last-child')

    dropdownBtn.addEventListener('click', () => {
        dropdownList.classList.toggle('display_none')
        dropdownBtn.classList.toggle('dropdown__btn_hover')
    })

    const newListArr = []
    for (let i = 0; i < listArr.length; i++) {
        newListArr.push({
            name: listArr[i].querySelector('.dropdown__list-item-name').innerText,
            btnDecrement: listArr[i].querySelectorAll('.button_round')[0],
            btnIncrement: listArr[i].querySelectorAll('.button_round')[1],
            counter: listArr[i].querySelector('.dropdown__counter-block-counter').innerText
        })
    }

    if (dropdown === document.getElementById('guests')) {

        let title = dropdownBtnText.innerText = 'Сколько гостей'
        let sum = 0
    
        newListArr.map((item, index) => {
            item.btnDecrement.addEventListener('click', decrement)
            item.btnIncrement.addEventListener('click', increment)
            dropdownBtnClean.addEventListener('click', clean)
            item.counter *= 1
    
            function decrement() {
                if (item.counter) {
                    item.counter -= 1
                    sum -= 1
                    listArr[index].querySelector('.dropdown__counter-block-counter').innerText = item.counter
                    if (!sum) {
                        dropdownBtnClean.classList.add('dropdown__footer_button_disabled')
                    }
                }
            }
    
            function increment() {
                if (item.counter < 10) {
                    item.counter += 1
                    sum+= 1
                    listArr[index].querySelector('.dropdown__counter-block-counter').innerText = item.counter
                    dropdownBtnClean.classList.remove('dropdown__footer_button_disabled')
                }
            }
    
            function clean() {
                listArr.forEach(i => {
                    i.querySelector('.dropdown__counter-block-counter').innerText = item.counter = 0
                })
                dropdownBtnText.innerText = title
                dropdownBtnClean.classList.add('dropdown__footer_button_disabled')
            }
        })
        
        dropdownBtnCheck.addEventListener('click', check)
    
        function check() {
            let guests = newListArr[0].counter + newListArr[1].counter
            let babies = newListArr[2].counter
    
            let guestsString = ''
            switch (guests) {
                case 0:
                    break;
                case 1:
                    guestsString = guests + ' гость';
                    break;
                case 2:
                case 3:
                case 4:
                    guestsString = guests + ' гостя';
                    break;
                default:
                    guestsString = guests + ' гостей';
                    break;
            }
            let babiesString = ''
            switch (babies) {
                case 0:
                    break;
                case 1:
                    babiesString = babies + ' младенец';
                    break;
                case 2:
                case 3:
                case 4:
                    babiesString = babies + ' младенца';
                    break;
                default:
                    babiesString = babies + ' младенцев';
                    break;
            }
    
            if (guestsString && babiesString) {
                dropdownBtnText.innerText = guestsString + ', ' + babiesString
            } else if (!guestsString) {
                dropdownBtnText.innerText = title
            } else {
                dropdownBtnText.innerText = guestsString
            }
        }

    }

    if (dropdown === document.getElementById('rooms')) {
        
        console.log(newListArr)
    
        newListArr.map((item, index) => {

            item.btnDecrement.addEventListener('click', decrement)
            item.btnIncrement.addEventListener('click', increment)
            item.counter *= 1

            if (index < 2) {
                listArr[index].querySelector('.dropdown__counter-block-counter').innerText = item.counter = 2
            }
    
            function decrement() {
                if (item.counter) {
                    item.counter -= 1
                    listArr[index].querySelector('.dropdown__counter-block-counter').innerText = item.counter
                }
            }
    
            function increment() {
                if (item.counter < 10) {
                    item.counter += 1
                    listArr[index].querySelector('.dropdown__counter-block-counter').innerText = item.counter
                }
            }

        })
        
        let title = dropdownBtnText.innerHTML = '2 спальни, 2 кровати&hellip;'
    
        // function check() {
        //     let guests = newListArr[0].counter + newListArr[1].counter
        //     let babies = newListArr[2].counter
    
        //     let guestsString = ''
        //     switch (guests) {
        //         case 0:
        //             break;
        //         case 1:
        //             guestsString = guests + ' гость';
        //             break;
        //         case 2:
        //         case 3:
        //         case 4:
        //             guestsString = guests + ' гостя';
        //             break;
        //         default:
        //             guestsString = guests + ' гостей';
        //             break;
        //     }
        //     let babiesString = ''
        //     switch (babies) {
        //         case 0:
        //             break;
        //         case 1:
        //             babiesString = babies + ' младенец';
        //             break;
        //         case 2:
        //         case 3:
        //         case 4:
        //             babiesString = babies + ' младенца';
        //             break;
        //         default:
        //             babiesString = babies + ' младенцев';
        //             break;
        //     }
    
        //     if (guestsString && babiesString) {
        //         dropdownBtnText.innerText = guestsString + ', ' + babiesString
        //     } else if (!guestsString) {
        //         dropdownBtnText.innerText = 'Сколько гостей'
        //     } else {
        //         dropdownBtnText.innerText = guestsString
        //     }
        // }
    }
}