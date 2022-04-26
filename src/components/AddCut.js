import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Tester que le cut de fin ne soit pas plus petit que le cut de début

function AddCut(props) {
    const timeCode = props.event
    const {video, cutLists, localCutList} = useSelector((state) => state.videoInfos)

    const [isOnEdit, setIsOnEdit] = useState(false)
    const [popupIsShow, setPopupIsShow] = useState(false)

    const dispatch = useDispatch()

    const handleIsOnEdit = () =>{
        let currentIndex = 0

        if(!isOnEdit){
            setIsOnEdit(true)

            dispatch({type:"videoInfos/addToLocalCutlist", payload :{"begin":timeCode, "end":0, title:"", type:0}})
        }
        else{

            setIsOnEdit(false)

            currentIndex = localCutList.length -1

            dispatch({type:"videoInfos/updateLocalCutList", payload : {"id": currentIndex, "end": timeCode}})
            console.log("test1")
        }
        

        console.log(localCutList[currentIndex].begin, localCutList[currentIndex].end)

        if(localCutList[currentIndex].begin > 0 && localCutList[currentIndex].end > 0){
            console.log("test")
            //dispatch({type:"videoInfos/addToLocalCutlist", payload: oldCut})
            const popup = document.querySelector('#popupConfirmation')
/*
            oldCut.map((element, index) => {
                if (index === currentIndex){
                    return popup.innerHTML = `
                    <form id="formCut">
                        <label>Début* : </label><input type="text" value=${element.begin} name="beginTime" required />
                        <label>Fin* : </label><input type="text" value=${element.end} name="endTime" required />
                        <label>Type de cut* :</label> <input type="number" name="type" required/>
                        <label>Résumé : </label> <textarea name="title"></textarea>
                        <button>Ajouter</button>
                    </form>
                `;
                }
            })

            const form = document.querySelector('#formCut')

            form.addEventListener("submit", (event) => {
            event.preventDefault()

            oldCut.map((element, index) =>{
                if(index === currentIndex){
                    oldCut[index] = [(old) => [...old, {title : form.title.value !== "undefined" ? form.title.value : null}]]
                    
                   // {...oldCut[index], title = form.title.value !== "undefined" ? form.title.value : null}



                    //element.title = form.title.value !== "undefined" ? form.title.value : null
                    //element.type = form.type.value
                }
            })

            form.beginTime.value = ""
            form.endTime.value = ""
            form.type.value = ""
            form.title.value = ""

            //localStorage.setItem('cut', JSON.stringify(cutList))

            document.querySelector('#popupConfirmation').innerHTML = ""
            setPopupIsShow(false)

            props.onSubmitCut(oldCut)
        })*/

        }
    }




    const showCutOption = (cutIndex) =>{
        let tempLocalcut = localCutList

        console.log(tempLocalcut)
        
        
    }

    return (
        <div className='playerAddCut'>
            {isOnEdit ?
                <button onClick={handleIsOnEdit}>Finir cut</button>
                :
                <button onClick={handleIsOnEdit}>Commencer Cut</button>
            }
            <div id="popupConfirmation"></div>
        </div>
    );
}

export default AddCut;