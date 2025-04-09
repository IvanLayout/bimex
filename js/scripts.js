// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

// Моб. версия
fakeResize = false
fakeResize2 = true

if (document.body.clientWidth < 375) {
	document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
}

$(() => {
	$('body').on('click', '.mob-menu-btn', function (e) {
		e.preventDefault()

		if ($('.mob-menu-btn').hasClass('_active')) {
			$('.mob-menu-btn').removeClass('_active')
			$('.header').removeClass('_show')
			$('body').removeClass('_menu-open')
		} else {
			$('.mob-menu-btn').addClass('_active')
			$('.header').addClass('_show')
			$('body').addClass('_menu-open')
		}
	})


	if ($('.page-slider').length) {
		pageSlider = new Swiper(".page-slider", {
			spaceBetween: 0,
			slidesPerView: "auto",
			speed: 800,
			watchSlidesProgress: true,
			watchOverflow: true,
			// allowTouchMove: false,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			keyboard: {
				enabled: true,
				onlyInViewport: true,
				pageUpDown: true
			},
			mousewheel: {
				enabled: true,
				sensitivity: 1,
				// releaseOnEdges: true,
			},
			on: {
				init: function (swiper) {
					$('body').addClass('_loaded')

					if( $('.main-slide__img') ){
						let widthImg = $('.main-slide__img').width(),
							heightImg = $('.main-slide__img').height()

						$('.main-slide__video').width(widthImg)
						$('.main-slide__video').height(heightImg)

						$('.main-slide__pattern').width(widthImg + 6)
						$('.main-slide__pattern').height(heightImg + 6)
					}

					if ($(swiper.$el).find('.swiper-slide-active').hasClass('slide-inner')){
						$('.header').addClass('_white')
					} else {
						$('.header').removeClass('_white')
					}
				},
				slideChangeTransitionStart: function (swiper) {
					// if ( swiper.realIndex > 0 ) {
					// 	$('.header').addClass('_hide')
					// }

					// if ( swiper.realIndex != swiper.slides.length - 1 ) {
					// 	$('.footer_slider').removeClass('_show')
					// }

					if ($(swiper.$el).find('.swiper-slide-active').hasClass('slide-inner')){
						$('.header').addClass('_white')
					} else {
						$('.header').removeClass('_white')
					}

					if ($(swiper.$el).find('.swiper-slide-active').hasClass('slide-inner')){
						$(swiper.$el).addClass('_white')
					} else {
						$(swiper.$el).removeClass('_white')
					}

					// $('.page-anchor').removeClass('_show')
				},
				resize: function (swiper) {
					if( $('.main-slide__img') ){
						let widthImg = $('.main-slide__img').width(),
							heightImg = $('.main-slide__img').height()

						$('.main-slide__video').width(widthImg)
						$('.main-slide__video').height(heightImg)

						$('.main-slide__pattern').width(widthImg + 6)
						$('.main-slide__pattern').height(heightImg + 6)
					}
				},
				slideChange: function (swiper) {
					if($(swiper.$el).closest('.page-slider').hasClass('page-slider')){
						$(swiper.$el).closest('.page-slider').find('.slider-thumbs__item').removeClass('_active')
	
						$(swiper.$el).closest('.page-slider').find(`.slider-thumbs__item:eq(${swiper.realIndex})`).addClass('_active')
					}
				},
				// progress: function (swiper) {
				// 	if (swiper.progress === 1 ) {
				// 		setTimeout( function() {
				// 			pageSlider.mousewheel.disable()
				// 		}, 300)
				// 	} else{
				// 		setTimeout( function() {
				// 			pageSlider.mousewheel.enable()
				// 		}, 300)
				// 	}
				// },
				// fromEdge: function () {
				// 	if ( $(window).width() > 1024 ){
				// 		console.log('asd')
				// 		pageSlider.disable()
				// 	}
				// },
				// reachBeginning: function () {
				// 	if ( $(window).width() > 1024 ){
				// 		setTimeout( function() {
				// 			console.log('gggg')
				// 			pageSlider.enable()
				// 		}, 200)
				// 	}
				// },
				reachEnd: function () {
					if ($(window).width() > 1024){
						setTimeout( function() {
							pageSlider.disable()
						}, 300)
					}
				},
			}
		})

		$('body').on('click', '.slider-thumbs__item', function(e) {
			e.preventDefault()

			let numberSlide = $(this).data('index-slide');
			pageSlider.slideToLoop(numberSlide);
		})
	}


	if ($('.history__slider').length) {
		new Swiper('.history__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 10,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true,
                preloaderClass: 'lazy-preloader'
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
		})
	}
});


