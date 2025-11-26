//Page Drag
jQuery(function($){
	$('.drag').drag(function( ev, dd ){
		$( this ).css({
			top: dd.offsetY,
			left: dd.offsetX
		});
	},{ not:'map' });
});

//Audio Controls
	function aud_play_pause(e, id) {  
		var audio = $("#myAudio").get(0);
		//$("#myAudio").attr("src", e)[0];
		$(audio).bind('timeupdate', function() {
  			if(audio.duration <= audio.currentTime) {
  				$("#"+id).attr("src", "../images/icon/play.png");
  				audio.pause();
  			}
		});
		
		if (audio.paused) {
			$("#myAudio").attr("src", e)[0];
			$("#"+id).attr("src", "../images/icon/pause.png");
			audio.play();
			
		} else {
			$("#"+id).attr("src", "../images/icon/play.png");
			audio.pause();  
		}
		//audio.play();
	}
	
	
	function aud_play_pause2(e, id) {  
		var audio = $("#myAudio").get(0);
		//$("#myAudio").attr("src", e)[0];
		$(audio).bind('timeupdate', function() {
  			if(audio.duration <= audio.currentTime) {
  				$("#"+id).attr("src", "../images/icon/play_s.png");
  				audio.pause();
  			}
		});
		
		if (audio.paused) {
			$("#myAudio").attr("src", e)[0];
			$("#"+id).attr("src", "../images/icon/pause_s.png");
			audio.play();
			
		} else {
			$("#"+id).attr("src", "../images/icon/play_s.png");
			audio.pause();  
		}
		//audio.play();
	}
	
	function aud_play_pause3(e, id) {  
		var audio = $("#myAudio").get(0);
		//$("#myAudio").attr("src", e)[0];
		$(audio).bind('timeupdate', function() {
  			if(audio.duration <= audio.currentTime) {
  				$("#"+id).attr("src", "../images/icon/play_1.png");
  				audio.pause();
  			}
		});
		
		if (audio.paused) {
			$("#myAudio").attr("src", e)[0];
			$("#"+id).attr("src", "../images/icon/pause_m.png");
			audio.play();
			
		} else {
			$("#"+id).attr("src", "../images/icon/play_1.png");
			audio.pause();  
		}
		//audio.play();
	}
	
	function aud_play_pause4(e, id) {  
		var audio = $("#myAudio").get(0);
		//$("#myAudio").attr("src", e)[0];
		$(audio).bind('timeupdate', function() {
  			if(audio.duration <= audio.currentTime) {
  				$("#"+id).attr("src", "../images/icon/play_2.png");
  				audio.pause();
  			}
		});
		
		if (audio.paused) {
			$("#myAudio").attr("src", e)[0];
			$("#"+id).attr("src", "../images/icon/pause_m.png");
			audio.play();
			
		} else {
			$("#"+id).attr("src", "../images/icon/play_2.png");
			audio.pause();  
		}
		//audio.play();
	}
	
	function aud_play_pause5(e, id) {  
		var audio = $("#myAudio").get(0);
		//$("#myAudio").attr("src", e)[0];
		$(audio).bind('timeupdate', function() {
  			if(audio.duration <= audio.currentTime) {
  				$("#"+id).attr("src", "../images/icon/play_3.png");
  				audio.pause();
  			}
		});
		
		if (audio.paused) {
			$("#myAudio").attr("src", e)[0];
			$("#"+id).attr("src", "../images/icon/pause_m.png");
			audio.play();
			
		} else {
			$("#"+id).attr("src", "../images/icon/play_3.png");
			audio.pause();  
		}
		//audio.play();
	}
	
	function aud_play_pause6(e, id) {  
		var audio = $("#myAudio").get(0);
		//$("#myAudio").attr("src", e)[0];
		$(audio).bind('timeupdate', function() {
  			if(audio.duration <= audio.currentTime) {
  				$("#"+id).attr("src", "../images/icon/play_4.png");
  				audio.pause();
  			}
		});
		
		if (audio.paused) {
			$("#myAudio").attr("src", e)[0];
			$("#"+id).attr("src", "../images/icon/pause_m.png");
			audio.play();
			
		} else {
			$("#"+id).attr("src", "../images/icon/play_4.png");
			audio.pause();  
		}
		//audio.play();
	}
	
	function aud_play_pause7(e, id) {  
		var audio = $("#myAudio").get(0);
		//$("#myAudio").attr("src", e)[0];
		$(audio).bind('timeupdate', function() {
  			if(audio.duration <= audio.currentTime) {
  				$("#"+id).attr("src", "../images/icon/play_5.png");
  				audio.pause();
  			}
		});
		
		if (audio.paused) {
			$("#myAudio").attr("src", e)[0];
			$("#"+id).attr("src", "../images/icon/pause_m.png");
			audio.play();
			
		} else {
			$("#"+id).attr("src", "../images/icon/play_5.png");
			audio.pause();  
		}
		//audio.play();
	}
	
	function aud_play_pause8(e, id) {  
		var audio = $("#myAudio").get(0);
		//$("#myAudio").attr("src", e)[0];
		$(audio).bind('timeupdate', function() {
  			if(audio.duration <= audio.currentTime) {
  				$("#"+id).attr("src", "../images/icon/play_6.png");
  				audio.pause();
  			}
		});
		
		if (audio.paused) {
			$("#myAudio").attr("src", e)[0];
			$("#"+id).attr("src", "../images/icon/pause_m.png");
			audio.play();
			
		} else {
			$("#"+id).attr("src", "../images/icon/play_6.png");
			audio.pause();  
		}
		//audio.play();
	}
	
	

//View Answer Key
	function viewanswer(id) {  
		$("."+id).toggle();
	}
	
// Hide Answer Key
	function hideanswer(id) {  
		$("."+id).hide();
	}
	

	window.addEventListener('message', function(e) {
  		if(e.data == "audio") {
  			var audio = $("audio");
			audio.each(function() {
				$(this).get(0).pause();
			});				
			$("img").each(function() {
				if($(this).attr("alt") == "audio") {
					$(this).attr("src", "../images/icon/play_s.png");	
				}
			});					
  		}
	});