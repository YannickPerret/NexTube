import React, { useEffect, useState } from 'react';

//Tester que le cut de fin ne soit pas plus petit que le cut de début


function AddCut(props) {
    const timeCode = props.event

    const [isOnEdit, setIsOnEdit] = useState(false)
    const [popupIsShow, setPopupIsShow] = useState(false)


    useEffect(()=> {
        if(!localStorage.getItem("cut")){
            localStorage.setItem("cut", {})
        }

    })

    const handleIsOnEdit = () =>{

        let temps = []

        let oldCut = []
        let currentIndex = 0

        if(localStorage.getItem('cut') !== "[object Object]"){
            JSON.parse(localStorage.getItem('cut')).map(element => {
                oldCut.push(element)
            })
        }

        if(!isOnEdit){
            setIsOnEdit(true)
            oldCut.push({"begin":timeCode, "end":0, title:"", type:0})

            localStorage.setItem('cut', JSON.stringify(oldCut))
        }
        else{
            setIsOnEdit(false)

             oldCut.forEach((element, index) => {
                 if(index + 1 === oldCut.length){
                     currentIndex = index
                     oldCut[index].end = timeCode
                 }
             })
             localStorage.setItem('cut', JSON.stringify(oldCut))
        }

        if(oldCut[currentIndex].begin > 0 && oldCut[currentIndex].end > 0 && currentIndex !== 0){
            showCutOption(currentIndex)
        }
    }

    const showCutOption = (cutIndex) =>{
        let cutList = JSON.parse(localStorage.getItem('cut'))
        let popup = document.querySelector('#popupConfirmation')

        cutList.map((element, index) => {
            if (index === cutIndex){
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

        setPopupIsShow(true)

        let form = document.querySelector('#formCut')
        form.addEventListener("submit", (event) => {
            event.preventDefault()

            cutList.map((element, index) =>{
                if(index === cutIndex){
                    element.title = form.title.value !== "undefined" ? form.title.value : null
                    element.type = form.type.value
                }
            })

            form.beginTime.value = ""
            form.endTime.value = ""
            form.type.value = ""
            form.title.value = ""

            localStorage.setItem('cut', JSON.stringify(cutList))

            document.querySelector('#popupConfirmation').innerHTML = ""
            setPopupIsShow(false)

            props.onSubmitCut(cutList)
        })
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