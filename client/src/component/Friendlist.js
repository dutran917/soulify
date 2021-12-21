import React from 'react'
import {GrLinkNext,GrStatusGoodSmall} from 'react-icons/gr'
import {AiFillCloseCircle,AiOutlineSend} from 'react-icons/ai'
import {FcNext} from 'react-icons/fc'
import {useState} from 'react'
function Friendlist({friendlist,hideChat,chatwith,chatting}) {
    const [chat,setChat]  = useState(false)
    // const chatting = () => {
    //     setChat(true)
    // }
    return (
        <div className="friendlist">
            <div className="friendlist-hide">
                <FcNext className="hide-chat" size="30" onClick={hideChat}></FcNext>
                <h2> Friend </h2>
            </div>
            <div className="friends">
                {friendlist.map((item) => 
                <div onClick={()=>{chatwith(item) 
                               setChat(true)} }>
                    <div className="a-friend">
                        <GrStatusGoodSmall className="status-onl" size="10px"></GrStatusGoodSmall>
                        <p>{item.name}</p>    
                    </div>
                </div>
                )
            }
           {chat && <div className="chatting-with"> 
                <div className="chatting-name"> 
                    <p> {chatting.name} </p>
                    <AiFillCloseCircle size="20px" cursor="pointer" onClick={()=>setChat(false)}></AiFillCloseCircle>
                </div>
                <div className="chatting-content">
                    blah blah
                </div>
                {/* <textarea placeholder="say something..."></textarea> */}
                <div className="send-msg">
                    <input type="text" placeholder="say something..." ></input>
                    <AiOutlineSend color="lightblue" size="30px" cursor="pointer"></AiOutlineSend>
                </div>
             </div>}
            </div>
        </div>
    )
}

export default Friendlist
