var imgFeild = document.getElementById('img_feild');
	var imgView = document.getElementById('img_view');
	
	function uploadImg(fn) {
		var f = new FormData();
		var x = new XMLHttpRequest();
		x.open('post', 'organization.do?action=uploadImage&type=orgPublicImg');
		x.onload = function () {
			try{
				fn(JSON.parse(this.responseText));
			} catch (err) {
				console.log('upload img ->', err);
			}
		};
		f.append('files', imgFeild.files[0]);
		x.send(f);
	}

	imgFeild.onchange = function () {
		
		if (!this.value) {
			return;
		}
		
		uploadImg(function (res) {
			if (res.success) {
				imgView.src = res.imageUrl;
				userData.pic = res.contentId;
				showErr(false, 'pic');
			} else {
				imgView.src = '';
				userData.pic = '';
				showErr(true, 'pic', res.message);
			}
		});
	}