const express = require('express');
const router = express.Router();
const { 
    createTurism,
    getTurism,
    getTurismById,
    deleteTurism,
    updateTurism
 } = require('../controllers/turismController');

// Rotas de turismo
router.post('/', createTurism);
router.get('/', getTurism);
router.get('/:id', getTurismById);
router.put('/:id', updateTurism);
router.delete('/:id',deleteTurism);

module.exports = router;
