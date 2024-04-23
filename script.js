const openLinks = document.querySelectorAll('.openPopup');
const popup = document.getElementById('popup');
const closeButton = document.getElementById('closePopup');

// Открыть всплывающее окно при клике на любую ссылку
openLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Отменяем стандартное действие перехода по ссылке
        popup.style.display = 'block';
    });
});

// Закрыть всплывающее окно при клике на кнопку закрытия
closeButton.addEventListener('click', function() {
    popup.style.display = 'none';
});

// Закрыть всплывающее окно при щелчке за его пределами
window.addEventListener('click', function(event) {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});
document.addEventListener('DOMContentLoaded', () => {

const mask = (dataValue, options) => { // создаем универсальную функцию
    const elements = document.querySelectorAll(`[data-mask="${dataValue}"]`) // ищем поля ввода по селектору с переданным значением data-атрибута
    if (!elements) return // если таких полей ввода нет, прерываем функцию

    elements.forEach(el => { // для каждого из полей ввода
    IMask(el, options) // инициализируем плагин imask для необходимых полей ввода с переданными параметрами маски
    })
}
mask('phone', {
    mask: '+{7}(000)000-00-00'
    })
})


document.addEventListener('DOMContentLoaded', () => {
    for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
        const pattern = el.getAttribute("placeholder"),
            slots = new Set(el.dataset.slots || "_"),
            prev = (j => Array.from(pattern, (c,i) => slots.has(c)? j=i+1: j))(0),
            first = [...pattern].findIndex(c => slots.has(c)),
            accept = new RegExp(el.dataset.accept || "\\d", "g"),
            clean = input => {
                input = input.match(accept) || [];
                return Array.from(pattern, c =>
                    input[0] === c || slots.has(c) ? input.shift() || c : c
                );
            },
            format = () => {
                const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
                    i = clean(el.value.slice(0, i)).findIndex(c => slots.has(c));
                    return i<0? prev[prev.length-1]: back? prev[i-1] || first: i;
                });
                el.value = clean(el.value).join``;
                el.setSelectionRange(i, j);
                back = false;
            };
        let back = false;
        el.addEventListener("keydown", (e) => back = e.key === "Backspace");
        el.addEventListener("input", format);
        el.addEventListener("focus", format);
        el.addEventListener("blur", () => el.value === pattern && (el.value=""));
    }
});

window.onscroll = function() {scrollFunction()};
    
function scrollFunction() {
    if (document.documentElement.scrollTop > 20) {
        document.getElementById("backToTopBtn").style.display = "block";
    } else {
        document.getElementById("backToTopBtn").style.display = "none";
    }
}

// Плавная прокрутка наверх при нажатии на кнопку
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}