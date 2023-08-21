const playlists = [];

const apiKey = 'AIzaSyDJc5j8DiQKa4h3AtRy3luGOpzT5nbVMI0';


const linkInput = document.getElementById('urlInput');
const playlistContainer = document.querySelector('.musicUl');
const $musicPlayer = document.querySelector('.musicPlayer');

let currentIframe = null;
let selectedLi = null;
const playerArray = [];

linkInput.addEventListener("keydown", async (e) => {
  if (!e.isComposing && e.key === 'Enter') {
    const linkValue = linkInput.value;
    const youtubeId = extractYouTubeId(linkValue);
    console.log(youtubeId);

    if (youtubeId) {
      try {
        const videoData = await fetchVideoData(youtubeId);
        console.log(videoData);
        const musicObj = {
          title: truncateTitle(videoData.snippet.title, 35),
          thumb: videoData.snippet.thumbnails.default.url,
          url: linkValue,
          youtube_id: youtubeId,
        };
        playlists.push(musicObj);
        savePlaylist();
        linkInput.value = '';

        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${musicObj.thumb}" alt="${musicObj.title}">
            <h3>${musicObj.title}</h3>
            <i class="fa-solid fa-circle-xmark fa-xl" style="color: #ff0000;"></i>
          `;

        li.addEventListener('click', async () => {
          const newIframe = document.createElement('iframe');
          newIframe.setAttribute('src', `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`);
          newIframe.setAttribute('width', '0');
          newIframe.setAttribute('height', '0');
          newIframe.setAttribute('frameborder', '0');
          newIframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
          newIframe.allowFullscreen = true;

          if (currentIframe) {
            $musicPlayer.removeChild(currentIframe);
          }
          li.style.backgroundColor = '#FFFFCC';

          $musicPlayer.appendChild(newIframe);
          currentIframe = newIframe;
        });

        playlistContainer.appendChild(li);
      } catch (error) {
        console.error("에러 요인:", error);
      }
    } else {
      console.log("URL이 잘못됨");
    }
  }
});

playlistContainer.addEventListener('click', (event) => {
  const li = event.target.closest('li');
  if (!li) return;

  if (selectedLi && selectedLi !== li) {
    selectedLi.style.backgroundColor = '';
  }

  selectedLi = li;
  li.style.backgroundColor = '#FFFFCC';

  const $stopButton = li.querySelector('.fa-circle-xmark');
  $stopButton.addEventListener('click', (event) => {
    event.stopPropagation();
    removeMusicItem(li);
  });
});

function removeMusicItem(li) {
  const iframes = $musicPlayer.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    $musicPlayer.removeChild(iframe);
    if (iframe === currentIframe) {
      currentIframe = null;
    }
  });

  li.remove();
}

const pauseMusicItem = () => {
  playerArray.forEach(player => {
    player.pauseVideo();
  });
};

const $pauseButton = document.querySelector('.fa-circle-pause');
$pauseButton.addEventListener('click', pauseMusicItem);

function truncateTitle(title, maxLength) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  }
  return title;
}

function extractYouTubeId(url) {
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const matches = url.match(regExp);
  return matches && matches[1] ? matches[1] : null;
}

async function fetchVideoData(youtubeId) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&key=${apiKey}&part=snippet`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.items[0];
}

function savePlaylist() {
  // Implement your playlist saving logic here
}