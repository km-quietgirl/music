$(function(){
	var audio=$("audio")[0];
	var name=$(".gename");
	var author=$(".name");
	var start=$(".current");
	var end=$(".duration");
	var process=$(".progress")
	var process1=$(".progressed")
	var pi=$(".cirle");
	var prev=$(".prev");
	var next=$(".next");
	var imgs=$(".tu");
	
	var now=0;
	var widths=process.width();
	var left;		
	var show=1;
	var volumeleft;
	var t;
	var num=0;
	var block=$("#container");
	
	var bstart;	
	var return1=$(".tex1");
	
	// 存储
	var musics=[{
		gename:"Lady Gaga - Angel Down - Work 版",
		src:"./plays/Lady Gaga - Angel Down - Work 版.mp3",
		name:"Lady Gaga",
		imgsrc:"./imgs/a1.jpg",
		bgcolor:"rgba(95, 98, 101, 0.55)",
		state:"0"
	
	},{
		gename:"冰雨",
		src:"./plays/刘德华 - 冰雨 - 1999香港演唱会.mp3",
		name:"刘德华",
		imgsrc:"./imgs/b1.jpg",
		bgcolor: 'rgba(224, 32, 96,.35)',
		state:"0"
		
	},{
		gename:"为你我受冷风吹",
		src:"./plays/林忆莲 - 为你我受冷风吹 - 2011香港MMXI演唱会.mp3",
		name:"林忆莲",
		imgsrc:"./imgs/e1.jpg",
		bgcolor: 'rgba(224, 160, 0,.35)',
		state:"0"
	},{
		gename:"一千个伤心的理由",
		src:"./plays/张学友 - 一千个伤心的理由.mp3",
		name:"张学友",
		imgsrc:"./imgs/d1.jpg",
		bgcolor: 'rgba(32, 32, 64,.35)',
		state:"0"
	},{
		gename:"女人花",
		src:"./plays/梅艳芳 - 女人花.mp3",
		name:"梅艳芳",
		imgsrc:"./imgs/c1.jpg",
		bgcolor: 'rgba(32, 32, 64,.35)',
		state:"0"
	}]
	
	
   localStorage.musics = JSON.stringify(musics);
	
	
	//获取时间函数
	function formate(v){					
	  v=Math.floor(v);
   	  var m=Math.floor(v/60);
   	  var s=v%60;
   	  m = (m < 10) ? ("0" + m) : m;
	  s = (s < 10) ? ("0" + s) : s;
	  return m + ":" + s;
	}
	
//	$(".sp").on("touchend",function(){
//		$(".sp").css("display","none");
//		$("#bg_img").css("display","block");
//		$("#bg_play").css("display","block");
//		$("#container").css("display","block");
//	})
//	return1.on("click",function(){
//		$(".sp").css("display","block");
//		$("#bg_img").css("display","none");
//		$("#bg_play").css("display","none");
//		$("#container").css("display","none");
//	})
	
	
	
	// 调节进度条
	
	pi.on("click",false);
    $(audio).on("timeupdate", function() {
		start.html(formate(audio.currentTime));
		end.html(formate(audio.duration));
		pi.css("left", widths * (audio.currentTime / audio.duration) - pi.width() / 2);
		process1.css("width",widths * (audio.currentTime / audio.duration));
	})
    process.on("touchend",function(e){
    	var e= e.originalEvent.changedTouches[0].clientX-process.offset().left;
		audio.currentTime = (audio.duration * e / widths);
    })
    pi.on("touchstart", function(e) {
		var start = pi.width() / 2 - (e.originalEvent.changedTouches[0].clientX-pi.offset().left);
		$(document).on("touchmove", function(e) {
			var left = e.originalEvent.changedTouches[0].clientX- process.offset().left + start;
			if(left >= widths || left <= 0) {
				return;
			}
			audio.currentTime = left / widths * audio.duration;
		})
		return false;
	})
	$(document).on("touchend", function() {
		$(document).off("touchmove")
	})
	
	

     
     //	播放
	
	var play=$(".play");
	play.on("touchend",function(){						
		if(audio.paused){
			audio.play();
		}else{
			audio.pause();
		}
		return false;
	})	
	
	$(audio).on("play",function(){
		play.html("&#xe61f;");
		imgs.addClass("active1");
        imgs.css("animation-play-state","running");
	})
	$(audio).on("pause",function(){
		play.html("&#xe641;");
		imgs.css("animation-play-state","paused");
	})
	
	
	
	//  上一首
    function pre1(){
    	now--;
	    if(now<0){
	    		now=musics.length-1;
	    }
    	audio.src=musics[now].src;
    	
    }
    prev.on("click",function(){
    	imgs.removeClass("active1");
    	pre1();
//  	$(".min .tu").src=musics[now].imgsrc;
        $("#bg_play").css({'background-color': '' + musics[now].bgcolor + ''});
    })
//  下一首
    function next1(){
    	now++;
    	if(now>=musics.length){
    		now=0;
    	}
    	audio.src=musics[now].src;
    	
    }    
    next.on("click",function(){
    	imgs.removeClass("active1");
    	next1();
//  	$(".min .tu").src=musics[now].imgsrc;
        $("#bg_play").css({'background-color': '' + musics[now].bgcolor + ''});
    })
    
    
    
    
    var gd=$(".gd");
    //  主函数
//  function render(){				
//		gd.empty();
//  	$.each(musics,function(index,val){
//  		var c=(index==now)? "active":"";
//			$("<li class='"+c+"'><span class='jt'>&#xe60c;</span><div class='sTop'>"+musics[index].gename+"</div><div class='sBottom'>"+musics[index].gename+"</div></li>").
//			appendTo(gd);
//		})
//	}
    
    /////播放列表添加
    
//  $(".add").on("touchend",function(){
//		var a=$(this).attr("data-v");
//		musics.push(JSON.parse(a));
//		render();
//	})
//	render();
    
//  $(".add").on("touchend",function(){				  
//		
//		var index=$(this).index();
//		var d=$(this).attr("data-role");
//		musics.push(JSON.parse(d));
//		localStorage.musics=JSON.stringify(musics);
//		render();
//		return false;
//	})	
    
    
    
    $(audio).on("canplay",function(){
    	audio.play();
    	end.html(formate(audio.duration))

    })
	
	$(audio).on("loadstart",function(){
		name.html(musics[now].gename);
		author.html(musics[now].name);
		imgs.attr("src",musics[now].imgsrc);
		
		
	});
	$(audio).on("progress",function(){
		
	});
	$(audio).on("ended",function(){
    	next1();
    })
	
	
	
	
	
	
	
	
	
	
	
	
					
})
