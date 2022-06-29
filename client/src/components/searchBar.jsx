import { useState, useEffect } from "react";
import { searchCountry } from "../store/actions";
import { useDispatch } from "react-redux";
import { fetchCountry } from "../store/actions"

export default function SearchBar() {

    const [search, setSearch] = useState("")

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCountry())
    }, []) 
    
    function onSubmit (e) {
        e.preventDefault();
        dispatch(searchCountry(search))
        setSearch("")
    }
    function onInputChange (e) {
        e.preventDefault();
        setSearch(e.target.value)

    }

    return ( 
        <div>
            <form onSubmit={onSubmit}>
                <input type = "text" onChange={onInputChange} value={search} placeholder="Type a country"/>
                <input type = "submit" value = "Search"/>
            </form>
        </div>
    )
}