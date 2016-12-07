;(function(){
	setConHeight();
	window.onresize = setConHeight;
	function setConHeight () {
		var h = tool.$('#header').offsetHeight;
		tool.$('#con').style.height = document.documentElement.clientHeight - h + 'px';
	}

	// 结构初始化

	var dealD = new dealData();

	var file = new doData('fileArea', data.files);
	var fileTree = new doData('fileTree', data.files);
	var fileNav = new doData('mainAreaNav', data.files);

	// setFile ();
	setNavTree();
	setFileNav ();

	// 搭建文件区

	function setFile (id) {
		id = typeof id == 'undefined' ? 0 : id;
		file.setFileArea(data.files, id)
	}

	// 搭建文件树

	function setNavTree (pid) {
		pid = typeof pid == 'undefined' ? -1 : pid;
		fileTree.setFileTree(data.files, pid);
	}

	// 搭建文件区头部导航
	function setFileNav (id) {
		id = typeof id == 'undefined' ? 0 : id;
		fileNav.setMainAreaNav(data.files, id);
	}



	var tree = document.getElementById('fileTree');
	var treeNav = tree.getElementsByTagName('h1');

	var oFile = document.getElementById('fileArea');
	var aFile = oFile.getElementsByTagName('a');

	var oFileNav = document.getElementById('mainAreaNav');
	var aFileNav = oFileNav.getElementsByTagName('a');


	var fileChoose = null;


	addTreeNav.call(treeNav[0])

	tree.addEventListener('click', turn, false);

	function turn (ev) {
		var ev =ev || window.event;
		switch (ev.target.tagName.toLowerCase()) {
			case 'h1':
			case 'span':
			case 'p':
			case 'i':
				addTreeNav.call(tool.findParent(ev.target, 'h1'))
				break;
			default:
				return false;
				break;
		}
	}




	/**
	 * 为树形菜单添加事件
	 * @param {[type]} ev [description]
	 */

	function addTreeNav (ev) {
		var ev = ev || window.event;
		var id = this.getAttribute('data');
		var addNewFile = document.getElementById('addNewFile');
		// if (!ev || ev.target.tagName.toLowerCase() != 'h1') {
			setFileNav (id);
			setFile (id);
			addNewFile.setAttribute('dataid', id);
		// }
		var par = this.parentNode.parentNode;
		var chi = par.getElementsByTagName('ul');

		if (tool.haveClass(this, 'active')) {
			this.nextElementSibling.style.display = 'none';
			tool.removeClass(this, 'active');
		} else if (this.nextElementSibling) {
			for (var i = 0; i < chi.length; i++) {
				chi[i].style.display = 'none';
				tool.removeClass(chi[i].previousElementSibling, 'active')
			}
			this.nextElementSibling.style.display = 'block';
			tool.addClass(this, 'active');
		} else {
			for (var i = 0; i < chi.length; i++) {
				chi[i].style.display = 'none';
				tool.removeClass(chi[i].previousElementSibling, 'active')
			}
		}
		parAddClass (this.getAttribute('datapid'));
		for (var i = 0; i < treeNav.length; i++) {
			tool.removeClass(treeNav[i], 'focus')
		}
		tool.addClass(this, 'focus');
	}

	/**
	 * 找到当前所有的父级，然后给他们添加class
	 * @param  {[number]} pid [点击标题上的pid]
	 * @return {[type]}     [description]
	 */
	function parAddClass (pid) {
		for (var i = 0; i < treeNav.length; i++) {
			if (treeNav[i].getAttribute('data') == pid) {
				tool.addClass(treeNav[i], 'active');
				treeNav[i].nextElementSibling.style.display = 'block';
				parAddClass (treeNav[i].getAttribute('datapid'))
			}
		}
	}


	(function (){
		var mainArea = document.getElementById('mainArea');
		mainArea.addEventListener('click', fn, false);
		var obj = document.getElementById('fileArea');
		var aEm = obj.getElementsByTagName('em');
		var aArr = obj.getElementsByTagName('a');
		var checkAll = document.getElementById('checkAll');
		var addNewFile = document.getElementById('addNewFile');
		checkAll.onclick = function () {
			if (tool.haveClass(this, 'active')) {
				tool.removeClass(this, 'active')
				for (var i = 0; i < aArr.length; i++) {
					tool.removeClass(aArr[i], 'focus')
				}
			} else {
				tool.addClass(this, 'active');
				for (var i = 0; i < aArr.length; i++) {
					tool.addClass(aArr[i], 'focus')
				}
			}
		}
		function check () {
			for (var i = 0; i < aArr.length; i++) {
				if (!tool.haveClass(aArr[i], 'focus')) {
					return false;
				}
			}
			return true;
		}
		function fn (ev) {
			switch (ev.target.tagName.toLowerCase()) {
				case 'em':
					if (tool.haveClass(ev.target.parentNode, 'focus')) {
						tool.removeClass(ev.target.parentNode, 'focus');
					} else {
						tool.addClass(ev.target.parentNode, 'focus')
					}
					if (check ()) {
						tool.addClass(checkAll, 'active');
					} else {
						tool.removeClass(checkAll, 'active');
					}
					break;
				case 'input':
					// statements_1
					break;
				case 'a':
				case 'i':
				case 'span':
					if (!tool.haveClass(ev.target, 'checkBox') && !tool.haveClass(ev.target, 'checkBoxIco')) {
						tool.removeClass(checkAll, 'active');
						var id = tool.findParent(ev.target, 'a').getAttribute('dataid');
						for (var i = 0; i < treeNav.length; i++) {
							if (treeNav[i].getAttribute('data') == id) {
								tool.removeClass(treeNav[i], 'active');
								addTreeNav.call(treeNav[i])
							}
						}
					}
					break;
				default:
					break;
			}
		}
	})();
	//////////
	// 添加交互 //
	//////////

	var DddLittleEvent = function (id) {
		this.obj = document.getElementById(id);
		this.arr = this.obj.getElementsByTagName('a');
		this.tree = document.getElementById('fileTree');
		this.aTile = tree.getElementsByTagName('h1');
		this.new = document.getElementById('addNewFile');
	}

	DddLittleEvent.prototype = {
		constructor: DddLittleEvent,
		init: function (id) {
			var _this = this;
			var reName = document.getElementById(id);
			reName.onclick = function () {
				_this.reName();
			};
			var deleteFile = document.getElementById('deleteFile');
			deleteFile.onclick = function () {
				_this.deleteEv();
			}
			this.new.onclick = function () {
				_this.addNew(this);
				for (var i = 0; i < _this.arr.length; i++) {
					tool.removeClass(_this.arr[i], 'focus');
				}
			}
		},
		reName: function () {
			var arr = this.findSelect();
			if (arr.length === 1) {
				this.reNameEv(arr[0]);
			} else {
				 alert('只能修改一个');
			}
		},
		reNameEv: function (obj) {
			var _this = this;
			var text = obj.getElementsByTagName('input')[0];
			var name = obj.getElementsByTagName('span')[0];
			text.style.display = 'block';
			text.focus();
			text.onblur = function () {
				if (this.value !== '') {
					if (!_this.checkName(this.value)) {
						alert('已存在');
						return false;
					}
					var a = dealD.findSelf(data.files, obj.getAttribute('dataid'));
					if (!a) {
						dealD.addData(data.files, {
							title: this.value,
							pid: _this.new.getAttribute('dataid')
						})
						name.title = name.innerHTML = this.value;
						setNavTree();
						for (var i = 0; i < _this.aTile.length; i++) {
							if (_this.aTile[i].getAttribute('data') == _this.new.getAttribute('dataid')) {
								addTreeNav.call(_this.aTile[i])
							}
						}
					} else {
						for (var i = 0; i < _this.aTile.length; i++) {
							if (_this.aTile[i].getAttribute('data') == this.parentNode.getAttribute('dataid')) {
								_this.aTile[i].getElementsByTagName('span')[0].innerHTML = this.value;
							}
						}
						a.title = name.title = name.innerHTML = this.value;
					}
				} else {
					if (name.innerHTML == '') {
						this.parentNode.parentNode.removeChild(this.parentNode);
					}
				}
				this.value = '';
				this.style.display = 'none';
				tool.removeClass(obj, 'focus')
			}
		},
		checkName: function (str) {
			for (var i = 0; i < this.arr.length; i++) {
				var aName = this.arr[i].getElementsByTagName('span')[0];
				if (aName.innerHTML == str) {
					return false;
				} else {
					return true;
				}
			}
		},
		findSelect: function () {
			var arr = [];
			for (var i = 0; i < this.arr.length; i++) {
				if (tool.haveClass(this.arr[i], 'focus')) {
					arr.push(this.arr[i]);
				}
			};
			return arr;
		},
		deleteEv: function () {
			var arr = this.findSelect();
			for (var i = 0; i < arr.length; i++) {
				this.obj.removeChild(arr[i]);
				dealD.removeData(data.files, arr[i].getAttribute('dataid'));
			};
			for (var i = 0; i < this.aTile.length; i++) {
				for (var j = 0; j < arr.length; j++) {
					if (this.aTile[i].getAttribute('data') == arr[j].getAttribute('dataid')) {
						this.aTile[i].parentNode.parentNode.removeChild(this.aTile[i].parentNode);
					}
				}
			}
		},
		addNew: function (obj) {
			var a = document.createElement('a');
			a.innerHTML = '<i></i>'+
						'<span title=""></span>'+
						'<em></em>'+
						'<input type="text">';
			a.href = 'javascript:;';
			// tool.addClass(a, 'focus');
			a.dataid = obj.getAttribute('dataid');
			this.obj.insertBefore(a, this.obj.children[0])
			this.reNameEv(a);
		}
	}


	var a = new DddLittleEvent('fileArea');
	a.init('reName');

})();