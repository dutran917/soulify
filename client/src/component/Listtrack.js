import {FiPause} from 'react-icons/fi'
function Listtrack({listTrack,onclick,isPlaying}) {

    return (
        <div>
            {listTrack.map((item) => (
                <div key={item.id} className="track" onClick={()=> onclick(item)}>
                    <img src={item.src} width="50px" height="50px"></img>
                    <div className="track-info">
                        <h3>{item.name}</h3>
                        <p>{item.artist}</p>
                     </div>   
                     {isPlaying==item && <div className="isPlaying"> <FiPause size="30px" className='iconplay'></FiPause> </div> }
                </div>
            ))}
        </div>
    )
}

export default Listtrack
