/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var user = true;
	var Window;
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		Window = require('ui/handheld/ApplicationWindow');
	}
	
	var startApp = function(){
		var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
		var TabGroup = new ApplicationTabGroup(Window);
		TabGroup.open();
	}
	
	if(user)
	{
		startApp();
	}
	else
	{
		var AppLoginWindow = require('ui/handheld/AppLoginWindow');
		new AppLoginWindow(startApp).open();
		
	}
	
	

	
	
	
	
	
	// Here is the magic
	/*Ti.include("customTabBar/customTabBar.js");
	
	var ctb = new CustomTabBar({
	    tabBar: TabGroup,
	    imagePath: '/iphone/',
	    width: 41,
	    height: 41,
	    tabHeight:49,
	    items: [
	        { image: 'tab1.png', selected: 'tab1.png' },
	        { image: 'tab2.png', selected: 'tab2.png' },
	        { image: 'tab3.png', selected: 'tab3.png' },
	        { image: 'tab4.png', selected: 'tab4.png' }
	    ]
	});*/


})();
