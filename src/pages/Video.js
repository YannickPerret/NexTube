import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LecteurVideo from '../components/LecteurVideo';
import ListCutVideo from '../components/ListCutVideo';
import Search from '../components/Search';
import { getVideoByURL } from '../redux/redux';

function Video() {
    const {video, loading, errorMessage} = useSelector((state) => state.videoInfos)
    const dispatch = useDispatch()

    const [customCutList, setCustomCutList] = useState()

    const getDataVideo = async (_urlVideo) =>{

        try{
            dispatch(getVideoByURL(_urlVideo))
        }catch(e){
            console.error(e)
        }
    }

    const handleSubmitCut = (_cutList) =>{
        setCustomCutList(_cutList)
    }


    return (
        <div className='main'>
            <div className='searchBar'>
                <Search onChangeVideo={getDataVideo}/>
            </div>

                {errorMessage.error &&
                <div>
                    {errorMessage.message}
                </div>}

            {video.length > 0 &&
            <div className='main-video'>
                <div className='customCutList'>
                    <ListCutVideo cutList={customCutList} url={video.idUrl}/>
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