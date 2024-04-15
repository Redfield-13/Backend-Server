const Storage_Src = require('firebase/storage')

const multer = require('multer')
const express = require('express')
const Fire_app = require('firebase/app')
const data_base = require('../configs/databaseConfig')





const router = express.Router()



const firebaseConfig = {
    apiKey: "AIzaSyD79bHQFe84XX4BCmVkkCPDovCuQnQGbRw",
    authDomain: "minly-media.firebaseapp.com",
    projectId: "minly-media",
    storageBucket: "minly-media.appspot.com",
    messagingSenderId: "804634788804",
    appId: "1:804634788804:web:759b0d66e64f1723be1a91",
    measurementId: "G-C15KCXJELE"
};

const app = Fire_app.initializeApp(firebaseConfig)
const storage = Storage_Src.getStorage()
const uploadMedia = multer({storage: multer.memoryStorage()})



router.post('/upload', uploadMedia.single("image"), async (req,res)=>{
    console.log("here!!!!!dhsjizkmxbdshjxbds!!!!!!!!????????????");

    try{
        console.log("here!!!!!!!!!!!!!????????????");
        // const dateTime = giveCurrentDateTime()
        // const storageRef = ref(storage , `files/${req.file.originalname + "  " + dateTime}`)
        console.log(req);
        const storageRef = Storage_Src.ref(storage , `files/${req.file.originalname}`)
        console.log("here????????????");
        const metadata = {
            contentTpe: req.file.mimetype
        }
        
        const snapShot = await Storage_Src.uploadBytesResumable(storageRef, req.file.buffer, metadata)

        const downloadURL = await Storage_Src.getDownloadURL(snapShot.ref)

        console.log("File Successfuly Uploaded.");
        let data = [[
             downloadURL,
            req.query.author,
             req.query.authorID,
             req.file.mimetype,
             0,
             '',
             ''
        ]]
        console.log('idididid: '+req.query.authorID);
        const sql = 'INSERT INTO UploadedMedia (file_link, author, author_id, mediaType, likes, liked, unliked) VALUES ?';
        data_base.query(sql, [data], (error, results) => {
            if (error) {
              console.error('Error inserting data:', error);
            } else {
              console.log('Rows inserted:', results.affectedRows);
            }
          });

        return res.status(200).send({
            message: "File Uploaded To FIREBASE Storage",
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })

    }catch (error){
        console.log(error);
        return res.status(400).send(error.message)
    }
})

// const giveCurrentDateTime = () =>{
//     const today = new Date();
//     const Date = today.getFullYear() + '-' + (today.getMonth() + 1) 
// }

module.exports = router