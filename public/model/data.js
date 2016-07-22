define(function (require) {

	var goodTypes = [
		{
			_id: '1',
			name: '热门推荐',
			goods: [
				{
					_id: '10001',
					name: '山西米饭',
					price: 3.25,
					reserve: 100,
					sold:0,
					piece:'kg',
					description: "优质的大米，只为优质的生活！",
					pics:['images/food-example.jpeg']					
				}, {
					_id: '10002',
					name: '新疆涮羊肉',
					price: 23.25,
					reserve: 100,
					sold:0,
					piece:'kg',
					description: "经典涮羊肉，满足你的味蕾！",
					pics:[]
				}, {
					_id: '10003',
					name: '周黑鸭',
					price: 21.5,
					reserve: 100,
					sold:0,
					piece:'袋',
					description: "周黑鸭-武汉老字号，百年传承，中国武汉的符号！",
					pics:['images/food-example.jpeg']
				}, {
					_id: '10004',
					name: '小亮蒸虾',
					price: 128,
					reserve: 10000,
					sold:0,
					piece:'锅',
					description: "夏天叫上几个朋友，点一份小亮蒸虾，再来一打啤酒，爽爽快快的剥虾，聊天，看星辰忆往事！",
					pics:['images/food-example.jpeg']
				}
			]
		}, {
			_id: '2',
			name: '豪华双拼',
			goods: []
		}, {
			_id: '3',
			name: '情侣套餐',
			goods: []
		}
	];

	var hotCities = [
		{
			id: "1",
			name: "上海"
		}, {
			id: "2",
			name: "北京"
		}, {
			id: "3",
			name: "广州"
		}, {
			id: "4",
			name: "深圳"
		}, {
			id: "5",
			name: "武汉"
		}, {
			id: "6",
			name: "杭州"
		}, {
			id: "7",
			name: "成都"
		}, {
			id: "8",
			name: "厦门"
		}
	];

	var tabs = [
		{
			name:'菜单',
			state: true
		}, {
			name:'评价',
			state: false
		}, {
			name: '商家',
			state: false
		}
	];

	return {
		goodTypes: goodTypes,
		hotCities:hotCities,
		tabs:tabs,
	};

});


