const mongoose = require("mongoose");
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: String,
    body: String,
    numOfLikes: Number
})

const Articl = mongoose.model("Articl", articleSchema)

module.exports = Articl;