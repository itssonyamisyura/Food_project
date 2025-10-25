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
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');


    function openModal() {
    // modal.classList.add('show');
    // modal.classList.remove('hide');
    modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId); //if user opens modal w, we dont show it once again
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        // modal.classList.add ('hide');
        // modal.classList.remove('show');
        modal.classList.toggle('show');
        document.body.style.overflow = ''; //default
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) { //подложка
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        // отслежиаем, когда пользователь долистает до конца страницы 
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { //сколько px сверху отлистал польз. по оси y(прокрутка) + видимая часть >= полная прокрутка и контент, который есть 
            openModal();
            window.removeEventListener('scroll', showModalByScroll) 
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});// назначение глобального обработчика событий