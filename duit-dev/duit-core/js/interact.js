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

 $(document).ready( () => {

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
	 		// Wait long enough for settings menu to resize (css transition 0.2s)
	 		setTimeout( () => {
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
 		let $anTime = 600;
 		// Animate opacity change
 		$(obj).animate({opacity: $o}, $anTime);
 		if (tog) {
 			// If turning overlay on, immediately bring it to front first
 			$(obj).css('z-index', $z);
 		} else {
 			// If turning overlay off, only push it to back after opacity change
 			setTimeout( () => {
 				$(obj).css('z-index', $z);
 			}, $anTime);
 		} 		
  	}

 	// Handle showing/hiding sliding settings menu
 	$(document).on('click', 'body', e => {
 		// Delay to ensure $settingsIsOpen changes before if checks
 		setTimeout( () => {
 			if ($settingsIsOpen && (!$(e.target).is('#settings, #settings *'))) {
 				// If settings menu is open and user does not click within the
 				// settings menu area, close settings menu
 				closeSettings();
 				// Hide darkened overlay
 				toggleOverlay(0, '.overlay.darken');
 			} else if (!$settingsIsOpen && $(e.target).is('#settings-btn, #settings-btn *')) {
 				// If settings menu is not open and user clicks on the settings
 				// button, open settings menu
 				openSettings();
 				// Show darkened overlay
 				toggleOverlay(1, '.overlay.darken');
 			}
 		}, 10);		
 	});

 	// Close settings menu
 	function closeSettings() {
 		$settingsIsOpen = false;
 		// Slide settings back to off screen position
 		$('#settings').animate({left: $offScreen}, 700);
 	}

 	// Open settings menu
 	function openSettings() {
 		$settingsIsOpen = true;
 		// Slide settings onto screen from left
 		$('#settings').animate({left: 0}, 700);
 	}

 	// Handle showing/hiding 
 	$(document).on('click', 'body', e => {
 		// Delay to ensure $moduleIsOpen changes before if checks
 		setTimeout( () => {
 			if ($moduleIsOpen && (!$(e.target).is('.module-window, .module-window *'))) {
 				// If current module is open and user does not click within the
 				// module window area, close module window
 				closeModule();
 			} else if (!$moduleIsOpen && $(e.target).is('.module-btn, .module-btn *')) {
 				// If current module is not open and user clicks on the module's
 				// button, open that module
 				let $moduleName = $(e.target).closest('.module-btn').attr('id');			
 				openModule($moduleName);
 			}
 		}, 10);		
 	});

 	// Close module window
 	function closeModule() {
 		let $form = $('.module-window div');
 		$moduleIsOpen = false;
 		// Hide darkened overlay and window
 		toggleOverlay(0, '.overlay.darken');
 		toggleOverlay(0, '.overlay.module');
 		// Turn window content down to full transparency
 		$form.animate({opacity: 0}, 700, () => {
 			// After opacity change animation is complete, remove window content
 			$form.html('closed');
 		});
 	}

 	// Open module window of specified type
 	function openModule(module) {
 		let $form = $('.module-window div');
 		$moduleIsOpen = true;
 		// Make sure settings is closed
 		closeSettings();
 		// Show darkened overlay and window
 		toggleOverlay(1, '.overlay.darken');
 		toggleOverlay(1, '.overlay.module');
 		// Change content of window to reflect type
    if (module == "quick-add-btn"){
      let moduleText = `
        <div class="container">

        <div>
        Name:<input id="du_name" type="text" placeholder="Du Name" value="test">
        Note:<input id="du_note" type="text" placeholder="Note">
        Time Start:<input id="du_time_start" type="date" placeholder="mm/dd/yyyy">
               <input id="du_time_start_time" type="time" = placeholder="00:00 (24 hour time)">
        Time End:<input id="du_time_end" type="date" placeholder="mm/dd/yyyy">
             <input id="du_time_end_time" type="time" = placeholder="00:00 (24 hour time)">
        Deadline Date:<input id="du_time_deadline" type="date" placeholder="mm/dd/yyyy">
                <input id="du_time_deadline_time" type="time" = placeholder="00:00 (24 hour time)">
        Status:
        <select id="du_status">
          <option value="Open">Open</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
        Priority:
        <select id="du_priority">
          <option value="none"> </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        Tags:
        <input id="du_tags" type="text" placeholder="Tags">
                <button id="btnAddDu" class = "btn btn-action">Add Task</button>

      </div>`;
      $form.html(moduleText);
    } else {
 		 $form.html(module);
  }
 		// Bring window content up to full opacity
 		$form.animate({opacity: 1}, 700);
 	}

 	// Button for hiding du table display generated by AJAX
 	if ($('#btnHideDisplay')) {
 		$(document).on('click','#btnHideDisplay', (e) => {
 			$('.responseContainer').html('');
 		});
 	}

 });