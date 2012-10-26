function AppConfigTabs() {
	
	
	var Window = require('ui/handheld/ApplicationWindow');
	var Creditos = require('ui/handheld/AppConfigCreditosWindow');

	//create module instance
	var self = Ti.UI.createTabGroup({
		backgroundColor:'#f00',
		tabsBackgroundImage:"/iphone/tab-bar.jpg",
		activeTabBackgroundColor :"#f00"
		
	});
	
	//create app tabs
	var win1 = new Window(L('Configuración')),
		win2 = new Window(L('Stats')),
		win3 = new Window(L('Badges')),
		win4 = new Creditos(L('Creditos'));
		// = new Window(L('otros'))
	

	
	var tab1 = Ti.UI.createTab({
		title: L('Configuración'),
		icon: '/images/KS_nav_ui.png',
		backgroundImage :"/iphone/tab-bar.jpg",
		//backgroundColor:'#f00',
		window: win1
	});
	
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('Stats'),
		icon: '/images/KS_nav_ui.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: L('Badges'),
		icon: '/images/KS_nav_ui.png',
		window: win3
	});
	win3.containingTab = tab3;
	
	var tab4 = Ti.UI.createTab({
		title: L('Creditos'),
		icon: '/images/KS_nav_ui.png',
		window: win4
	});
	win4.containingTab = tab4;
	
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	self.addTab(tab4);
	
	
	return self;
};

module.exports = AppConfigTabs;
