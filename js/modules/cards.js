import {getResource} from "../services/services";

function cards() {
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

// getResource('http://localhost:3000/menu')
//     .then(data => { // обрабатываем запрос,нам приходит массив с объектами
//         data.forEach(({img, altimg, title, descr, price}) => { //menu = массив, {деструктуризация по частям, эти части затем передаю во внутрь конструктора}
//             new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // 
//             // конструктор создает новую карточку на страние и сразу ее туда рендерит. конструктор будет создаваться столько раз, сколько есть объетов в массиве, который придет с сервера
//         });
//     }); 

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => { // обращаемся к тем данным, которые мы получили, а не к объекту с общей инф, которая была
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });    
}

export default cards;