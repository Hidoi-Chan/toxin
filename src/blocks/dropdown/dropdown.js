function dropdown(id) {
    const dropdown = document.getElementById(id)
    const dropdownBtn = dropdown.querySelector('.dropdown__btn')
    let dropdownBtnText = dropdownBtn.firstElementChild
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
    let sum = 0

    // console.log(newListArr)

    newListArr.map((item, index) => {
        item.btnDecrement.addEventListener('click', decrement)
        item.btnIncrement.addEventListener('click', increment)
        dropdownBtnClean.addEventListener('click', clean)
        dropdownBtnCheck.addEventListener('click', check);
        let value = item.counter * 1

        function decrement() {
            if (value > 0) {
                value -= 1
                sum -= 1
                listArr[index].querySelector('.dropdown__counter-block-counter').innerText = value
            }
        }

        function increment() {
            if (sum < 20) {
                value += 1
                sum += 1
                listArr[index].querySelector('.dropdown__counter-block-counter').innerText = value
            }
        }

        function clean() {
            listArr.forEach(i => {
                i.querySelector('.dropdown__counter-block-counter').innerText = '0';
                value = sum = 0;
            })
            dropdownBtnText.innerText = 'Сколько гостей';
        }

        function check() {
            console.log(newListArr)
            // switch (sum) {
            //     case 0:
            //         break;
            //     case 1:
            //         dropdownBtnText.innerText = sum + ' гость';
            //         break;
            //         break;
            //     case 2:
            //     case 3:
            //     case 4:
            //         dropdownBtnText.innerText = sum + ' гостя';
            //         break;
            //     default:
            //         dropdownBtnText.innerText = sum + ' гостей';
            //         break;
            // }
        }
    })

      // let dropdownListItem = document.querySelectorAll('.jsDropdownGuestsListItem');
      // let dropdownBtnClean = document.querySelector('.jsDropdownGuestsBtnClean');
      // let dropdownBtnCheck = document.querySelector('.jsDropdownGuestsBtnCheck');
      // let sum = 0;
      // dropdownListItem.forEach(item => {
      //     let counter = item.querySelector('.jsDropdownGuestsCounter').innerText * 1;
      //     let buttonDecrement = item.querySelector('.jsDropdownGuestsDecrement');
      //     let buttonIncrement = item.querySelector('.jsDropdownGuestsIncrement');

      //     buttonDecrement.addEventListener('click', decrement);
      //     buttonIncrement.addEventListener('click', increment);
      //     dropdownBtnClean.addEventListener('click', clean);

      // function decrement() {
      //     if (counter>0) {
      //         counter-= 1;
      //         sum-= 1;
      //         item.querySelector('.jsDropdownGuestsCounter').innerText = counter;
      //     }
      // }

      // function increment() {
      //     if (sum<20) {
      //         counter+=1;
      //         sum+= 1;
      //         item.querySelector('.jsDropdownGuestsCounter').innerText = counter;
      //     }
      // }

      //     function clean() {
      //         document.querySelectorAll('.jsDropdownGuestsCounter').forEach(item => {
      //             item.innerText = '0';
      //             counter = sum = 0;
      //         })
      //         dropdownBtn.firstElementChild.innerText = 'Сколько гостей';
      //     }
      // })

      // dropdownBtnCheck.addEventListener('click', check);

      // function check() {
      //     switch (sum) {
      //         case 0:
      //             break;
      //         case 1:
      //             dropdownBtn.firstElementChild.innerText = sum + ' гость';
      //             break;
      //             break;
      //         case 2:
      //         case 3:
      //         case 4:
      //             dropdownBtn.firstElementChild.innerText = sum + ' гостя';
      //             break;
      //         default:
      //             dropdownBtn.firstElementChild.innerText = sum + ' гостей';
      //             break;
      //     }
      // }
}

dropdown('guests')