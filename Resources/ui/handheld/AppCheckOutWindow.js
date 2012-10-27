function AppCheckOutWindow(store) {
	var self = Ti.UI.createWindow({
		title:"Checkout",
		backgroundColor:'white',
		backgroundImage:"/iphone/background.jpg",
		barColor:"#000",
		barImage:"/iphone/nav-bar.jpg"
	});
	
	var scrollView = Ti.UI.createScrollView({
		  contentWidth: 'auto',
		  contentHeight: 400,
		  showVerticalScrollIndicator: true,
		  showHorizontalScrollIndicator: false
	});
	
	var color = "#606060";
	var inputImg = "/iphone/input-bg2.png";
	
	var lblDomicilio = Titanium.UI.createLabel({
		text:"Domicilio",
		font:{fontSize:20,fontWeight:'bold'},
		color:"#ec5a25",
		width:'95%',
		top:5
	});
	
	var lblUsuario = Titanium.UI.createLabel({
		text:"Para",
		font:{fontSize:20,fontWeight:'bold'},
		color:"#ec5a25",
		width:'95%',
		textAlign:'left',
		top:190,
	});
	
	
	var lblKey = Titanium.UI.createLabel({
		text:"Key",
		font:{fontSize:20,fontWeight:'bold'},
		color:"#ec5a25",
		width:'95%',
		textAlign:'left',
		top:260
	});
	
	scrollView.add(lblDomicilio); 
	scrollView.add(lblUsuario);
	scrollView.add(lblKey);  
	

	
	var inputDomicilio = Titanium.UI.createTextArea({  
	    color: color,  
	    top:30,    
	    value:"Barcelona - C/ Roc Boronat,117 5ª planta - Edifici Media-TIC Tel.: 93 553 45 40,",
	    width:"95%",  
	    height:150,
	    borderRadius:10,
	    paddingLeft:5,
	    hintText:'Domicilio',  
	    font:{fontFamily:'Helvetica Neue'},
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT
	});  
	scrollView.add(inputDomicilio); 
	
	
	var nombre = Titanium.UI.createTextField({  
	    color: color, 
	    value:"Creapptive", 
	    top:220,   
	    width:"95%",  
	    height:37,  
	    backgroundImage:inputImg,  
	    paddingLeft:5,
	    borderRadius :1,
	    hintText:'Usuario',
	    font:{fontFamily:'Helvetica Neue'},
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_SEND,
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED   
	});  
	scrollView.add(nombre); 
	
	 
	var password = Titanium.UI.createTextField({  
	    color: color,  
	    top:290,   
	    width:"95%",  
	    height:37,  
	    backgroundImage:inputImg,  
	    paddingLeft:5,
	    borderRadius :1,
	    hintText:'Contraseña',  
	    passwordMask:true,  
	    font:{fontFamily:'Helvetica Neue'},
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_SEND,
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED   
	});  
	scrollView.add(password);  
	
	var btnPayment = Titanium.UI.createButton({  
	    title:'Ordenar',  
	    color:"#FFFFFF",
	    top:340,  
	    width:"95%",  
	    height:40,  
	    borderRadius:1,  
	    font:{fontFamily:'Helvetica Neue',fontWeight:'bold',fontSize:18},  
	    backgroundImage:"/iphone/btn-send.png" 
	});  
	btnPayment.addEventListener('click', function() {
		
		
		  var dialog = Ti.UI.createAlertDialog({
		    cancel: 1,
		    buttonNames: ['Aceptar', 'Cancelar'],
		    message: 'Se hara el pedido de $ 000.00 al [Restaurante]',
		    title: 'Confirmaciòn de pedido'
		  });
		  dialog.addEventListener('click', function(e){
		    if (e.index === e.source.cancel){
		      // CANCEL
		    }
		    else
		    {
		    	
		    	
		    }
		    self.close();
		    
		    //Ti.API.info('e.cancel: ' + e.cancel);
		    //Ti.API.info('e.source.cancel: ' + e.source.cancel);
		    //Ti.API.info('e.index: ' + e.index);
		  });
		  dialog.show();
		
		
	});
	scrollView.add(btnPayment); 

	
	// ORDEN TAB
	inputDomicilio.addEventListener('return', function() {
    	password.focus();
	});
	
	
	nombre.addEventListener('return', function() {
    	password.fireEvent('click');
	});
	
	password.addEventListener('return', function() {
    	loginBtn.fireEvent('click');
	});

	
	self.add(scrollView);

	return self;
};

module.exports = AppCheckOutWindow;
