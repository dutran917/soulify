import React from 'react'
import DisplayPlaylist from './DisplayPlaylist'
function Main({playList}) {
    return (
         <div className="playlist-in-main">
             <h1> Music in this week </h1>
                <DisplayPlaylist playList={playList.topWeek}></DisplayPlaylist>
            <h1> Maybe you should listen </h1>
                <DisplayPlaylist playList={playList.forMe}></DisplayPlaylist>
            <h1> Top 100 </h1>
                <DisplayPlaylist playList={playList.top100}></DisplayPlaylist>
            <h1> Music in this month </h1>
                <DisplayPlaylist playList={playList.forMe}></DisplayPlaylist>
        </div>
    )
}

export default Main
