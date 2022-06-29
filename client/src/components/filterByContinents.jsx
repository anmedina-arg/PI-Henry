import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../store/actions";
import { fetchCountry } from "../store/actions"

export default function FilterByContinents () {
  let country = useSelector((state) => state.country)
    const [continent, setContinent] = useState([])
    
    let dispatch = useDispatch()

    useEffect(() => {
      dispatch(fetchCountry())
  }, []) 

    function onChecked(e) {
      if (e.target.checked) {
        setContinent(
          [...continent, e.target.name],
          );
        } else {
          setContinent(
            continent.filter((continent) => continent !== e.target.name)
            );
        }
    }

    useEffect(() => {
      dispatch(filter(continent))
    }, [continent])

    let duplicateContinents = country.map((country) => country.continent) //--> saco los continentes de todos los pasises, me queda un array largo [Europa, Europa, America, Anteartida, ...]
    let uniqueContinent = new Set(duplicateContinents) //--> con el constructor Set, genero un objeto con valores unicos 
    let continents=[...uniqueContinent] //--> lo vuelvo a pasar a array para poder usar el map
//  [Antartica, Europa, America, Asia, Africa, Oceania, nuevoContinente]
    return (
        <fieldset >
            <legend>Select any continent</legend>
            { continents.map((e) => {
              return (
                <>
                <label key={e}>
                <input name={e} type="checkbox" onChange={onChecked} />
                {e}
                </label>
                <br />
                </>
                )
            })
            }
        </fieldset>
    )
}

/*
ASI ESTABAN HARCODEADOS LOS CONTINENETES
<label>
    <input name="Africa" type="checkbox" onChange={onChecked} />
    Africa
</label>
<br />
<label>
    <input name="North America" type="checkbox" onChange={onChecked} />
    North America
</label>
<br />
<label>
    <input name="South America" type="checkbox" onChange={onChecked} />
    South America
</label>
<br />
<label>
    <input name="Antarctica" type="checkbox" onChange={onChecked} />
    Antarctica
</label>
<br />
<label>
    <input name="Asia" type="checkbox" onChange={onChecked} />
    Asia
</label>
<br />
<label>
    <input name="Europe" type="checkbox" onChange={onChecked} />
    Europe
</label>
<br />
<label>
    <input name="Oceania" type="checkbox" onChange={onChecked} />
    Oceania
</label>
*/