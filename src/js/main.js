// Import Libraries
import MoveElement from './lib/MoveElement';
import Loading from './lib/Loading';
import TypeIt from 'typeit';
// define variables

const buttonTemplate__isClose = `
	<div class="filterCloseIco__mainWrapper">
		<span class="filterCloseIco__stroke"></span>
		<span class="filterCloseIco__stroke"></span>
	</div>
`;

const buttonTemplate__isOpen = `
	<p class="fl-workFilterBall__text">Filter</p>
`;

const body = document.querySelector('body');
const main = document.querySelector('main');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const pageClassDefine = document.querySelector('#js-page-verify');

const Header_NavList = document.querySelector('.fl-header__nav-list');
const Header_Hamburger = document.querySelector(
	'.fl-header__navigation-hamburger',
);
const Header_Social = document.querySelector('.fl-header__social');

const Work_FilterToggleButton = document.querySelector(
	'.fl-workFilterBall__mainWrapper',
);

const Work_FilterWrapper = document.querySelector(
	'.fl-workFilterContainer__mainWrapper .fl-workFilterAndLegend__mainGridWrapper',
);

const Work_GridWrapper = document.querySelector(
	'.fl-work__compressorGridWrapper',
);

// define functions
function b64EncodeUnicode(e) {
	return btoa(
		encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (e, t) {
			return String.fromCharCode('0x' + t);
		}),
	);
}

function b64DecodeUnicode(e) {
	return decodeURIComponent(
		atob(e)
			.split('')
			.map(function (e) {
				return '%' + ('00' + e.charCodeAt(0).toString(16)).slice(-2);
			})
			.join(''),
	);
}

function addClassBody() {
	if (pageClassDefine.classList.length > 0) {
		const bodyClass = pageClassDefine.getAttribute('class');
		body.classList.add(bodyClass);
	}
}

function Header_MobileToggle() {
	let isOpen = false;
	Header_Hamburger.addEventListener('click', () => {
		isOpen = !isOpen;
		if (isOpen) {
			Header_Hamburger.classList.add('active');
			Header_NavList.classList.add('active');
			Header_Social.classList.add('active');
			// Filter
			if (Work_FilterToggleButton && Work_FilterWrapper) {
				Work_FilterToggleButton.innerHTML = buttonTemplate__isOpen;
				$('.fl-workFilterContainer__mainWrapper').removeClass(
					'is--active',
				);
			}
		} else {
			Header_Hamburger.classList.remove('active');
			Header_NavList.classList.remove('active');
			Header_Social.classList.remove('active');
		}
	});
}

