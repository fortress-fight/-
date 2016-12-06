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

		// 初始化

		setFile (0);
		setNavTree(-1);
		setFileNav (0);


		for (var i = 0; i < treeNav.length; i++) {
			treeNav[i].index = i;
			tool.addEvent(treeNav[i], 'click',function () {
				var id = this.getAttribute('data');
				setFileNav (id);
				setFile (id);

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
				}
				for (var i = 0; i < treeNav.length; i++) {
					tool.removeClass(treeNav[i], 'focus')
				}
				tool.addClass(this, 'focus');
			});
		}

		;(function addEv () {
			for (var i = 0; i < aFile.length; i++) {
				aFile[i].addEventListener('click', function () {
					// alert(1);
					var id = this.getAttribute('dataid');
					setFile (id);
					setFileNav (id);
					addEv()
				})
			}
		})();
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
})();