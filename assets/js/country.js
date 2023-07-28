// country.js

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const countryCode = params.get('code');

    // Function to fetch detailed information about the country using the country code
    async function getCountryDetails() {
        try {
            const URL = await fetch(`https://restcountries.com/v2/alpha/${countryCode}`);
            const data = await URL.json();

            // Populate the country details on the page
            const countryDetailsDiv = document.querySelector('.country-details');
            countryDetailsDiv.innerHTML = `
                <h1>${data.name}</h1>
                <div class="flag">
                    <img src="${data.flag}" alt="${data.name} Flag">
                </div>
                <p><strong>Population: </strong>${data.population}</p>
                <p><strong>Region: </strong>${data.region}</p>
                <p><strong>Subregion: </strong>${data.subregion}</p>
                <p><strong>Capital: </strong>${data.capital}</p>
                <p><strong>Top Level Domain: </strong>${data.topLevelDomain.join(', ')}</p>
                <p><strong>Currency: </strong>${data.currencies[0].name} (${data.currencies[0].code})</p>
            `;

            // Fetch border countries and populate the list
            const borderCountriesDiv = document.querySelector('.border-countries');
            borderCountriesDiv.innerHTML = '<h2>Border Countries:</h2>';

            data.borders.forEach(async borderCode => {
                const borderURL = await fetch(`https://restcountries.com/v2/alpha/${borderCode}`);
                const borderData = await borderURL.json();

                const borderCountryLink = document.createElement('a');
                borderCountryLink.href = `./country.html?code=${borderData.alpha3Code}`;
                borderCountryLink.innerText = borderData.name;

                borderCountriesDiv.appendChild(borderCountryLink);
            });
        } catch (error) {
            console.error('Error fetching country details:', error);
        }
    }

    getCountryDetails();
});
