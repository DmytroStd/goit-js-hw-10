const BASE_URL = "https://restcountries.com/v3.1/name";
const OPTIONS = "fields=,name,capital,population,flags,languages";


        export const fetchCountries = name => {
        return fetch(`${BASE_URL}/${name}?${OPTIONS}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    return [];
                }
                throw new Error(response.status);
            }
            return response.json();
        })
        .catch(error => {
            console.error(error);
        })
}
    





// export const fetchCountries = name => {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=,name,capital,population,flags,languages`
//   )
//       .then(response => {
//       if (!response.ok) {
//         if (response.status === 404) {
//           return [];
//         }
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };