export function getRandomInt(min,max){
	let int = Math.floor(Math.random() * (max-min+1) + min);
	return int;
}
export function shuffle(array){
	// 此处不能直接修改原始数据,传入的为this.sequenceList
	const _array = [...array];
	for(let i = 0 , len = _array.length; i < len; i++){
		let j = getRandomInt(0,len-1);
		[_array[i],_array[j]] = [_array[j],_array[i]];
	}
	return _array;
}

