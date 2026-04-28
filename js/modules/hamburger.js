function hamburger() {
    const menu = document.querySelector('.header__links'),
          hamburger = document.querySelector('.hamburger'),
          headerRight = document.querySelector('.header__right-block');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('header__links_active');
        headerRight.classList.toggle('header__right-block_active');
    });

    [menu, headerRight].forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('header__link') || e.target.classList.contains('btn')) {
                hamburger.classList.remove('hamburger_active');
                menu.classList.remove('header__links_active');
                headerRight.classList.remove('header__right-block_active');
            }
        });
    });
}

export default hamburger;
