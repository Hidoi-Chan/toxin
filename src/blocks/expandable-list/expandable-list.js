let expandableLists = document.querySelectorAll('.expandable-list')

for (let list of expandableLists) {
    let button = list.querySelector('.expandable-list__button')
    let container = list.querySelector('.expandable-list__checkbox-container')
    button.addEventListener('click', function(event) {
        container.classList.toggle('expandable-list__checkbox-container_display_none')
    })
    list.addEventListener('mousedown', function(event) {
        event.preventDefault()
    })
}