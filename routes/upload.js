const express = require('express')
const uploadController = require('../controllers/upload')

const router = express.Router()

router.post('/uploadImage', uploadController.uploadImage)



module.exports = router