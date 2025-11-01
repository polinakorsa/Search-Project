const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const suggestions = document.querySelector('.suggestions');
const clearIcon = document.querySelector('.clear');
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', searchSuggestions);
clearIcon.addEventListener('click', clearSuggestions);

let data = null;

async function fetchData(){
    const response = await fetch(endpoint);
    data = await response.json();
}

fetchData();

function searchData(value) {
    const regex = new RegExp(value, 'gi');
    return data.filter((item) => item.city.match(regex) || item.state.match(regex));
}

function displayData(target, filteredData, searchValue) {
    if(!searchValue.length) {
        target.innerHTML = '';
        return;
    }

    target.innerHTML = filteredData.map(({city, state}) => {
        const regex = new RegExp(searchValue, 'gi');
        const cityName = city.replace(regex, `<mark>${searchValue}</mark>`);
        const stateName = state.replace(regex, `<mark>${searchValue}</mark>`)
        return `
          <li>
            <span>${cityName}, ${stateName}</span>
          </li>
        `
    }).join('');
}

function searchSuggestions() {
    if(!data){
        return;
    }

    const filteredData = searchData(this.value);
    displayData(suggestions, filteredData, this.value);
}

function clearSuggestions() {
    searchInput.value = '';
    suggestions.innerHTML = '';
}





