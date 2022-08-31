const express = require('express')
const { loginRequired } = require('../helper/token')
const router = express.Router()
const projectController = require('../controller/project')

router.post('/create',loginRequired,projectController.create)
router.get('/view',loginRequired, projectController.find);
router.put('/edit/:id',loginRequired, projectController.update);
router.delete('/delete/:id',loginRequired, projectController.delete);

module.exports=router;