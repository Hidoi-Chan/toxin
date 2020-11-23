let headerNav = [
    {
        name: 'О нас', 
        isActive: true
    },
    {
        name: 'Услуги', 
        isActive: false,
        childItem: [
            {
                name: 'Lorem ipsum dolor',
                isActive: false,
            },
            {
                name: 'Lorem',
                isActive: false,
            },
            {
                name: 'Lorem',
                isActive: false,
            }
        ]
    },
    {
        name: 'Вакансии', 
        isActive: false
    },
    {
        name: 'Новости', 
        isActive: false
    },
    {
        name: 'Соглашения', 
        isActive: false,
        childItem: [
            {
                name: 'Lorem',
                isActive: false,
            },
            {
                name: 'Lorem ipsum dolor',
                isActive: false,
            },
            {
                name: 'Lorem',
                isActive: false,
            }
        ]
    }
]

function renderMenu(arrMenu) {
    let html = ''
    arrMenu.map((item, index) => {
        html += `<li class="nav__item">
            <a href="#" 
                class="nav__link
                ${item.isActive ? 'nav__link_active' : ''}
                ${item.childItem ? 'nav__link_expandable' : ''}">
                    ${item.name}
            </a>
            ${item.childItem ? renderMenu(item.childItem) : ''} 
        </li>`
    })
    return '<ul class="nav__menu">' + html + '</ul>'
}

let nav = document.querySelectorAll('.nav')
for (let menu of nav) {
    menu.insertAdjacentHTML('beforeend', renderMenu(headerNav))
}
