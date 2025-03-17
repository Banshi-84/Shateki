const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")

const app = express()

app.use(cors({origin:"http://localhost:5173"}))

app.use(express.json)

app.get("/api/test", (request, response) =>{
    response.json({message: "Backend is started"})
})
const port = process.env.port || 3000

app.listen(port, () =>{console.log(`Server running on port ${port}`)})