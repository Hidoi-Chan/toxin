let headerNav = [
    {
        name: 'Главная',
        href: '/'
    },
    {
        name: 'Подбор комнаты',
        href: '/search-room.html'
    },
    {
        name: 'UI Kit',
        childItem: [
            {
                name: 'Цвета и шрифты',
                href: '/colors-type.html'
            },
            {
                name: 'Элементы',
                href: '/form-elements.html'
            },
            {
                name: 'Формы',
                href: '/cards.html'
            },
            {
                name: 'Шапка и подвал',
                href: '/headers-footers.html'
            }
        ]
    }
]

function renderItem(item) {
    if (item.href) {
        return `
            <li class="nav__item">
                <a href="${item.href}" class="nav__link">
                    ${item.name}
                </a>
            </li>
        `
    } else {
        return `
        <li class="nav__item">
            <div class="nav__link nav__link_expandable">
                    ${item.name}
            </div>
            ${renderMenu(item.childItem)} 
        </li>
    `
    }
}

function renderMenu(arrMenu) {
    let html = ''
    arrMenu.map(item => {
        html += renderItem(item)
    })
    return '<ul class="nav__menu">' + html + '</ul>'
}

let nav = document.querySelectorAll('.nav')
for (let menu of nav) {
    menu.insertAdjacentHTML('beforeend', renderMenu(headerNav))

    let items = menu.querySelectorAll('.nav__link')
    for (let item of items) {
        if (item.href === document.URL) {
            item.classList.add('active')
        }

        if (item.classList.contains('nav__link_expandable')) {
            item.addEventListener('click', () => {
                item.nextElementSibling.classList.toggle('nav__menu_open')
            })
        }
    }
}
