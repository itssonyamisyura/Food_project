function slider() {
    // slider

    const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width; // сколько места занимает главный блок(img) = окошко, через которое мы видим слайды
    let slideIndex = 1; // определяет текущее положение в слайдере
    let offset = 0; // отступ

    function updateDotsOpacity(dots, slideIndex) {
        dots.forEach(dot  => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function updateCurrentSlide(current, slideIndex, slides) {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; // выстраивает вокруг себя слайды--> помещаем все слайды, что есть на странице во внутрь slidesField

    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    // скрываем элементы которые не попадают в область видимости wrapper
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    //создаем большую обвертку для всех точек
    const indicators = document.createElement('ol'),
            dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    // помещаем обвертку во внутрь слайдера
    slider.append(indicators); 

    // основываясь на кол-ве слайдов создаем определенное кол-во точек
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); // атрибут -> первая точка идет к первому слайду
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) { // первая итерация
            dot.style.opacity = 1; // первая точка активна
        }
        indicators.append(dot);
        dots.push(dot); // помещаем точку в массив
    } 

    function deleteNotDigits(value) {
        return +value.replace(/\D/g, '');
    }
    const slideWidth = deleteNotDigits(width);

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { // '500px'
            offset = 0; // долистали до конца, возвращаемся в начало
        } else {
            offset += +width.slice(0, width.length - 2)
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        updateDotsOpacity(dots, slideIndex);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) { // когда у нас 1й слайд, мы перемещаеся в конец
            offset = slideWidth * (slides.length - 1);
        } else {
            offset -= slideWidth;
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == 1) {
            slideIndex = slides.length; // смещаемся в конец
        } else {
            slideIndex--;
        }

        updateCurrentSlide(current, slideIndex, slides);

        updateDotsOpacity(dots, slideIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo; 
            offset = slideWidth * (slideTo - 1);

            // смещение слайдера
            slidesField.style.transform = `translateX(-${offset}px)`;

            //текущий слайд
            updateCurrentSlide(current, slideIndex, slides);

            updateDotsOpacity(dots, slideIndex);
        });
    });
}

module.exports = slider;