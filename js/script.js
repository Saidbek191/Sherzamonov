$(document).ready(function() {
	$('.head__menu').click(function(event) {
		$('.head__menu,.head__nav').toggleClass('active');
		$('body').toggleClass('lock');
	});
});