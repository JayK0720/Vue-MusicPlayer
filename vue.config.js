const axios = require('axios');
module.exports = {
	devServer:{
		before(app){
			app.get('/api/getDiscList',function(req,res){
				const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
				axios.get(url,{
					headers:{
						referer:'https://c.y.qq.com/',
						host:'c.y.qq.com',
					},
					params:req.query,
					responseType:'json'
				})
				.then(response => {
					res.json(response.data);
				})
				.catch(err => {
					console.log(err);
				})
			});
			app.get('/api/getSongUrl',function(req,res){
				const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
				axios.get(url,{
					headers:{
						referer:'https://u.y.qq.com/',
						host:'u.y.qq.com',
					},
					params:req.query,
				})
				.then(response => {
					res.json(response.data)
				})
				.catch(err => {
					console.log(err);
				})
			});
			app.get('/api/getLyric',function(req,res){
				const url = `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?-=MusicJsonCallback_lrc`;
				axios.get(url,{
					headers:{
						referer:'https://u.y.qq.com/',
						host:'u.y.qq.com',
					},
					params:req.query
				})
				.then(response => {
					res.json(response.data);
				})
				.catch(err => {
					console.log(err);
				})
			}),
			app.get('/api/getDisc',function(req,res){
				const url = `https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg`;
				axios.get(url,{
					headers:{
						referer:'https://u.y.qq.com/',
						host:'u.y.qq.com',
					},
					params:req.query
				})
				.then(response => {
					res.json(response.data)
				})
				.catch(err => {
					console.log(err)
				})
			})
		}
	}
}