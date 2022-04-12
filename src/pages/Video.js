import React, { useEffect, useState } from 'react';
import LecteurVideo from '../components/LecteurVideo';
import ListCutVideo from '../components/ListCutVideo';
import Search from '../components/Search';

function Video() {
    const [videoInfo, setVideoInfo] = useState()
    const [customError, setCustomError] = useState({
        error : false,
        message :""
    })

    const [customCutList, setCustomCutList] = useState()


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
            setVideoInfo({"url":_urlVideo})
        });
    }



    return (
        <div className='main'>
            <div className='searchBar'>
                <Search onChangeVideo={getDataVideo}/>
            </div>
            
                {customError.error &&
                <div>
                    {customError.message}
                </div>}
            {videoInfo &&
            <div className='main-video'>
                <div className='customCutList'>
                    <ListCutVideo customCutList={customCutList}/>
                </div>
                <div className='videoPlayer'>
                    <LecteurVideo video={videoInfo}/>
                </div>
            </div>
            }

        </div>
    );
}

export default Video;