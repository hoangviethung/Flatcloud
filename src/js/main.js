// Import Libraries
import MoveElement from './lib/MoveElement';
import Loading from './lib/Loading';
import TypeIt from 'typeit';
// define variables
const body = document.querySelector('body');
const main = document.querySelector('main');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const pageClassDefine = document.querySelector('#js-page-verify');

const FormRequest_OtherReasonInputCheckbox = document.getElementById(
	'reason-other',
);
const FormRequest_OtherReasonInput = document.getElementById(
	'reason-other-input',
);
const FormRequest_NotSure = document.getElementById('not-sure');
const FormRequest_WhatDo = Array.from(
	document.querySelectorAll('.fl-modal-request__form .whatdo'),
);
const FormRequest_ButtonShow = document.querySelector(
	'.fl-header__request-toggle',
);
const FormRequest_ButtonClose = document.querySelector(
	'.fl-modal-request__close',
);
const FormRequest_Modal = document.querySelector('.fl-modal-request');
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

function FormRequest_OtherReasonToggle() {
	FormRequest_OtherReasonInputCheckbox.addEventListener('change', (e) => {
		if (e.target.checked) {
			FormRequest_OtherReasonInput.classList.add('active');
		} else {
			FormRequest_OtherReasonInput.classList.remove('active');
		}
	});
}

function FormRequest_NotSureInputHandler() {
	FormRequest_NotSure.addEventListener('change', (e) => {
		if (e.target.checked) {
			FormRequest_WhatDo.forEach((item) => {
				item.checked = false;
			});
			FormRequest_NotSure.checked = true;
		}
	});
	FormRequest_WhatDo.forEach((item) => {
		item.addEventListener('click', () => {
			FormRequest_NotSure.checked = false;
		});
	});
}

function FormRequest_ModalToggle() {
	FormRequest_ButtonShow.addEventListener('click', () => {
		FormRequest_Modal.classList.add('active');
		FormRequest_Modal.classList.remove('close');
		main.classList.add('close');
		header.classList.add('close');
		footer.classList.add('close');
	});
	FormRequest_ButtonClose.addEventListener('click', () => {
		FormRequest_Modal.classList.remove('active');
		FormRequest_Modal.classList.add('close');
		main.classList.remove('close');
		header.classList.remove('close');
		footer.classList.remove('close');
	});
}

function Header_MobileToggle() {
	let isOpen = false;
	Header_Hamburger.addEventListener('click', () => {
		isOpen = !isOpen;
		if (isOpen) {
			Header_Hamburger.classList.add('active');
			Header_NavList.classList.add('active');
			Header_Social.classList.add('active');
		} else {
			Header_Hamburger.classList.remove('active');
			Header_NavList.classList.remove('active');
			Header_Social.classList.remove('active');
		}
	});
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
	}
}

function Work_FilterToggle() {
	let isOpen = false;

	const buttonTemplate__isClose = `
		<div class="filterCloseIco__mainWrapper">
			<span class="filterCloseIco__stroke"></span>
			<span class="filterCloseIco__stroke"></span>
		</div>
	`;

	const buttonTemplate__isOpen = `
		<p class="fl-workFilterBall__text">Filter</p>
	`;

	Work_FilterToggleButton.addEventListener('click', () => {
		isOpen = !isOpen;
		if (isOpen) {
			Work_FilterToggleButton.innerHTML = buttonTemplate__isClose;

			const Work_FilterCloseIcon = document.querySelector(
				'.filterCloseIco__mainWrapper',
			);
			Work_FilterToggleButton.classList.add(
				'fl-workFilterBallAnim--collapsed',
			);
			Work_FilterToggleButton.classList.remove(
				'fl-workFilterBallAnim--onboard',
			);
			setTimeout(() => {
				Work_FilterCloseIcon.classList.add(
					'filterCloseIcoAnim--onboard',
				);
			}, 300);
			Work_FilterWrapper.classList.remove('is--collapsed');
			Work_FilterWrapper.classList.add('is--expanded');
		} else {
			Work_FilterToggleButton.classList.add(
				'fl-workFilterBallAnim--onboard',
			);
			Work_FilterToggleButton.classList.remove(
				'fl-workFilterBallAnim--collapsed',
			);
			Work_FilterToggleButton.innerHTML = buttonTemplate__isOpen;
			Work_FilterWrapper.classList.add('is--collapsed');
			Work_FilterWrapper.classList.remove('is--expanded');
		}
	});
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
		Index_TypingEffect();
	});

	if (pageClassDefine) {
		addClassBody();
	}

	Header_MobileToggle();

	FormRequest_ModalToggle();

	if (FormRequest_OtherReasonInput) {
		FormRequest_OtherReasonToggle();
	}

	if (FormRequest_NotSure) {
		FormRequest_NotSureInputHandler();
	}

	Index_SliderOnMobile();
	About_SliderOnMobile();

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
