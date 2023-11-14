const express = require('express');
const router = express.Router();
const taskscontroller = require('../Controllers/tasksConstrollers');
const auth = require('../Middleware/Auth');

router.get('/gettask',auth.authorize, taskscontroller.gettask);
router.post('/addtask',auth.authorize, taskscontroller.addtask);
router.put('/updatetask/:id',auth.authorize, taskscontroller.updatetask);
router.put('/deletetask/:id',auth.authorize, taskscontroller.deletetask);

module.exports = router;

