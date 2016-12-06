;(function(){
	setConHeight();
	window.onresize = setConHeight;
	function setConHeight () {
		var h = tool.$('#header').offsetHeight;
		tool.$('#con').style.height = document.documentElement.clientHeight - h + 'px';
	}

	// 结构初始化

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

	function chooseFile (id, id1) {
		this.obj = document.getElementById(id);
		this.checkAll = document.getElementById(id1);
		this.arr = this.obj.getElementsByTagName('a');
		this.em = this.obj.getElementsByTagName('em');
		this.num = 0;
	}

	chooseFile.prototype = {
		choose: function () {
			var _this = this;
			for (var i = 0; i < this.arr.length; i++) {
				var em = this.arr[i].getElementsByTagName('em')[0];
				em.addEventListener('click', down, false);
				function down (ev) {
					ev.cancelBubble = true;
					_this.select(this)
				};
			};
			checkAll.onclick = function () {
				_this.selectAll(this);
			}
		},
		select: function (obj) {
			if (tool.haveClass(obj.parentNode, 'focus')) {
				this.num--;
				tool.removeClass(obj.parentNode, 'focus');
			} else {
				tool.addClass(obj.parentNode, 'focus')
				this.num ++;
			}
			if (this.num === this.em.length) {
				tool.addClass(this.checkAll, 'active');
			} else {
				tool.removeClass(this.checkAll, 'active');
			}
		},
		selectAll: function (obj) {
			if (tool.haveClass(obj, 'active')) {
				tool.removeClass(obj, 'active')
				for (var i = 0; i < this.arr.length; i++) {
					tool.removeClass(this.arr[i], 'focus')
				}
			} else {
				tool.addClass(obj, 'active');
				for (var i = 0; i < this.arr.length; i++) {
					tool.addClass(this.arr[i], 'focus')
				}
			}
		}
	}

	chooseFile.prototype.constructor = chooseFile;

	var fileChoose = null;

	addTreeNav.call(treeNav[0])

	for (var i = 0; i < treeNav.length; i++) {
		treeNav[i].index = i;
		tool.addEvent(treeNav[i], 'click', addTreeNav);
	}
	/**
	 * 为树形菜单添加事件
	 * @param {[type]} ev [description]
	 */

	function addTreeNav (ev) {
		var ev = ev || window.event;
		var id = this.getAttribute('data');
		// if (!ev || ev.target.tagName.toLowerCase() != 'h1') {
			setFileNav (id);
			setFile (id);
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
		addEv (aFile);
		addEv (aFileNav);
		fileChoose = new chooseFile ('fileArea', 'checkAll');
		fileChoose.choose();
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

	function addEv (arr) {
		for (var i = 0; i < arr.length; i++) {
			arr[i].addEventListener('click', function (ev) {
				// if (ev.target.tagName.toLowerCase() !== 'em') {
					var id = this.getAttribute('dataid');
					for (var i = 0; i < treeNav.length; i++) {
						if (treeNav[i].getAttribute('data') == id) {
							tool.removeClass(treeNav[i], 'active');
							addTreeNav.call(treeNav[i])
						}
					}
				// }
			}, false)
		};
		
	};
	

	//////////
	// 添加交互 //
	//////////

	


})();