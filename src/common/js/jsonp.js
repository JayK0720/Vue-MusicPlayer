import OriginJsonp from 'jsonp'

export default function jsonp(url,data,options){
	// 先判断地址是否有？，如果有，则说明前面已经有查询字符串，第一个连接符是 &， 如果没有，则第一个字符串是？，再拼接后面的查询参数
	url += ( url.indexOf('?') < 0 ? '?' : '&' ) + param(data); 
	return new Promise((resolve,reject) => {
		OriginJsonp(url,options,(err,data)=>{
			if(!err){
				resolve(data);
			}else{
				reject(err);
			}
		})
	})
}
// substring(start,stop) 截取[start,stop)之间的字符串，不包括stop的位置
function param(obj){
	let url = '';
	for(let key in obj){
		// 如果没有value值，则赋值为一个空字符串，将对象拼接为 字符串 &key=value 的形式，注意value需要解码
		let value = obj[key] !== undefined ? obj[key] : '';
		url += `&${key}=${encodeURIComponent(value)}`;
	}
	// 如果有查询参数，即拼接的查询字符串不为空时，则删除第一个&连接符，否则没有查询参数时 url 为空字符串
	return url ? url.substring(1) : '';
}