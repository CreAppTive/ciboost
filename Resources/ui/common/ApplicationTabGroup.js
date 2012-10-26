function ApplicationTabGroup(Window) {
	
	var globalData = {};
	var HomeWin = require('/ui/handheld/AppHomeMapWindow');
	var PedidosWin = require('/ui/handheld/AppPedidosWindow');
	var FavoritosWin = require('/ui/handheld/AppFavoritosWindow');
	var HistorialWin = require('/ui/handheld/AppHistorialWindow');
	
	
	
	
	//create module instance
	var self = Ti.UI.createTabGroup({
		backgroundColor:'#f00',
		tabsBackgroundImage:"/iphone/tab-bar.jpg",
		activeTabBackgroundColor :"#f00"
		
	});
	
	//create app tabs
	var win1 = new HomeWin(),
		win2 = new FavoritosWin(),
		win3 = new HistorialWin(),
		win4 = new PedidosWin(),
		win5 = new Window(L('Cupones'));
		// = new Window(L('otros'))
	

	
	var tab1 = Ti.UI.createTab({
		title: L('Ordenar'),
		icon: '/images/KS_nav_ui.png',
		backgroundImage :"/iphone/tab-bar.jpg",
		//backgroundColor:'#f00',
		window: win1
	});
	
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('Favoritos'),
		icon: '/images/KS_nav_views.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: L('Historial'),
		icon: '/images/KS_nav_views.png',
		window: win3
	});
	win3.containingTab = tab3;
	
	var tab4 = Ti.UI.createTab({
		title: L('Pedidos'),
		icon: '/images/KS_nav_views.png',
		window: win4
	});
	win4.containingTab = tab4;
	
	var tab5 = Ti.UI.createTab({
		title: L('Cupones'),
		icon: '/images/KS_nav_views.png',
		window: win5
	});
	win5.containingTab = tab5;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	self.addTab(tab4);
	self.addTab(tab5);
	
	return self;
};

module.exports = ApplicationTabGroup;
