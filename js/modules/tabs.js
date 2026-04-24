function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

   function hideTabContent() { //скрыть все и показать только тот, который нас интересует(1st)
       tabsContent.forEach(item => {
           // item.style.display = 'none';
           item.classList.add('hide', 'fade');
           item.classList.remove('show');
       });
       
       tabs.forEach(item => {
           item.classList.remove(activeClass);//у каждого из элементов табов удаляем класс активности
       });
   }

   function showTabContent(i = 0) {
       tabsContent[i].classList.add('show', 'fade');
       tabsContent[i].classList.remove('hide');
       tabs[i].classList.add(activeClass);
   }

   hideTabContent();
   showTabContent(); 

   //используя делегирование событий назначаем обработчик событий click
   tabsParent.addEventListener('click', (event) => {
       const target = event.target;

       if (target && target.classList.contains(tabsSelector.slice(1))) {
           tabs.forEach((item, i) => {
               if (target == item) {// если тот элемент, в который мы кликнули, будет совпадать с эл, который мы перебираем, вызываем наши ф-ции
                   hideTabContent();
                   showTabContent(i);  
               }
           });
       }
   });
}

export default tabs;