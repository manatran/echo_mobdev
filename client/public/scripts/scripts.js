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

	//toggle active tab
	let tabs = document.querySelectorAll('.tabs a');
	let active = document.querySelector('.tabs .active');

	
	active.classList.remove('active');

	if (window.location.pathname == '/') tabs[0].classList.add('active')
	if (window.location.pathname.includes('/browse')) tabs[1].classList.add('active')
	if (window.location.pathname.includes('/messages')) tabs[2].classList.add('active')

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

