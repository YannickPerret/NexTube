import React, { useEffect, useState } from 'react';

function Search(props) {
 
    const [listVideoByUserSearch, setListVideoByUserSearch] = useState([])
    const [listCutVideo, setListCutVideo] = useState()


    const [userSearchText, setUserSearchTest] = useState("")
    const [onMouseOver, setOnMouseOver] = useState()

    const lengthInputSearch = 2



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

        if(userSearchText.length > lengthInputSearch){
            getVideoList()
        }
        else{
            setListVideoByUserSearch()
            setListCutVideo()
        }
    }, [userSearchText])



   const onSearchVideoWithoutCut = (event, url) => {
        if(event.target === event.currentTarget){
            props.onChangeVideo(url, false)    
            setUserSearchTest("")
        }
    }

    const onSearchVideoWithCut = (url, cutId) => {
         props.onChangeVideo(url, cutId)
         setUserSearchTest("")
    }

    return (
        <>
            <div className='searchBarInput'>
                <form onSubmit={(event) => event.preventDefault()}>
                    <input type="text" name='userSearchVideo' value={userSearchText} onChange={(e => setUserSearchTest(e.target.value))} placeholder='Rechercher' autoComplete='off'/>
                    <button type='submit'>Visionner</button>
                </form>
            </div>
            
            {listVideoByUserSearch && userSearchText.length > lengthInputSearch &&
                <div className='searchBarResult'>
                    <ul>

                        {listVideoByUserSearch.map((element) => {
                             return (
                                    <li key={element.id} onClick={(event) => onSearchVideoWithoutCut(event, element.url)} onMouseOver={() => setOnMouseOver(element.url)} onMouseOut={() => setOnMouseOver(false)}>
                                        {element.idPlateforme === 1 && "YOUTUBE"}  |  {element.title} <br />
                                        {element.isEdit ? listCutVideo[element.url].length+" cut disponible" : "Créer votre timeLine de cut !"}
                                        
                                        {onMouseOver && element.url === onMouseOver && 
                                            <ul> 
                                                <li><h3>Custom TimeLine Cut {listCutVideo[onMouseOver].length}</h3></li>
                                                {
                                                    listCutVideo[onMouseOver].map((subItem) => {
                                                        return <li key={subItem.idSkip} onClick={() => onSearchVideoWithCut(element.url, subItem.idSkip)}>{subItem.title}</li>
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