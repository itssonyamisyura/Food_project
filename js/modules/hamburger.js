function hamburger() {
    const menu = document.querySelector('.header__links'),
          hamburger = document.querySelector('.hamburger'),
          headerRight = document.querySelector('.header__right-block');

    if (!hamburger || !menu || !headerRight) {
        console.warn('Hamburger menu elements not found!');
        return;
    }

    console.log('Hamburger module initialized');

    hamburger.addEventListener('click', () => {
        console.log('Hamburger clicked');
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('header__links_active');
        headerRight.classList.toggle('header__right-block_active');
        
        if (menu.classList.contains('header__links_active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    [menu, headerRight].forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('header__link') || e.target.classList.contains('btn')) {
                hamburger.classList.remove('hamburger_active');
                menu.classList.remove('header__links_active');
                headerRight.classList.remove('header__right-block_active');
                document.body.style.overflow = '';
            }
        });
    });
}

export default hamburger;