function AllForm_Toggle() {
	const Header_ToggleFromRequestButton = document.querySelector(
		'.fl-header__request-toggle',
	);
	const Footer_ToggleFromRequestButton = document.querySelector(
		'.trusts__itemWrapper--request-a-quote',
	);
	const ToggleFromRequestButton = Array.of(
		Header_ToggleFromRequestButton,
		Footer_ToggleFromRequestButton,
	);

	const FormRequest_ButtonClose = Array.from(
		document.querySelectorAll('.fl-modal-request__close'),
	);
	const Form_RequestAQuote = document.querySelector(
		'.fl-modal-request.request-a-quote',
	);
	const Footer_ToggleFormCoIncubateButton = document.querySelector(
		'.trusts__itemWrapper--co-incubate',
	);
	const Header_ToggleFormCoIncubate = document.querySelector(
		'.fl-CoIncubate-toggle',
	);

	const ToggleFormCoIncubate = Array.of(
		Footer_ToggleFormCoIncubateButton,
		Header_ToggleFormCoIncubate,
	);

	const Form_CoIncubate = document.querySelector(
		'.fl-modal-request.co-incubate',
	);
	const Footer_ToggleFormCustomiseButton = document.querySelector(
		'.trusts__itemWrapper--customise',
	);
	const Form_Customise = document.querySelector(
		'.fl-modal-request.customise',
	);
	const Footer_ToggleFormOrganiseButton = document.querySelector(
		'.trusts__itemWrapper--organise',
	);
	const Form_Organise = document.querySelector('.fl-modal-request.organise');

	const Form__CheckboxWrapper = Array.from(
		document.querySelectorAll('.form-checkbox--wrapper'),
	);

	const FormRequest_Container = Array.from(
		document.querySelectorAll('.fl-modal-request__form'),
	);

	ToggleFromRequestButton.forEach((btn) => {
		btn.addEventListener('click', () => {
			Form_RequestAQuote.classList.add('active');
			Form_RequestAQuote.classList.remove('close');
			main.classList.add('close');
			header.classList.add('close');
			footer.classList.add('close');
		});
	});
	ToggleFormCoIncubate.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			Form_CoIncubate.classList.add('active');
			Form_CoIncubate.classList.remove('close');
			main.classList.add('close');
			header.classList.add('close');
			footer.classList.add('close');
		});
	});
	Footer_ToggleFormCustomiseButton.addEventListener('click', () => {
		Form_Customise.classList.add('active');
		Form_Customise.classList.remove('close');
		main.classList.add('close');
		header.classList.add('close');
		footer.classList.add('close');
	});
	Footer_ToggleFormOrganiseButton.addEventListener('click', () => {
		Form_Organise.classList.add('active');
		Form_Organise.classList.remove('close');
		main.classList.add('close');
		header.classList.add('close');
		footer.classList.add('close');
	});

	FormRequest_ButtonClose.forEach((btn) => {
		btn.addEventListener('click', () => {
			btn.parentNode.classList.remove('active');
			btn.parentNode.classList.add('close');
			main.classList.remove('close');
			header.classList.remove('close');
			footer.classList.remove('close');
		});
	});
	Form__CheckboxWrapper.forEach((form) => {
		const Field_NotSure = form.querySelector('.not-sure');
		const Field_WhatDo = Array.from(form.querySelectorAll('.whatdo'));

		Field_NotSure.addEventListener('change', (e) => {
			if (e.target.checked) {
				Field_WhatDo.forEach((item) => {
					item.checked = false;
				});
				Field_NotSure.checked = true;
			}
		});
		Field_WhatDo.forEach((item) => {
			item.addEventListener('click', () => {
				Field_NotSure.checked = false;
			});
		});
	});

	FormRequest_Container.forEach((formContainer) => {
		const Field_OtherCheck = formContainer.querySelector('.reason-other');
		const Field_OtherInput = formContainer.querySelector(
			'.reason-other-input',
		);

		Field_OtherCheck.addEventListener('change', (e) => {
			if (e.target.checked) {
				Field_OtherInput.classList.add('active');
			} else {
				Field_OtherInput.classList.remove('active');
			}
		});
	});

	// Change Content Form When Select Change
	// const FormModal = Array.from(
	// 	document.querySelectorAll('.fl-modal-request'),
	// );
	// FormModal.forEach((formModal) => {
	// 	const formSelect = formModal.querySelector('.form-control--select');
	// 	const formModalHtml = formModal.querySelector('.fl-modal-request__wrapper').innerHTML
	// });
}

function Index_SliderOnMobile() {
	function ChangeColor(slick) {
		const bgColor = $(
			slick.$slides.get(
				$('.FeaturedCarousel__slickCarousel').slick(
					'slickCurrentSlide',
				),
			),
		)
			.find('[data-bg]')
			.attr('data-bg');
		$('.FeaturedCarousel__maskedCircleWrapper').css({
			'background-color': bgColor,
		});
	}

	if (window.innerWidth <= 980) {
		$('.FeaturedCarousel__slickCarousel').on('swipe', function (e, slick) {
			ChangeColor(slick);
		});
		$('.FeaturedCarousel__slickCarousel').on('afterChange', function (
			e,
			slick,
		) {
			ChangeColor(slick);
		});
		$('.FeaturedCarousel__slickCarousel').on('init', function (e, slick) {
			const bgColor = $(slick.$slides.get(0))
				.find('[data-bg]')
				.attr('data-bg');
			$('.FeaturedCarousel__maskedCircleWrapper').css({
				'background-color': bgColor,
			});
		});
		$('.FeaturedCarousel__slickCarousel').slick({
			dots: true,
			infinite: true,
			arrows: false,
			autoplay: false,
			speed: 750,
			initialSlide: 0,
		});
	}
}

function Index_Navigation() {
	let currentNumberString;
	const isIndex = document.querySelector('.LandingPagination__mainWrapper');
	if (isIndex) {
		$('[data-scroll-to]').on('click', function (e) {
			e.preventDefault();
			const scrollToNumber = $(this).attr('data-scroll-to');
			$('html,body').animate(
				{
					scrollTop:
						$(`[data-scroll-id="${scrollToNumber}"]`).offset().top -
						108,
				},
				1200,
			);
		});
		const activeSectionWhenScroll = () => {
			$('[data-scroll-id]').each(function (index) {
				if ($(document).scrollTop() >= $(this).offset().top - 108) {
					const toId = $(this).attr('data-scroll-id');
					$(`[data-scroll-to]`)
						.find('.LandingPagination__text')
						.removeClass('is--active');
					$(`[data-scroll-to="${toId}"]`)
						.find('.LandingPagination__text')
						.addClass('is--active');
					currentNumberString = '0' + (index + 1);
				}
			});
		};

		activeSectionWhenScroll();
		$(
			'.LandingPagination__displayWrapper .LandingPagination__text.is--active',
		).html(currentNumberString);
		$(window).on('scroll', function () {
			activeSectionWhenScroll();
			$(
				'.LandingPagination__displayWrapper .LandingPagination__text.is--active',
			).html(currentNumberString);
		});
	}
}

