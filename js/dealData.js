function dealData (data) {
	this.data = data;
}

dealData.prototype = {
	fondChild: function (data, index) {
		var arr = [];
		for (var i = 0; i < data.length; i++) {
			if (data[i].pid == index) {
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
	}
};