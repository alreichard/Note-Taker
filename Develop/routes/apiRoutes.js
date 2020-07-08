const router = require("express").Router();
let parseNotes;
router.get("/notes", function(req, res) {
    
    pullData()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err))
  });

  router.delete("/notes/:id", function(req, res) {
    var chosen = req.params.id;
    pullData()
    for (var i = 0; i < parseNotes.length; i++) {
      if (chosen === parseNotes.id) {
        parseNotes.splice(i, 1)
        .then((notes)=> fs.writeFile("../db/db.json", notes))
        return res.json(parseNotes[i]);
      }
    }
  
    return res.json(false);
  });
  
  router.post("/notes", function (req, res) {
    pullData()
    const addNote =req.body
    parseNotes.push(addNote)
    .then((notes)=> fs.writeFile("../db/db.json", notes))
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err))
    });
  

  function pullData(){
  return fs.readFile("../db/db.json", "utf8").then((notes) => {
    try{
        parseNotes = [].concat(JSON.parse(notes))
        console.log("pullDataSuccess")
        console.log(parseNotes)
    } catch(err){
        parseNotes = []
        console.log(err)
        console.log(parseNotes)
    }

})
}

  module.exports = router