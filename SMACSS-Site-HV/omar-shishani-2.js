let fadeCompleted = false;
function runslide_O() {
  $('.os-o-plain').delay(1500).fadeOut(1500).fadeIn(1500, function(){
  	fadeCompleted = true; 
  });
};
function runslide_S() {
	fadeCompleted = false;
  $('.os-s-plain').fadeOut(1500).fadeIn(1500);
};
function runslide_both() {
	if (fadeCompleted === true) {
	runslide_S();
	runslide_O();
	}
	else {
		return;
	}
}
$('.os-v2-svg').on('mouseenter', runslide_both);
$('.os-v2-svg').on('click', runslide_both);

document.onload = runslide_O_load(), runslide_S_load();
function runslide_O_load() {
  $('.os-o-plain').fadeIn(2000);
};
function runslide_S_load() {
  $('.os-s-plain').delay(1500).fadeIn(2000, function(){
  	fadeCompleted = true;
  });
};

$('#mobile-nav-hamburger').on('click', function(){
	$('#mobile-nav-main-content').slideToggle();
});
