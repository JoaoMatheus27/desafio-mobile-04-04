const Plans = require('../models/plans');

// Criar um novo plano
exports.createPlans = async (req, res) => {
    try {
        const {name, action, price, responsible } = req.body;
        const plans = new Plans({name,action,price, responsible });
        await plans.save();
        res.status(201).json(plans);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todos os planos
exports.getPlans = async (req, res) => {
    try {
        const plans = await Plans.find();
        res.status(200).json(plans);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Buscar plano por ID
exports.getPlansById = async (req, res) => {
    try {
        const plans = await Plans.findById(req.params.id);
        if (!plans) {
            return res.status(404).json({ message: 'Plano não encontrado' });
        }
        res.status(200).json(plans);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar plano por ID
exports.updatePlans = async (req, res) => {
    try {
        const { id } = req.params;
        const {name,action,price, responsible } = req.body;

        const updatedPlan = await Plans.findByIdAndUpdate(
            id,
            {name, action, price, responsible },
            { new: true }
        );

        if (!updatedPlan) {
            return res.status(404).json({ message: 'Plano não encontrado' });
        }

        res.status(200).json(updatedPlan);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Deletar plano por ID
exports.deletePlans = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPlan = await Plans.findByIdAndDelete(id);

        if (!deletedPlan)
            return res.status(404).json({ message: 'Plano não encontrado' });

        res.status(200).json({ message: 'Plano deletado com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
