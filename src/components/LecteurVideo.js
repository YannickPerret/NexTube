import React, {useState } from 'react';
import YouTube from 'react-youtube';
import AddCut from './AddCut';

function LecteurVideo(props) {
    const videoData = props.video
    const [timePlayed, setTimePlayed] = useState(0)
    const [cutList, setcutList] = useState([])
    let test = []

    const videoOptions = {
        height : '720',
        width: '1440',
        playerVars:{
            autoplay : 1,
        }
    }

    const handleChangeState = (event) =>{
         setInterval(() => {

            setTimePlayed(Math.floor(event.target.getCurrentTime()))

            videoData.dataSet.map(element => {
                if(Math.floor(event.target.getCurrentTime()) === element.begin){
                    console.log("Move Video ! ", element.title)
                    event.target.seekTo(element.end, true)
                }
            })
            
        }, 1000)
    }

    const handleCut = (_cut) =>{
        
        test.push(_cut)

        console.log(test)
    }

    return (
        <>
            <YouTube
            videoId={videoData.url} 
            opts={videoOptions}
            onStateChange={handleChangeState}
            containerClassName='youtubeContainer'
            /> 

            <AddCut event={timePlayed} url={videoData.url} onSubmitCut={handleCut}/>
        </> 
    );
}

export default LecteurVideo;