let signInBlock = document.querySelector('.js-sign-in')

function renderSignInBlock() {
    if (localStorage.hasOwnProperty('user')) {
        let user = JSON.parse(localStorage.getItem('user'))
        signInBlock.innerHTML = `
            <div class='sign-in__username'>${user.name} ${user.surname}
                <div class='sign-in__logout'>
                    <a href="/sign-in.html" id="js-logout">Выйти</a>
                </div>            
            </div>
        `
        let logoutBtn = document.getElementById('js-logout')
        logoutBtn.addEventListener('click', () => localStorage.removeItem('user'))
    } else {
        signInBlock.innerHTML = `
            <a class="button sign-in__button" href="/sign-in.html">
                <h3 class="button__text_color_purple">войти</h3>
                <div class="button__border-gradient">
                    <h3 class="button__text_color_purple">войти</h3>
                </div>
            </a>
            <a class="button sign-in__button" href="/registration.html">
                <h3 class="button__text">зарегистрироваться</h3>
            </a>
        `
    }
}

renderSignInBlock()
