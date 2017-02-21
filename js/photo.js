$(document).ready(function(){
	
	var h = $('body').height(),
	 	w = $('body').width(),
	 	$container = $('#container'),
	 	handlers = {},
	 	per = 12,		// 每次显示的照片数
	 	allTotal = 108,	// 照片总数
	 	start = parseInt(allTotal * Math.random()),		// 默认开始数
	 	zindex = 2;


	function isLeftMouse(e) {
		if (document.attachEvent && e.button === 1) {
			return true;
		} else if (e.button === 0) {
			return true;
		} else {
			return false;
		}
	}

	// 初始化
	function initMove(){
		var $items = $('.item');

		// 随机设置相片的位置
		$.each($items, function(index, item){
		 	item.style.left = (w - 100) * Math.random() + 'px';
		 	item.style.top = (h - 100) * Math.random() + 'px';
		});

		// 拖动
		$items.on('mousedown', function(event){
			var dx = event.clientX,
				dy = event.clientY,
				isMouseDown = true,
				_this = this,
				pos = $(this).offset();

			$(this).css({'z-index': zindex++});

			//只有鼠标左键压下时拖动才有效
			if (!isLeftMouse(event)) return;

			document.onslectstart = function() {
				return false
			};

			if (this.setCapture) {
				this.setCapture();
			} else if (window.captureEvents) {
				window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
			}

			$(document).on('mousemove', handlers.mousemove = function(event) {

				var ex = event.clientX,
					ey = event.clientY;

				if (!isMouseDown) return;
				//禁止选中
				window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();


				_this.style.left = (pos.left + ex - dx) + 'px';
				_this.style.top = (pos.top + ey - dy) + 'px';

				
			});

			$(document).on('mouseup', handlers.mouseup = function(e) {
				if (this.releaseCapture) {
					this.releaseCapture();
				} else if (window.releaseEvents) {
					window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
				}

				isMouseDown = false;

				$(document).off('mousemove', handlers.mousemove);
				$(document).off('mouseup', handlers.mouseup);
			});
		});

		$items.on('dblclick',function(e){
			$(this).siblings().removeClass('show');
			$(this).toggleClass('show');
		});
		$items.on('click', function(){
			$(this).removeClass('show');
		});
	}
	

	// 创建节点
	function create(start, count){
		var s = parseInt(start),
			c = parseInt(count),
			html = '';

		if (allTotal > (s + c)) {
			for(var i = s; i < s + c; i++){
				html += createHtml(i);
			}
		} else {
			for (var i = s; i <= allTotal; i++) {
				html += createHtml(i);
			}
			for(var j = 1; j < s + c - allTotal; j++){
				html += createHtml(j);
			}
		}
		
		$container.html(html);
		initMove();
	}

	function createHtml(i){
		var html = '<div title="双击查看" data="' + i + '" class="item item' + i + '">\
			<div class="item-in" style="background-image:url(https://bhgx.github.io/pic/files/photo/'+i+'.jpeg"></div>\
		</div>';
		return html;
	}

	create(start,per);
	// 换一批
	$('#changePhoto').on('click', function(){
		var start = parseInt($('.item').last().attr('data')) + 1;
		create(start, per);
	});



});