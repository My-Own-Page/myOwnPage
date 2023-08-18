const playlists = [];

const apiKey = 'AIzaSyDJc5j8DiQKa4h3AtRy3luGOpzT5nbVMI0';

const linkInput = document.getElementById('urlInput');
const playlistContainer = document.querySelector('.musicUl');

let currentIframe = null;



linkInput.addEventListener("keydown", async (e) => {
  if (!e.isComposing && e.key === 'Enter') {
    const linkValue = linkInput.value;
    const youtubeId = extractYouTubeId(linkValue);

    if (youtubeId) {
      try {
        const videoData = await fetchVideoData(youtubeId);
        console.log(videoData);
        const musicObj = {
          title: truncateTitle(videoData.title, 35),
          thumb: videoData.thumbnail_url,
          url: linkValue,
          youtube_id: youtubeId,
        };
        playlists.push(musicObj);
        savePlaylist();
        linkInput.value = '';

        // Add a new <li> element to the <ul> with the video information
        const li = document.createElement('li');
        li.innerHTML = `
          <img src="${musicObj.thumb}" alt="${musicObj.title}">
          <h3>${musicObj.title}</h3>
          <i class="fa-solid fa-circle-xmark" style="color: #ff0000;"></i>
        `;

        // Add a click event listener to the <li> element to play music
        li.addEventListener('click', async () => {
          const $musicPlayer = document.querySelector('.musicPlayer');
          console.log("Clicked li");
          if (currentIframe) {
            console.log("Removing current iframe");
            $musicPlayer.removeChild(currentIframe);
          }
          li.style.backgroundColor = '#FFFFCC';

          const range = document.createRange();
          const fragment = range.createContextualFragment(videoData.html);

          $musicPlayer.appendChild(fragment);

          const newIframe = $musicPlayer.querySelector('iframe');
          const iframeSrc = newIframe.getAttribute('src');
          const newParam = 'autoplay=1';
          newIframe.src = iframeSrc + '&' + newParam;
          newIframe.setAttribute('width', '0px', 'height', '0px');

          console.log(newIframe.src);
          console.log("Set new current iframe:", currentIframe);
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

const stopButtonHandler = (iframe) => {
  return () => {
    console.log('버튼 눌림');
    if (iframe) {
      iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  };
};

let selectedLi = null; // To keep track of the originally selected <li> element

playlistContainer.addEventListener('click', (event) => {
  const li = event.target.closest('li');
  if (!li) return; // If the click wasn't on an <li> element, exit

  // Reset the previously selected <li> element if there was one
  if (selectedLi) {
    selectedLi.style.backgroundColor = ''; // Reset background color
  }

  selectedLi = li; // Set the currently selected <li> element
  li.style.backgroundColor = '#FFFFCC'; // Change background color

  // Add click event listener to the <i> element inside the <li>
  const $stopButton = li.querySelector('.fa-circle-xmark');
  $stopButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling to the <li> element
    if (currentIframe && currentIframe.parentElement === li) {
      currentIframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
      li.removeChild(currentIframe);
      currentIframe = null; // Reset the currentIframe
    }
    li.remove(); // Remove the <li> element from the playlist
  });
});



function truncateTitle(title, maxLength) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  }
  return title;
}

function extractYouTubeId(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v ?=?([^#\&\?]*).*/;
  const matches = url.match(regExp);
  return matches && matches[7] ? matches[7] : null;
}

async function fetchVideoInfo(youtubeId) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&key=${apiKey}&part=contentDetails`;
  console.log(youtubeId);
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
  return data.items[0];
}

async function fetchVideoData(youtubeId) {
  const noEmbed = 'https://noembed.com/embed?url=';
  const fetchUrl = `${noEmbed}https://www.youtube.com/watch?v=${youtubeId}`;

  const response = await fetch(fetchUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch video data");
  }

  const data = await response.json();
  return data;
}

function savePlaylist() {
  // Implement your playlist saving logic here
}

