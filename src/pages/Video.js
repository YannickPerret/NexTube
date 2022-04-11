import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LecteurVideo from '../components/LecteurVideo';
import Search from '../components/Search';
import { setVideoInfo } from '../redux/reducer/videos';

function Video() {
    const [videoInfo, setVideoInfo] = useState()
    const [customError, setCustomError] = useState({
        error : false,
        message :""
    })

    const video = useSelector(state => state.video.value)



    const getDataVideo = async (_urlVideo) =>{
        await fetch(`http://localhost:3500/api/getVideo/${_urlVideo}`, {
            method:"GET"
        })
        .then(response => response.json())
        .then((data) => {
            if(data.message){
                setCustomError({error : true, message: data.message})
            }else{
                setVideoInfo(data)
                setCustomError({error : false, message:""})
            }
        })
        .catch(e => {
            console.error(e)
        });
    }


    return (

        <div>
            <Search onChangeVideo={getDataVideo}/>
            <br />
            {customError.error ? 
                <div>
                    {customError.message}
                </div> :null}
            {videoInfo && <LecteurVideo video={videoInfo} />}
        </div>
    );
}

export default Video;