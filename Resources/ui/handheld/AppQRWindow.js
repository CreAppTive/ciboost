function AppQRWindow() {
	
	//style: Ti.UI.iOS.ROW_STYLE_SUBTITLE,
	var self = Ti.UI.createWindow({
		title:"Leer QR",
		backgroundColor:'white',
		backgroundImage:"/iphone/background.jpg",
		barImage:"/iphone/nav-bar.jpg",
		barColor:"000",
		backButtonTitleImage :""
	});
 
	
	var qr =  Titanium.UI.createImageView({
		url:"/iphone/lector.png",
		left:45,
		top:60
	});
	
	self.add(qr);
		
	return self;
};



module.exports = AppQRWindow;
