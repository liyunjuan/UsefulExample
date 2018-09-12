function rich(ele){
	tinyMCE.init({
		mode:'exact',
		elements:ele,
		theme:'ablesky',
		plugins:'safari,paste,tabfocus,integration'
	});
}

rich('courseDesc-editor')