import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import AddCut from './AddCut';

function LecteurVideo(props) {
    const {video} = useSelector((state) => state.videoInfos)
    const videoData = video[0]

    const [playerOptions, setPlayerOptions] = useState ({
        height : '720',
        width: '1440',
        playerVars:{
            autoplay : 1,
        }
    })


    const [timePlayed, setTimePlayed] = useState(0)

    const handleChangeState = (event) =>{
         setInterval(() => {
            setTimePlayed(Math.floor(event.target.getCurrentTime()))
            videoData.dataSet.map(element => {
                if(Math.floor(event.target.getCurrentTime()) === element.begin){
                    event.target.seekTo(element.end, true)
                }
            })
        }, 1000)
    }

    const handleSubmitCut = (_cutList) =>{
        props.onSubmitCut(_cutList)
    }

    return (
        <>
            <YouTube
            videoId={videoData.idUrl} 
            opts={playerOptions}
            onStateChange={handleChangeState}
            containerClassName='youtubeContainer'
            /> 

            <AddCut event={timePlayed} url={videoData.url} onSubmitCut={handleSubmitCut}/>
        </> 
    );
}

export default LecteurVideo;