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
		url:`http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
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