import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config()

connectDB()
const app = express()
const PORT = process.env.PORT || 5001

// middlewares
app.use(express.json()) //parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })) //usually parses form data extended:true used to parse nested data if present
app.use(cookieParser()) //parse cookies
var allowedOrigins = [
  'https://dhaage-backend.vercel.app',
  'https://dhaage.vercel.app',
  'https://threads-clone-copy-frontend.vercel.app',
  'https://threads-clone-copy-backend.vercel.app',
  'https://dhaage.netlify.app', // Remove trailing slash
  'http://localhost:3000',
]

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['POST', 'GET', 'DELETE', 'PUT'],

    // exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],

    credentials: true,
  })
)

// Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/', (req, res) => {
  res.send('Hello')
})
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
