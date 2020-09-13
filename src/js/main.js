import $ from '../local_modules/jquery/dist/jquery.min'

$(document).ready(() => {
    // eslint-disable-next-line no-console
    console.log(`document ready`)
})

let dropdownBtn = document.getElementById("jsDropdownGuestsBtn");
let dropdownList = document.getElementById("jsDropdownGuestsList");

dropdownBtn.addEventListener('click', toggleList);

function toggleList() {
    if (dropdownList.style.display == "none") {
        dropdownList.style.display = "block"
    } else {
        dropdownList.style.display = "none"
    }
}

let dropdownListItem = document.querySelectorAll(".jsDropdownGuestsListItem");

function dropdownCounter() {
    dropdownListItem.forEach((item, index, array) =>
        console.log(1)
)};

dropdownCounter();