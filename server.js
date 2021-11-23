const express = require('express');
const fs = require('fs');
const app = express();
var cors = require('cors');
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use('/images',express.static(__dirname + 'images'));
// const routes = require('./routes/routes.js')(app , fs);


const dataPath = './data/dinos.json';
app.use(cors());
app.get('/', (req,res) => {
        res.status(200).send('Welcome to dino app');
});
app.get('/api/dinos', (req,res) => {
    fs.readFile(dataPath,'utf8',(err,data)=>{
        if(err){
            throw err;
        }
        res.status(200).send(JSON.parse(data));
    })
});
app.get('/api/dinos/search/:term', (req,res) => {
    fs.readFile(dataPath,'utf8',(err,data)=>{
        if(err){
            throw err;
        }
        try{
            const search_term = req.params.term.toLowerCase();
            const allData = JSON.parse(data);
            let filterData = [];

            if(search_term.length === 1){
                filterData = allData.data.filter(dino => dino.name[0].toLowerCase() === search_term);
            }else{
                filterData = allData.data.filter(dino => dino.name.toLowerCase().indexOf(search_term) >= 0);
            }
                res.status(200).send({
                    data: filterData
                });
                return;
        }catch(err){
            console.log(err);
            res.status(500).send({
                message : "Error"
            });
        }
    })
});

app.get('/api/dinos/:id', (req,res) => {
    fs.readFile(dataPath,'utf8',(err,data)=>{
        if(err){
            throw err;
        }
        try{
            const search_id = req.params.id;
            const allData = JSON.parse(data);
    
            const foundDino = allData.data.find(dino => dino.id == search_id)
            if(foundDino){
                res.status(200).send(foundDino);
                return;
            }
            res.status(404).send({
                message : "No id found"
            });
        }catch(err){
            console.log(err);
            res.status(500).send({
                message : "Error"
            });
        }
        
    })
});

app.post('/api/login', (req,res) => {
    const userDetails = req.body;
    // console.log(req);
    if(userDetails.username && userDetails.password){
        res.status(200).send({
            token : "hbakhdbkryewnndwjwhgywRGGQErgrajhrgeREagadrgAgaeRGAEg",
            authenticated:true,
        })
        return;
    }
    res.status(401).send("user not authenticated");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});