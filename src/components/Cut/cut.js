import React, { useState } from 'react';
import NewCutInfos from './NewCutInfos';

//Tester que le cut de fin ne soit pas plus petit que le cut de début

function Cut(props) {
    const timeCode = props.event

    const [timeLine, setTimeLine] = useState()
    const [isOnEdit, setIsOnEdit] = useState(false)


    const handleIsOnEdit = () =>{
    
        if (!isOnEdit){
            setIsOnEdit(true)
            setTimeLine({begin : timeCode, end:undefined, title:undefined, type:undefined})
        }
        else{
            setIsOnEdit(false)
            setTimeLine(prev => ({...prev, end : timeCode}))
        }
    }


    return (
        <div className='playerAddCut'>
            {isOnEdit ?
                <button onClick={handleIsOnEdit}>Finir cut</button>
                :
                <button onClick={handleIsOnEdit}>Commencer Cut</button>
            }

            <NewCutInfos timeLine={timeLine}/>
        </div>
    );
}

export default Cut;




//if(test.begin > 0 && test.end > 0){

                //dispatch({type:"videoInfos/addToLocalCutlist", payload :test})
    
                //const popup = document.querySelector('#popupConfirmation')
    
                //console.log(test)
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
    
        