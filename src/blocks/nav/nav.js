let headerNav = [
    {
        name: 'Главная',
        href: '/'
    },
    {
        name: 'Авторизация',
        childItem: [
            {
                name: 'Регистрация',
                href: '/registration.html'
            },
            {
                name: 'Вход',
                href: '/sign-in.html'
            }
        ]
    },
    {
        name: 'Подбор комнаты',
        href: '/search-room.html'
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
