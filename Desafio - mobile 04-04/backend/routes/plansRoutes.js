const express = require('express');
const router = express.Router();
const {
    createPlans,
    getPlans, 
    getPlansById 
} = require ('../controllers/plansControllers');



router.post('/', createPlans);
router.get('/', getPlans);
router.get('/:id', getPlansById);


module.exports = router;
