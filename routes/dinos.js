const dinoRoutes = (app , fs) => {
    const dataPath = './data/dinos.json';

    app.get('/api/dinos', (req,res) => {
        fs.readFile(dataPath,'utf8',(err,data)=>{
            if(err){
                throw err;
            }
            res.status(200).send(JSON.parse(data));
        })
    });
}

module.exports = dinoRoutes;