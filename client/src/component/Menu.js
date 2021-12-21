import React from 'react'
import {BrowserRouter as Router,Link,Route} from "react-router-dom"
import {AiFillHome,AiOutlineSearch,AiOutlineUnorderedList,AiFillLike} from "react-icons/ai"
import {IoIosAddCircle} from "react-icons/io"
import {GrSpotify} from "react-icons/gr"
import { useState, useEffect} from 'react/cjs/react.development'
import Search from './Search'
import Main from './Main'
import DisplayPlaylist from './DisplayPlaylist'
function Menu({playList,listTrack,onclick}) {   
    const [url,setUrl] = useState()
  
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
        <div className="menu">
            <Router >
            <Link to="/" className="logo"> 
                <GrSpotify size="50px"></GrSpotify>
                <h2>Spotify</h2>
            </Link>
            <div className="nav">
                <Link to="/" className="link" onClick={()=>setUrl('/')}>
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
                <a href="/playlist/create" className="link">
                    <IoIosAddCircle size="35px"></IoIosAddCircle>
                    <h2>Create Playlist</h2>
                </a>
                <a href="/liked-song" className="link">
                    <AiFillLike size="35px"></AiFillLike>
                    <h2>Liked Song</h2>
                </a>
            </div>
            <div className='line'></div>
           <div className='main-content'>
           <Route exact path = '/'>
            <Main playList={playList} listTrack={listTrack} onclick = {onclick} />
            </Route>
            <Route exact path = '/search' >
                <Search></Search>
            </Route>
            <Route exact path = '/collection/playlist'>
                <DisplayPlaylist playList={playList}></DisplayPlaylist>
            </Route>
           </div>
        </Router>
        </div>

    )
}

export default Menu
