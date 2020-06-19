export default class Tab {
	TabLabels;
	TabContents;

	constructor(selector) {
		this.selector = document.querySelector(selector);
		if (this.selector) {
			this.TabLabels = Array.from(
				this.selector.querySelectorAll('[tab-label]'),
			);
			this.TabContents = Array.from(
				this.selector.querySelectorAll('[tab-id]'),
			);
			this.init();
		}
	}

	changeTabWhenClicked() {
		this.TabLabels.forEach((label) => {
			label.addEventListener('click', (e) => {
				e.preventDefault();
				const tabTarget = label.attributes['tab-label'].value;

				this.TabLabels.forEach((eleClicked, eleClickedIndex) => {
					eleClicked.classList.remove('active');
					this.TabContents[eleClickedIndex].removeAttribute('style');
					this.TabContents[eleClickedIndex].classList.remove('show');
				});

				document.querySelector(
					`[tab-id="${tabTarget}"]`,
				).style.display = 'block';
				document
					.querySelector(`[tab-label="${tabTarget}"]`)
					.classList.add('active');

				setTimeout(() => {
					document
						.querySelector(`[tab-id="${tabTarget}"]`)
						.classList.add('show');
				}, 0);
			});
		});
	}

	activeFirstTab() {
		if (this.TabLabels.length > 0) {
			this.TabLabels[0].click();
		}
	}

	init() {
		this.changeTabWhenClicked();
		this.activeFirstTab();
	}
}
