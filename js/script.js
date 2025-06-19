$(document).ready(function() {
	$('.head__menu').click(function(event) {
		$('.head__menu,.head__nav').toggleClass('active');
		$('body').toggleClass('lock');
	});
});

 // Получаем текущий путь
  const currentPath = window.location.pathname;

  // Получаем все ссылки с классом nav-link
  document.querySelectorAll('.head__link a').forEach(link => {
    // Если путь ссылки совпадает с текущим
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });


function changeLanguage(lang, button) {
	// Здесь сделаю логику смены языка
	console.log("Выбран язык:", lang);

	// Снимаем класс "active" со всех кнопок
	document.querySelectorAll('.lang__switch').forEach(btn => {
		btn.classList.remove('active');
	});

	// Добавляем "active" к нажатой кнопке
	button.classList.add('active');
}

// Carousel-btn
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.cards__row');
const prev = document.querySelector('.pre');
const next = document.querySelector('.nex');
let index = 0;

function updateCarousel () {
	const cardWidth = cards [0].offsetWidth + 45;
	track.style.transform = `translateX(-${index * cardWidth}px)`;
}

next.addEventListener('click', () => {
	if (index < cards.length - 1) {
		index++;
		updateCarousel();
	}
});

prev.addEventListener('click', () => {
	if (index > 0) {
		index--;
		updateCarousel(); 
	}
});
window.addEventListener('resize', updateCarousel);