function AppConfigStatsWindow() {
	
	//style: Ti.UI.iOS.ROW_STYLE_SUBTITLE,
	var self = Ti.UI.createWindow({
		title:"Stats",
		backgroundColor:'white',
		backgroundImage:"/iphone/background.jpg",
		barImage:"/iphone/nav-bar.jpg",
		barColor:"000",
		backButtonTitleImage :""
	});
	
	var btnExit = Titanium.UI.createButton({
			backgroundImage:"/iphone/btn-send.png",
			height:30,
			width:60,
			title:"Cerrar",
			font: { fontSize: 12, font: "Helvetica Neue" }
			
		});
		
		btnExit.addEventListener('click', function(e){ Ti.App.configTabGroup.close(); });
		self.rightNavButton = btnExit;
 
	
	var webview = Titanium.UI.createWebView({url:'/html-app/stats.html',backgroundColor:'transparent'});
 
	self.add(webview);
	
		
	return self;
};



module.exports = AppConfigStatsWindow;
