function Loading() {
	let loading = document.querySelector(
		'.PageTransitionsPreloader__mainWrapper',
	);
	let images = document.images;
	let imagesLength = images.length;
	let counter = 0;

	function turnOffLoadingScreen() {
		setTimeout(function () {
			loading.classList.add(
				'PageTransitionsPreloader__mainWrapper--hidden',
			);
			document.querySelector('body').classList.add('show-page');
			setTimeout(() => {
				loading.parentNode.removeChild(loading);
				if (typeof cb == 'function') cb();
			}, 800);
		}, 1000);
	}

	function progressing() {
		counter += 1;
		let progressBarBackground = loading.querySelector(
			'.svgProgressBar__rect.background',
		);
		let progressBarText = loading.querySelector(
			'.svgProgressBar__rect.text',
		);
		// let progressPercentage = loading.querySelector('#progress-percentage');
		let n = Math.round((100 / imagesLength) * counter);

		if (progressBarBackground && progressBarText) {
			progressBarBackground.style.width = `${n}%`;
			progressBarText.style.width = `${n}%`;
		}
		// if (progressPercentage) {
		// 	progressPercentage.innerHTML = `${n}`;
		// }
		console.log(counter);

		if (counter === imagesLength) {
			return turnOffLoadingScreen();
		}
	}
	if (loading) {
		if (imagesLength === 0) {
			return turnOffLoadingScreen();
		} else {
			for (let i = 0; i < imagesLength; i++) {
				let img = new Image();
				img.onload = progressing;
				img.onerror = progressing;
				img.src = images[i].src;
			}
		}
	}
}

export default Loading;
