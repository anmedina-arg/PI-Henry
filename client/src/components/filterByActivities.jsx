import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterByActivity, fetchActivities } from "../store/actions"

export default function FilterByActivity () {
    
    useEffect(() => {
        dispatch(fetchActivities())
    }, []) 

    let allActivities = useSelector((state) => state.activity)
    let duplicateActivities = allActivities.map((activity) => activity.name) // [caminar, volar, caminar]
    let uniqueActivities = new Set(duplicateActivities)
    let activities = [...uniqueActivities]

    const dispatch = useDispatch() 
    
    function onSelectChange(e){ 
        e.preventDefault()
        console.log(e.target.value)  
        dispatch(filterByActivity(e.target.value))
    }
    
    return (
        <fieldset>
        <legend>Activities</legend>
        <select onChange={onSelectChange}>
          <option value="none" selected disabled hidden> Activities </option>
          <option name="" value="">Reset</option>
            { activities.map((activity) => {
              return (
                   <option key={activity} name={activity} value={activity}>{activity}</option> 
                   )
                })
            }
        </select>
    </fieldset>
    )
}