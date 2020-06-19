// define variables
const main = document.querySelector('main');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
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
const FormRequest_OtherReasonToggle = () => {
	FormRequest_OtherReasonInputCheckbox.addEventListener('change', (e) => {
		if (e.target.checked) {
			FormRequest_OtherReasonInput.classList.add('active');
		} else {
			FormRequest_OtherReasonInput.classList.remove('active');
		}
	});
};

const FormRequest_NotSureInputHandler = () => {
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
};

const FormRequest_ModalToggle = () => {
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
};

const Header_MobileToggle = () => {
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
};

const Work_ShowFilterButton = () => {
	if (
		Work_GridWrapper.getBoundingClientRect().top < 0 &&
		Work_GridWrapper.getBoundingClientRect().bottom >
			Work_FilterToggleButton.getBoundingClientRect().top
	) {
		Work_FilterToggleButton.classList.add('fl-workFilterBall--active');
	} else {
		Work_FilterToggleButton.classList.remove('fl-workFilterBall--active');
	}
};

const Work_FilterToggle = () => {
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
};

document.addEventListener('DOMContentLoaded', () => {
	Header_MobileToggle();
	FormRequest_ModalToggle();
	if (FormRequest_OtherReasonInput) {
		FormRequest_OtherReasonToggle();
	}
	if (FormRequest_NotSure) {
		FormRequest_NotSureInputHandler();
	}
	if (Work_FilterToggleButton) {
		Work_FilterToggle();
	}
});

window.addEventListener('scroll', () => {
	if (Work_GridWrapper) {
		Work_ShowFilterButton();
	}
});

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
