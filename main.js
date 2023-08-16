const searchInput = document.querySelector('#search');

const $searchBtn = document.querySelector('#searchBtn');


$searchBtn.addEventListener("click", () => {
    performSearch();
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchValue = searchInput.value;
    const googleSearch = `https://www.google.com/search?q=${searchValue}`;

    window.open(googleSearch);

    searchInput.value = '';
}