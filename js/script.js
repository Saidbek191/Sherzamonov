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


	// CARUSEL

const articles = {
	en: [
		{
			id: 1,
			img: './images/featured/picture-1.jpg',
			author: 'By Alim Sherzamonov | May 23, 2022',
			title: 'Tajikistan is entering a phase of hereditary transfer of power.',
			text: 'The mayor of Dushanbe, Rustam Emomali - the son of the President of Tajikistan - has been nominated as a candidate for the city council (Majlis). <br /> The vote will take place on March 1 - the same day as the elections to the lower house of parliament - and on March 27 for the upper house elections.',
			link: './family-transfer.html'
		},
		{
			id: 2,
			img: './images/featured/picture-2.jpg',
			author: 'By Eurasianet | May 18, 2022',
			title: 'Crackdown in Gorno-Badakhshan.',
			text: 'The security crackdown that the Pamiris of east Tajikistan have nervously been expecting for months finally arrived this week, claiming at least 10 lives already. Many expect the toll to grow by the time the shooting has died down. This latest crisis in the Gorno-Badakhshan Autonomous Region, or GBAO, has been on the horizon since last year.',
			link: './crackdown.html'
		},
		{
			id: 3,
			img: './images/featured/picture-3.jpg',
			author: 'By Insider | Oct 08, 2020',
			title: 'The Country of the Eternal Rahmon.',
			text: "On October 11, Tajikistan will hold it's next presidential election: Emomali Rahmon intends to become head of state for the fifth time. In fact, he has been in power since November 1992, making him one of the world's longest-serving political leaders (only four African politicians have been in power longer).",
			link: './transit-cancelled.html'
		},
		{
			id: 4,
			img: './images/featured/picture-4.jpg',
			author: 'By Insider | Nov 06, 2019',
			title: 'Corruption and Control.',
			text: "Emomali Rahmon Ranks Fifth Among the World's Longest-Serving Leaders, Surpassed Only by Four African Heads of State On November 6, it marked 25 years since Emomali Rahmon was first elected president of Tajikistan. He now ranks as the fifth longest-ruling political leader in the world, trailing only four African counterparts.",
			link: './killed-people.html'
		},
	]
}

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



	document.querySelectorAll('.leng__switch').forEach(btn => {
	btn.addEventListener('click', () => {
		changeLanguage(btn.dataset.leng, btn);
	});
});
const savedLeng = localStorage.getItem('leng') || 'en';
const activeButton = document.querySelector(`.leng__switch[data-leng="${savedLeng}"]`);
if (activeButton) {
	changeLanguage(savedLeng, activeButton);
}

	// Изменение языка в статьях

			let currentLang = localStorage.getItem('leng') || "en";
			const articleContainer = document.getElementById("article-container");
			let currentArticlesSlug = articleContainer.dataset.slug;
			
			
			document.querySelectorAll('[data-leng]').forEach(btn => {
				btn.addEventListener('click', () => {
					currentLang = btn.dataset.leng;
					loadArticle(currentArticlesSlug, currentLang);
				});
			});
			
			function loadArticle(slug, lang) {
				const path = `articles/${slug}/${lang}.md`;

		fetch(path)
		.then(res => {
			if (!res.ok) throw new Error("file missing");
			return res.text();
		})
		.then(md => {
			articleContainer.innerHTML = markdownToHtml(md);
		})
		.catch(() => {
			articleContainer.innerHTML =
			`<p>Перевод для языка "${lang}" недоступен.</p>`;
		});
	}

	function markdownToHtml(md) {
		return md
		.replace(/^### (.*$)/gim, '<h3 class="blog-post__title title">$1</h3>')
		.replace(/^## (.*$)/gim, '<h2 class="blog-post__title title">$1</h2>')
		.replace(/^# (.*$)/gim, '<h1 class="blog-post__title title">$1</h1>')
		.replace(/\*\*(.+?)\*\*/gim, '<b>$1</b>')
		.replace(/\*(.+?)\*/gim, '<i>$1</i>')
		.replace(/^(?!<h|<p>)(.+)$/gim, '<p class="blog-post__text text">$1</p>')
		.replace(/\n/gim, '<br>');
	}

	loadArticle(currentArticlesSlug, currentLang);
		
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


});