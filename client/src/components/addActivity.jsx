import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { fetchCountry } from "../store/actions"
import "../styles/activities.css"

export default function AddActivity () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allCountry = useSelector((state) => state.country)
    //para que me cargue los paises
    useEffect(() => {
        dispatch(fetchCountry())
    }, []) 
    //para ordenar por nombre el array allCountry
    const countryO = allCountry.sort((a,b) => {
        if (a.name < b.name) {
            return -1}
        if (a.name > b.name) {
            return 1}
        return 0
    })

    const season = ['Summer','Outumn','Winter','Spring']
    const [activity, setActivity] = useState({
        name: "",
        dificult: "",
        time: "",
        season: "",
        country: [],
    })
    //Este estado local es para el manejo de errores
    const [errors, setErrors] = useState({
        name: "Name is required",
        dificult: "dificult is required",
        time: "Time is required",
        // season: "Season is require",
        // country: "Please select at least one country",
      });

    //este estado local es para los paises seleccionados
    // const [countryS, setCountryS] = useState([])

//onSubmit
function onSubmit (e) {
        e.preventDefault()
        if(Object.keys(errors).length === 0) {
            axios.post("http://localhost:3001/api/activity",activity)
            alert("Successfully")
            navigate("/home")
        } else {
            alert("Please complete the inputs")
        }
      }

//funcion onselect
      function onSelect (e) {
        if(!activity.country.includes(e.target.value)){
            setActivity({
                ...activity,
                country: [...activity.country , e.target.value]
        })
            // setActivity({
            //     ...activity,
            //     country: [...]
            // })
        }
      }
//onchange
      function onInputChange(e) {
        e.preventDefault();
        setActivity({
          ...activity,
          [e.target.name]: e.target.value,
        });
    
        setErrors(validate({ ...activity, [e.target.name]: e.target.value }));
        console.log(activity)
      }

//checked
function onChecked(e) {
    console.log(e.target.value)
    if (e.target.checked) {
      setActivity({
        ...activity,
        [e.target.name]: e.target.value,
      });
        setErrors(
          validate({
            ...activity,
            [e.target.name]: e.target.value,
          }));
    } else {
      setActivity({
        ...activity,
        [e.target.name]: ""
      });
        setErrors(
          validate({
            ...activity,
            [e.target.name]: ""
          })
        );
    }
  }
      //funcion para validar
      function validate(input) {
        let errors = {};
//name
        if (input.name.length === 0) errors.name = "Name is requerid";
        else if (!/[a-z\-_\s]+$/i.test(input.name)) {
          errors.name = "Name is invalid";
        } //[a-z] cualquier letra \d cualquier numero \- se permite - y _ \s espacios en blanco
//dificult
        if( input.dificult.length === 0) errors.dificult = "Dificult is requerid"
        else if (parseFloat(input.dificult) < 0 || parseFloat(input.dificult) > 5)
        errors.dificult = "enter a number between 0 and 5";
//time
        if (input.time.length === 0) errors.time = "Time is required";
        else if (parseFloat(input.time) < 1 || parseFloat(input.time) > 24) errors.time = "Specify a time to enjoy";

        return errors
    }
//function para eliminar boton
function onClick (e) {
    console.log(e.target)
    e.preventDefault()
    setActivity({
        ...activity,
        country: activity.country.filter((country) => e.target.value !== country)
    }
    )
}

    //función para el botón cancel
      function cancel(e) {
        e.preventDefault();
        navigate("/home");
      }
    //desde aqui va el return****************************************************************************************
    return (
        <div className="container_add_activity">
        <header>
            <h2 className="title_addactivity">Add activities</h2>
        </header>
          <form className="main" onSubmit={onSubmit}>
              <div className="input_group">
                    <label htmlFor="name" className="titles_activities">
                    Nombre de la actividad:
                    </label>
                      <input type="text" id="name" name="name" className="input_create" onChange={onInputChange}/>
                    <p className={"validation"}>{errors.name}</p>
              </div>
              <div className="input_group">
                    <label htmlFor="dificult" className="titles_activities">
                    Dificult :
                    </label>
                      <input type="number" id="dificult" name="dificult" step="0.5" className="input_create" onChange={onInputChange} />
                    <p className={"validation"}>{errors.dificult}</p>
              </div>
              <div className="input_group">
                    <label htmlFor="time" className="titles_activities">
                    Time (hs):
                    </label>
                      <input type="number" id="time" name="time" step="1" className="input_create" onChange={onInputChange} />
                    <p className={"validation"}>{errors.time}</p>
              </div>
            <div className="containerFieldsets">
                <legend className="titles_activities">Season</legend>
                    { season.map((season) => {
                        return (
                            <label className="label_season">
                              <input name="season" type="checkbox" value={season} onChange={onChecked}/>
                            {season}
                            </label>
                        )
                    })                   
                    }
            </div>
            <div>
                <label htmlFor="name" className="titles_activities">
                Select any country:
                </label>
                <div className="select_country_container">
                    <select className="select_country"onChange={onSelect}>
                        { countryO.map((e) => {
                            return (
                                <option name={e.name} value={e.name} >{e.name}</option>
                        )
                    })
                    }
                    </select>
                    { activity.country.length > 0 ? 
                        activity.country.map((country, i) => {
                        return (
                        <label className="label_country">
                        {country}
                          <button className="btn_unselected_country" value={country} onClick={onClick}>X</button>
                        </label>)})
                        : <></>}
                </div>
              </div>
              <div className="containerButtonForm">
                <input className="buttonForm" type="submit" value="submit" />
                <input className="buttonForm" type="button" value="cancel" onClick={cancel} />
              </div>
            </form>
        </div>
        );
      }