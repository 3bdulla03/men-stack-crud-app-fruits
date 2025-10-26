const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require("morgan")

const fruitController = require('./controllers/fruitController')

const app = express()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!")
})

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))

app.get("/", async (req, res) => {
  res.render("index.ejs")
})

app.get('/fruits', fruitController.showFruitIndexPage)

app.get("/fruits/new", fruitController.showFruitForm)

app.get("/fruits/:id", fruitController.showFruitById)

app.post("/fruits", fruitController.createAFruit)

app.delete("/fruits/:id", fruitController.deleteFruitById)

app.get("/fruits/:id/edit", fruitController.showFruitEditPage)

app.put("/fruits/:id", fruitController.editFruitById)

app.listen(3000, () => {
  console.log("Listening on port 3000!")
})