function About_SliderOnMobile() {
	if (window.innerWidth <= 980) {
		$('.featuredAward__mainWrapper').addClass('slickCarousel');
		$('.featuredAward__mainWrapper').slick({
			dots: true,
			infinite: true,
			speed: 300,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 3000,
		});
	}
	if (window.innerWidth <= 800) {
		$('.pressCoverageGrid__gridWrapper')
			.addClass('pressCoverageSlider__mainWrapper')
			.addClass('slickCarousel')
			.removeClass('pressCoverageGrid__gridWrapper');
		$(
			'.pressCoverageSlider__mainWrapper .pressCoverageGrid__gridItem',
		).each(function () {
			$(this).wrapAll('<div>').parent().html();
		});
		$('.pressCoverageSlider__mainWrapper').slick({
			dots: true,
			infinite: true,
			speed: 500,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 3000,
		});
	}
}

function Work_ShowFilterButton() {
	if (
		Work_GridWrapper.getBoundingClientRect().top < 0 &&
		Work_GridWrapper.getBoundingClientRect().bottom >
			Work_FilterToggleButton.getBoundingClientRect().top
	) {
		Work_FilterToggleButton.classList.add('fl-workFilterBall--active');
	} else {
		Work_FilterToggleButton.classList.remove('fl-workFilterBall--active');
		Work_FilterToggleButton.innerHTML = buttonTemplate__isOpen;
		$('.fl-workFilterContainer__mainWrapper').removeClass('is--active');
		// const Work_FilterCloseIcon = document.querySelector(
		// 	'.filterCloseIco__mainWrapper',
		// );
		// setTimeout(() => {
		// 	Work_FilterCloseIcon.classList.add('filterCloseIcoAnim--onboard');
		// }, 300);
	}
}

function Work_FilterToggle() {
	const btnToggleFilter = document.querySelector(
		'.fl-workFilterContainer__mainWrapper .fl-workFilterBall__mainWrapper',
	);
	btnToggleFilter.addEventListener('click', () => {
		$('.fl-workFilterContainer__mainWrapper').toggleClass('is--active');
		if ($('.fl-workFilterContainer__mainWrapper').hasClass('is--active')) {
			Header_Hamburger.classList.remove('active');
			Header_NavList.classList.remove('active');
			Header_Social.classList.remove('active');
			Work_FilterToggleButton.innerHTML = buttonTemplate__isClose;
			const Work_FilterCloseIcon = document.querySelector(
				'.filterCloseIco__mainWrapper',
			);
			setTimeout(() => {
				Work_FilterCloseIcon.classList.add(
					'filterCloseIcoAnim--onboard',
				);
			}, 300);
		} else {
			Work_FilterToggleButton.innerHTML = buttonTemplate__isOpen;
		}
	});

	// Work_FilterToggleButton.addEventListener('click', () => {
	// 	if (isOpen) {

	// 		const Work_FilterCloseIcon = document.querySelector(
	// 			'.filterCloseIco__mainWrapper',
	// 		);
	// 		setTimeout(() => {
	// 			Work_FilterCloseIcon.classList.add(
	// 				'filterCloseIcoAnim--onboard',
	// 			);
	// 		}, 300);
	// 		Work_FilterToggleButton.classList.add(
	// 			'fl-workFilterBallAnim--collapsed',
	// 		);
	// 		Work_FilterToggleButton.classList.remove(
	// 			'fl-workFilterBallAnim--onboard',
	// 		);
	// 		Work_FilterWrapper.classList.remove('is--collapsed');
	// 		Work_FilterWrapper.classList.add('is--expanded');
	// 		// Header

	// 		Header_Hamburger.classList.remove('active');
	// 		Header_NavList.classList.remove('active');
	// 		Header_Social.classList.remove('active');
	// 	} else {
	// 		Work_FilterToggleButton.classList.add(
	// 			'fl-workFilterBallAnim--onboard',
	// 		);
	// 		Work_FilterToggleButton.classList.remove(
	// 			'fl-workFilterBallAnim--collapsed',
	// 		);
	// 		Work_FilterWrapper.classList.add('is--collapsed');
	// 		Work_FilterWrapper.classList.remove('is--expanded');
	// 	}
	// });
}

