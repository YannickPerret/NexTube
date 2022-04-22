import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LecteurVideo from '../components/LecteurVideo';
import ListCutVideo from '../components/ListCutVideo';
import Search from '../components/search/Search';
import { getAllVideoBySearch, getVideoByURL } from '../redux/VideoReducer';

function Video() {
    const {video} = useSelector((state) => state.videoInfos)
    const dispatch = useDispatch()


    const [customCutList, setCustomCutList] = useState()

    const getDataVideo = (urlVideo, idTimeLine) =>{
        
        dispatch({type:"videoInfos/getOneVideo", payload: urlVideo})

        if(idTimeLine){
            // mettre dans la list des vidéos est cuts
            // faire un find de l'id de vidéos et filtrer pour delete tous les autres
            // faire un find de l'id de cut et fitler pour delete tous les autres 
           dispatch({type:"videoInfos/getOneCut", payload: { url : urlVideo, idCut : idTimeLine}})
        }
    }

    const handleSubmitCut = (_cutList) =>{
        setCustomCutList(_cutList)

        //filtrer les cuts
    }


    return (
        <div className='main'>
            <div className='searchBar'>
                <Search onChangeVideo={getDataVideo}/>
            </div>

            {video.length === 1 &&
            <div className='main-video'>
                <div className='customCutList'>
                    {//<ListCutVideo cutList={customCutList} url={video.idUrl}/>
}
                </div>
                <div className='videoPlayer'>
                    <LecteurVideo onSubmitCut={handleSubmitCut}/>
                </div>
            </div>
            }

        </div>
    );
}

export default Video;