import jsonp from '@/common/js/jsonp'
import {options} from '@/common/api/config'

export function getTopList(){
	const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?_=1572533885598`;
	const data = {
		comm:{
				"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8",
				"notice":0,"platform":"h5","needNewCode":1,"ct":23,"cv":0,
			},
		topList:
			{
				"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{},
			}
		}
	let reqData = {
		data:JSON.stringify(data),
	}
	return jsonp(url,reqData)
}