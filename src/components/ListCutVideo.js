import React, { useState } from 'react';

function ListCutVideo(props) {
    const [cutList, setCutList] = useState(JSON.parse(localStorage.getItem('cut')) || props.cutList)

    const deleteCutInList = (element) =>{
        console.log("Delete item : ", element)

        setCutList(cutList.filter(item => item !== element))
        localStorage.setItem('cut', JSON.stringify(cutList))

        console.log(cutList)
    }


    const handleSubmitCutList = async () => {

        await fetch("http://127.0.0.1:3500/api/cut/add", {
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                url: props.url,
                timeCode : cutList
            })
        })
        .then(message => {
            console.log(message)
            localStorage.setItem('cut', {})
        })
        .catch(e => console.error(e))
    }

    return (
        <div>
            <div><h3>Sommaire ({cutList.length})</h3></div>
            <ul> 
            {cutList ?
            cutList.map((element, index) => {
                return(<li key={index}>
                    <div className='cutListContent'>
                        Titre : {element.title}<br /> Début : {element.begin} <br />Fin : {element.end}<br />Type : {element.type}
                    </div>
                    <div className='cutListContentDelete' onClick={() => deleteCutInList(element)}>
                        X
                    </div>
                   
                        </li>)
            }): <li>Vous n'avez pas encore ajouter de cut</li>}
            </ul>

            <footer>
                <button onClick={() => handleSubmitCutList()}> Valider mes ajouts</button>
            </footer>
        </div>
    );
}

export default ListCutVideo;