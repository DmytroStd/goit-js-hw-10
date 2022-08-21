import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { refs } from './js/modules/refs.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

refs.serchCountries.addEventListener(
  'input', debounce(e => {
    const trimmedValue = refs.serchCountries.value.trim();
    cleanHtml();   
    if (trimmedValue !== '') {
        fetchCountries(trimmedValue).then(foundData => {
        if (foundData.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (foundData.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (foundData.length >= 2 && foundData.length <= 10) {
          renderCountryList(foundData);
        } else if (foundData.length === 1) {
          renderOneCountry(foundData);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countries) {
  const markup = countries.map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of 
      ${country.name.official}" width="30" hight="20">
         <b>${country.name.official}</p>
            </li>`;
    })
    .join('');
    refs.countryList.innerHTML = markup;
}

function renderOneCountry(countries) {
  const markup = countries.map(country => {
        return `<li>
      <img src="${country.flags.svg}" alt="Flag of 
      ${country.name.official}" width="30" hight="20">
        <b>${country.name.official}</b></p>
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages</b>: ${Object.values(country.languages)} </p>
            </li>`;
    })
    .join('');
    refs.countryList.innerHTML = markup;
}

function cleanHtml() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

