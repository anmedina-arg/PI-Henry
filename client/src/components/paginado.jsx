import React from "react";
import { useEffect } from "react";
import "../styles/paginado.css"
import { fetchCountry } from "../store/actions"
import { useDispatch } from "react-redux";


export default function Paginado ({countriesPerPage, allCountries, paginado}) { //destructuring de las props
    const pageNumber = []
    let long = Math.ceil(allCountries/countriesPerPage)
    for (let i=0 ; i<long ; i++) {
        pageNumber.push(i+1)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCountry())
    }, []) 

    return (
        <nav >
            <ul className={"nav_paginado"}>
                { pageNumber.length > 0 && 
                pageNumber.map((number) => (
                    <li key={number} >
                        <button className="btn_paginado" onClick={() => paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}