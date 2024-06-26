const express = require('express')
const data_base = require('../configs/databaseConfig')


const router = express.Router()

router.get('/', (req,res)=>{
    console.log("Welcome to my API");
    res.send({message:"Welcome to my API"})
})


router.get('/getImages', (req,res) =>{
    console.log("get the images");
    let sql_q = 'SELECT * FROM UploadedMedia'
    let authorID = req.query.authorID
    data_base.query(sql_q, (error,results) =>{
        if (error) {
            console.log('UploadMedia table error : '+error);
            return error;
        }else{
            let authorPosts;
            console.log('Data : ' + results);
            if (authorID) {
                results = results.filter((post) => post.author_id === parseInt(authorID))
            }
            
            return res.status(200).send(results)
        }
        
    })
})


router.post('/likes', async (req, res) => {
    try{
        console.log(req.query);
        let sql_q = 'UPDATE UploadedMedia SET likes = ? WHERE id = ?'
        let mediaid = parseInt(req.query.mediaID)
        let likes = parseInt(req.query.currentlikes)
        let liker = req.query.liker
        let get_sql = 'SELECT liked from UploadedMedia WHERE id = ?'
        let likedBy = ''
        console.log('likedBY: '+ likedBy);
        if (req.query.operation == 'unlike') {
            likes = likes - 1
        }else{likes = likes + 1}
        console.log(likes,mediaid);
        data_base.query(sql_q, [likes , mediaid], (error, results)=>{
            if (error) {
                console.log('Like error : ' + error);
                return error
            }
            else{
                return res.status(200).send({code:200, Data: results})
            }
        })
    }catch(error){
        console.log(error);
        return res.status(400).send(error.message)
    }
  });

router.post('/delete', async(req,res) =>{
    try{
        let sql_q = ' DELETE FROM UploadedMedia WHERE id = ?'
        let imgID = parseInt(req.query.imgID)
        console.log(imgID);
        data_base.query(sql_q,[imgID], (error,results) => {
            if (error) {
                console.log('Delete Error : ' + error);
                return error
            }
            else{
                return res.status(200).send({code : 200, message:'Media Deleted'})
            }
        })
    }catch(error){
        console.log(error);
        return res.status(400).send(error)
    }
})



module.exports = router