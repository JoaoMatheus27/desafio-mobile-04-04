const express = require('express');
const router = express.Router();
const { 
    createTurism,
    getTurisms,
    getTurismById } = require('../controllers/turismController');

// Rotas de turismo
router.post('/', createTurism);
router.get('/', getTurisms);
router.get('/:id', getTurismById);


module.exports = router;