function WorkDetail_Slider() {
	$('.WorkDetailsHeroSlider__mainWrapper').slick({
		dots: true,
		infinite: true,
		speed: 300,
		arrows: false,
		autoplay: true,
		fade: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
	});
}

function WorkDetail_MobileMoveElement() {
	return new MoveElement('.projectDetails__visualWrapper', {
		mobileNode: '.projectDetails__mainHeader',
		mobileMethod: 'insertAfter',
		desktopMethod: '.projectDetails__copyWrapper',
		desktopNode: 'insertAfter',
	});
}

function Index_TypingEffect() {
	const SmallTextWrapper = Array.from(
		document.querySelectorAll(
			'.LandingTypewrite__gridContentNestedWrapper--2 .LandingMastSubheader__textFormat',
		),
	);
	const TypeItText = document.querySelector(
		'.Typist .LandingMastHeader--FirstCharacter',
	);
	const TypeItProgressBar = document.querySelector(
		'.LandingProgressBar__progressLevel',
	);

	const LandingMastHeaderTextEffects = Array.from(
		document.querySelectorAll('.LandingMastHeader__textEffect'),
	);

	let sentencesArray = [
		'Create<br>Bridges.',
		'Build<br>Digital.',
		'Make<br>Partners.',
		'Make<br>Sense.',
	];
	let i = 1;
	LandingMastHeaderTextEffects.forEach((item) => {
		item.classList.add('LandingMastHeaderOnboardAnim__textItem');
	});
	if (TypeItProgressBar) {
		TypeItProgressBar.classList.add('AnimLandingProgressBar');
	}
	setTimeout(() => {
		if (TypeItProgressBar) {
			TypeItProgressBar.classList.remove('AnimLandingProgressBar');
		}
		SmallTextWrapper.forEach((item) => {
			item.classList.add('hidden');
		});
		if (TypeItText) {
			TypeItText.innerHTML = '';
		}
		let indexCharacterEffect = new TypeIt(
			'.Typist .LandingMastHeader--FirstCharacter',
			{
				speed: 50,
				loop: true,
				loopDelay: 0,
				cursor: false,
				strings: '',
				beforeString: async (step, instance) => {
					SmallTextWrapper.forEach((item, itemIndex) => {
						if (itemIndex == i) {
						} else {
							item.classList.add('hidden');
						}
					});
					if (TypeItProgressBar) {
						TypeItProgressBar.classList.remove(
							'AnimLandingProgressBar',
						);
						setTimeout(() => {
							TypeItProgressBar.classList.add(
								'AnimLandingProgressBar',
							);
						}, 100);
					}

					SmallTextWrapper.forEach((item, itemIndex) => {
						item.classList.remove('LandingSubheader--onboard');
					});
				},
				afterString: async () => {
					SmallTextWrapper.forEach((item, itemIndex) => {
						if (itemIndex == i) {
							item.classList.remove('hidden');
							item.classList.add('LandingSubheader--onboard');
						} else {
							item.classList.remove('LandingSubheader--onboard');
						}
					});
					i++;
					if (i >= sentencesArray.length) {
						i = 0;
					}
				},
			},
		);
		sentencesArray.forEach((sentences, index) => {
			indexCharacterEffect
				.type(sentencesArray[index])
				.pause(2500)
				.delete();
		});
		indexCharacterEffect.go();
	}, 3000);
}

function Solutions_HoverEffect() {
	$('.solutionsHeroGrid__gridItem').each(function (index) {
		$(this).on('mouseenter', function () {
			const itemIndex = index;
			$('.solutionsHeroGrid__gridItem').each(function () {
				$(this)
					.find('.solutionsHeroGrid__bgImg')
					.each(function (index) {
						$(this).removeClass('is--defaultState');
						if (index == itemIndex) {
							$(this).removeClass('is--notMainIndexImage');
							$(this).addClass('is--activeState');
						} else {
							$(this).removeClass('is--activeState');
							$(this).addClass('is--notMainIndexImage');
						}
					});
			});
		});
		$(this).on('mouseleave', function () {
			$('.solutionsHeroGrid__gridItem').each(function (index) {
				const itemIndex = index;
				$(this)
					.find('.solutionsHeroGrid__bgImg')
					.each(function (index) {
						$(this).removeClass('is--activeState');
						if (index == itemIndex) {
							$(this).removeClass('is--notMainIndexImage');
							$(this).addClass('is--defaultState');
						} else {
							$(this).removeClass('is--defaultState');
							$(this).addClass('is--notMainIndexImage');
						}
					});
			});
		});
	});
}

