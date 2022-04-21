import React, { useEffect, useState } from 'react';

function Search(props) {
    const [userSearchText, setUserSearchTest] = useState("")
    const [listVideoByUserSearch, setListVideoByUserSearch] = useState([])
    const [onMouseOver, setOnMouseOver] = useState()
    const [listCutVideo, setListCutVideo] = useState()


    useEffect(() => {
        const getVideoList = async () => {
                try{
                    await fetch(`http://localhost:3500/api/getVideoBySearch/${userSearchText}`, {
                        method:'GET'
                    })
                    .then(res => res.json())
                    .then(data => {
                       setListVideoByUserSearch(data.video)
                       setListCutVideo(data.cutList)
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
        <>
            <div className='searchBarInput'>
                <form onSubmit={(event) => event.preventDefault()}>
                    <input type="text" name='userSearchVideo' value={userSearchText} onChange={(e => setUserSearchTest(e.target.value))} placeholder='Rechercher'/>
                    <button type='submit'>Visionner</button>
                </form>
            </div>
            {listVideoByUserSearch.length > 0 && userSearchText.length > 3 &&
                <div className='searchBarResult'>
                    <ul>
                        {listVideoByUserSearch.map((element) => {
                                return (
                                    <li key={element.id} onClick={() => onSearchVideo(element.url)} onMouseOver={() => setOnMouseOver(element.url)} onMouseOut={() => setOnMouseOver()}>
                                        {element.idPlateforme === 1 && "YOUTUBE"}  |  {element.title} <br />
                                        {element.isEdit ? listCutVideo[element.url].length+" cut disponible" : "Créer votre timeLine de cut !"}
                                        
                                        {onMouseOver && listCutVideo[element.url] && 
                                            <ul> 
                                                <li><h3>Custom TimeLine Cut {listCutVideo[element.url].length}</h3></li>
                                                {
                                                    listCutVideo[element.url].map((subItem) => {
                                                        return <li key={subItem.idSkip}>{subItem.title}</li>
                                                    })
                                                }
                                            </ul>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            }
        </>

    );
}

export default Search;