;(function(){
	function $ (ele) {
		var obj = document.querySelectorAll(ele);
		return obj.length == 1 ? obj[0] : obj;
	}

})();