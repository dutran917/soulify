require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./routes/auth')
const playlistRouter = require('./routes/playlist')
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@spotify-clone.mzs2b.mongodb.net/spotify-clone?retryWrites=true&w=majority`,
        {
            // useCreateIndex: true,
            useNewUrlParser: true
            // useUnifiedTopylogy: true,
            // useFindAndModify: false
        })
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)    
    }
}
connectDB()
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/auth',authRouter)
app.use('/api/playlist',playlistRouter)
const PORT = 5000
app.listen(PORT,()=> console.log(`server stated on port ${PORT}`))
