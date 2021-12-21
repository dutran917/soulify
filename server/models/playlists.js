const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PlaylistSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    src:{
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = mongoose.model('playlists',PlaylistSchema)