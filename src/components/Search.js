import React, { useState } from 'react';

function Search(props) {
    const [idUrlVideo, setIdUrlVideo] = useState("")


    const searchVideo = (event) => {
        event.preventDefault()

        try{
            if(idUrlVideo.length < 1) throw new Error("Aucune vidéo n'a été demandé") 
            props.onChangeVideo(idUrlVideo)   
            setIdUrlVideo("")   
        }
        catch(e){
            console.error(e)
        }
    }

    return (
        <div>
            <form onSubmit={searchVideo}>
            <label>Url de la vidéo : </label> <br />
            <select name="plateforme">
                <option value="youtube">Youtube</option>
                <option value="twitch">Twitch</option>
                <option value="amazonVod">AmazonVideo</option>
                <option value="facebook">Facebook Live</option>
            </select>
            <input type="text" name='urlSearchVideo' value={idUrlVideo} onChange={(e => setIdUrlVideo(e.target.value))} />
            <button type='submit'>Visionner</button>
            </form>
        </div>
    );
}

export default Search;