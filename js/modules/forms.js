function forms() {
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

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json()) // берем ответ от сервера и превращаем в js объект
    //     .then(res => console.log(res)); // результат в консоль
}

module.exports = forms;