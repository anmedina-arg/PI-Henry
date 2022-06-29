import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchCountry } from "../store/actions"
import CountryCard from "./countrycard"
import "../styles/country.css"

export default function Country ({currentCountry}) {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCountry())
    }, []) 
    
    return <div className="country_container">
        { currentCountry.map((country) => {
            const {name, img_flag, id, continent, population} = country
              return (
                <CountryCard
                    key={id}
                    name={name}
                    img_flag={img_flag}
                    continent={continent}
                    population={population}
                    />
              )
            })
        }
    </div>
}