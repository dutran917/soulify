import React from 'react'
import {BrowserRouter as Router,Route,Link} from "react-router-dom"
import Search from './Search'
import Main from './Main'
import DisplayPlaylist from './DisplayPlaylist'
import { useState, useEffect} from 'react'
import {AiFillHome,AiOutlineSearch,AiOutlineUnorderedList,AiFillLike} from "react-icons/ai"
import {BsFillChatDotsFill} from 'react-icons/bs'
import {IoIosAddCircle} from "react-icons/io"
import {FiLogOut} from "react-icons/fi"
import {GrSpotify} from "react-icons/gr"
import Playlist from './Playlist'
import { useContext } from 'react'
import {AuthContext} from '../contexts/AuthContext'
import MyPlaylist from './MyPlaylist'
import {useLocation} from 'react-router-dom'
import CreatePlaylist from './CreatePlaylist'
function Mainpage({isPlaying,playList,onclick,clickChat,displayChat}) {
    const {
        authState: {
            user: { username }
        },
        logoutUser
    } = useContext(AuthContext)

    const logout = () => logoutUser()

    const [url,setUrl] = useState('/')
   
    const style = {
    link: {
        background: "gray",
        width: "100%",
        height:"100%",
        position:"absolute",
        zIndex: "-1",
        borderRadius: "10px",
        left: "-15px"
    }
}
    return (
      <Router >
         <div className="test-router">
         <div className = "menu">
            <Link to="/home" className="logo"> 
                <GrSpotify size="50px"></GrSpotify>
                <h2>Spotify</h2>
            </Link>
            <div className="nav">
                <Link to="/home" className="link" onClick={()=>setUrl('/')}>
                    <AiFillHome size="35px"></AiFillHome>
                    <h2>Home</h2>
                    {url=="/" && <div style={style.link}> </div>}
                </Link>
                <Link to="/search" className="link" onClick={()=>setUrl('/search')}>
                    <AiOutlineSearch size="35px"></AiOutlineSearch>
                    <h2>Search</h2>
                    {url=="/search" && <div style={style.link}></div>}
                </Link>
                <Link to="/collection/playlist" className="link" onClick={()=>setUrl('/collection/playlist')}>
                    <AiOutlineUnorderedList size="35px"></AiOutlineUnorderedList>
                    <h2>Playlist</h2>
                    {url=="/collection/playlist" && <div style={style.link}></div>}
                </Link>
            </div>
            <div className='line'></div>
            <div className="nav2">
                <Link to="/create/playlist" className="link" onClick={()=>setUrl('/create/playlist')}>
                    <IoIosAddCircle size="35px"></IoIosAddCircle>
                    <h2>Create Playlist</h2>
                    {url=="/create/playlist" && <div style={style.link}></div>}
                </Link>
                <Link to="/liked-song" className="link" onClick={()=>setUrl('/liked-song')}>
                    <AiFillLike size="35px"></AiFillLike>
                    <h2>Liked Song</h2>
                    {url=="/liked-song" && <div style={style.link}></div>}
                </Link>
            </div>
            <div className='line'></div>
            </div>
           <div className='main-content'>
               { displayChat && <div className="chat-open" onClick={clickChat}> <BsFillChatDotsFill></BsFillChatDotsFill> </div> }
           <div style={{display:"flex",alignItems:"center", color:"white",marginLeft:"700px"}}>
                <h4> Welcome, {username}</h4>
                <FiLogOut  style={{marginLeft: "10px", cursor:"pointer"}} size="30px" onClick={logout}></FiLogOut>
           </div>
            <Route exact path='/home'>
                <Main playList={playList}/>
                
            </Route>
            <Route exact path='/search'>
                <Search></Search>              
            </Route>
            <Route exact path = '/collection/playlist'>
                {/* <DisplayPlaylist playList={playList}></DisplayPlaylist> */}
                <MyPlaylist></MyPlaylist>
            </Route>
            <Route exact path = '/playlist/:id'>
                <Playlist playList={playList} onclick = {onclick} isPlaying={isPlaying}></Playlist>
            </Route>
            <Route exact path = '/create/playlist' >
                <CreatePlaylist></CreatePlaylist>
            </Route>
            <Route exact path = '/liked-song' >
                
            </Route>
           </div>
         </div>
        </Router>
    )
}

export default Mainpage
