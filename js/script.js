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


async function changeLanguage(lang, button) {
	// Здесь сделаю логику смены языка
	console.log("Выбран язык:", lang);

	// Снимаем класс "active" со всех кнопок
	document.querySelectorAll('.lang__switch').forEach(btn => {
		btn.classList.remove('active');
	});

	// Добавляем "active" к нажатой кнопке
	button.classList.add('active');

	try {
		const response = await fetch(`./locales/${lang}.json`);
		const translations = await response.json();

		document.querySelectorAll('[data-i18n]').forEach(el => {
			const key = el.getAttribute('data-i18n');
			if (translations[key].includes('<')) {
				el.innerHTML = translations[key];
			} else {
				el.textContent = translations[key];
			}
		});

		localStorage.setItem('lang', lang);
	} catch	(error) {
		console.error('Ошибка загрузки перевода:', error);
	}
}

window.addEventListener('DOMContentLoaded', async () => {
	const savedLang = localStorage.getItem('lang') || 'ru';
	const activeButton = document.querySelector(`.lang__switch[onclick*="${savedLang}"]`);
	if (activeButton) {
		changeLanguage(savedLang, activeButton);
	}
});

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

next.addEventListener ('click', () => {
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

// CARUSEL
const leftImg = document.querySelector('.columns__img');
const leftDate = document.querySelector('.columns__left .columns__date');
const leftTitle = document.querySelector('.columns__left .columns__subtitle');
const leftText = document.querySelector('.columns__left .columns__text');
const leftBtn = document.querySelector('.columns__left .columns__btn');

const posts = document.querySelectorAll('.post-box');

posts.forEach(post => {
	const updateLeft = () => {
		leftImg.src = post.dataset.img;
		leftDate.innerHTML = post.dataset.date;
		leftTitle.innerHTML = post.dataset.title;
		leftText.innerHTML = post.dataset.text;
		leftBtn.href = post.dataset.link;

		posts.forEach(p => p.classList.remove('active'));
		post.classList.add('active');
	};

	post.addEventListener('mouseenter', updateLeft);

	post.addEventListener('click', updateLeft);
});