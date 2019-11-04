import jsonp from '@/common/js/jsonp'
import {commonParams,options} from './config'
import axios from 'axios'

export function getHotKey(){
	const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?cgiKey=GetHomePage&_=1572707854086`
	const data = {
			"comm":{
				"g_tk":5381,
				"uin":"",
				"format":"json",
				"inCharset":"utf-8",
				"outCharset":"utf-8",
				"notice":0,
				"platform":"h5",
				"needNewCode":1,
			},
			"MusicHallHomePage":{
				"module":"music.musicHall.MusicHallPlatform",
				"method":"MobileWebHome",
				"param":{
					"ShelfId":[101,102,161],
				},
			},
			"hotkey":{
				"module":"tencent_musicsoso_hotkey.HotkeyService",
				"method":"GetHotkeyForQQMusicMobile",
				"param":{
					"remoteplace":"txt.miniapp.wxada7aab80ba27074",
					"searchid":"1559616839293",
				},
			}
		}
	const reqData = {
		data:JSON.stringify(data)
	}
	return jsonp(url,reqData);
}

export function search(keyword,page,zhida,perpage){
	const url = '/api/search';
	const data = {
		g_tk:5381,
		uin:'',
		format:'json',
		inCharset:'utf8',
		outCharset: 'utf-8',
		notice: 0,
		platform: 'h5',
		needNewCode: 1,
		w: keyword,
		zhidaqu: 1,
		catZhida: zhida?1:0,
		t: 0,
		flag: 1,
		ie: 'utf-8',
		sem: 1,
		aggr: 0,
		perpage,
		n: perpage,
		p: page,
		remoteplace: 'txt.mqq.all'
	}
	return axios.get(url,{
		params:data
	})
	.then(res => {
		return Promise.resolve(res.data)
	})
}