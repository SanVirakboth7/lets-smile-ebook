        var boxopened = "";
        var imgopened = "";
        var prev_type = "";
        var current_type = "";
        var count = 0;
        var found =  0;

        function randomFromTo(from, to){
            return Math.floor(Math.random() * (to - from + 1) + from);
        }

        function shuffle() {
            var children = $("#boxcard").children();
            var child = $("#boxcard div:first-child");

            var array_img = new Array();
            var array_id = new Array();
            var array_type = new Array();

            for (i=0; i<children.length; i++) {
                array_img[i] = $("#"+child.attr("id")+" img").attr("src");
                array_id[i] = $("#"+child.attr("id")+" img").attr("data-id");
                array_type[i] = $("#"+child.attr("id")+" img").attr("data-type");
                child = child.next();
            }

            var child = $("#boxcard div:first-child");

            for (z=0; z<children.length; z++) {
                randIndex = randomFromTo(0, array_img.length - 1);

                // set new image
                $("#"+child.attr("id")+" img").attr("src", array_img[randIndex]);
                $("#"+child.attr("id")+" img").attr("data-id", array_id[randIndex]);
                $("#"+child.attr("id")+" img").attr("data-type", array_type[randIndex]);
                
                array_img.splice(randIndex, 1);
                array_id.splice(randIndex, 1);
                array_type.splice(randIndex, 1);

                child = child.next();
            }
        }

        function resetGame() {
            shuffle();
            $("img").hide();
            $("img").removeClass("opacity");
            count = 0;
            $("#msg").remove();
            $("#count").html("" + count);
            boxopened = "";
            imgopened = "";
            found = 0;
            return false;
        }
        
        function playAudio(id) {  
			var audio = $("#myAudio").get(0);
			var files = "../audio/flashcard/"+id+".mp3"; // 오디오 전체경로
				$("#myAudio").attr("src", files)[0];
				audio.play();
		}
		
        function playDdang() {  
			var audio2 = $("#ddang").get(0);
			var files = "../game/sound/ddang.mp3"; // 오디오 전체경로
				$("#ddang").attr("src", files)[0];
				audio2.play();
		}

        function playEnding() {  
			var audio3 = $("#ending").get(0);
			var files = "../game/sound/ending.mp3"; // 오디오 전체경로
				$("#ending").attr("src", files)[0];
				audio3.play();
		}
		
		function randomCard() {					
			card_data.sort(function(){return Math.random()-Math.random();});
			
			var word_data = card_data;			
			word_data.sort(function(){return Math.random()-Math.random();});
				
			var chk = 0;
			for(var i=0;i<card_data.length;i++) {
				chk++;
				var card = card_data[i];
				var ii = i + 1;
				var tmp = "";
			
				tmp += "<div id=\"card" + ii + "\"  ><img src=\"../images/game/" + card + ".png\" data-type=\"I\" data-id=\"F_" + card + "\" /></div>";
				
				$("#boxcard").append(tmp);
			}
			
			if(chk < 6) {
				for( var i=0;i <= 6-(chk+1); i++ ) {
					var card = word_data[i];
					var ii = (chk+i) + 1;
					var tmp = "";
					
					tmp += "<div id=\"card" + ii + "\"  ><img src=\"../images/game/" + card + ".png\" data-type=\"I\" data-id=\"F_" + card + "\" /></div>";
								
					$("#boxcard").append(tmp);
				}			
			}
			
			for(var i=0;i<card_data.length;i++) {
				var card = card_data[i];
				var ii = i + 1;
				var tmp = "";
			
				tmp += "<div id=\"card1" + ii + "\" ><img src=\"../images/game/" + card + "_word.png\" data-type=\"W\" data-id=\"F_" + card + "\" /></div>";
				
				$("#boxcard").append(tmp);
			}
			
			if(chk < 6) {
				for( var i=0;i <= 6-(chk+1); i++ ) {
					var card = word_data[i];
					var ii = (chk+i) + 1;
					var tmp = "";
					
					tmp += "<div id=\"card1" + ii + "\" ><img src=\"../images/game/" + card + "_word.png\" data-type=\"W\" data-id=\"F_" + card + "\" /></div>";
					
					$("#boxcard").append(tmp);
				}
			}
			//alert($("#boxcard").html().replace(/<\/div>/g,"</div>\n"));
		}	

        $(document).ready(function() {
            
            randomCard();
            
            $("img").hide();
            $("#boxcard div").click(openCard);
            
            shuffle();

            function openCard() {

                id = $(this).attr("id");

                if ($("#"+id+" img").is(":hidden")) {
                    $("#boxcard div").unbind("click", openCard);

                    $("#"+id+" img").fadeIn('fast');

                    if (imgopened == "") {
                        boxopened = id;
                        //imgopened = $("#"+id+" img").attr("src");
                        imgopened = $("#"+id+" img").attr("data-id");
                        prev_type = $("#"+id+" img").attr("data-type");
              
                        setTimeout(function() {
                            $("#boxcard div").bind("click", openCard)
                        }, 300);
                    } else {
                        //currentopened = $("#"+id+" img").attr("src");
                        currentopened = $("#"+id+" img").attr("data-id");
                        current_type = $("#"+id+" img").attr("data-type");
              
                        if (imgopened == currentopened && prev_type != current_type ) {
                            // found
                            $("#"+id+" img").addClass("opacity");
                            $("#"+boxopened+" img").addClass("opacity");
                            found++;
                            boxopened = "";
                            imgopened = "";
                            // 같을시 사운드 재생
                            playAudio(currentopened);							
                        } else {
                            // close again
							
                            setTimeout(function() {
                                $("#"+id+" img").fadeOut('fast');
                                $("#"+boxopened+" img").fadeOut('fast');
                                boxopened = "";
                                imgopened = "";
                                prev_type = "";
                                current_type = "";
								playDdang();
                            }, 400);
                        }
                        
                        setTimeout(function() {
                            $("#boxcard div").bind("click", openCard)
                        }, 400);
                    }


                    count++;
                    $("#count").html("" + count);

                    if (found == 6) {
                        msg = '<span id="msg">Congratulations! You found all cards with </span>';
                        $("span.link").prepend(msg);
						playEnding();
                    }
                }
            }
        });
