//Get Express Framework From node-module
const express = require("express");
const mongoose = require("mongoose");

//Create App or web server
const app = express();

//Import Schema
const Articl = require("./models/Articl")

// mongodb+srv://ibrahemfouda99:<password>@cluster0.yd9quc2.mongodb.net/?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://ibrahemfouda99:I.fouda2019@cluster0.yd9quc2.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected Success");
    }).catch((err) => {
        console.log("Error With Connection To DB", err);
    });

//To use body params
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello in first proj");
})

app.get("/hello", (req, res) => {
    res.send("hello");
})

app.get("/numbers", (req, res) => {
    let numbers = "";
    for (let i = 0; i <= 100; i++) {
        numbers += i + " - ";

    }
    // res.send(`${numbers}`);

    // Send Html code
    // res.send(`<h1>Hello World</h1>`)

    //Send file
    // res.sendFile(__dirname + "/views/numbers.html");

    res.render("numbers.ejs", {
        name: "ibra",
        numbers: numbers,
    });
})

app.get("/sumOfTwoNum/:num1/:num2", (req, res) => {
    const total = Number(req.params.num1) + Number(req.params.num2);
    res.send(`total is ${total}`);
})

app.get("/sayHello", (req, res) => {
    // res.send(`Hello ${req.body.name}, Age is ${req.query.age}`);
    res.json({
        name: req.body.name,
        age: req.query.age,
        lan: "arabic"
    })
})

app.get("/hi", (req, res) => {
    res.send("hi");
})

app.post("/addComment", (req, res) => {
    res.send("addComment with post req");
})


// DB Endpoints

app.post("/articls", async (req, res) => {
    const newArticl = new Articl();
    newArticl.title = req.body.title;
    newArticl.body = req.body.title;
    newArticl.numOfLikes = 0;
    await newArticl.save();

    res.json(newArticl);
})

app.get("/getAllArticle", async (req, res) => {
    const allArticles = await Articl.find();
    res.json(allArticles);
})

app.get("/getSpecArticle/:artId", async (req, res) => {
    const id = req.params.artId;
    try {

        const specArt = await Articl.findById(id);
        res.json(specArt);
        return;

    } catch (error) {
        console.log("error catch", error)
        return res.send(error);
    }
})

app.delete("/deleteSpecArticle/:artId", async (req, res) => {
    const id = req.params.artId;
    try {

        const specArt = await Articl.findByIdAndDelete(id);
        res.json(specArt);
        return;

    } catch (error) {
        console.log("error catch", error)
        return res.send(error);
    }
})

app.get("/showAllArticle", async (req, res) => {
    const allArticles = await Articl.find();

    res.render("articls.ejs", {
        articls: allArticles
    });
})

app.listen(3000, () => {
    console.log("i am listen");
})