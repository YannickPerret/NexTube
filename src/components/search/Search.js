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

        if(userSearchText.length > 2){
            getVideoList()
        }
        else{
            setListVideoByUserSearch()
            setListCutVideo()
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
                    <input type="text" name='userSearchVideo' value={userSearchText} onChange={(e => setUserSearchTest(e.target.value))} placeholder='Rechercher' autoComplete='off'/>
                    <button type='submit'>Visionner</button>
                </form>
            </div>

            {listVideoByUserSearch && userSearchText.length > 3 &&
                <div className='searchBarResult'>
                    <ul>

                        {listVideoByUserSearch.map((element) => {
                             return (
                                    <li key={element.id} onClick={() => onSearchVideo(element.url)} onMouseOver={() => setOnMouseOver(element.url)} onMouseOut={() => setOnMouseOver(false)}>
                                        {element.idPlateforme === 1 && "YOUTUBE"}  |  {element.title} <br />
                                        {element.isEdit ? listCutVideo[element.url].length+" cut disponible" : "Créer votre timeLine de cut !"}
                                        
                                        {onMouseOver && element.url === onMouseOver && 
                                            <ul> 
                                                <li><h3>Custom TimeLine Cut {listCutVideo[onMouseOver].length}</h3></li>
                                                {
                                                    listCutVideo[onMouseOver].map((subItem) => {
                                                        return <li key={subItem.idSkip} onClick={() => {console.log("terst")}}>{subItem.title}</li>
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