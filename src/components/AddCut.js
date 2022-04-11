import React, { useEffect, useState } from 'react';

function AddCut(props) {
    const timeCode = props.event
    const url = props.url

    const [isOnEdit, setIsOnEdit] = useState(false)
    const [popupIsShow, setPopupIsShow] = useState(false)

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

    const handleSubmitCut = async (event, cut) =>{
        event.preventDefault()
        let popup = document.querySelector('#popupConfirmation')
        popup.innerHTML =""
        console.log("test")
        localStorage.setItem('cut', {})
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
                <label>Type de cut* :</label> <input type="text"  required/>
                <label>Résumé : </label> <textarea> </textarea>
                <button>Ajouter</button>
            </form>
        `;
        setPopupIsShow(true)

        let form = document.querySelector('#formCut')
        form.addEventListener("submit", (event) => {
            handleSubmitCut(event, cut)
        })
    }

    return (
        <div>
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