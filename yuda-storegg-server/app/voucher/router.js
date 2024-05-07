const express = require('express');

const router = express.Router();
const multer = require('multer');
const os = require('os');
const { index, viewCreate, actionCreate } = require('./controller');

router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', multer({dest: os.tmpdir()}).single('image'), actionCreate);
// router.get('/edit/:id', viewEdit);
// router.put('/edit/:id', actionEdit);
// router.delete('/delete/:id', actionDelete);

module.exports = router;
