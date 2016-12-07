function dealData (data) {
	this.data = data;
}

dealData.prototype = {
	fondChild: function (data, index) {
		var arr = [];
		for (var i = 0; i < data.length; i++) {
			if (data[i] && data[i].pid == index) {
				arr.push(data[i]);
			}
		}
		return arr;
	},
	findAllParent: function (data, index) {
		var arr = [];
		var _this = this;
		for (var i = 0; i < data.length; i++) {
			if (data[i].id == index) {
				// console.log(data[data[i].id])
				arr.push(data[i]);
				arr = arr.concat(_this.findAllParent(data, data[i].pid));
				break;
			}
		}
		// console.log(arr)
		return arr;
	},
	findSelf: function (data, index) {
		var arr = [];
		console.log(data)
		for (var i = 0; i < data.length; i++) {
			console.log(data[i].id);
			if (data[i].id == index) {
				arr.push(data[i]);
				break;
			}
		}
		// console.log(arr);
		return arr[0];
	},
	removeData: function (data, index) {
		deleteChild (index);
		function deleteChild (index) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].pid == index) {
					data.splice(i, 1);
					i--;
					deleteChild (data[i].id)
				}
			}
		};
		for (var i = 0; i < data.length; i++) {
			if (data[i].id == index) {
				data.splice(i, 1);
				break;
			}
		};
	}
};