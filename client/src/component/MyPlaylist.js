import React, { useState } from 'react'
import axios from 'axios'
import { useEffect} from 'react'
function MyPlaylist({item}) {
    
    const [Pll,setPll] = useState([])
    
    useEffect(() => {
        
    axios.get('http://localhost:5000/api/playlist')
        .then((res)=>{
            console.log(res.data.playlist)
            setPll(res.data.playlist)
        } 
        )
    
    }, [])
    useEffect(()=>{
        console.log(Pll)
    },[Pll])
    
    return (
        <div>
        {
        Pll.map((item)=>
        <div style={{display: "flex",alignItems:"center",color:"white", marginLeft:"5%"}}>
            <p style={{marginRight: "20%"}}>{item.name}</p>
            <img src={item.src} height="200px" width="200px"/>
        </div> 
        )
        }
      
        </div>
    )
}

export default MyPlaylist
