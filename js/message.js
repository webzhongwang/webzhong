$(function(){
	$('#submit').on('click', function(){
		$.ajax({
			type: 'post',
			url: 'http://192.168.117.132:8001/api/message/create',
			data: {remark: $('#content').val()},
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
			url: 'http://192.168.117.132:8001/api/message/list',
			dataType: 'json',
			success: function(result){
				createHtml(result.data);
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
		console.log(data)
		data.list.forEach(function(item,index){

			c = parseInt(total * Math.random());

			html += '<div class="item item'+c+'">\
						<div class="item-in">\
							<div class="item-t">\
								<span class="item-ip">路人（' + item.ip + '）</span>\
								<span class="item-time">' + datetime(item.create_at) + '</span>\
							</div>\
							<div class="item-cont">' + item.remark + '</div>\
						</div>\
					</div>';
		});

		$('#itemWrap').html(html);
	}

})
function datetime(val,type){
	if (!val) return val;
    var val = parseInt(val);
    var date = new Date(val),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        min = date.getMinutes(),
        s = date.getSeconds(),
        str = '';

    function check (value){
        return value > 9 ? value : '0' + value;
    }
    var str = '';
    if(type == 'h'){
        str = '' + y + '-' + check(m) + '-' + check(d) + ' ' + check(h);
    } else if (type == 'm') {
        str = '' + y + '-' + check(m) + '-' + check(d) + ' ' + check(h) + ':' + check(min);
    } else {
        str = '' + y + '-' + check(m) + '-' + check(d) + ' ' + check(h) + ':' + check(min) + ':' + check(s);
    }
    return str;
}