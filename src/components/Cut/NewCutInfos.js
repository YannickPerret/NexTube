import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';


function NewCutInfos(props) {
    let timeLine = props.timeLine

    const dispatch = useDispatch()

    useEffect(() => {
        if(timeLine){
            if(timeLine.begin > 0 && timeLine.end > 0){
                
            }
        }

    }, [timeLine])

    /*const deleteTimeLine = () => {

        timeLine = {}

    }*/

    const handleFormCut = (event) => {
        event.preventDefault()
        let form = document.querySelector("#FormSetInfoTimeline")

        timeLine.begin = form.begin.value
        timeLine.end = form.end.value
        timeLine.type = form.type.value
        timeLine.title = form.title.value

        form.begin.value = ""
        form.end.value = ""
        form.type.value = ""
        form.title.value = ""

        dispatch({type:"videoInfos/addToLocalCutlist", payload:timeLine})
        timeLine = undefined

    }

    if(timeLine){
        if(timeLine.begin > 0 && timeLine.end > 0){
            return (
                <div className="popupSetTimeline">
                    <form id="FormSetInfoTimeline" onSubmit={handleFormCut}>
                        <div>
                            <label>Début* : </label><input type="text" value={timeLine.begin} name="begin" required/>
                            <label>Fin* : </label><input type="text" value={timeLine.end} name="end" required />
                        </div>
                        <div>
                            <label>Type de cut* :</label> <input type="number" name="type" required/><br />
                            <label>Résumé : </label> <textarea name="title"></textarea>
                        </div>
                        <button>Ajouter</button>
                    </form>
                </div>
            );
        }
    }
    
}

export default NewCutInfos;