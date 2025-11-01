const express = require('express');
const router = express.Router();
const { listResources, createResource, getResource } = require('../controllers/accessibilityController');
router.get('/', listResources);
router.post('/', createResource);
router.get('/:id', getResource);
module.exports = router;
