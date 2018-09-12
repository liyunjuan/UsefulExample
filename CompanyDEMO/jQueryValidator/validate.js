$(function(){
	// $('J_register').reset()
	var $regSection = $('#J_regSection'),
		$field = $('.field',$regSection);

	var $form = $('#J_register');

	var isRequired = {name,false,phone:false};
	console.log(isRequired)
	
	$('.reseta').on('click',function(){
		document.getElementById('J_register').reset();
	});

	$.validator.addMethod('notAllNum',function(value,element){
		var name = /[^\d]/ig;
		return name.test(value) || this.optional(element);
	});
	$.validator.addMethod('checkMobileNum',function(value,element){
		var name = /^((13[0-9])|(14[5,7])|(15[^4,\D])|(18[0-9])|(17[0-9])\d{8}$)/;
		return name.test(value) || this.optional(element);
	},'请输入正确的手机号码')


	var formVidate = {
		onkeyup:false,
		onfocusin:false,
		focusCleanup:true,
		success:function(label){
			label.html('哈哈哈哈哈哈');
		},
		errorPlacement:function(error,element){
			element.html('错误');
			error.html('错误1');
		},
		rules:{
			name:{
				notAllNum:true
			},
			phone:{
				notAllNum:true,
				required:true,
				checkMobileNum:true,
				rangelength:[1,11]
			}
		},
		message:{
			name:{
				notAllNum:'姓名不能全位数字'
			},
			phone:{
				required:"手机号不能为空",
				rangelength:$.validator.format('电话号码{0}-{1}位字符')
			}
		}
	};

	$('.submita').on('click',function(){
		var a = $form.valid();
		console.log(a)
		
	})

	$field.on({
		focus:function(){
			// console.log('focus');
			var obj = $(this);

		},
		blur:function(){
			// console.log('blur');
		},
		keyup:function(){
			// console.log('keyup');
		}
	})

	for(var key in isRequired)	{
		console.log(!isNaN(key))
		if(!isNaN(key)){
			formVidate.message[key] = {
				required:console.log('不能为空')
			}
			formVidate.rules[key] = {
				required:true
			}
		}
	}

	$form.validate(formVidate);

});