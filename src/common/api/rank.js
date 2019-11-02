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

export function getMusicList({topId,num,period}){
	const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI4484277693078398`;
	const reqData = 
		{
			"detail":{
				"module":"musicToplist.ToplistInfoServer",
				"method":"GetDetail",
				"param":{
					topId,
					"offset":0,
					num,
					period
				}
			},
			"comm":{
				"ct":24,
				"cv":0,
			},
		}
	const data = {
		g_tk:5381,
		loginUin:0,
		hostUin:0,
		format:'json',
		inCharset:'utf8',
		outCharset:'utf-8',
		notice:0,
		platform:'yqq.json',
		needNewCode:0,
		data:JSON.stringify(reqData)
	}
	return jsonp(url,data)
}