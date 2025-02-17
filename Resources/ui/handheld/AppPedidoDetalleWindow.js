function AppPedidoDetalleWindow(store) {
	
	Ti.API.log(store);
	var CheckOutWin = require('/ui/handheld/AppCheckOutWindow');
	
	var self = Ti.UI.createWindow({
		title:"Pedido",
		backgroundColor:'white',
		backgroundImage:"/iphone/background.jpg",
		barColor:"000",
		barImage:"/iphone/nav-bar.jpg"
	});
	
	var btnCheckout = Titanium.UI.createButton({
			backgroundImage:"/iphone/btn-cheackout.png",
			width:35,
			height:29
		});
		self.rightNavButton = btnCheckout;
		 
		btnCheckout.addEventListener('click', function(e){
			Ti.App.currentTabGroup.activeTab.open(new CheckOutWin(store));
			
		});
		
	var scrollView = Titanium.UI.createScrollView({
	    contentWidth:'auto',
	    contentHeight:'auto',
	    top:0,
	    showVerticalScrollIndicator:true,
	    showHorizontalScrollIndicator:false
	});

	var storeInfoView = Titanium.UI.createView({
	  
	   width:"95%",
	   height:100,
	   top:6,
	   //borderRadius:10,
	   backgroundImage:"/iphone/top-bg.png",
	   backgroundLeftCap:5,
	   backgroundTopCap:5
	  // backgroundColor:"#f5f5f5"
	});
	
	var imageThumb =  Titanium.UI.createImageView({
		url:store.image,
		width:60,
		height:60,
		left:5,
		top:10,
		backgroundColor:"#fff",
		borderWidth:2,
		borderColor:"#fff",
		//borderColor:"#f0f",
		imageAsCropped:true
	});
	 
	var mainTitle = Titanium.UI.createLabel({
		text:store.name,
		font:{fontSize:16,fontWeight:'bold'},
		width:'auto',
		textAlign:'left',
		top:10,
		left:80,
		height:16,
		color:"#1a4f64"
	});
	
	var description = Titanium.UI.createLabel({
		text:store.description,
		width:'auto',
		font:{fontSize:12},
		textAlign:'left',
		top:30,
		left:80,
		color:"#5b5b5b"
	});
	
	
	
	storeInfoView.add(imageThumb);
	storeInfoView.add(mainTitle);
	storeInfoView.add(description);
	
	scrollView.add(storeInfoView);
	
	var imageZigZag = Titanium.UI.createView({
	  
	   width:"95%",
	   height:11,
	   top:100,
	   backgroundImage:"/iphone/zigzag.png",
	   backgroundRepeat: true, 
	   zIndex:2
	   
	});
	scrollView.add(imageZigZag);
	
	var contTable = Ti.UI.createView({
			top:120,
			width:"95%",
			height:240,
			backgroundColor:"#f6f6f6",
			borderColor :"#f1f2f2",
			borderRadius:10
		});


	var table = Titanium.UI.createTableView({
		top:0,
		backgroundColor:"#f6f6f6",
		rowHeight:60
	});

	
	var response = [1,1,1];
    var tbl_data = [];
    
    // DETALLE DEL PEDIDO 
    var cantidad = 0,total = 0;
	var db = Ti.Database.open('main');
	var resDB = db.execute('SELECT id, id_store, name FROM pedidos WHERE id_store = ' + store.id + " AND status = 0;");	
	var i = 0;
	if(resDB.isValidRow())
	 {
	 	var idpedido = resDB.fieldByName('id');
		var resultSet = db.execute('SELECT id,id_item,name,cost,image,description,id_pedido FROM pedidos_items WHERE id = ' + idpedido + ";");	
		
		while (resultSet.isValidRow()) {
	       var id = resultSet.fieldByName('id');
	       var name = resultSet.fieldByName('name');
	       var cost = resultSet.fieldByName('cost');
	       var image = resultSet.fieldByName('image');
	       var description = resultSet.fieldByName('description');
	       var id_pedido = resultSet.fieldByName('id_pedido');
	       
	       
	       Ti.API.log(id);
	       tbl_data[i] = makeRow({ name:name,cantidad:"10", precio:cost, total:"$10.00", image:image });
	       i++;
	       
	       resultSet.next();
	    }
    
	 }
    
    tbl_data[i] = makeRow({ name:"Chilli Wings",cantidad:"10", precio:"10.00", total:"$10.00", image:"https://www.sugarsync.com/piv/D8509046_66077986_013754" });
    
    //var item = response[i]; 
	//tbl_data[i] = makeRow({ name:"Nombre Restaurante",cantidad:"10", precio:"$00.00", total:"$00.00", image:"" });
	 	
	
	table.setData(tbl_data);
	  			
	contTable.add(table)  			
	self.add(contTable);

	
	
	
	self.add(scrollView);
	return self;
	
	
	
} 

function makeRow(item)
{
	var row = Titanium.UI.createTableViewRow({
		backgroundColor:"#f6f6f6",
		borderColor:"#c2c2c2",
		editable:true
		//height:60
	});
	
	row.addEventListener("delete",function(e){
		/*	index = 0;
		    row = "[object TiUITableViewRow]";
		    rowData = "[object TiUITableViewRow]";
		    searchMode = 0;
		    section = "[object TiUITableViewSection]";
		    source = "[object TiUITableViewRow]";
    	*/
    
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
		backgroundColor:"#FFF",
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
	 
	var subTitle =  Titanium.UI.createLabel({
		text:item.precio,
		font:{fontSize:12},
		color:"#5b5b5b",
		width:'auto',
		textAlign:'left',
		top:27,
		left:52,
		height:12
	});
	 
	 
	var button = Ti.UI.createButton({
		height:17,
		width:17,
		backgroundImage:"/iphone/btn-add-item-mini.png",
		top:20,
		right:30
		
	});
	
	
	button.addEventListener('click', function() {
		Ti.API.info("add more items");
	}); 
	
	
	row.add(imageThumb);
	row.add(mainTitle);
	row.add(subTitle);
	row.add(button);
	row.hasChild = false; 
	 
	row.className = 'pedidos_row'; 
	return row;
} 

module.exports = AppPedidoDetalleWindow;