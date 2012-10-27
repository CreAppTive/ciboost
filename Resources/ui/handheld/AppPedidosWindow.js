function AppPedidosWindow() {
	
	var DetallePedido = require('/ui/handheld/AppPedidoDetalleWindow');
	var AppQRWindow = require('/ui/handheld/AppQRWindow');
	
	
	var self = Ti.UI.createWindow({
		title:"Pedidos",
		backgroundColor:'white',
		backgroundImage:"/iphone/background.jpg",
		barImage:"/iphone/nav-bar.jpg",
		barColor:"000",
		backButtonTitleImage :""
	});
	

	var table = Titanium.UI.createTableView({
		top:0,
		backgroundColor:"#f6f6f6",
		rowHeight:60
	});


	table.addEventListener('click', function(e){
  		self.containingTab.open(new AppQRWindow());
	});
		
    // DETALLE DEL PEDIDO 
    var cantidad = 0,total = 0;
	var db = Ti.Database.open('main');
	var resDB = db.execute("SELECT id, id_store, name FROM pedidos WHERE status = 0;");	
	
	
	if(resDB.isValidRow())
	 {
	 	var idpedido = resDB.fieldByName('id');
		var resultSet = db.execute('SELECT id,id_item,name,cost,image,description,id_pedido FROM pedidos_items WHERE id = ' + idpedido + ";");	
		var tbl_data = [];
		while (resultSet.isValidRow()) {
	       var id = resultSet.fieldByName('id');
	       var name = resultSet.fieldByName('name');
	       var cost = resultSet.fieldByName('cost');
	       var image = resultSet.fieldByName('image');
	       var description = resultSet.fieldByName('description');
	       var id_pedido = resultSet.fieldByName('id_pedido');
	       
	       
	       Ti.API.log(id);
	       tbl_data[i] = makeRow({ name:name,cantidad:"10", precio:cost, total:"$00.00", image:image });
	       
	       resultSet.next();
	    }
    
    	table.setData(tbl_data);
	 }
    
    
	
	
	  			 			
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
		backgroundColor:"#fff",
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

module.exports = AppPedidosWindow;
