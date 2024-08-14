//require('dotenv').config();
import axios from "axios";
export const FETCH_COUNTRY = "FETCH_COUNTRY";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const SORT = "SORT";
export const FILTER = "FILTER";
export const FECTH_ACTIVITY = "FECTH_ACTIVITY";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const RESET = "RESET";

export function fetchCountry() {
    return function (dispatch) {
        axios.get("/country") //aquí le pido a mi base de datos, no a la API
                                                        //la URL es bueno tenerla en una variable de entorno y luego concatenarla
        .then((country) => { //como esto es asincrónico, en vez de retornar el objeto, hago el dispatch. Esto nos lo da Redux-thunk
            dispatch({ //este dispatch es para despachar la acción, nos lo da redux-thunk
                type: FETCH_COUNTRY,
                payload: country.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function searchCountry(search) {
    return function (dispatch) {
        axios.get(`/country/${search}` )
        .then((country) => {
            dispatch({
                type: SEARCH_COUNTRY,
                payload: country.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function sort(order) { //ASCENDENTE o DESCENDENTE
    return {
        type: SORT,
        payload: order, // ASCENDENTE o DESCENDENTE
    };
}

export function filter(continents) {
    return {
        type: FILTER,
        payload: continents,
    };
}

export function fetchActivities() {
    return function (dispatch) {
        axios.get("/activity")
        .then((activity) => {
            dispatch({
                type: FECTH_ACTIVITY,
                payload: activity.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function addActivity () {
    return function (dispatch) {
        axios.post("/activity")
        .then((activity) => {
            dispatch({
                type: FECTH_ACTIVITY,
                payload: activity.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function filterByActivity(activity) {
    return {
        type: FILTER_BY_ACTIVITY,
        payload: activity,
    };
}

export function reset() {
    return {
        type: RESET
    }
}