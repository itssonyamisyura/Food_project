function modal() {
    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'), //[]так как это атрибут
          modal = document.querySelector('.modal');


    function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    // modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId); //if user opens modal w, we dont show it once again
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add ('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = ''; //default
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //подложка || крестик
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        // отслежиаем, когда пользователь долистает до конца страницы 
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { //сколько px сверху отлистал польз. по оси y(прокрутка) + видимая часть >= полная прокрутка и контент, который есть 
            openModal();
            window.removeEventListener('scroll', showModalByScroll) 
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;