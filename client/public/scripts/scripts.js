window.onload = (e) => {
	const mobileNav = document.querySelector('.mobile-nav')
	const body = document.querySelector('html')
	const navLogo = document.querySelector('.nav-logo')

	// toggle menubar
	body.addEventListener('click', (e) => {
		if (e.target == navLogo && window.innerWidth >= 1080) window.location = '/';

		if (e.target == navLogo && window.innerWidth < 1080) mobileNav.classList.add('active')

		else if (!(e.path.indexOf(mobileNav) > -1) && mobileNav.classList.contains('active')) {
			e.preventDefault()
			mobileNav.classList.remove('active')
		}
	}, true)
}
