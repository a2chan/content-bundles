const openBurger = () => {
	const burger = document.querySelector('.options .burger')
	const slide_bar = document.querySelector('.ss-slide_bar')

	burger.classList.toggle('burger--open')
	slide_bar.classList.toggle('slide_bar--open')
}
