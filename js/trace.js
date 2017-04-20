// 百度地图API功能
var map = new BMap.Map("allmap");
map.centerAndZoom(new BMap.Point(104.0712160000, 34.5762790000), 5);
// 允许滚动
map.enableScrollWheelZoom();
map.setMinZoom(5);
map.setMaxZoom(6);

function getBoundary(){       
	var bdary = new BMap.Boundary();
	//获取行政区域
	bdary.get("中国", function(rs){       
		//清除地图覆盖物 
		map.clearOverlays();    
		//行政区域的点有多少个          
		var count = rs.boundaries.length; 
		if (count === 0) {
			alert('未能获取当前输入行政区域');
			return ;
		}
      	var pointArray = [];
		for (var i = 0; i < count; i++) {
			//建立多边形覆盖物
			var ply = new BMap.Polygon(rs.boundaries[i], {
					strokeWeight: 2, 
					strokeColor: "#f40",
				}); 
			ply.setFillColor("#4ff");
			ply.setFillOpacity(0.8);
			//添加覆盖物
			map.addOverlay(ply);  
			pointArray = pointArray.concat(ply.getPath());
		} 
		//调整视野     
		// map.setViewport(pointArray);    
		addlabel();               
	});   
}
getBoundary();

function addlabel() {
	var points = [
		[116.4135540000, 39.9110130000, '北京'],	
		[117.2059140000, 39.0909080000, '天津'],	
		[115.9876050000, 41.6053340000, '丰宁坝上'],
		[119.4911090000, 39.8409680000, '北戴河'],
		[112.4600330000, 34.6243760000, '洛阳'],	
		[118.8954630000, 42.2645860000, '赤峰'],	
		[104.0712160000, 30.5762790000, '成都'],	
		[106.5571650000, 29.5709970000, '重庆'],	
		[106.9368840000, 30.3408480000, '邻水'],
		[102.8396670000, 24.8859530000, '昆明'],	
		[102.8396670000, 24.8859530000, '昆明'],	
		[100.2362780000, 25.5975890000, '大理'],	
		[100.2335700000, 26.8625210000, '丽江'],	
		[100.4735700000, 27.4325210000, '泸沽湖'],
		[110.2964420000, 25.2798930000, '桂林'],	
		[113.2707930000, 23.1353080000, '广州'],	
		[113.7582310000, 23.0269970000, '东莞'],	
		[114.0661120000, 22.5485150000, '深圳'],	
		[114.1719940000, 22.2810890000, '香港'],	
		[87.607216, 43.815948, '乌鲁木齐'],
		[89.24845,42.907719, '吐鲁番'],
		[81.324373,43.928425, '伊犁'],
		[83.265687,43.437065, '新源'],
		[84.008916,43.331792, '那拉提'],
	];
	var icon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(50,52));
	points.forEach(function(item){
		var pt = new BMap.Point(item[0],item[1]);
		var marker = new BMap.Marker(pt);  // 创建标注
		// marker.setIcon(icon);
		map.addOverlay(marker);
	});
}
