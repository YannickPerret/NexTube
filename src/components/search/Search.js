import React, { useEffect, useState } from 'react';

function Search(props) {
    const [userSearchText, setUserSearchTest] = useState("")
    const [listVideoByUserSearch, setListVideoByUserSearch] = useState([])


    useEffect(() => {
        const getVideoList = async () => {
                try{
                    await fetch(`http://localhost:3500/api/getVideoBySearch/${userSearchText}`, {
                        method:'GET'
                    })
                    .then(res => res.json())
                    .then(data => {
                       console.log(data)
                       setListVideoByUserSearch(data)
                    })
                }
                catch(e){
                    console.error(e)
                }
            }

        if(userSearchText.length > 3){
            getVideoList()
        }


    }, [userSearchText])


   const onSearchVideo = (url) => {
        try{
            props.onChangeVideo(url)    
            setUserSearchTest("")
        }
        catch(e){
            console.error(e)
        }
    }

    return (
        <div>
            <form>
                <span>Rechercher une vidéo &nbsp;</span>
                <input type="text" name='userSearchVideo' value={userSearchText} onChange={(e => setUserSearchTest(e.target.value))} />
                <button type='submit'>Visionner</button>
            </form>
            {listVideoByUserSearch.length > 0 && userSearchText.length > 3 &&
                <div>
                    <h3>Résultat : </h3>
                    <ul>
                        {listVideoByUserSearch.map((element) => {
                            return <li key={element.id} onClick={() => onSearchVideo(element.url)}>
                                        {element.title} 
                                    </li>
                        })}
                    </ul>
                </div>
            }
        </div>

    );
}

export default Search;