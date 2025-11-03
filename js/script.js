$(document).ready(function() {
	$('.head__menu').click(function() {
		$('.head__menu, .head__nav').toggleClass('active');
		$('body').toggleClass('lock');
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
	document.querySelectorAll('.leng__switch').forEach(btn => {
		btn.classList.remove('active');
	});

	// Добавляем "active" к нажатой кнопке
	button.classList.add('active');

	try {
		const response = await fetch(`./locales/${lang}.json`);
		const translations = await response.json();

		document.querySelectorAll('[data-i18n]').forEach(el => {
			const key = el.getAttribute('data-i18n');
			const value = translations[key];
			if (!value) return;

			if (value.includes('<')) {
				el.innerHTML = value;
			} else {
				el.textContent = value;
			}
		});

		localStorage.setItem('leng', lang);
	} catch	(error) {
		console.error('Ошибка загрузки перевода:', error);
	}
}

document.querySelectorAll('.leng__switch').forEach(btn => {
	btn.addEventListener('click', () => {
		changeLanguage(btn.dataset.leng, btn);
	});
});
	const savedLeng = localStorage.getItem('leng') || 'ru';
	const activeButton = document.querySelector(`.leng__switch[data-leng="${savedLeng}"]`);
	if (activeButton) {
		changeLanguage(savedLeng, activeButton);
	}


// Carousel-btn
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.cards__row');
const prev = document.querySelector('.pre');
const next = document.querySelector('.nex');
let index = 0;


function updateCarousel () {
	if (!cards.length) return;
	const cardWidth = cards[0].offsetWidth + 45;
	track.style.transform = `translateX(-${index * cardWidth}px)`;
}


if(track && cards.length && prev && next) {

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
	updateCarousel();
}

// CARUSEL

const left = {
	img: document.querySelector('.columns__img'),
	date: document.querySelector('.columns__left .columns__date'),
	title: document.querySelector('.columns__left .columns__subtitle'),
	text: document.querySelector('.columns__left .columns__text'),
	btn: document.querySelector('.columns__left .columns__btn')
};

const posts = document.querySelectorAll('.post-box');

if(posts.length && left.img && left.date && left.title && left.text && left.btn) {

	function updateLeft (post) {
		left.img.src = post.dataset.img;
		left.date.innerHTML = post.dataset.date;
		left.title.innerHTML = post.dataset.title;
		left.text.innerHTML = post.dataset.text;
		left.btn.href = post.dataset.link;
		
		posts.forEach(p => p.classList.remove('active'));
		post.classList.add('active');
	};
	
	posts.forEach(post => {
		post.addEventListener('click', () => {
			updateLeft(post);
		});
	});
	if(posts.length > 0) {
		updateLeft(posts[0]);
	}
}
});