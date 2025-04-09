$(() => {
	// Observer API
	const boxes = document.querySelectorAll('.lazyload, .animate')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-src') && !entry.target.classList.contains('loaded')) {
				entry.target.classList.add('loaded')

				entry.target.src = entry.target.getAttribute('data-src')
			}

			if (entry.intersectionRatio >= 0.2 && entry.target.classList.contains('animate') && !entry.target.classList.contains('animated')) {
				entry.target.classList.add('animated')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))
	

	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')


	// Мини всплывающие окна
	$('.mini-modal__btn').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.mini-modal')

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$('.mini-modal__modal').removeClass('_active')

			$('body').removeClass('_lock-mini')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini-modal__btn').removeClass('_active')
			$(this).addClass('_active')

			$('.mini-modal__modal').removeClass('_active')
			parent.find('.mini-modal__modal').addClass('_active')

			if( $(this).hasClass('mini-modal__btn_look') ) {
				$('body').addClass('_lock-mini')
			}
			

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click((e) => {
		if ( !e.target.closest('.mini-modal') ) {
			$('.mini-modal__modal, .mini-modal__btn').removeClass('_active')
			$('body').removeClass('_lock-mini')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}

		if ( !e.target.closest('.header-search') && !e.target.closest('.open-search') ) {
			$('.header-search').removeClass('_show')
		}
	})

	$('body').on('click', '.mini-overlay, [data-mini-close]', function(e) {
		e.preventDefault()

		$('.mini-modal__modal, .mini-modal__btn').removeClass('_active')
		$('body').removeClass('_lock-mini')

		if (is_touch_device()) $('body').css('cursor', 'default')
	})


	// Плавная прокрутка к якорю
	$('.scroll-btn').click(function(e) {
		e.preventDefault()

		let href = $(this).data('anchor'),
		addOffset = $('.header').innerHeight()

		if ($(this).closest('.header__menu')){
			$('.mob-menu-btn').removeClass('_active')
			$('.header__menu').removeClass('_show')
			$('body').removeClass('_menu-open')
		}

		$('html, body').stop().animate({ scrollTop: $(href).offset().top - addOffset }, 1000)
	})


	// Маска ввода
	$('input[type=tel]').each(function(){
		let datamask = $(this).data('mask');

		$(this).inputmask(`${datamask}`, {
			showMaskOnHover: false
		})
	})

	if ( $(window).width() < 1025 ) {
		$('body').on('click', '.header__menu-link._sub', function (e) {
			e.preventDefault()
	
			if ($(this).hasClass('_active')) {
				$(this).removeClass('_active')
				$(this).next().removeClass('_show')
			} else {
				$(this).addClass('_active')
				$(this).next().addClass('_show')
			}
		})
	}

	$('body').on('click', '.accordion__title', function (e) {
		e.preventDefault()

		if ($(this).closest('.accordion__item').hasClass('_active')) {
			$(this).closest('.accordion__item').removeClass('_active')
		} else {
			$(this).closest('.accordion__item').addClass('_active')
		}
	})

	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false

	Fancybox.defaults.template = {
		closeButton: '<svg viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="27.7803" width="39" height="4" transform="rotate(-45 0 27.7803)" fill="#414042"/><rect x="2.82837" width="39" height="4" transform="rotate(45 2.82837 0)" fill="#FDBB30"/></svg>',
	}

	// Всплывающие окна
	$('body').on('click', '.modal-btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('content'),
			type: 'inline'
		}])
	})

	$('body').on('click', '.modal-close', function (e) {
		e.preventDefault()

		Fancybox.close()
	})


	// Увеличение картинки
	Fancybox.bind('.fancy-img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	// Выбор файла
	$('.file-selection input[type=file]').change(function(){
		var val = $(this).val()

		var parent = $(this).closest('.file-selection')

		parent.find('.file-selection__path-name').text(val)

		parent.find('.file-selection__path').addClass('_active')

		if(parent.find('.file-selection__path-name').text() == '') {
			let defoultText = parent.find('.file-selection__path-name').data('text')
			
			parent.find('.file-selection__path-name').html(defoultText)

			parent.find('.file-selection__path').removeClass('_active')
		}
	})
})


$(window).on('load', () => {
	// Шапка
	if( $(window).scrollTop() > 0 ) {
		$('.header').addClass('fixed')
	} else{
		$('.header').removeClass('fixed')
	}

	if( $(window).scrollTop() > $(window).height() ) {
		$('.page-anchor').addClass('_fixed')
	} else{
		$('.page-anchor').removeClass('_fixed')
	}

	$(window).scroll(function(){
		if( $(window).scrollTop() > 0 ) {
			$('.header').addClass('fixed')
		} else{
			$('.header').removeClass('fixed')
		}

		if( $(window).scrollTop() > $(window).height() ) {
			$('.page-anchor').addClass('_fixed')
		} else{
			$('.page-anchor').removeClass('_fixed')
		}
	})
})


// Вспомогательные функции
const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}

function setHeight(className){
    let maxheight = 0

    className.each(function() {
		let elHeight = $(this).outerHeight()

        if( elHeight > maxheight ) {
			maxheight = elHeight
        }
    })

    className.outerHeight( maxheight )
}

const is_touch_device = () => !!('ontouchstart' in window)


function addScriptsURL(url) {
	let jsLoad = document.querySelector(".js-load")

	if (jsLoad) {
		var src = document.createElement('script')
		src.src = url
		jsLoad.appendChild(src)

		src.addEventListener('load', () => {
			mapInit()
		});
	}
}


// map
function mapInit(){
	ymaps.ready(() => {
		var myMap = new ymaps.Map("map", {
			center: [55.673458, 37.447728],
			zoom: 10
		}),
		myPlacemark = new ymaps.Placemark([55.673458, 37.447728], {
			balloonContent: '', iconCaption: 'Москва, Никулинская, 18'
		}),
		myPlacemark2 = new ymaps.Placemark([55.749207, 37.762138], {
			balloonContent: '', iconCaption: 'Москва, улица Плеханова, 12с3'
		}),
		myPlacemark3 = new ymaps.Placemark([55.686919, 37.432906], {
			balloonContent: '', iconCaption: 'Москва, улица Генерала Дорохова, 27'
		}),
		myPlacemark4 = new ymaps.Placemark([55.582528, 37.611814], {
			balloonContent: '', iconCaption: 'Москва, Дорожная улица, 50к1'
		})

		myMap.geoObjects.add(myPlacemark).add(myPlacemark2).add(myPlacemark3).add(myPlacemark4)
		myMap.behaviors.disable('scrollZoom')
	})
}