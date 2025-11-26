		var isdrawing = false;
		var iseraser = false;
		var ishighlight = false;
		var mode = 1;
		var canvas;
		var canvastmp;
				
		var ctx;
		var ctxtmp;		
		
		var ox,oY;
		var tX, tY;
		
		var color;
		var lineWeight;
		
		var g_isdrawing = false;
		var g_iscolor = false;
		
		var seperator = "";
		
		function NumberCheck(frm) {
			val = frm.value;
			new_val = '';
			for(i=0;i<val.length;i++) {
				char = val.substring(i,i+1);
				if (char < '0' || char > '9') {
					alert('숫자만 입력할 수 있습니다');
					frm.value = new_val;
					return;
				} else {
					new_val = new_val + char;
				}
			}
		}
		
		function getUrl(page) {
			var db = DB.PAGES;
			var url = "";
			for(var i = 0; i < db.length; i++) {
				if(db[i].PAGE == page) {
					url = db[i].URL;
					break;
				}
			}
			return url;
		}
		
		function getGroup(page) {
			var db = DB.PAGES;
			var obj = new Object();
			obj.group = -1;
			obj.page = -1;
			
			for(var i = 0; i < db.length; i++) {
				if(db[i].PAGE == page) {
					obj.group = parseInt(db[i].GROUP, 10);
					obj.page = parseInt(db[i].PAGE, 10);
					break;
				}
			}
			return obj;
		}
		
		function getMoveGroup(group) {
			var db = DB.PAGES;
			var obj = new Object();
			obj.group = -1;
			obj.page = -1;
			obj.url = "";
			
			for(var i = 0; i < db.length; i++) {
				if(db[i].GROUP == group) {
					obj.group = parseInt(db[i].GROUP, 10);
					obj.page = parseInt(db[i].PAGE, 10);
					obj.url = db[i].URL;
					break;
				}
			}
			return obj;
		}
				
		// color select
		function setTextColor(picker) {
			color = "#"+picker;
		}
		
		// frm setting
		function setting() {
			var url = location.href;
			var arr = url.split("/");
			var filename = arr[arr.length-1];
						
			if(filename == "ebook.html") {
				seperator = "";
			} else {
				seperator = "../";
			}
			
			
			var frm = "";
			frm += "<div style='background:url(" + seperator+ "images/new_icon/control_bg.png) no-repeat; height:53px;margin:15px 0 0 0;padding: 10px 6px 0 6px;position:relative;'>";
			frm += "	<div style='display:inline-block;float:left;width:45%;text-align:left;'>";
			frm += "    	<div style='width:52px;height:47px;display:inline-block;'><img src='" + seperator+ "images/new_icon/pen_off.png' id='img_pen' /></div>";
			frm += "    	<div style='width:52px;height:47px;display:inline-block;'><img src='" + seperator+ "images/new_icon/h_pen_off.png' id='img_h_pen' /></div>";
			frm += "    	<div style='width:52px;height:47px;display:inline-block;' style='position:relative;'>";
			frm += "    		<img src='" + seperator+ "images/new_icon/line_1.png' id='img_line' />";
			frm += "    		<div id='line_sel_box' style='width:52px;position:absolute;z-index:10000000;border:1px solid #000000;border-top:none;background:#ffffff;display:none;top:58px;'>";
			frm += "	    		<img src='" + seperator+ "images/new_icon/line_1.png' 	data-line='1' class='line_sel' />";
			frm += "	    		<img src='" + seperator+ "images/new_icon/line_4.png' 	data-line='4' class='line_sel' />";
			frm += "	    		<img src='" + seperator+ "images/new_icon/line_8.png' 	data-line='8' class='line_sel' />";
			frm += "	    		<img src='" + seperator+ "images/new_icon/line_16.png' 	data-line='16' class='line_sel' />";
			frm += "	    		<img src='" + seperator+ "images/new_icon/line_24.png' 	data-line='24' class='line_sel' />";
			frm += "    		</div>";
			frm += "    	</div>";
			frm += "    	<div style='width:52px;height:47px;display:inline-block;background:#000000;' id='div_color' style='position:relative;'>";
			frm += "    		<div id='color_no' style='top:0px;left0px;width:52px;height:47px;position:absolute;'></div>";
			frm += "    		<input type='image' src='" + seperator+ "images/new_icon/color.png' id='img_color' class=\"jscolor {valueElement:'chosen-value', onFineChange:'setTextColor(this)'}\" style='width:52px;height:47px;background:rgb(0,0,0);'>";
			frm += "    	</div>";
			frm += "    	<div style='width:52px;height:47px;display:inline-block;'><img src='" + seperator+ "images/new_icon/eraser_off.png' id='img_eraser' /></div>";
			frm += "    	<div style='width:52px;height:47px;display:inline-block;'><img src='" + seperator+ "images/new_icon/eraser_all.png' id='img_eraser_all' />	</div>";
			frm += "    </div>";
			frm += "    <div style='display:inline-block;float:right;width:45%;text-align:right;'>";
			frm += "		<table border='0' cellpadding='0' cellspacing='0' align='right'>";
			frm += "			<tr>";
			frm += "				<td style='width:52px;height:47px;'><img src='" + seperator+ "images/new_icon/prev.png' id='btn_prev' /></td>";
			frm += "				<td style='width:52px;height:47px;'><input type='text' name='page' id='page' value='1' style='width:52px;height:47px;border: solid 1px #000000;text-align:center;font-size:14pt;font-family: gothic;' onkeyup='NumberCheck(this);' maxlength='4'></td>";
			frm += "				<td style='width:52px;height:47px;font-size:14pt;text-align:center;' id='total_page'> / 123</td>";
			frm += "				<td style='width:52px;height:47px;'><img src='" + seperator+ "images/new_icon/next.png' id='btn_next' /></td>";
			frm += "				<td style='width:52px;height:47px;'><img src='" + seperator+ "images/new_icon/list.png' id='btn_list' /></td>";
			frm += "			</tr>";
			frm += "		</table>";
			frm += "    </div>";
			frm += "    <div id='canvas_box' style='width:1014px;height:672px;position:absolute;top:65px;left:6px;z-index:1000;border:1px solid #000000;display:none;'>";
			frm += "		<canvas id='canvastmp' width='1014' height='672' style='position:absolute; background-color: rgba(255,255,255,0); display:none;'>이 브라우저에서는 HTML5 CANVAS를 지원하지 않습니다.</canvas>";
			frm += "		<canvas id='canvas' width='1014' height='672' style='position:absolute; background-color: rgba(255,255,255,0);'>이 브라우저에서는 HTML5 CANVAS를 지원하지 않습니다.</canvas>";
			frm += "	</div>";
			frm += "</div>";
			
			$("#wrap").prepend(frm);
			$("#imgZone").css("margin-top","0px");
			
			var cnt = DB.PAGES.length;
			$("#total_page").html(" / " + cnt);
			
			if(filename == "ebook.html") {
				$("#page").val(1);
			} else {
				$("#page").val($.url("?page"));
			}
		}
		
		$(document).ready(function() {
			
			// frm setting
			setting();
			
			canvas = document.getElementById("canvas");		
			canvastmp = document.getElementById("canvastmp");		
				
			ctx = $('#canvas')[0].getContext('2d');
			ctxtmp = $('#canvastmp')[0].getContext('2d');
			
			// 팬 on/off
			$("#img_pen").click(function() {
				var img = $(this).attr("src");
				if(img == seperator + "images/new_icon/pen_off.png") {
					$(this).attr("src",seperator + "images/new_icon/pen_on.png");
					g_isdrawing = true;
					$("#canvas_box").slideDown();
					$("#color_no").hide();
					ctx.clearRect(0,0, $("#canvas").width(), $("#canvas").height() );
				} else {
					$(this).attr("src",seperator + "images/new_icon/pen_off.png");
					g_isdrawing = false;
					$("#canvas_box").slideUp();
					$("#color_no").show();
					
					$("#img_h_pen").attr("src",seperator + "images/new_icon/h_pen_off.png");
					ishighlight = false;
					$("#canvastmp").hide();
					
					$("#line_sel_box").slideUp();
					
					iseraser = false;
					$("#img_eraser").attr("src",seperator + "images/new_icon/eraser_off.png");
				}
			}).css("cursor","pointer");
			
			// 하이라이트팬 on/off
			$("#img_h_pen").click(function() {
				if(g_isdrawing == false) {
					alert("Select a writing icon first.");	
				} else {
					var img = $(this).attr("src");
					if(img == seperator + "images/new_icon/h_pen_off.png") {
						$(this).attr("src",seperator + "images/new_icon/h_pen_on.png");
						ishighlight = true;
						$("#canvastmp").show();
						
						iseraser = false;
						$("#img_eraser").attr("src",seperator + "images/new_icon/eraser_off.png");
					} else {
						$(this).attr("src",seperator + "images/new_icon/h_pen_off.png");
						ishighlight = false;
						$("#canvastmp").hide();
					}
				}
			}).css("cursor","pointer");
			
			// 라인선택
			$("#img_line").click(function() {
				if(g_isdrawing == false) {
					alert("Select a writing icon first.");	
				} else {
					var $line = $("#line_sel_box");
					if($line.css("display") == "block") {
						$line.slideUp();
					} else {
						$line.slideDown();
					}
				}
			}).css("cursor","pointer");
			
			$(".line_sel").each(function() {
				$(this).click(function() {
					lineWeight = $(this).attr("data-line");
					$("#img_line").attr("src",seperator + "images/new_icon/line_" + lineWeight + ".png");
					$("#line_sel_box").slideUp();
				});	
			}).css("cursor","pointer");
			
			// 컬러선택
			$("#img_color").css("cursor","pointer");
			window.setTimeout(function() {
				$("#img_color").css("background","#000000");
				color = "#000000";
			}, 1000);
			$("#color_no").click(function() {
				if(g_isdrawing == false) {
					alert("Select a writing icon first.");	
				}
			}).css("cursor","pointer");
			
			// 일부 삭제
			$("#img_eraser").click(function() {
				if(g_isdrawing == false) {
					alert("Select a writing icon first.");	
				} else {
					$("#canvastmp").hide();
					if(iseraser == true) {
						iseraser = false;
						$(this).attr("src",seperator + "images/new_icon/eraser_off.png");
					} else {
						iseraser = true;
						$(this).attr("src",seperator + "images/new_icon/eraser_on.png");
						
						$("#img_h_pen").attr("src",seperator + "images/new_icon/h_pen_off.png");
						ishighlight = false;
						$("#canvastmp").hide();
					}
				}
			}).css("cursor","pointer");
			
			// 전체 삭제
			$("#img_eraser_all").click(function() {
				if(g_isdrawing == false) {
					alert("Select a writing icon first.");	
				} else {
					$("#canvastmp").hide();
					ctx.clearRect(0,0, $("#canvas").width(), $("#canvas").height() );
				}
			}).css("cursor","pointer");
			
			// 이전
			$("#btn_prev").click(function(event) {
				var page = parseInt($("#page").val(),10);
				
				var obj = getGroup(page);
				var p_group = obj.group - 1;
				
				if(p_group < 0) {
					alert("This is the first page.");
					$("#page").val(page);
					return;
				}
				
				var p_obj = getMoveGroup(p_group);				
				var movepage = p_obj.page;
				var url = p_obj.url;
				if(url == "") {
					alert("존재하지 않는 페이지 번호입니다.");
				} else {
					if(movepage == 1) {
						location.href = "../ebook.html";
					} else {
						location.href = seperator + "page/" + url + "?page=" + movepage;
					}
				}
			}).css("cursor","pointer");
			
			// 다음
			$("#btn_next").click(function(event) {
				var page = parseInt($("#page").val(),10);
				
				var obj = getGroup(page);
				var n_group = obj.group + 1;
				
				if(n_group > DB.PAGES[DB.PAGES.length-1].GROUP) {
					alert("This is the last page.");
					$("#page").val(page);
					return;
				}				
				
				var n_obj = getMoveGroup(n_group);				
				var movepage = n_obj.page;
				var url = n_obj.url;
				if(url == "") {
					alert("존재하지 않는 페이지 번호입니다.");
				} else {
					location.href = seperator + "page/" + url + "?page=" + movepage;
				}
			}).css("cursor","pointer");
			
			// 리스트
			$("#btn_list").click(function(event) {
				event.preventDefault();
				location.href = seperator + "page/contents.html?page=2";
			}).css("cursor","pointer");
			
			// 번호 이동
			var p_page;
			$("#page").keypress(function(event) {
				if(event.keyCode == 13) {
					var page = $("#page").val();
					var url = getUrl(page);
					if(url == "") {
						alert("존재하지 않는 페이지 번호입니다.");
						$("#page").val(p_page);
					} else {
						if(page == 1) {
							location.href = "../ebook.html";
						} else {
							location.href = seperator + "page/" + url + "?page=" + page;
						}
					}
				}
			}).click(function() {
				p_page = $("#page").val();
				$(this).select();
			});
			
			canvas.addEventListener("mousedown", function(event) {
				var touch = event;
				
				ctx.beginPath();
				if(mode == "eraser")
				{
					//ctx.strokeStyle = "rgba(255,255,255,0.5)";
					//ctx.lineWidth = 10;
					//ctx.clearRect(event.clientX-xpos-20, event.clientY-ypos-20, 50, 50);
				}
				else
				{
					//color = $("#color").val();
					
					console.log("color = "+color);
					
					if(ishighlight == true) {
						//ctxtmp.strokeStyle = "rgba(255,255,0,0.1)"; //color;		
						ctxtmp.strokeStyle = color;		
						ctxtmp.globalAlpha = 0.5;
						ctxtmp.lineWidth	= lineWeight;
						
						ctx.strokeStyle = color;		
						ctx.globalAlpha = 0.5;
						ctx.lineWidth	= lineWeight;
					} else {
						//ctx.strokeStyle = "rgba(255,255,0,0.1)"; //color;		
						ctx.strokeStyle = color;		
						ctx.globalAlpha = 1;
						ctx.lineWidth	= lineWeight;
					}
				}
				
				isdrawing = true;
				
				if(ishighlight == true) {
					oX = event.pageX - (($(window).width() - 1014) / 2);
					oY = event.pageY - 85;
					
					ctx.moveTo(oX,oY);
				}
	
	
				//ctx.moveTo(touch.pageX, touch.pageY); 
			});
		
			// touch move
			canvas.addEventListener("mousemove", function(event) {
			//canvas.addEventListener(",mousemove", function(event) {
			    event.preventDefault();
				/*
				document.querySelector("#touchX").innerHTML = event.touches[0].pageX;
				document.querySelector("#touchY").innerHTML = event.touches[0].pageY;
				*/
	
				var x = event.pageX - (($(window).width() - 1014) / 2);
				var y = event.pageY - 85;
				
				if(isdrawing &&g_isdrawing) {
					//console.log("event.pageX = "+event.pageX+" , event.pageY = "+event.pageY);
					if(iseraser == true) {
						ctx.clearRect(x, y, 50, 50);
						ctx.stroke();
					} else if(ishighlight == true) {
						console.log("highlight "+event.pageX+" , " +event.pageY);
						ctxtmp.clearRect(0, 0, 1200, 750);
	
						ctxtmp.beginPath();
						ctxtmp.moveTo(oX, oY);
						//ctxtmp.lineTo(dd.offsetX-cX+15, dd.offsetY-cY+15);
						ctxtmp.lineTo(x, y);
						ctxtmp.stroke();
						ctxtmp.closePath();
					} else {
						ctx.lineTo(x, y);
						ctx.stroke();
					}
				}
			});
			// touch end
			canvas.addEventListener("mouseup", function(event) {
	
				if(ishighlight == true) {
					tX = event.pageX - (($(window).width() - 1014) / 2);
					tY = event.pageY - 85;
					
					ctx.lineTo(tX,tY);
					ctx.stroke(); 
					ctxtmp.clearRect(0, 0, 1200, 750);
				} else if(isdrawing == true) {							
					ctx.closePath();
					ctx.save();
				}
				
				isdrawing = false;
				
			});
			// touch cancel
			/*
			canvas.addEventListener("mouseup", function(event) {
				// touch start 들어온후에 touchEnd가 안일어나고 끝난경우... 
				// 예를들어 touchmove에서 alert() 띄우면 touchcancel 이벤트가 발생함.
	
				isdrawing = false;
				ctx.closePath();
				ctx.save();
	
				//document.querySelector("#touchLog").innerHTML = "[CANCEL] touches.length : " + event.touches.length;
			});		
			*/
			
			
		});    