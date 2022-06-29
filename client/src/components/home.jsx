import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterByActivities from "./filterByActivities";
import Country from "./country";
import FilterByContinents from "./filterByContinents";
import Order from "./order";
import Paginado from "./paginado";
import SearchBar from "./searchBar";
import "../styles/home.css";
import { reset } from "../store/actions";


export default function Home () {

    const dispatch = useDispatch();

    let allCountries = useSelector((state) => state.filteredCountry)

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ countriesPerPage ] = useState(10)

    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountry = allCountries.slice(indexOfFirstCountry,indexOfLastCountry)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    return (
        <div className="div_conteiner bak_img_home">
            <div >
                <section className="section_home_container">
                    <SearchBar />
                    <FilterByActivities />
                    <FilterByContinents />
                    <Order />
                    <button onClick={() => dispatch(reset())}> Clean Filters </button>
                </section>
            </div>
            <div>
                    <Paginado
                        countriesPerPage={countriesPerPage}
                        allCountries={allCountries.length}
                        paginado={paginado}
                    />
                <Country currentCountry={currentCountry} />
            </div>
        </div>

    )
}