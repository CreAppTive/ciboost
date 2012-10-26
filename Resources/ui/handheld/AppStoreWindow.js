function AppStoreWindow(store) {
	
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
		    height:320,
		    top:110,
		    showVerticalScrollIndicator:false,
		    showHorizontalScrollIndicator:true
		});
	
		var Things = store.items;
		for(var i=0,j=Things.length; i<j; i++){
		  var item = Things[i];
		  
		  var view = Ti.UI.createView({ left:10 + (i*180) + (12*i), width:180, height:303, top:10 });
		  
		   var btnAdd = Ti.UI.createButton({
			   	backgroundImage: "/iphone/btn-add-item.png",
			   	width:38,
			   	height:51,
			   	top:0,
			   	right:15
		   });
		   
		   var dataView = Ti.UI.createView({
			  backgroundImage:'/iphone/image-demo.png',
			  width:180,
			  height:298,
			  borderRadius:10
			});
			
			var footerview = Ti.UI.createView({
			  width:"100%",
			  height:92,
			   backgroundColor: '#053c52',
       		   opacity: 0.7,
       		   bottom:0
			});
			
			var nombre_platillo = Titanium.UI.createLabel({
				text:item.name,
				font:{fontSize:16,fontWeight:'bold'},
				color:"#36a5cf",
				bottom:70,
				width:"90%",
				left:10
			});
			
			var nombre_tienda = Titanium.UI.createLabel({
				text:store.name,
				font:{fontSize:12,fontWeight:'bold'},
				color:"#fff",
				bottom:55,
				width:"90%",
				left:10
			});
			
			var precio = Titanium.UI.createLabel({
				text:item.cost,
				font:{fontSize:16,fontWeight:'bold'},
				color:"#fc931e",
				bottom:35,
				width:"90%",
				left:10
			});
			
			var descripcion = Titanium.UI.createLabel({
				text:item.description,
				font:{fontSize:12,fontWeight:'bold'},
				color:"#fff",
				bottom:55,
				width:"90%",
				height:10,
				left:10
			});
			
			
			var fav = Titanium.UI.createLabel({
				text:"22",
				font:{fontSize:14},
				color:"#fff",
				bottom:10,
				width:100,
				left:25
			});
			
			var distance = Titanium.UI.createLabel({
				text:"0.5 km",
				font:{fontSize:14},
				color:"#fff",
				bottom:10,
				width:100,
				left:100
			});
			
			
			
			
		  
		  dataView.add(footerview);	
		  dataView.add(nombre_platillo);
		  dataView.add(nombre_tienda);
		  dataView.add(precio);
		  dataView.add(descripcion);
		  
		  dataView.add(fav);
		  dataView.add(distance);
		  
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
	
	
	
	self.add(scrollView);
	self.add(storeInfoView);
	return self;
	
	
	
} 

module.exports = AppStoreWindow;