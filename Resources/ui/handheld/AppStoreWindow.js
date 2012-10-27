function AppStoreWindow(store) {
	
	
	var detallePedidoWin = require('/ui/handheld/AppPedidoDetalleWindow');
	
	var self = Ti.UI.createWindow({
		title:store.name,
		backgroundColor:'white',
		backgroundImage:"/iphone/background.jpg",
		barImage:"/iphone/nav-bar.jpg"
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
	
	// PRODUCTOS
		var productsScrollView = Titanium.UI.createScrollView({
		    contentWidth:'auto',
		    contentHeight:'auto',
		    width:"100%", 
		    height:260,
		    top:110,
		    showVerticalScrollIndicator:false,
		    showHorizontalScrollIndicator:true
		});
	
		var Things = store.items;
		var numProductos = 0;
		var totalPedido = 0;
		
		
		var cantidad = 0,total = 0;
		var db = Ti.Database.open('main');
		var resDB = db.execute('SELECT id, id_store, name FROM pedidos WHERE id_store = ' + store.id + " AND status = 0;");	
		if(resDB.isValidRow())
		 {
		 	var idpedido = resDB.fieldByName('id');
			db.execute('SELECT count(id), sum(cost) FROM pedidos_items WHERE id = ' + idpedido + ";");	
			cantidad = resDB.field(0);
			total = resDB.field(1);
		 }
		 
		// Ti.API.log(cantidad);

		for(var i=0,j=Things.length; i<j; i++){
		  var item = Things[i];
		  
		  var view = Ti.UI.createView({ left:10 + (i*180) + (12*i), width:180, height:240, top:10 });
		  
		   var btnAdd = Ti.UI.createButton({
			   	backgroundImage: "/iphone/btn-add-item.png",
			   	width:38,
			   	height:51,
			   	top:0,
			   	right:15
		   });
		   
		   btnAdd.addEventListener("click",function(e){
		   		storeInfoView.show();
		   		storeInfoView.animate({opacity:1, bottom:0, duration:300});
		   		
		   		numProductos += 1;
		   		total_productos.setText("Items: " + numProductos + "    Total: " + totalPedido);
		   		
		   		var resDB = db.execute('SELECT id, id_store, name FROM pedidos WHERE id_store = ' + store.id + " AND status = 0;");	
		   		//Ti.API.log(resDB.isValidRow());
		   		
		   		// PEDIDO
		   		if(!resDB.isValidRow())
		   		{
		   			db.execute('INSERT INTO pedidos (id,id_store,name) VALUES (NULL,?,?)', store.id, store.name);	
					var resDB = db.execute('SELECT id,id_store, name FROM pedidos WHERE id = ' + store.id + ";");
		   		}
		   			var tempid = resDB.fieldByName('id');
		   			
		   		
		   		// PRODUCTOS
		   		db.execute('INSERT INTO pedidos_items (id,id_item,name,cost,image,description,id_pedido) VALUES (NULL,?,?,?,?,?,?)', item.id, item.name,item.cost,item.image,item.description,tempid);	
		   		
		   	
		   	
		   });
		   
		   
	
	
		   var image = item.image;
		   Ti.API.info(image);
		   
		   if(image == "")
		   		image = '/iphone/image-demo.png';
		   		
		   
		   
		   var imageThumb =  Titanium.UI.createImageView({
				url:image,
				width:"200%",
				height:"150%"
				
			});
			
		   
		   var dataView = Ti.UI.createView({
		   	  backgroundColor:"#fff",
			  width:180,
			  height:230,
			  borderRadius:10
			});	
			
			dataView.add(imageThumb);
			
			
			var footerview = Ti.UI.createView({
			  width:"100%",
			  height:62,
			   backgroundColor: '#053c52',
       		   opacity: 0.7,
       		   bottom:0
			});
			
			var nombre_platillo = Titanium.UI.createLabel({
				text:item.name,
				font:{fontSize:16,fontWeight:'bold'},
				color:"#36a5cf",
				bottom:40,
				width:"90%",
				left:10
			});
			
			var nombre_tienda = Titanium.UI.createLabel({
				text:store.name,
				font:{fontSize:12,fontWeight:'bold'},
				color:"#fff",
				bottom:25,
				width:"90%",
				left:10
			});
			
			var precio = Titanium.UI.createLabel({
				text:"$" + item.cost,
				font:{fontSize:16,fontWeight:'bold'},
				color:"#fc931e",
				bottom:5,
				width:"90%",
				left:10
				
			});
			
			var descripcion = Titanium.UI.createLabel({
				text:item.description,
				font:{fontSize:12,fontWeight:'bold'},
				color:"#fff",
				bottom:5,
				width:"90%",
				height:10,
				left:10
			});
			
			
			
			
			
			
			
		  
		  dataView.add(footerview);	
		  dataView.add(nombre_platillo);
		  dataView.add(nombre_tienda);
		  dataView.add(precio);
		  //dataView.add(descripcion);
		  
		  
		  view.add(dataView);		
		  view.add(btnAdd);
		  
		  productsScrollView.add(view);
		  
			
		};
		
		productsScrollView.contentWidth = (180 + 12) * Things.length; 
		
	   
	
	scrollView.add(productsScrollView);



	// CARIITO VIEW
	var storeInfoView = Titanium.UI.createView({
	  
	   width:"100%",
	   height:50,
	   bottom:0,
	   backgroundImage:"/iphone/bg-car.png"
	  // backgroundColor:"#f5f5f5"
	});
		
		var total_productos = Titanium.UI.createLabel({
				text:"Items: " + cantidad + "    Total: " + total ,
				font:{fontSize:16,fontWeight:'bold'},
				color:"#fff",
				top:18,
				width:"80%",
				height:12,
				left:10
			});
			
		var btnCheackout = Ti.UI.createButton({
			   	backgroundImage: "/iphone/bnt-edit-order.png",
			   	width:35,
			   	height:29,
			   	top:10,
			   	right:15
		   });
		   
		   btnCheackout.addEventListener("click",function(){
		   	
		   	Ti.App.currentTabGroup.activeTab.open(new detallePedidoWin(store));
		   		
		   })
		   
		   
	storeInfoView.add(total_productos);
	storeInfoView.add(btnCheackout );		   
	if(cantidad==0){
		storeInfoView.hide();
		storeInfoView.bottom = -
		50;
		
	}
	self.add(scrollView);
	self.add(storeInfoView);
	return self;
	
	
	
} 


module.exports = AppStoreWindow;