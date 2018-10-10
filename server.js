const express = require('express')
const app = express()
const port = 3000
var  searchflightscontroller =require('./src/server/searchflightscontroller.js');
app.use(express.static('dist'))
app.get('/searchservice/flightsearchByNumber/:flightNumber/:dateOfJrny', (req, res) => {
    
    searchflightscontroller.selectdoc(req.param("flightNumber"),req.param("dateOfJrny"))
    .then(function(result){
        res.send(result);
    }).catch(function(err){});
    
})
app.get('/searchservice/flightsearch/:origin/:destination/:dateOfJrny', (req, res) => {
    console.log(req.param("origin"))
    searchflightscontroller.selectdocByOrigin(req.param("origin"),req.param("destination"),req.param("dateOfJrny"))
    .then(function(result){
        res.send(result);
    }).catch(function(err){console.log(err)});
    
})
app.get('/searchservice/updateDatedoc', (req, res) => {
    
    searchflightscontroller.updateDatedoc()
    .then(function(result){
        res.send(result);
    }).catch(function(err){});
    
})
app.listen(port, () => console.log(` app listening on port ${port}!`))
