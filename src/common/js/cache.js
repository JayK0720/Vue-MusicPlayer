const MAX_SEARCH_LENGTH = 10;
const MAX_PLAY_LENGTH = 200;
const MAX_FAVORITE_LENGTH = 100;
const PLAY_KEY = '_play_';
const SEARCH_KEY = '_search_';
const FAVORITE_KEY = '_favorite_';

export function savePlayHistory(song){
	let playHistory = JSON.parse(window.localStorage.getItem(PLAY_KEY) || "[]");
	let index = playHistory.findIndex((item) => {
		return item.songmid === song.songmid;
	});
	if(index === 0) return;
	if(index > 0){
		playHistory.splice(index,1);
	}
	playHistory.unshift(song);
	if(playHistory.length > MAX_PLAY_LENGTH){
		playHistory.pop();
	}
	window.localStorage.setItem(PLAY_KEY,JSON.stringify(playHistory));
	return playHistory;
}

export function loadPlayHistory(){
	let playHistory = JSON.parse(window.localStorage.getItem(PLAY_KEY) || '[]');
	return playHistory;
}

export function clearPlayHistory(){
	window.localStorage.removeItem(PLAY_KEY);
	return [];
}


function insertArray(array,value,compare,maxLen){
	const index = array.findIndex(compare);
	if(index === 0) return;
	if(index > 0){
		array.splice(index,1);
	}
	array.unshift(value);
	if(maxLen && array.length > maxLen){
		array.pop();
	}
}


export function saveSearchHistory(query){
	let searchHistory = JSON.parse(window.localStorage.getItem(SEARCH_KEY) || '[]');
	insertArray(searchHistory,query,(item) => {
		return item === query
	},MAX_SEARCH_LENGTH);
	window.localStorage.setItem(SEARCH_KEY,JSON.stringify(searchHistory));
	return searchHistory;
}

export function deleteSearchHistory(index){
	let searchHistory = JSON.parse(window.localStorage.getItem(SEARCH_KEY) || '[]');
	searchHistory.splice(index,1);
	window.localStorage.setItem(SEARCH_KEY,JSON.stringify(searchHistory));
}


export function loadSearchHistory(){
	let searchHistory = JSON.parse(window.localStorage.getItem(SEARCH_KEY) || '[]');
	return searchHistory;
}

export function clearSearchHistory(){
	window.localStorage.removeItem(SEARCH_KEY);
	return [];
}

export function saveFavoriteList(song){
	let favoriteList = JSON.parse(window.localStorage.getItem(FAVORITE_KEY) || '[]')
	let index = favoriteList.findIndex(item => {
		return item.songmid === song.songmid;
	});
	if(index === 0) return;
	if(index > 1){
		favoriteList.splice(index,1);
	}
	favoriteList.unshift(song);
	if(MAX_FAVORITE_LENGTH && favoriteList.length > MAX_FAVORITE_LENGTH ){
		favoriteList.pop();
	}
	window.localStorage.setItem(FAVORITE_KEY,JSON.stringify(favoriteList));
	return favoriteList;
}

export function deleteFavoriteList(song){
	let favoriteList = JSON.parse(window.localStorage.getItem(FAVORITE_KEY) || '[]')
	let index = favoriteList.findIndex(item => {
		return item.songmid === song.songmid;
	});
	favoriteList.splice(index,1);
	window.localStorage.setItem(FAVORITE_KEY,JSON.stringify(favoriteList));
	return favoriteList;
}

export function loadFavoriteList(){
	let favoriteList = JSON.parse(window.localStorage.getItem(FAVORITE_KEY) || '[]')
	return favoriteList;
}