


$(document).ready(function() {
	
	$('.icon-pregunta').tooltip();
	$(".back").click(function(){
		window.history.back();
		return false;
	});
	
	
	$(".continuar").click(function(){
			
			if( $("textarea").val() == "" )
			{
				alert("Tienes que contestar la respuesta para contunuar.");
				return false
			}
			else
			{
				$("#form-preguntas").submit();	
			}
			
			
			
		});
	
});

function getFrameID(id){
    var elem = document.getElementById(id);
    if (elem) {
        if(/^iframe$/i.test(elem.tagName)) return id; //Frame, OK
        // else: Look for frame
        var elems = elem.getElementsByTagName("iframe");
        if (!elems.length) return null; //No iframe found, FAILURE
        for (var i=0; i<elems.length; i++) {
           if (/^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com(\/|$)/i.test(elems[i].src)) break;
        }
        elem = elems[i]; //The only, or the best iFrame
        if (elem.id) return elem.id; //Existing ID, return it
        // else: Create a new ID
        do { //Keep postfixing `-frame` until the ID is unique
            id += "-frame";
        } while (document.getElementById(id));
        elem.id = id;
        return id;
    }
    // If no element, return null.
    return null;
}

// Define YT_ready function.
var YT_ready = (function(){
    var onReady_funcs = [], api_isReady = false;
    /* @param func function     Function to execute on ready
     * @param func Boolean      If true, all qeued functions are executed
     * @param b_before Boolean  If true, the func will added to the first
                                 position in the queue*/
    return function(func, b_before){
        if (func === true) {
            api_isReady = true;
            for (var i=0; i<onReady_funcs.length; i++){
                // Removes the first func from the array, and execute func
                onReady_funcs.shift()();
            }
        }
        else if(typeof func == "function") {
            if (api_isReady) func();
            else onReady_funcs[b_before?"unshift":"push"](func); 
        }
    }
})();
// This function will be called when the API is fully loaded
function onYouTubePlayerAPIReady() {YT_ready(true)}

// Load YouTube Frame API
(function(){ //Closure, to not leak to the scope
  var s = document.createElement("script");
  s.src = "http://www.youtube.com/player_api"; /* Load Player API*/
  var before = document.getElementsByTagName("script")[0];
  before.parentNode.insertBefore(s, before);
})();

var player; //Define a player object, to enable later function calls, without
            // having to create a new class instance again.

// Add function to execute when the API is ready
YT_ready(function(){
    var frameID = getFrameID("video");
    if (frameID) { //If the frame exists
        player = new YT.Player(frameID, {
            events: {
                "onStateChange": stopCycle
            }
        });
    }
});

// Example: function stopCycle, bound to onStateChange
function stopCycle(event) {
	
	if(event.data == 0)
	{
		// END EVENT
		// player.playVideo();
		
		$("#input-video").remove();
		$("#cont-resp").append($('<input type="hidden" id="input-video" name="input-video" value="1" />'));
		$("#cont-resp").fadeIn();
		
		
	}
		
}