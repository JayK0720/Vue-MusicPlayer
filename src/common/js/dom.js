/判断是否有类名 和 添加 一个 类名/
export function hasClass(ele,className){
	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');	// 匹配一段字符串中是否含有某个类名
	return reg.test(ele.className);
}

export function addClass(ele,className){
	if(hasClass(ele,className)){
		return;
	}else{
		let classArr = ele.className.split(' ');
		classArr.push(className);
		ele.className = classArr.join(' ');
	}
}