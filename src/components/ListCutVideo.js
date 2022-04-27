import React from 'react';
import { useSelector } from 'react-redux';
import { formatTime }  from '../Helpers/Function';

function ListCutVideo(props) {

    const {cutLists, localCutList} = useSelector((state) => state.videoInfos)

    //const [localCutList, setLocalCutList] = useState([])
    //const dispatch = useDispatch()



   /* const deleteCutInList = (element) =>{
        console.log("Delete item : ", element)

        setCutList(cutList.filter(item => item !== element))
        localStorage.setItem('cut', JSON.stringify(cutList))

        console.log(cutList)
    }*/



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




    //si le cut appartient à l'utilisateur ou non
    if(cutLists[0]){
        if(cutLists[0].idUser === 1){

            return (
                <div className='customCutList'>
                    <div>
                        <h3>TimeLine {cutLists.length > 0 && "("+cutLists[0].dataSet.length+")"}</h3>
                    </div>
                    
    
                    {localCutList.length > 0 || cutLists.length > 0 ?
                        <>
                            <ul> 
                                {localCutList.length > 0 &&
                                <>
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
                                </>
                                }
        
                                {cutLists.length > 0 &&
                                <>
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
                                </>   
                                }
                            </ul>
            
                            <footer>
                                <button /*onClick={() => handleSubmitCutList()}*/> Valider modification de la timeline</button>
                            </footer>
                        </>
    
                        //Sinon 
                    : <h3>Cette vidéo ne contient pas encore de cut</h3> }
                    
        
                    
                </div>
            );
        }
        else{
    
            return (
                //Ajouter un indicateur pour savoir quel cut va arriver
                <div className='customCutList'>
                    <div>
                        <h3>TimeLine {cutLists.length > 0 && "("+cutLists[0].dataSet.length+")"}</h3>
                        <p>Créer par {cutLists[0].idUser}</p>
                    </div>
    
                    <ul>
                        {cutLists[0].dataSet.map((element, index) => {
                            return(<li key={index}> 
                                    <div className='cutListContent'>
                                        Titre : {element.title}<br /> De {formatTime(element.begin)} à {formatTime(element.end)}
                                    </div>
                                </li>)
                            })}
                    </ul>
                </div>
            )
        }
    }


}

export default ListCutVideo;