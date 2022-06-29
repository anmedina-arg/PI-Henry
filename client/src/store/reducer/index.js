import { ASCENDENTENAME, ASCENDENTEPOP } from "../../constantes/sort";
import { FETCH_COUNTRY, SEARCH_COUNTRY, SORT, FILTER, FECTH_ACTIVITY, FILTER_BY_ACTIVITY, RESET } from "../actions";

const initialState = { // no es buena idea duplicar información en el front, pero por como está hecho el PI vamos a tener que hacer algo así
    country: [],
    filteredCountry: [],
    activity: []
}

export default function reducer (state = initialState, action) {
    switch(action.type) {
        case FETCH_COUNTRY:
            return {
                ...state,
                country: action.payload,
                filteredCountry: action.payload
            }
        case SEARCH_COUNTRY:
            return {
                ...state,
                filteredCountry: action.payload
            }
        case SORT:
            let orderByName = [...state.filteredCountry]
            orderByName = orderByName.sort((a, b) => {
                if(action.payload.includes("NAME")){
                    if (a.name > b.name){
                        return (action.payload === ASCENDENTENAME ? 1 : -1);
                    }
                    if (a.name < b.name){
                        return (action.payload === ASCENDENTENAME ? -1 : 1);
                    }
                    return 0
                } else {
                    if (a.population > b.population){
                        return (action.payload === ASCENDENTEPOP ? 1 : -1);
                    }
                    if (a.population < b.population){
                        return (action.payload === ASCENDENTEPOP ? -1 : 1);
                    }
                    return 0
                }
                
            })
            return {
                ...state,
                filteredCountry: orderByName
            }
        case FILTER:
            let countries = [...state.country]
            let filteredCountries = []
            let continents = action.payload 
            if(continents.length > 0) {
                filteredCountries = continents.map((continent) => { 
                 return countries.filter((country) => country.continent === continent)
            }).flat()
            
            } else {
                filteredCountries = countries
            }
            return {
                ...state,
                filteredCountry: [...filteredCountries]
            }
        case FECTH_ACTIVITY:
            return {
                ...state,
                activity: action.payload,
                filteredCountriesByActivity: state.country
            }
        case FILTER_BY_ACTIVITY:
            let allCountries = [...state.country];

            let activityFilter = action.payload === "" ? allCountries : allCountries.filter((country) => country.Activities && country.Activities.map((actividad) => actividad.name).includes(action.payload))
           
            return {
                ...state,
                filteredCountry: [...activityFilter]
            }
        case RESET:
            return {
                ...state,
                filteredCountry: [...state.country]
            }
        default: 
            return state
    }
}