document.addEventListener('DOMContentLoaded', () => {

	const menuBtn = document.querySelector('.head__menu');
	const nav = document.querySelector('.head__nav');
	
	menuBtn?.addEventListener('click', () => {
		menuBtn.classList.toggle('active');
		nav.classList.toggle('active');
		document.body.classList.toggle('lock');
	});



 // Получаем текущий путь
  const currentPath = window.location.pathname.split('/').pop();

  // Получаем все ссылки с классом nav-link
  document.querySelectorAll('.head__link a').forEach(link => {
    // Если путь ссылки совпадает с текущим
		const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) link.classList.add('active');
  });


	// CARUSEL

	const posts = document.querySelectorAll('.post-box');


const left = {
	img: document.querySelector('.columns__img'),
	date: document.querySelector('.columns__left .columns__date'),
	title: document.querySelector('.columns__left .columns__subtitle'),
	text: document.querySelector('.columns__left .columns__text'),
	btn: document.querySelector('.columns__left .columns__btn')
};

	function updateLeft (post) {
		if (!post) return;
		left.img.src = post.dataset.img;
		left.date.innerHTML = post.dataset.date;
		left.title.innerHTML = post.dataset.title;
		left.text.innerHTML = post.dataset.text;
		left.btn.href = post.dataset.link;
		
		posts.forEach(p => p.classList.remove('active'));
		post.classList.add('active');
	}
	
	posts.forEach(post => post.addEventListener('click', () => updateLeft(post)));
		updateLeft(posts[0]);

		
		let currentLang = localStorage.getItem('lang') || "en";
			
		async function changeLanguage(lang, button) {
			// Снимаем класс "active" со всех кнопок
			document.querySelectorAll('.lang__switch').forEach(btn =>	btn.classList.remove('active'));
			// Добавляем "active" к нажатой кнопке
			button?.classList.add('active');
			
			try {
				const response = await fetch(`./locales/${lang}.json`);
				const translations = await response.json();
				
				document.querySelectorAll('[data-i18n]').forEach(el => {
					const key = el.dataset.i18n;
					if(!translations[key]) return;
					if(translations[key].includes('<')) el.innerHTML = translations[key];
					else el.textContent = translations[key];
		});
		
		localStorage.setItem('lang', lang);
		currentLang = lang;
		loadArticle(lang);
	} catch	(error) {
		console.error('Ошибка загрузки перевода:', error);
	}
}

	document.querySelectorAll('.lang__switch').forEach(btn => {
		btn.addEventListener('click', () => changeLanguage(btn.dataset.lang, btn));
	});

		const btn = document.querySelector(`.lang__switch[data-leng="${currentLang}"]`);
		changeLanguage(currentLang, btn);
		
		
		// Carousel-btn
		const track = document.querySelector('.carousel-track');
		const cards = document.querySelectorAll('.cards__row');
		const prev = document.querySelector('.pre');
		const next = document.querySelector('.nex');
		let index = 0;
		
		
		function updateCarousel () {
	if (!cards.length || !track) return;
	const gap = parseInt(getComputedStyle(track).columnGap) || 45;
	const cardWidth = cards[0].offsetWidth + gap;
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

// Изменение языка в статьях

function markdownToHtml(md) {
	if (!md) return '';
	return md
	.replace(/^### (.*$)/gim, '<h3 class="blog-post__title title">$1</h3>')
	.replace(/^## (.*$)/gim, '<h2 class="blog-post__title title">$1</h2>')
	.replace(/^# (.*$)/gim, '<h1 class="blog-post__title title">$1</h1>')
	.replace(/\*\*(.+?)\*\*/gim, '<b>$1</b>')
	.replace(/\*(.+?)\*/gim, '<i>$1</i>')
	.replace(/^(?!<h|<p>)(.+)$/gim, '<p class="blog-post__text text">$1</p>')
	.replace(/\n/gim, '<br>');
}

function loadArticle (lang) {

	const articleContainer = document.getElementById("article-container");
	if (articleContainer) {
		const currentArticlesSlug = articleContainer.dataset.slug;
		fetch(`articles/${currentArticlesSlug}/${lang}.md`)
		.then(res => res.ok ? res.text() : Promise.reject("File missing"))
		.then(md =>	articleContainer.innerHTML = markdownToHtml(md))
		.catch(() => articleContainer.innerHTML =	`<p>Перевод для языка "${lang}" недоступен.</p>`);	
	}
}
		});