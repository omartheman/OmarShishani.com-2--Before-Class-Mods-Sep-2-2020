function meSplosion(evt) {
	let buttons = document.getElementsByClassName("me_buttons_div2");
	// buttons.style.visibility = 'hidden'; 
	console.log(document.getElementsByClassName("me_buttons_div2"));
	// document.getElementsByClassName("me_buttons_div2").style.visibility = 'hidden';
	for (i = 0; i <= buttons.length-1; i++) {
		buttons[i].style.visibility = 'visible';
	}
}
