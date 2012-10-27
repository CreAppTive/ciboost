function AppOrderWindow(orden) {
	var self = Ti.UI.createWindow({
		title:orden.name,
		backgroundColor:'white',
		backgroundImage:"/iphone/background.jpg",
		barImage:"/iphone/nav-bar.jpg",
		barColor:"000",
		backButtonTitleImage :"/iphone/btn-back.png"
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
	 	tbl_data[i] = makeRow({ name:"Nombre Restaurante",cantidad:"10", precio:"$00.00", total:"$00.00", image:"" });
	  }
	
	table.setData(tbl_data);
	  			
	  			
	self.add(table);
		
	return self;
};

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

module.exports = AppOrderWindow;
