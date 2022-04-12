import React, { useEffect, useState } from 'react';

function ListCutVideo(props) {
    let cutList = props.customCutList

    return (
        <div>
            <div><h3>Vos cuts créés</h3></div>
            <ul> 
            {  cutList ?
            cutList.map((element, index) => {
                return(<li>
                    {index+1} titre : {element.title}, TimeCode début : {element.begin}, TimeCode fin : {element.end}, type : {element.type}
                        </li>)
            }): <li>Vous n'avez pas encore ajouter de cut</li>}
            </ul>

            <footer>
                <button> Valider mes ajouts</button>
            </footer>
        </div>
    );
}

export default ListCutVideo;