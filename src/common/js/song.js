import {getLyric} from '@/common/api/lyric'
import {ERR_OK} from '@/common/api/config'
import {Base64} from 'js-base64';
class Song {
	constructor({songid,songmid,singer,songname,albumname,duration,url,image}){
		this.songid = songid;
		this.songmid = songmid;
		this.singer = singer;
		this.songname = songname;
		this.albumname = albumname;
		this.duration = duration;
		this.url = url;
		this.image = image;
	}
	getLyric(){
		if(this.lyric) {
			return Promise.resolve(this.lyric);
		}else{
			return new Promise((resolve,reject) => {
				getLyric(this.songmid).then(res => {
					if(res.retcode === ERR_OK){
						this.lyric = Base64.decode(res.lyric);
						resolve(this.lyric);
					}else{
						reject('no lyric');
					}
				})
			})
		}
	}
}

export function createSong(musicData){
	return new Song({
		songid:musicData.songid,
		songmid:musicData.songmid,
		songname:musicData.songname,
		albumname:musicData.albumname,
		duration:musicData.interval,
		singer:formatSinger(musicData.singer),
		image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
		url:musicData.url
	})
}

function formatSinger(singer){
	const ret = [];
	if(!singer.length) return '';
	singer.forEach((item) => {
		ret.push(item.name);
	});
	return ret.join('/');
}


class DiscSong {
	constructor({id,mid,albummid,singer,duration,url,image,name}){
		this.songid = id,
		this.songmid = mid,
		this.songname = name
		this.albummid = albummid,
		this.singer = singer,
		this.duration = duration,
		this.image = image,
		this.url = url
	}
	getLyric(){
		if(this.lyric) {
			return Promise.resolve(this.lyric);
		}else{
			return new Promise((resolve,reject) => {
				getLyric(this.songmid).then(res => {
					if(res.retcode === ERR_OK){
						this.lyric = Base64.decode(res.lyric);
						resolve(this.lyric);
					}else{
						reject('no lyric');
					}
				})
			})
		}
	}
}

export function createDiscSong(musicData){
	return new DiscSong({
		id:musicData.id,
		mid:musicData.mid,
		name:musicData.name,
		albummid:musicData.album.mid,
		singer:formatSinger(musicData.singer),
		duration:musicData.interval,
		image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
		url:musicData.url
	})
}