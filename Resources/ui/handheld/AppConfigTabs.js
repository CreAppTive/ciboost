function AppConfigTabs() {
	
	var Window = require('ui/handheld/ApplicationWindow');
	var Creditos = require('ui/handheld/AppConfigCreditosWindow');
	var Badges = require('ui/handheld/AppConfigBadgesWindow');
	var userConf = require('ui/handheld/AppProfileWindow');
	var statsConf = require('ui/handheld/AppConfigStatsWindow');
	
	
	
	//create module instance
	var self = Ti.UI.createTabGroup({
		backgroundColor:'#f00',
		tabsBackgroundImage:"/iphone/tab-bar.jpg",
		activeTabBackgroundColor :"#f00"
		
	});
	
	
	Ti.App.configTabGroup = self 
	
	//create app tabs
	var win1 = new userConf(L('Configuración')),
		win2 = new statsConf(L('Stats')),
		win3 = new Badges(L('Badges')),
		win4 = new Creditos(L('Creditos'));
		// = new Window(L('otros'))
	

	
	var tab1 = Ti.UI.createTab({
		title: L('Configuración'),
		icon: '/iphone/settings.png',
		window: win1
	});
	
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('Stats'),
		icon: '/iphone/stats.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: L('Badges'),
		icon: '/iphone/badges.png',
		window: win3
	});
	win3.containingTab = tab3;
	
	var tab4 = Ti.UI.createTab({
		title: L('Creditos'),
		icon: '/iphone/credits.png',
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
