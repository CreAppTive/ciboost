function AppHistorialWindow() {
	
	var DetallePedido = require('/ui/handheld/AppPedidoDetalleWindow');
	
	var self = Ti.UI.createWindow({
		title:"Historial Pedidos",
		backgroundColor:'white',
		backgroundImage:"/iphone/background.jpg",
		barImage:"/iphone/nav-bar.jpg",
		backButtonTitleImage :""
	});
	

	var table = Titanium.UI.createTableView({
		top:0,
		backgroundColor:"#f6f6f6",
		rowHeight:60
	});

	
	var response = [1,1,1];
    var tbl_data = [];
    
    for(i = 0; i < response.length; i++) {   
    	var item = response[i]; 
	 	tbl_data[i] = makeRow({ name:"Nombre Restaurante",cantidad:"10", total:"$00.00", image:"" });
	  }
	
	table.setData(tbl_data);
	table.addEventListener('click', function(e){
  		self.containingTab.open(new DetallePedido({
  			name:"Nombre restaurante",
  			items:[{name:"nombre platillo"}]
  		}));
	});  			
	  			
	self.add(table);
		
	return self;
};

function makeRow(item)
{
	var row = Titanium.UI.createTableViewRow({
		backgroundColor:"#f6f6f6",
		borderColor:"#c2c2c2"
	});
	
	
		
	var imgPath = item.image
	
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
		text:item.name,
		font:{fontSize:16,fontWeight:'bold'},
		color:"#1a4f64",
		width:'auto',
		textAlign:'left',
		top:10,
		left:52,
		height:16
	});
	 
	var numPlatillos =  Titanium.UI.createLabel({
		text:"Cantidad: " + item.cantidad,
		font:{fontSize:12},
		color:"#5b5b5b",
		width:'auto',
		textAlign:'left',
		top:27,
		left:52,
		height:12
	});
	 
	var total =  Titanium.UI.createLabel({
		text:"Total: " + item.total,
		font:{fontSize:12},
		color:"#5b5b5b",
		width:'auto',
		textAlign:'left',
		top:40,
		left:52,
		height:12
	}); 
	 
	
	
	row.add(imageThumb);
	row.add(mainTitle);
	row.add(numPlatillos);
	row.add(total);
	
	row.hasChild = true; 
	 
	row.className = 'pedidos_row'; 
	return row;
} 

module.exports = AppHistorialWindow;
