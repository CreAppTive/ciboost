function AppHomeMapWindow() {
	
	var StoreWin = require('/ui/handheld/AppStoreWindow');
	var ConfigWin = require('/ui/handheld/AppConfigTabs');
	

	var self = Ti.UI.createWindow({
		title:"Home",
		backgroundColor:'white',
		backgroundImage:"/iphone/background.jpg",
		barColor:"000",
		barImage:"/iphone/nav-bar.jpg",
		titleImage:"/iphone/home-title.png"
	});
	
	
	
	// SEARCH VIEW
		var searchview = Ti.UI.createView({
			top:0,
			height:45,
			backgroundColor:"#fff",
			backgroundImage:"/iphone/inputSearch-bg.png",
		});
		var searchtxt = Titanium.UI.createTextField({  
		    color: "#36a5cf",  
		    top:7,    
		    width:"95%",  
		    height:30,  
		    
		    hintText:'Buscar',  
		    font:{fontFamily:'Helvetica Neue'},
		    
		    clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
		    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
		    returnKeyType:Titanium.UI.RETURNKEY_SEARCH,  
		    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
		});  
		searchtxt.addEventListener('return', function() {
	    	alert("buscando...");
		});
	
		searchview.add(searchtxt);
	self.add(searchview);	
	// MAPA
	
	var mapview = Titanium.Map.createView({
	    mapType: Titanium.Map.STANDARD_TYPE,
	    /*region: {latitude:37.78583526611328, longitude:-122.4064178466797, 
	            latitudeDelta:0.01, longitudeDelta:0.01},*/
	    animate:true,
	    regionFit:true,
	    userLocation:true,
	   // annotations:[mountainView],
	    height:160,
	    top:45
	});
	
	Titanium.Geolocation.getCurrentPosition(function(e)
	{
		var longitude = e.coords.longitude;
        var latitude = e.coords.latitude;
        var altitude = e.coords.altitude;
        var heading = e.coords.heading;
        var accuracy = e.coords.accuracy;
        var speed = e.coords.speed;
        var timestamp = e.coords.timestamp;
        var altitudeAccuracy = e.coords.altitudeAccuracy;
        
        mapview.setRegion( {latitude:latitude, longitude:longitude, 
	            latitudeDelta:0.01, longitudeDelta:0.01});
	});
	
	self.add(mapview);
	

	
		
		
		
	// LISTA
		var contTable = Ti.UI.createView({
			top:200,
			width:"100%",
			height:167,
			backgroundColor:"#f6f6f6",
			borderColor :"#f1f2f2"
		});
	
	
		var table = Titanium.UI.createTableView({
			top:0,
			backgroundColor:"#f6f6f6",
			rowHeight:60
		});
	
	
		contTable.add(table);
		self.add(contTable);
		
		table.addEventListener('click', function(e){
	  		self.containingTab.open(new StoreWin(remoteData[e.index]));
		});

		// Remote Data
		var remoteData;
		var url = "http://creapptive.imervich.com/apiv1/stores.php";
		var xhr = Ti.Network.createHTTPClient({
		    onload: function(e) {
		       
		        //Ti.API.info(this.responseText);
		        var response = JSON.parse(this.responseText);  
		        var tbl_data = [];
		        remoteData = response;
		        
		        for(i = 0; i < response.length; i++) {   
		        	var item = response[i]; 
				 	tbl_data[i] = makeRow(item);
				  }
	  			
	  			table.setData(tbl_data);
	  			
		    },
		    onerror: function(e) {
		        Ti.API.debug(e.error);
		        //alert('error');
		    },
		    timeout:5000
		});
		
		xhr.open("GET", url);
		xhr.send();
	
	
	// NAVBAR BUTTONS
		var reload = Titanium.UI.createButton({
			backgroundImage:"/iphone/btn-send.png",
			width:30,
			height:30 
		});
		self.rightNavButton = reload;
		 
		reload.addEventListener('click', function(e){
		  Ti.API.log("reload");	
		   xhr.open("GET", url);
		   xhr.send();
		});
		
		var config = Titanium.UI.createButton({
			backgroundImage:"/iphone/btn-config.png",
			width:36,
			height:30,
			left:0 
		});
		self.leftNavButton = config;
		//self.CustomTabBar.set = config;
		//Ti.UI.currentWindow.setLeftNavButton(config);
		 
		config.addEventListener('click', function(e){
		  // open config page
		  var conf_win = new ConfigWin();
		  conf_win.top = 420;
		  conf_win.open();
		  //profileWin.opacity = 0;
		  
		  conf_win.animate({opacity:1, top:0, duration:300});
		})

	
	return self;
};

function makeRow(item)
{
	var row = Titanium.UI.createTableViewRow({
		backgroundColor:"#f6f6f6",
		borderColor:"#c2c2c2",
		//height:60
	});
	var items = item.items;
	
	var imgPath = items[0].image
	
	if(imgPath =="")
	imgPath = "/iphone/default-item.png";
	
	var imageThumb =  Titanium.UI.createImageView({
		url:imgPath,
		width:42,
		height:42,
		left:6,
		top:10,
		borderWidth: 2,
		borderColor: "#FFF",
		backgroundColor:"#000",
	});
	 
	var mainTitle = Titanium.UI.createLabel({
		text:items[0].name,
		font:{fontSize:16,fontWeight:'bold'},
		color:"#1a4f64",
		width:'auto',
		textAlign:'left',
		top:10,
		left:52,
		height:16
	});
	 
	var subTitle =  Titanium.UI.createLabel({
		text:item.name,
		font:{fontSize:12},
		color:"#5b5b5b",
		width:'auto',
		textAlign:'left',
		top:27,
		left:52,
		height:12
	});
	 
	row.add(imageThumb);
	row.add(mainTitle);
	row.add(subTitle);
	row.hasChild = true; 
	 
	row.className = 'store_row'; 
	return row;
} 

module.exports = AppHomeMapWindow;
