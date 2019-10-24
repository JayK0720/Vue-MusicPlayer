function getRandomInt(min,max){
	let int = Math.floor(Math.random() * (max-min+1) + min);
	return int;
}
export function shuffle(array){
	for(let i = 0 , len = array.length; i < len; i++){
		let j = getRandomInt(0,len-1);
		[array[i],array[j]] = [array[j],array[i]];
	}
	return array;
}
