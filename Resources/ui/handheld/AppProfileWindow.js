function AppProfileWindow() {

	var self = Ti.UI.createWindow({
		title:"Configuración",
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
	
		
		var sectionCuentas = Titanium.UI.createTableViewSection();
		sectionCuentas.headerTitle = "Cuentas La Caixa Vinculadas";
		
		 
		var sectionLogout = Titanium.UI.createTableViewSection();
		sectionLogout.headerTitle = "";
		var rowSalir = Titanium.UI.createTableViewRow();
		
		
				var salir = Titanium.UI.createButton({
					backgroundImage:"/iphone/btn-send.png",
					width:"100%",
					height:40,
					title: "Salir" 
				});
				
				 
				salir.addEventListener('click', function(e){
				  	// SALIR DEL SISTEMA
				  	
				  	var db = Ti.Database.open('main');
				  	
				  	
				  	
				  	db.execute('DELETE FROM pedidos');
				  	db.execute('DELETE FROM pedidos_items');
				  	db.execute('DELETE FROM favoritos');	
				  	
				  	
				  	
				});
		
				rowSalir.add(salir);
		
				sectionLogout.add(rowSalir);
	
		
		
		
		self.add(table);
	
	
	
		// CONNECCION CON LA CAIXA
		var remoteData;
		Ti.App.user
		Ti.App.appKey
		
		
		var endPoint = "/operations/account/" + Ti.App.user.id;
		var endPoint = "/operations/card/list";
		
		var url = Ti.App.apiBaseURL + Ti.App.appKey + "/" + Ti.App.user.token + endPoint;
		Ti.API.log(url);
		
		var xhr = Ti.Network.createHTTPClient({
		    onload: function(e) {
		       
		        //Ti.API.info(this.responseText);
		        var response = JSON.parse(this.responseText);  
		        //Ti.API.log(response);
		        //Ti.API.log(response.length);
		        var row ;
		        
		        if(response.data.length)
		        {
		        	for(i = 0; i < response.data.length; i++) { 
		        		 
		        		var account = response.data[i]; 
		        		row = Titanium.UI.createTableViewRow({title:account});
		        		sectionCuentas.add(row);
		        	
		        	}
		        	
		        }
		        /*else
		        {
		        	row = Titanium.UI.createTableViewRow({title:response.data.accountNumber});
		        	sectionCuentas.add(row);
		        }*/
		        
		        
	  			table.setData([sectionCuentas,sectionLogout]);
	  			
	  			
		    },
		    onerror: function(e) {
		        Ti.API.debug("ERROR: ",e.error);
		        //alert('error');
		    },
		    timeout:5000
		});
		
		xhr.open("GET", url);
		xhr.send();
		
	
	
	return self;
};





module.exports = AppProfileWindow;
