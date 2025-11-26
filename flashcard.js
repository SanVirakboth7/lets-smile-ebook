//Audio Controls
	function aud_play_pause(e, id) {  
		var audio = $("#myAudio").get(0);
		//$("#myAudio").attr("src", e)[0];
		$(audio).bind('timeupdate', function() {
  			if(audio.duration < audio.currentTime) {
  				audio.pause();
  			}
		});
		
		if (audio.paused) {
			$("#myAudio").attr("src", e)[0];
			audio.play();
			
		} else {
			audio.pause();  
		}
		//audio.play();
	}
	
	
//flashcard
	function FI_word(id) {  
		$("#"+id).fadeIn();
	}
	function FO_word(id) {  
		$("#"+id).fadeOut();
	}
