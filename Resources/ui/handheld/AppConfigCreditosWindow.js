function AppConfigCreditosWindow() {
	
	//style: Ti.UI.iOS.ROW_STYLE_SUBTITLE,
	var self = Ti.UI.createWindow({
		title:"Creditos",
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

	var table = Titanium.UI.createTableView({
		top:0,
		backgroundColor:"#f6f6f6",
		rowHeight:40,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		backgroundImage:"/iphone/background.jpg",

	});

	
	 
	var section1 = Titanium.UI.createTableViewSection();
	section1.headerTitle = "Creapptive Team";
	
	var row1 = Titanium.UI.createTableViewRow({title:"Natalia Salazar"});
	var row2 = Titanium.UI.createTableViewRow({title:"Jonathan González"});
	var row3 = Titanium.UI.createTableViewRow({title:"Fernando Campo"});
	var row4 = Titanium.UI.createTableViewRow({title:"Cesár Flores"});
	section1.add(row1);
	section1.add(row2);
	section1.add(row3);
	section1.add(row4);
	 
	var section2 = Titanium.UI.createTableViewSection();
	section2.headerTitle = "Extra Credits";
	var row5 = Titanium.UI.createTableViewRow({title:"Esteban Patiño"});
	section2.add(row5);
	 
	table.setData([section1,section2]);
	
	self.add(table);
		
	return self;
};



module.exports = AppConfigCreditosWindow;
