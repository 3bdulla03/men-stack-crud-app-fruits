const Fruit = require('../models/Fruit')

const createAFruit = async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  await Fruit.create(req.body)
  res.redirect("/fruits")
}

const showFruitForm = (req, res) => {
  res.render("fruits/new.ejs")
}

const showFruitIndexPage = async (req, res) => {
  const allFruits = await Fruit.find()
  res.render("fruits/index.ejs", { fruits: allFruits })
}

const showFruitById = async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.id)
  res.render("fruits/show.ejs", { fruit: foundFruit })
}

const deleteFruitById = async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.id)
  res.redirect("/fruits")
}

const showFruitEditPage = async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.id)
  res.render("fruits/edit.ejs", { fruit: foundFruit })
}

const editFruitById = async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }

  await Fruit.findByIdAndUpdate(req.params.id, req.body)

  res.redirect(`/fruits/${req.params.id}`)
}

module.exports = {
  createAFruit,
  showFruitForm,
  showFruitIndexPage,
  showFruitById,
  deleteFruitById,
  showFruitEditPage,
  editFruitById
}