import jsonp from '@/common/js/jsonp'
import {commonParams,options} from '@/common/api/config'
import axios from 'axios'
export function getSinger(){
	const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
	const data = Object.assign({},commonParams,{
		channel:'singer',
		page:'list',
		key:'all_all_all',
		pagesize:100,
		pagenum:1,
		hostUin:0,
		needNewCode:0,
		platform:'yqq',
		g_tk:1664029744
	})
	return jsonp(url,data,options)
}

export function getSongs(singermid){
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
	const data = Object.assign({},commonParams,{
		loginUin:1129594783,
		hostUin:0,
		needNewCode:0,
		platform:'yqq',
		order:'listen',
		begin:0,
		num:100,
		songstatus:1,
		singermid,
		g_tk:1664029744
	})
	return jsonp(url,data,options);
}

export function getSongUrl(songmid){
	const data = 
	{
		req:{
				module:"CDN.SrfCdnDispatchServer",
				method:"GetCdnDispatch",
				param:{guid:4427256653,calltype:0,"userip":""},
			},
		req_0:{
			module:"vkey.GetVkeyServer",
			method:"CgiGetVkey",
			param:{guid:"4427256653",songmid:[`${songmid}`],songtype:[0],uin:"1129594783",loginflag:1,platform:20},
		},
		comm:{uin:1129594783,format:"json",ct:24,cv:0}
	}
	const url = '/api/getSongUrl';
	const reqData = {
		g_tk:263287582,
		loginUin:1129594783,
		hostUin:0,
		format:'json',
		inCharset:'utf8',
		outCharset:'utf-8',
		notice:0,
		platform:'yqq.json',
		needNewCode:0,
		param:'jsonpCallback',
		data:JSON.stringify(data),
	}
	return axios.get(url,{
		params:reqData
	}).then(res => {
		return Promise.resolve(res.data);
	})
}