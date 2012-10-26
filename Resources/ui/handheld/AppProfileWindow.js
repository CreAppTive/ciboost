function AppProfileWindow() {
	
	

	var self = Ti.UI.createWindow({
		title:"Configuración",
		backgroundColor:'white',
		backgroundImage:"/iphone/background.jpg",
		barImage:"/iphone/nav-bar.jpg",
		backButtonTitleImage :""
	});
	
	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('openWindow'),
		top:20
	});
	self.add(button);
	
	button.addEventListener('click', function() {
		
	});
	
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:self
	}); 
	
	
	
	return self;
};

module.exports = AppProfileWindow;
