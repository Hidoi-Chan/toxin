import $ from '../local_modules/jquery/dist/jquery.min'

$(document).ready(() => {
    
    let dropdownBtn = document.querySelector(".dropdown__btn");
    let dropdownList = document.querySelector(".dropdown__list");

    dropdownBtn.addEventListener('click', toggleList);

    function toggleList() {
        if (dropdownList.style.display == "none") {
            dropdownList.style.display = "block"
        } else {
            dropdownList.style.display = "none"
        }
    }

    function dropdownCounter() {

        let listArr = document.querySelectorAll(".dropdown__list-item");
        let newListArr = [];
        for (let i = 0; i < listArr.length; i++) {
            newListArr.push({
                name: listArr[i].querySelector(".dropdown__list-item-name").innerText,
                btnDecrement: listArr[i].querySelectorAll(".dropdown__counter-block-btn")[0],
                btnIncrement: listArr[i].querySelectorAll(".dropdown__counter-block-btn")[1],
                counter: listArr[i].querySelector(".dropdown__counter-block-counter").innerText
            })
        }

        console.log(newListArr);

        // let dropdownListItem = document.querySelectorAll(".jsDropdownGuestsListItem");
        // let dropdownBtnClean = document.querySelector(".jsDropdownGuestsBtnClean");
        // let dropdownBtnCheck = document.querySelector(".jsDropdownGuestsBtnCheck");
        // let sum = 0;
        // dropdownListItem.forEach(item => {
        //     let counter = item.querySelector(`.jsDropdownGuestsCounter`).innerText * 1;
        //     let buttonDecrement = item.querySelector(`.jsDropdownGuestsDecrement`);
        //     let buttonIncrement = item.querySelector(`.jsDropdownGuestsIncrement`);

        //     buttonDecrement.addEventListener('click', decrement);
        //     buttonIncrement.addEventListener('click', increment);
        //     dropdownBtnClean.addEventListener('click', clean);

        //     function decrement() {
        //         if (counter>0) {
        //             counter-= 1;
        //             sum-= 1;
        //             item.querySelector(`.jsDropdownGuestsCounter`).innerText = counter;
        //         }
        //     }

        //     function increment() {
        //         if (sum<20) {
        //             counter+=1;
        //             sum+= 1;
        //             item.querySelector(`.jsDropdownGuestsCounter`).innerText = counter;
        //         }
        //     }
        
        //     function clean() {
        //         document.querySelectorAll(`.jsDropdownGuestsCounter`).forEach(item => {
        //             item.innerText = "0";
        //             counter = sum = 0;
        //         })
        //         dropdownBtn.firstElementChild.innerText = "Сколько гостей";
        //     }
        // })

        // dropdownBtnCheck.addEventListener('click', check);
        
        // function check() {
        //     switch (sum) {
        //         case 0:
        //             break;
        //         case 1:
        //             dropdownBtn.firstElementChild.innerText = sum + " гость";
        //             break;
        //             break;
        //         case 2:
        //         case 3:
        //         case 4:
        //             dropdownBtn.firstElementChild.innerText = sum + " гостя";
        //             break;
        //         default:
        //             dropdownBtn.firstElementChild.innerText = sum + " гостей";
        //             break;
        //     }
        // }
    }

    dropdownCounter();

    console.log(`document ready`)
})