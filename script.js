// Номер варіанта
const n = 8;

// Обчислюємо елемент для першого кліку за формулою (n mod 10) + 1
const elementIndex = (n % 10) + 1;

// Лічильники кліків
let clickCount1 = 0;
let clickCount2 = 0;

// Отримуємо всі елементи на сторінці
const allElements = document.querySelectorAll('body *');

// Функція для зміни класів
function changeClass(element, clickCount) {
  if (clickCount === 1) {
    element.classList.add("first-click");
    element.classList.remove("second-click");
  } else if (clickCount === 2) {
    element.classList.add("second-click");
    element.classList.remove("first-click");
  }
}

// Перший елемент - пошук по індексу (n mod 10) + 1
allElements[elementIndex - 1].addEventListener('click', function () {
    clickCount1++;
    if (clickCount1 > 2) clickCount1 = 1; // Повертаємо лічильник до 1 після другого кліку
    changeClass(this, clickCount1);
});
  
// Наступний елемент - наступний за порядком елемент
allElements[elementIndex].addEventListener('click', function () {
    clickCount2++;
    if (clickCount2 > 2) clickCount2 = 1; // Повертаємо лічильник до 1 після другого кліку
    changeClass(this, clickCount2);
});

const imageContainer = document.getElementById('image-container');
let currentImage = null; // Змінна для збереження останнього доданого зображення

const addBtn = document.getElementById('add-btn');
const increaseBtn = document.getElementById('increase-btn');
const decreaseBtn = document.getElementById('decrease-btn');
const removeBtn = document.getElementById('remove-btn');

const maxImageWidth = 1000; // Максимальна ширина зображення в пікселях

// Функція для оновлення currentImage на останнє існуюче зображення
function updateCurrentImage() {
  const images = imageContainer.getElementsByTagName('img');
  if (images.length > 0) {
    currentImage = images[images.length - 1]; // Останнє зображення в контейнері
  } else {
    currentImage = null; // Немає зображень
  }
}

// Додати зображення
addBtn.addEventListener('click', () => {
  // Створити нове зображення
  const newImage = document.createElement('img');
  newImage.id = 'main-image';
  newImage.src = 'https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ2tJIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--24ed107f54771f607fc181c1583104574f0d1ee8/%D1%8F%D1%80%D0%B5%D0%BC%D1%87%D0%B5.jpeg';
  newImage.alt = 'Яремче';
  newImage.style.width = '600px';
  newImage.style.maxWidth = '100%';
  
  // Додати нове зображення в контейнер
  imageContainer.appendChild(newImage);

  // Оновити посилання на останнє додане зображення
  updateCurrentImage();
});

// Збільшити зображення
increaseBtn.addEventListener('click', () => {
  if (currentImage) {
    let currentWidth = currentImage.clientWidth;
    let newWidth = currentWidth + 50;

    // Перевірка на досягнення максимальної ширини
    if (newWidth > maxImageWidth) {
      newWidth = maxImageWidth; // Не дозволяємо перевищити максимальний розмір
    }

    currentImage.style.width = newWidth + 'px';
  }
});

// Зменшити зображення
decreaseBtn.addEventListener('click', () => {
  if (currentImage) {
    let currentWidth = currentImage.clientWidth;
    if (currentWidth > 100) { // Не дозволяємо зменшувати до нуля
      currentImage.style.width = currentWidth - 50 + 'px';
    }
  }
});

// Видалити зображення
removeBtn.addEventListener('click', () => {
  if (currentImage) {
    // Видалити поточне зображення
    currentImage.remove();

    // Оновити посилання на останнє існуюче зображення
    updateCurrentImage();
  }
});

// Ініціалізація: перевірити наявність зображень при завантаженні сторінки
window.addEventListener('load', updateCurrentImage);
