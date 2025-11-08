window.addEventListener('DOMContentLoaded', () => {

     // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() { //скрыть все и показать только тот, который нас интересует(1st)
        tabsContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.add('hide', 'fade');
            item.classList.remove('show');
        });
        
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');//у каждого из элементов табов удаляем класс активности
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(); 

    //используя делегирование событий назначаем обработчик событий click
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {// если тот элемент, в который мы кликнули, будет совпадать с эл, который мы перебираем, вызываем наши ф-ции
                    hideTabContent();
                    showTabContent(i);  
                }
            });
        }
    });

    // Timer

    const deadline = '2025-12-28';

    function getTimeRemaining(endtime) { //разница между deadline и текущим временем
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());
        
        if (t <= 0) { //если отрицательное время, отображаем 0
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //(общее / мс в сутках) = сколько суток осталось до окончания deadline 
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function getZero(num) {
       // 0 перед числом
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        //устанавливает таймер
        const timer = document.querySelector(selector);
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock(); //чтоб при обновлении сразу новая дата была

        function updateClock() {
            //обновляет таймер каждую секунду
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            
            if (t.total <= 0) {
                //время вышло, таймер не обновляем
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

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

    // используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;//курс валют
            this.changeToUAH();
        }

        changeToUAH() { // метод для конвертации
            this.price = this.price * this.transfer;
        }

        render() {// создаем структуру, которая помещается в определенный div
            const element = document.createElement('div'); // создаем div

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `; // динамически формируем структуру
            this.parent.append(element); // помещаем элемент на страницу
        }
    }

    const getResource = async (url) => { // data не будет, так как мы не передаем на сервер, а получаем
        const res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json() 
    };

    // getResource('http://localhost:3000/menu')
    //     .then(data => { // обрабатываем запрос,нам приходит массив с объектами
    //         data.forEach(({img, altimg, title, descr, price}) => { //menu = массив, {деструктуризация по частям, эти части затем передаю во внутрь конструктора}
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // 
    //             // конструктор создает новую карточку на страние и сразу ее туда рендерит. конструктор будет создаваться столько раз, сколько есть объетов в массиве, который придет с сервера
    //         });
    //     }); 

    getResource('http://localhost:3000/menu')
        .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div');

            element.classList.add('menu__item');

            element.innerHTML = `
            <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;

            document.querySelector('.menu .container').append(element);
        });
    }


    // forms 

    const forms = document.querySelectorAll('form');

    const message = { // список фраз для пользователя после отправки формы
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach (item => {
        bindPostData(item); // на каждую форму подвязываем функцию postData
    });

    const postData = async (url, data) => { //передаем url, который передается дальше в fetch, data (данные) которые будут поститься в этой функции
        const res = await fetch(url, { // посылает запрос на сервер
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        }); 

        return await res.json() // возвращаем promise
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // отменяем станд поведение браузера, чтоб не перезагружался при отправке формы

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
        
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form); //собираем все данные из нашей формы

            const json = JSON.stringify(Object.fromEntries(formData.entries())); // превращаем в массив массивов, после в классический объект, после в json

            postData('http://localhost:3000/requests', json) // отправляем json на сервер
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        // скрываем элемент перед показом мод окна
        prevModalDialog.classList.add('hide');

        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            // prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json()) // берем ответ от сервера и превращаем в js объект
        .then(res => console.log(res)); // результат в консоль

});// назначение глобального обработчика событий