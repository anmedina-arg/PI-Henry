import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../styles/countrydetail.css"

export default function CountryDetail () {
    window.scroll(0, 0)
    const [countryD, setCountryD] = useState({})

    let {name} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3001/api/country/${name}`)
        .then((respuesta) => setCountryD(respuesta.data[0]))
        return setCountryD({})
    },[name])

    return (
        <div className="detail_container">
            {
                countryD ?
                <>
                    <img className="flag_detail" src={countryD.img_flag} alt="flag" />
                    <section>
                        <h1>Code: {countryD.id}</h1>
                        <h1>Nombre: {countryD.name}</h1>
                        <h1>Capital: {countryD.capital}</h1>
                        <h5>Continente: {countryD.continent}</h5>
                        <h5>subregion: {countryD.subregion}</h5>
                        <h5>area: {countryD.area}</h5>
                        <h5>population: {countryD.population} habitantes</h5>
                    </section>
                    <section>    
                        <h5>Actividades {countryD.Activities?.map((e)=> {
                            return (
                                <>
                                    <div>Nombre de la actividad: {e.name}</div>
                                    <div>Dificultad: {e.dificult}</div>
                                </>
                            )})}
                        </h5>
                    </section>
                </>
                : <div>loading</div>
            }
        </div>
    )
}