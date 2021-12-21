import React from 'react'
import { Link } from 'react-router-dom'
function DisplayPlaylist({playList}) {
    
    return (
        <div className="display-playlist">
            <div className="playlist">
                {playList.map((item) => 
                <Link to={'/playlist/' + item.id} className="main-thumb">
                    <img  src= {item.src} width="100px" height="100px"/>
                    <h3> {item.name }</h3>
                </Link>
                    )
                }
            </div>
        </div>
    )
}

export default DisplayPlaylist
