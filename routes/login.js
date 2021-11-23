const loginRoutes = (app , fs) =>{
    app.post('/api/login', (req,res) => {
        const userDetails = req.body;
        if(userDetails.username && userDetails.password){
            res.status(200).send({
                token : "hbakhdbkryewnndwjwhgywRGGQErgrajhrgeREagadrgAgaeRGAEg",
                authenticated:true,
            })
            return;
        }
        res.status(401).send("user not authenticated");
    })
}

module.exports = loginRoutes;