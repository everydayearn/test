var $pics=$(".rightpics img");
var $pices=$("#pices");
var width=$pics.width();
var height=$pics.height();
var row=4;
var $btns=$(".btns li");
// 碎片行数量
var col=5;
// 碎片列数量
var idx=1;
// 设置信号量
var animlock=true;
// 设置动画锁用来防流氓
// 布局碎片
for (var i = 0; i < row; i++) {
	for (var j = 0; j < col; j++) {
		var $small = $('<div class="small"></div>')
		$small.css({
			"position" : "absolute",
			"left" : width/col * j,
			"top" : height/row * i,
			"width" : width/col,
			"height" : height/row,
			"backgroundImage" : "url(images/slider-img" + idx + ".jpg)",
			"backgroundPositionX" : -width/col * j,
			"backgroundPositionY" : -height/row * i,
		}).appendTo($pices);
	};
};
var $smallpics=$("#pices").children();
$btns.click(function(){
	if (animlock == false) {
		return;
	};
	// 防止流氓点击
	var now = $(this).index()
	animlock=false;
	$(".btns li").eq(now).addClass('cur').siblings().removeClass('cur');
	if (idx != now + 1) {
		if ($("#block").css("display") == "block"){
			$("#block").fadeOut(1000,function(){
				idx = now + 1;
				fun();
				console.log(idx);
			});
		}else {
			idx = now + 1;
			fun();
			console.log(idx);
		};
	};
});
// 点击事件，声明函数
function fun() {
	$smallpics.each(function(){
		$(this).css({
			"width" : 0,
			"height" : 0,
			"backgroundImage" : "url(images/slider-img" + idx + ".jpg)",
		}).animate({
			"width" : width/col,
			"height" : height/row, 
		}, Math.random()*2000 + 100);
		setTimeout(function(){
		$("#block").fadeIn(800,function(){
			$pics.eq(idx - 1).addClass('cur').siblings().removeClass('cur');
			animlock=true;
		});
		},2000);
	});
}
// 关闭按钮
$(".close img").click(function(){
	if(animlock==false) {
		return;
	}
	$("#block").css("display","none");
});
// 利用定时器造成循环效果
var time = setInterval(click,2000);
function click(){
	if(animlock==false) {
		return;
	}
	idx++;
	if (idx > 4) {
		idx = 1;
	};
	animlock=false;
	if ($("#block").css("display") == "block"){
		$("#block").fadeOut(1000,function(){
			$(".btns li").eq(idx - 1).addClass('cur').siblings().removeClass('cur');
			fun();
		});
	}else{
		fun();
	}
};
$("#all").mouseenter(function(){
	clearInterval(time);
});
$("#all").mouseleave(function(){
	time = setInterval(click,4000);
});