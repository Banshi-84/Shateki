const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const gameRoutes = require("./gameRoutes")
const app = express()

app.use(cors())

app.use(express.json())

app.get("/api", gameRoutes)
const port = process.env.port || 3000

app.listen(port, () =>{console.log(`Server running on port ${port}`)})