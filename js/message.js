$(function(){
	$('#submit').on('click', function(){
		$.ajax({
			type: 'post',
			url: 'api/message.php',
			data: {content: $('#content').val()},
			success: function(result){
				getList();
				$('#content').val('');
			},
			error: function(err){
			}
		})
	})
	function getList(){
		$.ajax({
			type: 'get',
			url: 'api/get_message_list.php',
			dataType: 'json',
			success: function(result){
				createHtml(result);
			},
			error: function(err){
			}
		})
	}
	getList();

	function createHtml(data){
		var html = '', 
			total = 32,
			c;

		data.forEach(function(item,index){

			c = parseInt(total * Math.random());

			html += '<div class="item item'+c+'">\
						<div class="item-in">\
							<div class="item-t">\
								<span class="item-ip">路人（' + item.ip + '）</span>\
								<span class="item-time">' + item.create_at + '</span>\
							</div>\
							<div class="item-cont">' + item.content + '</div>\
						</div>\
					</div>';
		});

		$('#itemWrap').html(html);
	}

})