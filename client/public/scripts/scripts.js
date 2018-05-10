window.onload = (e) => {
	const nightmode = document.querySelectorAll('.nightmode')
	const body = document.querySelector('html')
	
	const navLogo = document.querySelector('.nav-logo')
	const mobileNav = document.querySelector('.mobile-nav')
	
	for(let i = 0; i<nightmode.length;i++){
		nightmode[i].addEventListener('click', (e) => {
			e.preventDefault()
		
			body.classList.toggle('dark')
			if (body.classList.contains('dark')) {
				navLogo.src = 'favicon_alt.png'
			} else {
				navLogo.src = 'favicon.png'
			}
		})
	}
	
	
	
	body.addEventListener('click', (e) => {
		if(e.target == navLogo && window.innerWidth < 1080){
			mobileNav.classList.add('active')
		}
		else if(!(e.path.indexOf(mobileNav) > -1) && mobileNav.classList.contains('active')){
			e.preventDefault()
			mobileNav.classList.remove('active')
		}
	}, true)

	let tabs = document.querySelectorAll('.tabs a');
	let active = document.querySelector('.tabs .active');
	console.log(window.location.pathname)
	if(window.location.pathname == '/') {
		active.classList.remove('active');
		tabs[0].classList.add('active')
	}
	if(window.location.pathname == '/browse'){
		active.classList.remove('active');
		tabs[1].classList.add('active')
	}
	if (window.location.pathname == '/messages'){
		active.classList.remove('active');
		tabs[2].classList.add('active')
	}

}