$(window).on('load', () => {
	//
	if ( $('.partners__grid').length ) {
		$('.partners__grid').each(function() {
			partnersHeight($(this), parseInt($(this).css('--partners_number')))
		})
	}

	//
	if ( $('.our-vacancy__items').length ) {
		$('.our-vacancy__items').each(function() {
			vacancyHeight($(this), parseInt($(this).css('--vacancy_number')))
		})
	}

	if ($('.page-slider').length) {
		if ($(window).scrollTop() > 0 && $(window).width() > 1024) {
			setTimeout( function() {
				pageSlider.slideTo(pageSlider.slides.length, 0)
	
				pageSlider.disable();
			}, 300)
		}
	}

    $(window).on('scroll', () => {
		if ($('.page-slider').length) {
			if ($(window).scrollTop() === 0 && $(window).width() > 1024) {
				setTimeout( function() {
					pageSlider.enable();
				}, 300)
			}
		}
    })


	// let lastScrollTop = $(window).scrollTop();

    // $(window).on('scroll', () => {
    //     let currentScrollTop = $(window).scrollTop();

    //     if (currentScrollTop === 0) {
	// 		setTimeout( function() {
    //         	pageSlider.enable();
	// 		}, 300)
    //     } else if (currentScrollTop > lastScrollTop) {
	// 		setTimeout( function() {
    //         	pageSlider.disable();
	// 		}, 300)
    //     } else {
    //         setTimeout( function() {
    //         	pageSlider.enable();
	// 		}, 300)
    //     }

    //     lastScrollTop = currentScrollTop;
    // })
});


document.addEventListener("DOMContentLoaded", function () {
	if ( document.querySelector('.main-slide__svg') ) {
		setTimeout (function(){
			new Vivus('animatedSvg', {
				type: 'delayed',
				duration: 700,
				animTimingFunction: Vivus.LINER,
				onReady: function (myVivus) {
					myVivus.el.classList.add('anim')
				}
			});
			new Vivus('animatedSvg2', {
				type: 'delayed',
				duration: 500,
				animTimingFunction: Vivus.LINER,
				onReady: function (myVivus) {
					myVivus.el.classList.add('anim')
				}
			});

			document.querySelector('.airplane1').classList.add('anim')
			document.querySelector('.airplane2').classList.add('anim')
		}, 1000)
	}

	if ( document.querySelector('.main-about') ) {
		setTimeout (function(){
			new Vivus('animatedSvg3', {
				type: 'delayed',
				duration: 300,
				animTimingFunction: Vivus.LINER,
			});
		}, 200)
	}

	if ($('.voice-reviews__wrap').length){
		videoVoiceSlider()
	}
})


$(window).on('resize', () => {
	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}


		//
		if ( $('.partners__grid').length ) {
			$('.partners__grid').each(function() {
				partnersHeight($(this), parseInt($(this).css('--partners_number')))
			})
		}

		//
		if ( $('.our-vacancy__items').length ) {
			$('.our-vacancy__items').each(function() {
				vacancyHeight($(this), parseInt($(this).css('--vacancy_number')))
			})
		}
	}

	if ($('.voice-reviews__wrap').length){
		videoVoiceSlider()
	}
});


// 
function partnersHeight(context, step) {
	let start    = 0
	let finish   = step
	let partners = context.find('.partners__item')

	partners.find('.partners__title').height('auto')

	for (let i = 0; i < partners.length; i++) {
		setHeight(partners.find('.partners__title').slice(start, finish))

		start  = start + step
		finish = finish + step
	}
}

// 
function vacancyHeight(context, step) {
	let start    = 0
	let finish   = step
	let vacancy = context.find('.our-vacancy__item')

	vacancy.find('.our-vacancy__info').height('auto')
	vacancy.find('.our-vacancy__title').height('auto')

	for (let i = 0; i < vacancy.length; i++) {
		setHeight(vacancy.find('.our-vacancy__info').slice(start, finish))
		setHeight(vacancy.find('.our-vacancy__title').slice(start, finish))

		start  = start + step
		finish = finish + step
	}
}


function videoVoiceSlider(){
	if ( $(window).width() < 640 && !$('.voice-reviews__wrap').hasClass('swiper-initialized') ) {
		$('.voice-reviews__wrap').addClass('swiper')
		$('.voice-reviews__grid').addClass('swiper-wrapper')
		$('.voice-reviews__grid').removeClass('_flex')
		$('.voice-reviews__item, .voice-reviews__more').addClass('swiper-slide')

		videoVoiceSwiper = new Swiper('.voice-reviews__wrap', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 30,
			slidesPerView: 'auto',
			preloadImages: false,
			freeMode: {
				enabled: true,
				sticky: false,
			},
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true,
                preloaderClass: 'lazy-preloader'
			},
			pagination: {
				el: ".slider-progressbar",
				type: "progressbar",
			}
		})
	}
	else if ($(window).width() > 639 && $('.voice-reviews__wrap').hasClass('swiper-initialized')) {
		if ($('.voice-reviews__wrap').length === 1 && $('.voice-reviews__wrap').hasClass('swiper-initialized')) {
			videoVoiceSwiper.destroy(true, true)
		} else if ($('.voice-reviews__wrap').length >= 2 && $('.voice-reviews__wrap').hasClass('swiper-initialized')) {
			videoVoiceSwiper.forEach(function (element) {
				element.destroy(true, true)
			})
		}

		$('.voice-reviews__wrap').removeClass('swiper')
		$('.voice-reviews__grid').removeClass('swiper-wrapper')
		$('.voice-reviews__grid').addClass('_flex')
		$('.voice-reviews__item, .voice-reviews__more').removeClass('swiper-slide')
	}
}