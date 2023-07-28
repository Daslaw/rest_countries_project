const dropDown = document.querySelector('.dropdownMenu');
const dropOptions = document.querySelector('.drop-options');
const toggle = document.querySelector('.toggle');
const icon = document.querySelector('.bx');
const countries = document.querySelector('.countries');
const search = document.querySelector('.search');
const regions = document.querySelectorAll('.regions');
const regionName = document.getElementsByClassName('regionName');

toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggle.classList.toggle('dark-mode');
    icon.classList.toggle('bxs-moon');
    dropDown.classList.toggle('dark-mode');
});

dropDown.addEventListener('click', () => {
    dropOptions.classList.toggle('show-options');
});

async function getCountries() {
    try {
        const URL = await fetch('https://restcountries.com/v2/all');
        const res = await URL.json();
        console.log(res);

        res.forEach(api => {
            showCountry(api);
        });
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

getCountries();


function showCountry(data) {
    const country = document.createElement('div');
    country.classList.add('country');
    country.innerHTML =
    `<div class="country-img">
    <a href="./country.html?code=${data.alpha3Code}"><img src=${data.flag} alt=""></a>
      </div>
      <div class="country-details">
                <h5 class="countryName">${data.name}</h5>
                <p><strong>Population: </strong>${data.population}</p>
                <p class="regionName"><strong>Region: </strong>${data.region}</p>
                <p><strong>Capital: </strong>${data.capital}</p>
      </div>`;
    countries.appendChild(country);
}



const countryName = document.getElementsByClassName('countryName');

search.addEventListener('input', e => {
    Array.from(countryName).forEach(country => {
        if(country.innerText.toLowerCase().includes(search.value.toLowerCase())){
            country.parentElement.parentElement.style.display = "grid";
        } else {
            country.parentElement.parentElement.style.display = "none";
        }
    })
})

function filterByRegion(region) {
    Array.from(regionName).forEach(element => {
        const isVisible = element.innerText.includes(region) || region === 'All';
        element.parentElement.parentElement.style.display = isVisible ? 'grid' : 'none';
    });
}

regions.forEach(region => {
    region.addEventListener('click', () => {
        filterByRegion(region.innerText);
    });
});
