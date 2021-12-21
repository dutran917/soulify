const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Playlist = require('../models/playlists')
//get playlist
router.get('/',verifyToken,async(req,res)=>{
    try {
        Playlist.find({user: req.userId}).populate('user',['username'])
        .then((playlist)=>{
            console.log(playlist)
           // res.json({success:true, playlist})
           res.send({success:true, playlist})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'server error'})       
    }
})


//create playlist
router.post('/',verifyToken,async (req,res) => {
    const {name,src} = req.body
    if(!name)
    return res.status(400).json({success: false,message:'title is required'})
    try {
        const newPlaylist = new Playlist({
            name,
            src,
            user: req.userId
        })
        await newPlaylist.save()
        res.json({success: true, message:'Ye ye',playlist: newPlaylist})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'server error'})
    }
})

//update playlist
router.put('/:id',verifyToken,async (req,res) =>{
    const {name,src} = req.body
    if(!name)
    return res.status(400).json({success: false,message:'title is required'})
    try {
        let updatePlaylist = {
            name,
            src
        }
        const pllUpdateCondition = {_id: req.params.id, user: req.userId}
        updatePlaylist = await Playlist.findOneAndUpdate(pllUpdateCondition,updatePlaylist,{new: true})

        if(!updatePlaylist)
        {
            return res.status(401).json({success:false,message: 'playlist not found'})
        }
        res.json({success:true,message:'completed!',playlist: updatePlaylist})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'server error'})
    }
})

//delete playlist

router.delete(':/id',verifyToken,async(req,res) => {
    try {
        const pllDeleteCondition = {_id: req.params.id, user: req.userId}
        const deletedPll = await Playlist.findOneAndDelete(pllDeleteCondition)
        if(!deletedPll)
        {
            return res.status(401).json({success: false,message:'playlist not found or ...'})
        }
        res.json({success:true, playlist: deletedPll})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'server error'})
    }
})

module.exports = router