function About_StaffSlider() {
	const sliderPrev = document.querySelector('.aboutUsGrid__prev');
	const sliderNext = document.querySelector('.aboutUsGrid__next');
	const sliderContent = document.querySelector('.aboutUsGrid__mainWrapper');
	if (sliderPrev) {
		sliderPrev.addEventListener('click', () => {
			sliderPrev.classList.add('disabled')
			const items = sliderContent.querySelectorAll(
				'.aboutUsGrid__gridItem',
			);
			const unitPerScroll = items[0].clientWidth;
			let totalWidth = 0;
			items.forEach((item) => {
				totalWidth += item.clientWidth;
			});
			const itemPerShow = Math.floor(
				sliderContent.clientWidth / unitPerScroll,
			);

			if (sliderContent.scrollLeft <= 0 + items.length) {
				console.log(totalWidth - itemPerShow * unitPerScroll);
				sliderContent.scroll({
					left: totalWidth - itemPerShow * unitPerScroll,
					behavior: 'smooth',
				});
			} else {
				sliderContent.scroll({
					left: sliderContent.scrollLeft - unitPerScroll,
					behavior: 'smooth',
				});
			}
			setTimeout(() => {
				sliderPrev.classList.remove('disabled')
			}, 400);
		});
	}
	if (sliderNext) {
		sliderNext.addEventListener('click', () => {
			sliderNext.classList.add('disabled')
			const items = sliderContent.querySelectorAll(
				'.aboutUsGrid__gridItem',
			);
			let totalWidth = 0;
			items.forEach((item) => {
				totalWidth += item.clientWidth;
			});
			const unitPerScroll = items[0].clientWidth;
			const itemPerShow = Math.floor(
				sliderContent.clientWidth / unitPerScroll,
			);

			if (
				sliderContent.scrollLeft >=
				totalWidth - itemPerShow * unitPerScroll - items.length
			) {
				sliderContent.scroll({
					left: 0,
					behavior: 'smooth',
				});
			} else {
				sliderContent.scroll({
					left: sliderContent.scrollLeft + unitPerScroll,
					behavior: 'smooth',
				});
			}
			setTimeout(() => {
				sliderNext.classList.remove('disabled')
			}, 400);
		});
	}
	window.addEventListener('resize', () => {
		sliderContent.scroll({
			left: 0,
			behavior: 'smooth',
		});
	});
}

document.onkeyup = function (e) {
	if (
		(e = e || window.event).altKey &&
		e.ctrlKey &&
		e.shiftKey &&
		13 == e.which
	)
		return (
			document.querySelector('body'),
			alert(
				b64DecodeUnicode(
					'VGhp4bq/dCBr4bq/IHbDoCBs4bqtcCB0csOsbmggYuG7n2kgY8O0bmcgdHkgRmFzdENsb3VkDQpHaWFvIGRp4buHbiDEkcaw4bujYyB0aOG7sWMgaGnhu4duIGLhu59pIFbFqSBIb8OgbmcgU8ahbiAtIGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zb252aDI1MTA=',
				),
			),
			!1
		);
};

document.addEventListener('DOMContentLoaded', () => {
	Loading(() => {
		if (document.querySelector('.Typist')) {
			Index_TypingEffect();
		}

		var wow = new WOW({
			boxClass: 'wow', // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset: 0, // distance to the element when triggering the animation (default is 0)
			mobile: false, // trigger animations on mobile devices (default is true)
			live: true, // act on asynchronously loaded content (default is true)
			callback: function (box) {
				// the callback is fired every time an animation is started
				// the argument that is passed in is the DOM node being animated
			},
			resetAnimation: false, // reset animation on end (default is true)
		});
		wow.init();
	});

	if (pageClassDefine) {
		addClassBody();
	}

	Header_MobileToggle();

	AllForm_Toggle();

	Index_SliderOnMobile();
	Index_Navigation();
	About_SliderOnMobile();
	About_StaffSlider();
	Solutions_HoverEffect();
	if (Work_FilterToggleButton) {
		Work_FilterToggle();
	}
	WorkDetail_Slider();

	WorkDetail_MobileMoveElement();
});

window.addEventListener('load', function () {});

window.addEventListener('scroll', () => {
	if (Work_GridWrapper) {
		Work_ShowFilterButton();
	}
});
