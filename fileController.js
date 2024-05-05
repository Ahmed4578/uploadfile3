const fs = require('fs');
const fileconfig = require('./fileconfig');
exports.getListFiles = async (req, res) => {
    const directoryPath = __dirname + "\\" + fileconfig.filelocation;
    console.log("List all the files in directory - " + directoryPath);
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "There was an issue in scanning the files!",
        });
      }
      console.log("Total files available are - " + files);
      let fileInfos = [];
      files.forEach((file) => {
        console.log("Adding file fileInfo Array - " + file);
        fileInfos.push({
          name: file,
          url: __dirname + "\\" + file,
        });
      });
      res.status(200).send(fileInfos);
    });
  };


  exports.download = async (req, res) => {
    const fileName = req.params.name;  // define uploads folder path
    const directoryPath = fileconfig.filelocation;
    res.download(directoryPath + "\\" + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "There was an issue in downloading the file. " + err,
        });
      }
    });
  };