require('dotenv').config()

const express = require("express")

const cors = require("cors")

const app = express()

const frontend_url = process.env.FRONT_URL || "http://localhost:5173"
app.use(express.json())
app.use(cors({
    origin: frontend_url
    }))





const PORT = process.env.PORT || 5000
app.listen(PORT, (error) => {
	if (!error) {
		console.log("App is running successfully on http://localhost:" + PORT)
	} else {
		console.log("Error occur server can't start ", error)
	}
})
