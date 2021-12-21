import React from 'react'
import { useParams } from 'react-router-dom';
import Listtrack from './Listtrack'
function Playlist({playList,onclick,isPlaying}) {
    let {id} = useParams()
    let temp = playList.topWeek.find(item => item.id == id)
    console.log(temp)
    return (
        <div>
            <div className="header-playlist">
                <img src={temp.src} width="300px" height="300px"></img>
                <div>
                    <h3> Playlist </h3>
                    <h1>{temp.name}</h1>
                </div>
            </div>
            
            <div className="listtrack">
            <Listtrack isPlaying={isPlaying} listTrack={temp.listTrack} onclick = {onclick}></Listtrack>
            </div>
        </div>
    )
}

export default Playlist
