import React from 'react'
import Mainpage from './Mainpage'
import playList from '../AlbumList'
import Playing from './Playing'
import { useState } from 'react'
import Friendlist from './Friendlist'

const Home = () => {
    const [track,setTrack] = useState({})
    const [trackIndex,setTrackIndex] = useState(0)
    const tracks = playList.topWeek[0].listTrack
    const next = () => {
        if(trackIndex < tracks.length - 1){
            setTrackIndex(trackIndex + 1)
            setTrack(tracks[trackIndex])
        }
        else{
            setTrackIndex(0)
            setTrack(tracks[trackIndex])
        }
    }
    const prev = () => {
        if(trackIndex - 1 < 0)
        {
            setTrackIndex(tracks.length - 1)
            setTrack(tracks[trackIndex])
        }
        else{
            setTrackIndex(trackIndex - 1)
            setTrack(tracks[trackIndex])
        }
    }
    const [displayChat,setDisplayChat] = useState(true)
    console.log(playList)
    const friendlist = [
        {
            id: 1,
            name: "asdas asd"
        },
        {
            id: 2,
            name: "asdas asd"
        },
        {
            id: 3,
            name: "asdas asd"
        },
        {
            id: 4,
            name: "asdas asd"
        },
    ]
    const [chatting,setChatting] = useState(friendlist[0])
    const clickchat = () => {
        setDisplayChat(false)
    }
    const hideChat = () => {
        setDisplayChat(true)
    }
    const chatwith = (e) =>{
        setChatting(e)
    }
    const onclick = (e) => {
        console.log(e)
        setTrack(e)
    }
    return (
        <div className="main">
            <Mainpage isPlaying={track} playList={playList} onclick={onclick} displayChat={displayChat} clickChat={clickchat}></Mainpage>
            <Playing item={track} next={next} prev ={prev}></Playing>
           {displayChat ==false && <Friendlist chatting={chatting} chatwith={chatwith} friendlist={friendlist} hideChat={hideChat}></Friendlist>}
        </div>
    )
}

export default Home
