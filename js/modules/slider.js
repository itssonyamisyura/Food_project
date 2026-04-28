function slider({ container, slide, nextArrow, prevArrrow, totalCounter, currentCounter, wrapper, field }) {

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field);

    let width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    function deleteNotDigits(value) {
        return +value.replace(/\D/g, '');
    }

    function updateSlider() {
        width = window.getComputedStyle(slidesWrapper).width;
        slidesField.style.width = 100 * slides.length + '%';
        slides.forEach(slide => {
            slide.style.width = width;
        });
        offset = deleteNotDigits(width) * (slideIndex - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function updateDotsOpacity(dots, slideIndex) {
        dots.forEach(dot => dot.style.opacity = '.5');
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

    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    // скрываем элементы которые не попадают в область видимости wrapper
    slidesWrapper.style.overflow = 'hidden';
    slider.style.position = 'relative';

    updateSlider();

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
    slider.append(indicators);

    // основываясь на кол-ве слайдов создаем определенное кол-во точек
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
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

    next.addEventListener('click', () => {
        width = window.getComputedStyle(slidesWrapper).width;
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;
        } else {
            offset += deleteNotDigits(width);
            slideIndex++;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        updateCurrentSlide(current, slideIndex, slides);
        updateDotsOpacity(dots, slideIndex);
    });

    prev.addEventListener('click', () => {
        width = window.getComputedStyle(slidesWrapper).width;
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
            slideIndex = slides.length;
        } else {
            offset -= deleteNotDigits(width);
            slideIndex--;
        }

        slidesField.style.transform = `translateX(-${offset}px)`
        updateCurrentSlide(current, slideIndex, slides);
        updateDotsOpacity(dots, slideIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            width = window.getComputedStyle(slidesWrapper).width;
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            // смещение слайдера
            slidesField.style.transform = `translateX(-${offset}px)`;

            //текущий слайд
            updateCurrentSlide(current, slideIndex, slides);
            updateDotsOpacity(dots, slideIndex);
        });
    });

    window.addEventListener('resize', updateSlider);
}

export default slider;

