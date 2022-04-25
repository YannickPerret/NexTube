import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatTime }  from '../Helpers/Function';

function ListCutVideo(props) {

    const {video, cutLists, cutListsTemps} = useSelector((state) => state.videoInfos)

    const [localCutList, setLocalCutList] = useState(JSON.parse(localStorage.getItem('cut')) || [])
    const dispatch = useDispatch()


   /* const deleteCutInList = (element) =>{
        console.log("Delete item : ", element)

        setCutList(cutList.filter(item => item !== element))
        localStorage.setItem('cut', JSON.stringify(cutList))

        console.log(cutList)
    }*/

    /*useEffect(() => {

        console.log(localCutList.findIndex(video[0].idUrl))

        localCutList.map((element) => {

            console.log(element)

            //if(element.indexOf(video[0].idUrl) === -1){
              //  console.log(element[video[0].idUrl])
               // dispatch({type:"videoInfos/AddCutToListTemps", payload : element[video[0].idUrl]})
           // }
        })

        console.log(cutListsTemps)
    }, [localCutList])*/

    /*const handleSubmitCutList = async () => {

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
    }*/

    return (
        <div>
            <div>
                <h3>TimeLine {cutLists.length > 0 && "("+cutLists[0].dataSet.length+")"}</h3>
                <span className='cutListContentCloose'>&nbsp;</span>
            </div>
            {cutLists.length > 0 ?
            <>
                <ul> 
                    <h4>En cours d'édition</h4>
                    {localCutList.map((customTime, index) => {
                        return(<li key={index}> 
                            <div className='cutListContent orange'>
                                Titre : {customTime.title}<br /> De {formatTime(customTime.begin)} à {formatTime(customTime.end)}
                            </div>
                            <div className='cutListContentDelete' /*onClick={() => deleteCutInList(element)}*/>
                                X
                            </div>
                        </li>)
                    })}

                    <h4>Validés</h4>
                    {cutLists[0].dataSet.map((element, index) => {
                        return(<li key={index}> 
                                <div className='cutListContent green'>

                                    Titre : {element.title}<br /> De {formatTime(element.begin)} à {formatTime(element.end)}
                                </div>
                                <div className='cutListContentDelete' /*onClick={() => deleteCutInList(element)}*/>
                                    X
                                </div>
                            </li>)
                    })}
                </ul>

                <footer>
                    <button /*onClick={() => handleSubmitCutList()}*/> Valider modification de la timeline</button>
                </footer>
            </>
            : <h3>Cette vidéo ne contient pas encore de cut</h3> }
            

            
        </div>
    );
}

export default ListCutVideo;