// 유튜브 URL에서 영상 id를 얻는 정규식 표현
let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
let matchs = url.match(regExp);
let youtube_id = matchs[7];
let musicObj;

// 영상의 제목 얻기
const noEmbed = 'https://noembed.com/embed?url=';
const urlForm = "https://www.youtube.com/watch?v=";
const fetch_url = noEmbed + urlForm + youtube_id;
fetch(fetch_url)
    .then(res => res.json())
    .then(data => {
        const { thumbnail_url, title } = data;
        musicObj = {
            title: title,
            thumb: thumbnail_url,
            url: url,
            youtube_id: youtube_id,
        };
        playlists.push(musicObj);
        savePlaylist();
    });