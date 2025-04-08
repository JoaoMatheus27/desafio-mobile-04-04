const express = require('express');
const router = express.Router();
const {
    createPlans,
    getPlans, 
    getPlansById, 
    deletePlans,
    updatePlans
} = require ('../controllers/plansControllers');



router.post('/', createPlans);
router.get('/', getPlans);
router.get('/:id', getPlansById);
router.put('/:id', updatePlans);
router.delete('/:id',deletePlans);


module.exports = router;
