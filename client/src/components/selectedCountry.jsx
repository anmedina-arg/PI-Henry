import CountryCard from "./countryCard";
import { useSelector } from "react-redux"

export default function SelectedCountry () {
    
    let searchedCountry = useSelector((state) => state.filteredCountry)
    return (
        <div>
            <CountryCard 
                key={searchedCountry?.name} 
                name = {searchedCountry?.name} 
                img_flag = {searchedCountry?.img_flag} 
                continent = {searchedCountry?.continent}/>
        </div>
    )
}

