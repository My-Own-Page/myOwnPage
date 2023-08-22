const searchInput = document.querySelector('#search');

const $searchBtn = document.querySelector('#searchBtn');


$searchBtn.addEventListener("click", () => {
    performSearch();
});

searchInput.addEventListener("keydown", (e) => {
    if (!e.isComposing) {
        if (e.key === 'Enter') {
            performSearch();
        }
    }
});

function performSearch() {
    const searchValue = searchInput.value;
    const googleSearch = `https://www.google.com/search?q=${searchValue}`;

    if (!searchValue == '') {
        window.open(googleSearch);
    } else {
        alert('비어있으면 안됩니다!');
    }

    searchInput.value = '';
}


// 다른 파일 갖다 붙히는 부분
const musicPlayer = document.querySelector('.musicPlayer');

fetch('./MusicPlayer/index.html')
    .then(res => res.text())
    .then(data => {
        // Extract the body content from the loaded HTML
        const bodyContent = data.match(/<body[^>]*>([\s\S]*)<\/body>/i);

        if (bodyContent) {
            musicPlayer.innerHTML = bodyContent[1];

            // Load the associated CSS separately
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = './MusicPlayer/assets/styles/app.css'; // Adjust the path based on your project structure
            document.head.appendChild(cssLink);


            // Load the associated script separately
            const jsSrc = document.createElement('script');
            jsSrc.src = './MusicPlayer/assets/scripts/app.js';
            document.head.appendChild(jsSrc);
        }
    });