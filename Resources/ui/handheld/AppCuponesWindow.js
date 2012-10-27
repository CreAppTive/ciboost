function AppCuponesWindow() {
	
	//style: Ti.UI.iOS.ROW_STYLE_SUBTITLE,
	var self = Ti.UI.createWindow({
		title:"Cupones",
		backgroundColor:'white',
		backgroundImage:"/iphone/background.jpg",
		barImage:"/iphone/nav-bar.jpg",
		barColor:"000",
		backButtonTitleImage :""
	});
 
	
		
	return self;
};



module.exports = AppCuponesWindow;
