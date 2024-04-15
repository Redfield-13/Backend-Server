const data_base = require('../configs/databaseConfig')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv').config()





exports.register = (req,res) =>{
    console.log("yes we are");
    console.log(req.body.name);
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const passwordConfirm = req.body.passwordConfirm

    // const {name,email,password,passwordConfirm} = req.body


    data_base.query('SELECT email FROM users WHERE email = ?', [email],async (error,results) =>{
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.status(401).send({
                "message": "That email is already taken."
            })
        }
        else if( password != passwordConfirm){
            console.log("passwords do not match");
            return res.status(402).send({
                message: "The passwords do not match."
            })
        }


        let hashed_password = await (await bcrypt.hash(password, 8)).toString()
        console.log(hashed_password);


        data_base.query('INSERT INTO users SET ?',{
            email: email,
            hashed_password: hashed_password,
            name: name,
            avatar: 'https://ui-avatars.com/api/?name='+name

        }, (error,results)=>{
            if (error) {
                console.log(error);
            }else{
                res.status(200).send({
                    message: "USER CREATED"
                })
            }
        })
    })


}


exports.login = async (req,res) =>{
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) {
        console.log({code:401 ,staus:"error",message:"Email and Password can not be Empty"});
        return res.status(401).send({code:401, status:"error", message:"Email and Password can not be Empty"})
    }
    else{
        data_base.query('SELECT * FROM users WHERE email = ?',[email], async(error,result)=>{
            if (error) {
                throw error
            }
            if (!result[0] || !await bcrypt.compare(password, result[0].hashed_password)) {
                console.log({code:402, status:"error", message:"Incorrect Email or Password"});
                return res.status(402).send({code:402, status:"error", message:"Incorrect Email or Password"})
            }
            else{
                const token = jwt.sign({id:result[0].ID, avatar: result[0].avatar, name: result[0].name}, "562789DHB_(8920HD%27", {expiresIn: "1h"})
               
                res.cookie("userRegistered",token,{
                    httpOnly: true,
                    expiresIn: 5000000
                })
                console.log({code:200, status:"Success", message:"Login Completed"});
                return res.status(200).send({code:200, status:"Success", message:"Login Completed", id: result[0].ID , name: result[0].name, avatar: result[0].avatar, token: token})
            }
        })
    }
    

}