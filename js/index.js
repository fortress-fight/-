;(function(){
	setConHeight();
	window.onresize = setConHeight;
	function setConHeight () {
		var h = tool.$('#header').offsetHeight;
		tool.$('#con').style.height = document.documentElement.clientHeight - h + 'px';
	}

	/*数据生成结构*/
	;(function(){
		var file = new doData('fileArea', data.files);
		var fileTree = new doData('fileTree', data.files);
		var fileNav = new doData('mainAreaNav', data.files);

		var tree = document.getElementById('fileTree');
		var treeNav = tree.getElementsByTagName('h1');

		var oFile = document.getElementById('fileArea');
		var aFile = oFile.getElementsByTagName('a');

		var oFileNav = document.getElementById('mainAreaNav');
		var aFileNav = oFileNav.getElementsByTagName('a');

		// 初始化

		// setFile (0);
		setNavTree(-1);
		setFileNav (0);
		addTreeNav.call(treeNav[0])

		for (var i = 0; i < treeNav.length; i++) {
			treeNav[i].index = i;
			tool.addEvent(treeNav[i], 'click', addTreeNav);
		}
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
		}


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
				arr[i].addEventListener('click', function () {
					var id = this.getAttribute('dataid');
					for (var i = 0; i < treeNav.length; i++) {
						if (treeNav[i].getAttribute('data') == id) {
							tool.removeClass(treeNav[i], 'active');
							addTreeNav.call(treeNav[i])
						}
					}
				})
			};
		};
		// 搭建文件区

		function setFile (id) {
			file.setFileArea(data.files, id)
		}

		// 搭建文件树

		function setNavTree (pid) {
			fileTree.setFileTree(data.files, pid);
		}

		// 搭建文件区头部导航
		function setFileNav (id) {
			fileNav.setMainAreaNav(data.files, id);
		}


	})();

	// 添加交互
})();