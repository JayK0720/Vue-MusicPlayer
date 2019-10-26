import axios from 'axios'
import {commonParams,options} from './config'

export function getLyric(songmid){
	const date = new Date();
	const url = `/api/getLyric`;
	const data = Object.assign({},{
		pcachetime:date.getTime(),
		songmid,
		g_tk:5381,
		loginUin:1129594783,
		hostUin:0,
		format:'json',
		inCharset:'utf8',
		outCharset:'utf-8',
		notice:0,
		platform:'yqq.json',
		needNewCode:0,
		param:'jsonpCallback'
	})
	return axios.get(url,{
		params:data,
	})
	.then(res => {
		return Promise.resolve(res.data);
	})
}