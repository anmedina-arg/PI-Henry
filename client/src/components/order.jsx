import { useDispatch } from "react-redux"
import { ASCENDENTEPOP, DESCENDENTEPOP, ASCENDENTENAME, DESCENDENTENAME } from "../constantes/sort"
import { sort } from "../store/actions"

export default function Order () {
    const dispatch = useDispatch()   
    function onSelectChange(e){ 
        e.preventDefault()  
        dispatch(sort(e.target.value))
    }
    return (
        <fieldset >
            <legend>Select sorting by name or population</legend>
                <select name="selectName" onChange={onSelectChange}>
                    <option value="none" selected disabled hidden> Sort </option>
                    <option value={ASCENDENTENAME}>From A to Z</option>
                    <option value={DESCENDENTENAME}>From Z to A</option>
                    <option value={ASCENDENTEPOP}>From lower population</option>
                    <option value={DESCENDENTEPOP}>From higher population</option>
                </select>
        </fieldset>
        )
}