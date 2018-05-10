window.onload = (e) => {
	const nightmode = document.querySelectorAll('.nightmode')
	const body = document.querySelector('html')

	const navLogo = document.querySelector('.nav-logo')
	const mobileNav = document.querySelector('.mobile-nav')

	//nightmode toggle stylesheet
	for (let i = 0; i < nightmode.length; i++) {
		nightmode[i].addEventListener('click', (e) => {
			e.preventDefault()

			body.classList.toggle('dark')
			if (body.classList.contains('dark')) {
				navLogo.src = '/favicon_alt.png'
			} else {
				navLogo.src = '/favicon.png'
			}
		})
	}

	// nightmode toggle logo
	body.addEventListener('click', (e) => {
		if (e.target == navLogo && window.innerWidth < 1080) {
			mobileNav.classList.add('active')
		}
		else if (!(e.path.indexOf(mobileNav) > -1) && mobileNav.classList.contains('active')) {
			e.preventDefault()
			mobileNav.classList.remove('active')
		}
	}, true)

	//toggle active tab
	let tabs = document.querySelectorAll('.tabs a');
	let active = document.querySelector('.tabs .active');

	if (window.location.pathname == '/') {
		active.classList.remove('active');
		tabs[0].classList.add('active')
	}
	if (window.location.pathname == '/browse') {
		active.classList.remove('active');
		tabs[1].classList.add('active')
	}
	if (window.location.pathname == '/messages') {
		active.classList.remove('active');
		tabs[2].classList.add('active')
	}

	//ScrollTop button
	setTimeout(() => {
		let scrollTop = document.getElementById('scroll-top')
		if (scrollTop) {
			scrollTop.addEventListener('click', (e) => {
				e.preventDefault();
				window.scroll({ top: 0, left: 0, behavior: 'smooth' })
			})
		}
	}, 3000);

}

