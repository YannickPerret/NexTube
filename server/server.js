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
                    ON skip.idVideo = infovideo.id WHERE infovideo.id = ${result[0].id}`,(error, results) =>{
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


app.listen(port, () =>{
    console.log(`PortFolio - Database to http://localhost:${port}`)
});