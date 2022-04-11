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

const getVideoInfo = (url) =>{



}

app.get("/api/getVideo/:slug",async (req, res) => {
    try{
        let {slug} = req.params

        if(slug){
             bdd.query(`SELECT * FROM infovideo WHERE url = '${slug}'`, (error, result) => {
                if (error){
                    throw error
                }

                if(result[0]){
                    bdd.query(`SELECT infovideo.*, skip.dataSet 
                    FROM infovideo INNER JOIN skip 
                    ON skip.urlVideo = infovideo.url WHERE infovideo.id = ${result[0].id}`,(error, results) =>{
                        if(error){
                            throw  error
                        }
                        else if(!results[0].isEdit){
                            res.status(400).send({message:"La vidéo n'a pas encore été modifié"})
                        }
                        if(results[0]){

                            results[0].dataSet = JSON.parse(results[0].dataSet)

                            res.status(200).send(results[0])
                        }
                        else{
                            //Demander à l'utilisateur s'il veut la référencer
                            res.status(400).send({message:"La vidéo n'a pas encore été modifié"})
                        }
                    })
                }
                else
                {
                    //utiliser une fonction pour référencier la videos
                     res.status(400).send({message :"La vidéo n'est pas encore référencé, souhaitez-vous le faire pour gagner des crédits ?"})
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


//Ajouter un cut pour une vidéo
app.post("/api/cut/add", (req, res) => {
    //Check si un cut existe déjà dans la base de donnée via l'url
        //sinon push toutes les infos du cut
    //check si le cut appartiens à l'user
        //ajouter à la suite le cut

        //Test si l'utilisateur à déjà rentré des données pour cette vidéo

    try{
        let cut = req.body

        /*let cut = {
            url:"NC5N5n8wJxI",
            timeCode:[
                {begin:80, end:120},
                {begin:320, end:327},
                {begin:240, end:280},
            ]
        }*/

        if(cut){
            
            bdd.query(`SELECT * FROM skip WHERE urlVideo = '${cut.url}' AND idUser = 1`, (error, result) => {
                if(error) throw error

                if(result[0]){
                    let newDataSet = JSON.parse(result[0].dataSet)
                   

                    console.log(cut.timeCode)
                    cut.timeCode.map((element) => {
                        //tester qu'il ne soit pas déjà entrée
                        newDataSet.push(element)
                    })


                    console.log(newDataSet)
                    newDataSet = JSON.stringify(newDataSet)
                    // mettre ? à la place de newdataset et mettre la variable après
                    bdd.query(`UPDATE skip SET dataSet= ? WHERE urlVideo = '${result[0].urlVideo}'`, newDataSet, (error, result) =>{
                        if(error) throw error;

                        if(result){
                            console.log("add")
                        }
                    })
                    // Modifier et ajouter les nouveaux skip
                }
                else{
                    //créer une nouvelle entrée avec des données
                    console.log("ocréer nouvelle data")
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