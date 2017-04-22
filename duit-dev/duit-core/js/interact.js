/**
 * interact.js
 *
 * Contains functions for handling primary user interaction and dynamic
 * visual changes within the app
 *
 * Notice: this file utilizes conventions from ES6 (ES2015).
 * jQuery 3.2.0+
 *
 * @author    Kelli Rockwell <kellirockwell@mail.com>
 * @copyright 2017 DUiT
 * @since     File available since release 0.0.4  
 */

 $(document).ready(function() {

 	// Remember if settings menu is off screen/where off screen is
 	var $settingsIsOpen = false;
 	var $offScreen = 0;

 	// Remember if module window is open
 	var $moduleIsOpen = false;

 	// Window level (z-index)
 	const $windowLevel = 5;

 	// Initial calls on page load
 	// Move settings menu out of sight off screen
 	moveSettingsOffscreen();

 	// On window resize
 	$(window).bind('resize', e => {
 		// If settings menu is not open
 		if (!$settingsIsOpen) {
	 		// Wait long enough for settings menu to resize (0.2s)
	 		setTimeout(function() {
	 			// Move it off screen
	 			moveSettingsOffscreen();
	 		}, 200);
	 	} 		
 	});

 	// Simple function to move settings menu off left side of screen + 150px 
 	function moveSettingsOffscreen() {
 		$offScreen = -($('#settings').outerWidth()) - 150;
 		$('#settings').css('left', $offScreen);
 	}

 	// Move .overlay.darken to foreground, behind window level
 	function toggleOverlay(tog, obj) {
 		let $z = tog ? $windowLevel-1 : -$windowLevel;
 		let $o = tog ? 1 : 0;
 		// Animate opacity change
 		$(obj).animate({opacity: $o}, 600);
 		if (tog) {
 			// If turning overlay on, immediately bring it to front first
 			$(obj).css('z-index', $z);
 		} else {
 			// If turning overlay off, only push it to back after opacity change
 			setTimeout(function() {
 				$(obj).css('z-index', $z);
 			}, 600);
 		} 		
  	}

 	// Handle showing/hiding sliding settings menu
 	$(document).on('click', 'body', e => {
 		// Delay to ensure $settingsIsOpen changes before if checks
 		setTimeout(function() {
 			if ($settingsIsOpen && (!$(e.target).is('#settings, #settings *'))) {
 				// If settings menu is open and user does not click within the
 				// settings menu area, close settings menu (slide it back to off
 				// screen position)
 				$settingsIsOpen = false;
 				$('#settings').animate({left: $offScreen}, 700);
 				toggleOverlay(0, '.overlay.darken');
 			} else if (!$settingsIsOpen && $(e.target).is('#settings-btn, #settings-btn *')) {
 				// If settings menu is not open and user clicks on the settings
 				// button, open settings menu (slide it onto screen from left)
 				$settingsIsOpen = true;
 				$('#settings').animate({left: 0}, 700);
 				toggleOverlay(1, '.overlay.darken');
 			}
 		}, 10);		
 	});

 	function closeModule() {
 		let $form = $('.module-window form');
 		$moduleIsOpen = false;
 		toggleOverlay(0, '.overlay.darken');
 		toggleOverlay(0, '.overlay.module');
 		$form.animate({opacity: 0}, 700);
 		setTimeout( () => {
 			$form.html('closed');
 		}, 700);
 	}

 	function openModule(module) {
 		let $form = $('.module-window form');
 		$moduleIsOpen = true;
 		toggleOverlay(1, '.overlay.darken');
 		toggleOverlay(1, '.overlay.module');
 		$form.html(module);
 		$form.animate({opacity: 1}, 700);
 	}

	$(document).on('click', 'body', e => {
		// Delay to ensure $moduleIsOpen changes before if checks
		setTimeout(function() {
			if ($moduleIsOpen && (!$(e.target).is('.module-window, .module-window *'))) {
				// If current module is open and user does not click within the
				// module window area, close module window
				closeModule();
			} else if (!$moduleIsOpen && $(e.target).is('#quick-add-btn, #quick-add-btn *')) {
				// If current module is not open and user clicks on the module's
				// button, open that module
				openModule('test');
			}
		}, 10);		
	});

 	// Button for hiding du table display generated by AJAX
 	if ($('#btnHideDisplay')) {
 		$(document).on('click','#btnHideDisplay',function(e){
 			$('.responseContainer').html('');
 		});
 	}

 });