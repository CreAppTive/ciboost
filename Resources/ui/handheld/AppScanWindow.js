function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white',
		backgroundImage:"/iphone/background.jpg",
		barImage:"/iphone/nav-bar.jpg",
		barColor:"000",
		backButtonTitleImage :""
	});
	
	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('openWindow'),
		top:20
	});
	self.add(button);
	
	button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		/*self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: 'white'
		}));*/
		
		Titanium.Media.showCamera({
		    success:function(event) {
		        // called when media returned from the camera
		        Ti.API.debug('Our type was: '+event.mediaType);
		        if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
		            var imageView = Ti.UI.createImageView({
		                width:win.width,
		                height:win.height,
		                image:event.media
		            });
		            win.add(imageView);
		        } else {
		            alert("got the wrong type back ="+event.mediaType);
		        }
		    },
		    cancel:function() {
		        // called when user cancels taking a picture
		    },
		    error:function(error) {
		        // called when there's an error
		        var a = Titanium.UI.createAlertDialog({title:'Camera'});
		        if (error.code == Titanium.Media.NO_CAMERA) {
		            a.setMessage('Please run this test on device');
		        } else {
		            a.setMessage('Unexpected error: ' + error.code);
		        }
		        a.show();
		    },
		    saveToPhotoGallery:true,
		    allowEditing:true,
		    mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
		});

	});
	
	return self;
};

module.exports = ApplicationWindow;
