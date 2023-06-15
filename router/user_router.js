const express=require('express')

const router=express.Router();

//middle wares

const jwt=require('../middleware/jwt')

const upload=require('../middleware/multer')

const admintoken=require('../middleware/admin_jwt')

//controller require 

const extract=require('../controller/extract')

const login=require('../controller/login')

const register=require('../controller/register')

const readuser=require('../controller/read')

const preview=require('../controller/preview')

const create_img = require('../controller/create_img');

const update_img=require('../controller/update_img')

const delete_img=require('../controller/delete_img')

const readalluser=require('../controller/readallusers')

const adminlogin=require('../controller/admin_login')

//routing - api

router.get('/extract',upload,extract)

router.post('/createuser',register)

router.post('/userlogin',login)

router.patch('/createimg/:id',upload,create_img)

router.put('/images/:imageName/:id',upload,update_img)

router.delete('/images/:imageName/:id',delete_img)

router.get('/readuser',jwt,readuser)

router.get('/images/:imageName',preview)

router.get('/readalluser',admintoken,readalluser)

router.post('/adminlogin',adminlogin)

module.exports = router;