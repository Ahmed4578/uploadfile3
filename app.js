const express = require("express")
const multer = require("multer")
const path = require("path");
const app = express()
const fs = require('fs');
const controller = require("./fileController")
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
      cb(null,file.originalname)
    },
  })
  const uploadStorage = multer({ storage: storage })

  // Single file
  app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
    console.log(req.file)
    return res.send("Single file")
  })
  
  //Multiple files
  app.post("/upload/multiple", uploadStorage.array("file", 10), (req, res) => {
    console.log(req.files)
    return res.send("Multiple files")
  })
  
  app.get("/files",function(req,res){
    console.log("Getting file list from controller ...");
    controller.getListFiles(req,res);
})

app.get("/files/:name",function(req,res){
    console.log("Downloading file from controller ...");
    controller.download(req,res);
})
  app.listen(5000 || process.env.PORT, () => {
    console.log("Server on...")
  })