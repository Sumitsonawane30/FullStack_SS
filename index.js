const express = require('express');
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const cors = require('cors');

// const  = require("./Models/Students");
const Students = require('./Models/Students');
const Movies = require('./Models/Movies');

const app = express()

app.use(express.json());
app.use(cors());
const port = 3000

mongoose.connect("mongodb+srv://Sumit_S:I9xMlNr7GSH1j0CS@1st-cluster.xpqws.mongodb.net/mydatabase").then(() =>
    console.log("mongodb connected!"));


app.get('/', (req, res) => {
  res.send('Hello World!')
})




// Movies database
app.get('/getmovies', async(req, res) => {
  try{
    const newData = await Movies.find({});
    res.status(200).json(newData);
    console.log(res.body);

  }catch(error){
    res.sendStatus(500);
  }
});

// Post method
app.post("/postmoviedata", async(req, res) =>{
  try{
    const newData = new Movies(req.body);
    await newData.save();
    res.sendStatus(201).json(res.body);
  }catch (err){
    console.error("Error creating movie data:",err);
    res.sendStatus(500).send("Internal server error");
  }
});


app.get('/getstudents', async(req, res) => {
  try{
    const newData = await Students.find({});
    res.status(200).json(newData);
    console.log(res.body);

  }catch(error){
    res.sendStatus(500);
  }
});


app.post("/poststudentsdata", async(req, res) =>{
  try{
    const newData = new Students(req.body);
    await newData.save();
    res.sendStatus(201).json(newData);
  }catch (err){
    console.error("Error creating students data:",err);
    res.sendStatus(500).send("Internal server error");
  }
});

app.put("/updatestudentsdata/:id", async(req, res) =>{
  try{
    const updatedData = await Students.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );

    if(!updatedData){
      return res.status(404).send("Student not found");
    }

    
    res.status(200).send("Student updated successfully");
  }
    
    catch (err){
    console.error("Error creating students data:",err);
    res.sendStatus(500).send("Internal server error");
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})