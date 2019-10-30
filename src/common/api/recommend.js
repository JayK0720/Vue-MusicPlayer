import jsonp from '@/common/js/jsonp'
import {commonParams,options} from '@/common/api/config'
import axios from 'axios'
export function getRecommend(){
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
	const data = Object.assign({},commonParams,{
		platform:'h5',
		uni:0,
		needNewCode:1,
	})
	return jsonp(url,data,options)
}

export function getDiscList(){
	const url = '/api/getDiscList';
	const data = Object.assign({},commonParams,{
		platform:'yqq',
		hostUin:0,
		sin:0,
		ein:29,
		sortId:5,
		needNewCode:0,
		categoryId:10000000,
		rnd:Math.random(),
		format:'json'
	})
	return axios.get(url,{
		params:data
	}).then(res => {
		return Promise.resolve(res.data);
	})
}

export function getSongList(disstid){
	const url = `/api/getDisc`;
	const data = Object.assign({},{
		type:1,
		json:1,
		utf8:1,
		onlysong:0,
		new_format:1,
		disstid,
		g_tk:5381,
		loginUin:0,
		hostUin:0,
		format:'json',
		inCharset:'utf8',
		outCharset:'utf-8',
		platform:'yqq.json',
		notice:0,
		needNewCode:0,
		param:'jsonpCallback'
	})
	return axios.get(url,{
		params:data,
	})
	.then(res => {
		return Promise.resolve(res.data)
	})
}