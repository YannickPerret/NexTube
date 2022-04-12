import React, { useEffect, useState } from 'react';

//Tester que le cut de fin ne soit pas plus petit que le cut de début


function AddCut(props) {
    const timeCode = props.event
    const url = props.url

    const [isOnEdit, setIsOnEdit] = useState(false)
    const [popupIsShow, setPopupIsShow] = useState(false)
    /*const [tempCut, setTempCut] = useState({
        begin : null,
        end : null
    })*/

    useEffect(()=> {
        if(!localStorage.getItem("cut")){
            localStorage.setItem("cut", {})
        }

    })

    const handleIsOnEdit = () =>{

        if(isOnEdit){
            setIsOnEdit(false)
            let temp = JSON.parse(localStorage.getItem('cut'))
            temp.end = timeCode
            localStorage.setItem('cut', JSON.stringify(temp))
        }
        else{
            setIsOnEdit(true)
            localStorage.setItem('cut', JSON.stringify({"begin":timeCode}))
        }

    
        let newCut = JSON.parse(localStorage.getItem('cut'))
        if(newCut.begin && newCut.end){
            showCutOption(newCut)
        }
    }


    const handleSubmitCut = async (cut, type) =>{
        let popup = document.querySelector('#popupConfirmation')
        popup.innerHTML =""
        setPopupIsShow(false)
        //fetch pour update le cut in bdd

        await fetch("http://127.0.0.1:3500/api/cut/add", {
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                url: url,
                type: parseInt(type),
                timeCode : cut
            })
        }).catch(e => console.error(e))
    }

    const showCutOption = (cut) =>{
        let popup = document.querySelector('#popupConfirmation')
        popup.innerHTML = `
            <form id="formCut">
                <label>Début* : </label><input type="text" value=${cut.begin} required />
                <label>Fin* : </label><input type="text" value=${cut.end} required />
                <label>Type de cut* :</label> <input type="number" name="type" required/>
                <label>Résumé : </label> <textarea> </textarea>
                <button>Ajouter</button>
            </form>
        `;
        setPopupIsShow(true)

        let form = document.querySelector('#formCut')
        
        form.addEventListener("submit", (event) => {
            event.preventDefault()
            //handleSubmitCut(cut, form.type.value)
            props.onSubmitCut([{title:"test", type:form.type.value, begin: cut.begin, end: cut.end}])

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