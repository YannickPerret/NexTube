const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const port =  3500;
const bdd = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    password : "",
    database : "nextube"
})

let corsOptions = {
    origin:"http://localhost:3000"
} 

app.use(cors(corsOptions))
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended:true,
    limit:"50mb"
}))


app.get('/api/getOneVideo/:url/:idTimeLine?', async(req, res) => {

    const {url, idTimeLine} = req.params
    try {
        if(url){
            bdd.query(`SELECT * from infovideo where url = '${url}'`, (error, result) => {
                if(error) throw error

                if(result[0]){
                    if(idTimeLine != "false"){

                        bdd.query(`SELECT * from skip WHERE idSkip = ${idTimeLine} AND urlVideo = '${url}'`, (error2, result2) => {
                            if (error2) throw error2
                            
                            if(result2[0]){
                                res.status(200).send({video:result[0], timeLine:result2[0]})
                            }
                        })
                    }
                    else{
                        res.status(200).send({video:result[0]})
                    }
                }
            })
        }
    }
    catch(e){
        console.log(e)
        res.send(400).send(e)
    }    
})


app.get("/api/getAllVideoBySearch/:search", async(req, res) => {

    let {search} = req.params
    let cutLists = {}
    let videoList = {}

    if(search){
        try{
            let promise = new Promise((resolve, reject) => {
                bdd.query(`SELECT DISTINCT infovideo.* FROM infovideo WHERE title LIKE '%${search}%' OR url = '${search}'`, (error, result) => {
                    if(error) reject(error) 
                    if(result){
                        videoList = result
                        //pour chaque vidéos selectionné
                        result.forEach(async (row, i)=> {
                            // Récupère tous la liste de tous les timeCut pour la vidéo, url
                            bdd.query(`SELECT * FROM skip WHERE urlVideo = '${row.url}' LIMIT 10;`, (error2, result2) => {
                                if (error2) reject(error2);

                                if (result2[0]) {
                                    cutLists[row.url] = result2;
                                }
                                else {
                                    cutLists[row.url] = [];
                                }
                                if (i == result.length - 1) {
                                    resolve();
                                }
                            })
                        })

                    }
                })
            }) 
            promise.then(() => {
                res.status(200).send({video:videoList, cutList:cutLists})
            })
            promise.catch(error => {throw(error)})
        }
        catch(e){
            console.error(e)
        }
    }
})



app.get("/api/getVideo/:url",async (req, res) => {
    try{
        let {url} = req.params

        if(url){
             bdd.query(`SELECT * FROM infovideo WHERE url = '${url}'`, (error, result) => {
                if (error) throw error

                if(result[0]){

                    res.status(200).send(result[0])
                }
                else{
                    //Demander à l'utilisateur s'il veut la référencer
                    res.status(400).send({message:"La vidéo n'a pas encore été modifié"})
                }
            })
        }
        else
        {
            res.status(400).send({message:"Merci d'entrer une URL de vidéo conforme"})
        }
    }
    catch(e){
        throw e
    }
    
})


app.post("/api/timeLine/addCut", (req, res) => {

    const {timeLine, isLive} = req.body

    if(timeLine){
        timeLine.map((element) => {
            if(isLive){
                bdd.query(`UPDATE skip SET `)

            }
            else{
                
            }
        })
    }

    // Doit gérer 1 ou plusieurs cut
    // Doit flag si c'est en draft ou en publié
})


//Ajouter un cut pour une vidéo
app.post("/api/cut/add", (req, res) => {
    //changer title pour résumé

    //Check si un cut existe déjà dans la base de donnée via l'url
        //sinon push toutes les infos du cut
    //check si le cut appartiens à l'user
        //ajouter à la suite le cut

        //Test si l'utilisateur à déjà rentré des données pour cette vidéo

    try{
        let cut = req.body
        if(cut){
            
            bdd.query(`SELECT * FROM skip WHERE urlVideo = '${cut.url}' AND idUser = 1`, (error, result) => {
                if(error) throw error

                if(result[0]){
                    // mettre ? à la place de newdataset et mettre la variable après
                    bdd.query(`UPDATE skip SET dataSet = ? WHERE urlVideo = '${result[0].urlVideo}'`, JSON.stringify(cut.timeCode), (error, result) =>{
                        if(error) throw error;

                        if(result){
                            console.log("add")
                            res.status(200).send({message:"Vos cuts ont bien été ajoutés !"})
                        }
                    })
                    // Modifier et ajouter les nouveaux skip
                }
                else{
                    //créer une nouvelle entrée avec des données
                    console.log("créer nouvelle data")
                }
            })
        }



    }catch(e){
        console.error(e)
    }
   


})

app.listen(port, () =>{
    console.log(`PortFolio - Database to http://localhost:${port}`)
});