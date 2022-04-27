import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import Cut from './Cut/cut';

function LecteurVideo(props) {
    const {video, cutLists} = useSelector((state) => state.videoInfos)
    const videoData = video[0]
    const timeLine = cutLists[0]
    const [timePlayed, setTimePlayed] = useState(0)



    const playerOptions = {
        height : '720',
        width: '1440',
        playerVars:{
            autoplay : 1,
        }
    }

    const handleChangeState = (event) =>{
        if (timeLine.dataSet.length > 0){
            setInterval(() => {
                setTimePlayed(Math.floor(event.target.getCurrentTime()))
                timeLine.dataSet.map(element => {
                    if(Math.floor(event.target.getCurrentTime()) === element.begin){
                        event.target.seekTo(element.end, true)
                    }
                })
            }, 1000)
        }
    }



    return (
        <div className='videoPlayer'>
            <YouTube
            videoId={videoData.idUrl} 
            opts={playerOptions}
            onStateChange={handleChangeState}
            containerClassName='youtubeContainer'
            /> 

            <Cut event={timePlayed}/>
        </div> 
    );
}

export default LecteurVideo;