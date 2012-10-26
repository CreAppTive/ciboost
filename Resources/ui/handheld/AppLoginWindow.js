function AppLoginWindow(startApp) {
	var self = Ti.UI.createWindow({
		title:"",
		backgroundColor:'white',
		backgroundImage:"/iphone/background.jpg",
		barImage:"/iphone/nav-bar.jpg"
	});
	
	var scrollView = Ti.UI.createScrollView({
		  contentWidth: 'auto',
		  contentHeight: 'auto',
		  showVerticalScrollIndicator: true,
		  showHorizontalScrollIndicator: true
	});
	
	var logo = Titanium.UI.createImageView({
		top:30,
		image:"/iphone/main-logo.png"
	});
	scrollView.add(logo); 
	
	var color = "#606060";
	var inputImg = "/iphone/input-bg2.png";
	
	var username = Titanium.UI.createTextField({  
	    color: color,  
	    top:170,    
	    width:"95%",  
	    height:37,  
	    backgroundImage:inputImg,
	    borderRadius :1,
	    paddingLeft:5,
	    hintText:'Nombre de usuario',  
	    font:{fontFamily:'Helvetica Neue'},
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_NEXT,  
	    //borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});  
	scrollView.add(username); 
	 
	var password = Titanium.UI.createTextField({  
	    color: color,  
	    top:220,   
	    width:"95%",  
	    height:37,  
	    backgroundImage:inputImg,  
	    paddingLeft:5,
	    borderRadius :1,
	    hintText:'Contraseña',  
	    passwordMask:true,  
	    font:{fontFamily:'Helvetica Neue'},
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_SEND 
	});  
	scrollView.add(password);  
	
	var loginBtn = Titanium.UI.createButton({  
	    title:'Entrar',  
	    color:"#FFFFFF",
	    top:270,  
	    width:"95%",  
	    height:40,  
	    borderRadius:1,  
	    font:{fontFamily:'Helvetica Neue',fontWeight:'bold',fontSize:18},  
	    backgroundImage:"/iphone/btn-send.png" 
	});  
	scrollView.add(loginBtn); 

	var loginReq = Titanium.Network.createHTTPClient();  
	loginReq.onload = function()  
	{  
	    var json = this.responseText;  
	    var response = JSON.parse(json);  
	    if (response.logged == true)  
	    {  
	        // ACCESO
	    }  
	    else  
	    {  
	        alert(response.message);  
	    }  
	};  

	loginBtn.addEventListener('click',function(e)  
	{  
	    if (username.value != '' && password.value != '')  
	    {  
	        /*loginReq.open("POST","http://localhost:8888/post_auth.php");  
	        var params = {  
	            username: username.value,  
	            password: Ti.Utils.md5HexDigest(password.value)  
	        };  
	        loginReq.send(params);  */
	       self.close();
	       startApp();
	       //wawwalert("send");
	    }  
	    else  
	    {  
	        alert("Usuario y contraseña son requeridos");  
	    }  
	});  

	
	// ORDEN TAB
	username.addEventListener('return', function() {
    	password.focus();
	});
	password.addEventListener('return', function() {
    	loginBtn.fireEvent('click');
	});

	
	
	self.add(scrollView);

	return self;
};

module.exports = AppLoginWindow;
