var data = [
	{name: '',photo: 'images/me2.jpg', url: '/'},
	{name: '旅游'},
	{name: '美食'},
	{name: '电影'},
	{name: '游泳'},
	{name: '游戏'},
	{name: '交友'},
	{name: '摄影'}
];
data.forEach(function(item, index, arrs){
	CreateBubble(item);
})
