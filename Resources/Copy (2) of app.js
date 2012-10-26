var win = Titanium.UI.createWindow({
	backgroundColor:'yellow'
});

var w = Titanium.Platform.displayCaps.platformWidth;
var bottomTabHeight = w/3;
var HeaderLabel = Titanium.UI.createLabel({
	top:0,
	height:20,
	width:w,
	text:'TabGroup',
	textAlign:'center',
	font:{font:19}
});
win.add(HeaderLabel);
var view3 = Titanium.UI.createView({
	top:20,
	width:w,
	left:320,
	height:410,
	backgroundColor:'#717D7D'
});
var msgLabel1 = Titanium.UI.createLabel({text:'This is Tab 3',textAlign:'center',});
view3.add(msgLabel1);
win.add(view3);
var view2 = Titanium.UI.createView({
	top:20,
	width:w,
	left:320,
	height:410,
	backgroundColor:'#000000'
});
var msgLabel2 = Titanium.UI.createLabel({text:'This is Tab 2',textAlign:'center',color:'white'});
view2.add(msgLabel2);
win.add(view2);

var view1 = Titanium.UI.createView({
	top:20,
	width:w,
	height:410,
	backgroundColor:'#57FEFF'
});

var msgLabel1 = Titanium.UI.createLabel({text:'This is Tab 1',textAlign:'center'});
view1.add(msgLabel1);
win.add(view1);

var bottomView = Titanium.UI.createView({
	bottom:0,
	width:320,
	height:55,
	backgroundColor:'#306754'
});

var bottomTab1 = Titanium.UI.createLabel({
	bottom:5,
	height:40,
	width:(bottomTabHeight-20),
	text:'Tab1',
	textAlign:'center',
	left:10
});



var bottomTab2 = Titanium.UI.createLabel({
	bottom:5,
	height:40,
	width:(bottomTabHeight-20),
	left:bottomTabHeight+10,
	text:'Tab2',
	textAlign:'center'
});



var bottomTab3 = Titanium.UI.createLabel({
	bottom:5,
	height:40,
	width:bottomTabHeight,
	width:(bottomTabHeight-20),
	left:((bottomTabHeight*2)+10),
	text:'Tab3',
	textAlign:'center'
});


bottomView.add(bottomTab1);
bottomView.add(bottomTab2);
bottomView.add(bottomTab3);



var Tab = Titanium.UI.createView({
	bottom:0,
	height:45,
	width:(bottomTabHeight-20),
	left:10,
	backgroundColor:'red'
});
var label = Titanium.UI.createLabel({
	textAlign:'center',
	text:'Tab1',
	color:'white',
	font:{fontWeight:'bold'}
});
Tab.add(label);
bottomView.add(Tab);
win.add(bottomView);
//-------------------------------------Animate Tab----------------

var a = Titanium.UI.createAnimation();
a.duration = 500;
a.bottom = 0;
//--------------------------------------------------------------------



//--------------------------------------AnimateTabView----------------

var a1 = Titanium.UI.createAnimation();
a1.duration = 500;
var a2 = Titanium.UI.createAnimation();
a2.duration = 500;
a2.left = 0;
var a3 = Titanium.UI.createAnimation();
a3.duration = 500;
//---------------------------------------------------------------------



bottomTab1.addEventListener('click',function(){
a.left = 10;
a1.left = 0;
view3.left = 320;
view2.left = 320;
view1.animate(a1);
Tab.animate(a);
setTimeout(function(){label.text = 'Tab1';},500);	
});

bottomTab2.addEventListener('click',function(){
a.left = bottomTabHeight+10;
a1.left = 0;
view1.left = 320;
view3.left =320;
view2.animate(a2);


Tab.animate(a);

setTimeout(function(){label.text = 'Tab2';},500);
});

bottomTab3.addEventListener('click',function(){
a.left = ((bottomTabHeight*2)+10);
a1.left = 0;
view1.left = 320;
view2.left = 320;
Tab.animate(a);
view3.animate(a1);	
setTimeout(function(){label.text = 'Tab3';},500);
});





win.open();
