import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
const CreatePlaylist = () => {
    const [name,setName] = useState('')
    const [src,setSrc] = useState(null)

    const create = () => {
        axios.post('http://localhost:5000/api/playlist',{name:name,src:src})
    }
    const onChange = (e) => {
        
        // if(e.target.files.length != 0)
        // {
            console.log(URL.createObjectURL(e.target.files[0]))
            setSrc(URL.createObjectURL(e.target.files[0]))

       // }
     
    }
 
    return (

        <div>
              <form onSubmit={create}> 
                <input type="text" name="name" value ={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="file" name="src" value={src} onChange={(e)=>onChange(e)}/>
                <input type='submit' value = "SUBMIT"/> 
            </form>
        </div>

    )
}

export default CreatePlaylist
