const express = require('express');
const router = express.Router();
const { listNGOs, createNGO, getNGO } = require('../controllers/ngoController');
router.get('/', listNGOs);
router.post('/', createNGO);
router.get('/:id', getNGO);
module.exports = router;
